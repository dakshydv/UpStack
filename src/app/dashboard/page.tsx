"use client";
import { Monitor } from "@/components/Monitor";
import { MonitorDetailsProps } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [userMonitors, setUserMonitors] = useState<MonitorDetailsProps[]>([]);

  useEffect(() => {
    if (session?.user?.name) {
      // @ts-ignore
      getMonitors(session.user.email);
    }
  }, [session?.user?.name]);

  const getMonitors = async (email: string) => {
    const response = await axios.post("/api/monitordetails", {
      mail: email,
    });
    setUserMonitors(response.data.userMonitors);
  };

  return (
    <div>
      <div className="h-screen w-screen text-white bg-slate-950 flex flex-col gap-10 items-center">
        <header className="w-[80vw] mt-20 h-20 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">
            {/* @ts-ignore */}
            Hey there, {session?.user?.name.split(" ")[0]}
          </h1>
          <Link
            href={"/monitor"}
            className="bg-blue-600 px-5 py-2 text-lg rounded-xl"
          >
            Create Monitor
          </Link>
        </header>
        {userMonitors.length === 0 ? (
          "no monitors available yet"
        ) : (
          <Monitor monitors={userMonitors} />
        )}
      </div>
    </div>
  );
}
