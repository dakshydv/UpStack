import dbConnect from "./lib/mongodb";
import { GetWebsiteStatus } from "./lib/utils";

export async function register() {
  await dbConnect();
  setInterval(() => {
    GetWebsiteStatus();
  }, 10 * 1000);
}
