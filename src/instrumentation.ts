import { redisClient, prisma, xAddBulk } from "./lib/utils";
import axios from "axios";

async function pushToQueue() {
  const websites = await prisma.website.findMany({
    select: {
      url: true,
      id: true,
    },
  });
  xAddBulk(websites);
}

setInterval(() => {
  pushToQueue();
}, 10 * 1000);

async function fetchWebsiteData() {
  const res = await redisClient.xReadGroup(
    "first",
    "first",
    {
      key: "upstack:webapp",
      id: ">",
    },
    {
      COUNT: 5,
    }
  );

  if (res) {
    // @ts-expect-error
    for (const stream of res) {
      for (const message of stream.messages) {
        const id = message.id;

        const url = message.message.url;
        const websiteId = message.message.id;

        const startTime = new Date();
        await axios
          .get(url)
          .then(async () => {
            const endTime = new Date();
            await prisma.website.update({
              where: {
                url,
                id: Number(websiteId),
              },
              data: {
                status: "up",
                statusCode: 200,
                responseTime:
                  endTime.getMilliseconds() - startTime.getMilliseconds(),
                lastUpdated: new Date(),
              },
            });
          })
          .catch(async (err) => {
            await prisma.website.update({
              where: {
                url,
                id: Number(websiteId),
              },
              data: {
                status: "down",
                statusCode: err.response?.status || 400,
                lastUpdated: new Date(),
              },
            });
          });
        await redisClient.xAck("upstack:webapp", "first", id);
      }
    }
  }

  return res;
}

setInterval(() => {
  fetchWebsiteData();
}, 1 * 1000);

pushToQueue();
fetchWebsiteData();
