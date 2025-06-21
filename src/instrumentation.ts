import dbConnect from "./lib/mongodb";
import { GetWebsiteStatus } from "./lib/utils";

export async function register() {
  await dbConnect();
  setInterval(() => {
    GetWebsiteStatus();
  }, 60 * 1000);
}
