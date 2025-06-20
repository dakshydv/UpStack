import dbConnect from "./lib/mongodb";
import { GetWebsiteStatus } from "./lib/utils";

export async function register() {
  await dbConnect();
  GetWebsiteStatus();
}
