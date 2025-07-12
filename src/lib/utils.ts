import { PrismaClient } from "@/generated/prisma";
import { createClient } from "redis";

export interface websitesProps {
  url: string;
  id: number;
}

export interface MonitorDetailsProps {
  id: number;
  userId: number;
  url: string;
  status: string;
  alertOn: string;
  keyword?: string;
  expectedStatus: number;
  statusCode: number;
  responseTime: number;
  lastUpdated: string;
}

export interface MonitorChildProps {
  url: string;
  status: string;
  statusCode: number;
  responseTime: number;
}

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const host = process.env.HOST || "";

export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export const redisClient = createClient({
  username,
  password,
  socket: {
    host,
    port: 15057,
    reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
  },
});

// Only connect to Redis if credentials are provided
if (username && password && host) {
  redisClient.connect().catch(console.error);
}

async function xAdd({ url, id }: websitesProps) {
  await redisClient.xAdd("upstack:webapp", "*", {
    url,
    id: String(id),
  });
}

export async function xAddBulk(websites: websitesProps[]) {
  for (let i = 0; i < websites.length; i++) {
    await xAdd({
      url: websites[i].url,
      id: websites[i].id,
    });
  }
}
