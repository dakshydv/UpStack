"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { MonitorChild } from "@/components/MonitorChild";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center">
      <header className="top-0 left-0 w-full flex justify-between items-center px-4 sm:px-8 py-4 z-50">
        <div className="font-bold text-white text-xl sm:text-2xl">UpStack</div>
        {session?.user?.name ? (
          <div className="font-medium bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent text-lg sm:text-2xl">
            Welcome {session.user.name.split(" ")[0]}
          </div>
        ) : (
          <button
            onClick={() => {
              signIn("google");
            }}
            className="px-4 sm:px-5 py-2 rounded text-gray-800 bg-gray-400 hover:cursor-pointer font-semibold shadow hover:bg-gray-100 transition text-sm sm:text-base"
          >
            Sign In
          </button>
        )}
      </header>

      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="fixed  top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>

      <main className="w-full flex-1 flex flex-col items-center justify-center relative z-10 pt-20 mt-5 pb-10">
        <div className="text-center mb-20 sm:mb-40 px-4 sm:px-0">
          <div>
            <button className="border hover:cursor-pointer border-gray-500 text-white font-medium rounded-2xl z-100 bg-black px-3 sm:px-4 py-1 text-sm sm:text-base">
              Never miss a downtime
            </button>
          </div>
          <div className="gap-4 sm:gap-8 mt-4 sm:mt-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl text-white font-medium tracking-wide">
              Downtime Detected <br />
              {/* You Sleep <br /> */}
            </h1>
            <h1 className="bg-gradient-to-r text-4xl sm:text-5xl md:text-7xl font-medium tracking-wide from-white to-gray-400 text-transparent bg-clip-text pb-4 sm:pb-6">
              Problems Prevented
              {/* We watch */}
            </h1>
          </div>
          <h3 className="pt-2 sm:pt-3 text-lg sm:text-xl max-w-[600px] font-medium text-gray-300 mx-auto">
            Get instant alerts when your website goes down—so you can fix it
            fast and keep your business running smoothly.
          </h3>
          <div className="mt-6 sm:mt-8 gap-3 sm:gap-4 flex flex-col sm:flex-row justify-center">
            {session?.user?.name ? (
              <Link
                href={"/dashboard"}
                className="bg-gray-700 hover:cursor-pointer font-medium px-4 sm:px-5 py-2 sm:py-3 text-lg sm:text-xl rounded-md text-white"
              >
                Try for Free!
              </Link>
            ) : (
              <button
                onClick={() => {
                  signIn("google");
                }}
                className="bg-slate-900 hover:cursor-pointer font-medium px-4 sm:px-5 py-2 sm:py-3 text-lg sm:text-xl rounded-md text-white"
              >
                Try for Free!
              </button>
            )}
            <button className="bg-gray-200 hover:cursor-pointer font-medium px-4 sm:px-5 py-2 sm:py-3 text-lg sm:text-xl rounded-md text-black">
              Learn more!
            </button>
          </div>
        </div>
        <div>
          {/* <Monitor /> */}
          <div className="w-[93vw] md:w-[80vw] flex flex-col divide-y border border-slate-600 divide-neutral-600 rounded-xl overflow-hidden ">
            <div className="w-full bg-slate-950 text-white h-10 flex items-center">
              <span className="px-4 font-medium">Monitors</span>
            </div>
            <MonitorChild url="dakshyadav.com" status={"up"} />
            <MonitorChild url="garvdudy.com" status={"up"} />
            <MonitorChild url="somaychaudhary.com" status={"down"} />
            <MonitorChild url="gambhiryadav.com" status={"down"} />
            <MonitorChild url="yeshash.com" status={"up"} />
          </div>
        </div>
      </main>
    </div>
  );
}
