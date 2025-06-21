import axios from "axios";
import { MonitorModel, UserModel } from "./models";
import mongoose from "mongoose";
import dbConnect from "./mongodb";

export interface MonitorDetailsProps {
  _id: mongoose.ObjectId;
  ownerId: mongoose.ObjectId;
  url: string;
  status: string;
  alertOn: string[];
  keyword: string;
  expectedStatus: number;
  statusCode: number;
  lastUpdated: Date;
}

export interface UserProps {
  _id: mongoose.ObjectId;
  name: string;
  email: string;
}

export async function GetWebsiteStatus() {
  try {
    const monitors: MonitorDetailsProps[] = await MonitorModel.find();
    monitors.forEach(async (monitor) => {
      try {
        const response = await axios.get(monitor.url, {
          headers: {
            Accept: "application/json",
          },
        });
        console.log(`${monitor.url} is up`);

        if (monitor.statusCode !== response.status || monitor.status !== "up") {
          await MonitorModel.updateOne(
            {
              url: monitor.url,
            },
            {
              statusCode: 200,
              status: "up",
            }
          );
        }
      } catch (err) {
        console.log(`${monitor.url} is down with error ${err}`);
        await MonitorModel.updateMany(
          {
            url: monitor.url,
          },
          {
            statusCode: "400",
            status: "down",
          }
        );
      }
    });
  } catch (err) {
    console.log(`there is an error ${err}`);
  }
}

export async function GetMonitors(email: string) {
  await dbConnect();
  const user = await UserModel.findOne({
    email,
  });
  const ownerId = user._id;

  const userMonitors = await MonitorModel.find({
    ownerId,
  });

  return userMonitors;
}
