"use client";
import { MonitorDetailsProps } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Test() {
  const { data: session } = useSession();
  const [websiteData, setWebsiteData] = useState();
  async function getMonitorsDetails() {
    const getMonitors = await axios.post<{ websites: MonitorDetailsProps[] }>(
      "/api/info/websites",
      {
        email: session?.user?.email,
      }
    );
    console.log(getMonitors);

    // @ts-expect-error/getmonitor-type-unknown
    setWebsiteData(getMonitors);
  }
  console.log(websiteData);

  useEffect(() => {
    if (session?.user?.name) {
      getMonitorsDetails();
    }
  }, [session?.user?.email]);

  return <div>hi there</div>;
}
