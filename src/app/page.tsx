"use client";
import Link from "next/link";
import { MonitorChild } from "@/components/MonitorChild";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <header className="top-0 left-0 w-full flex justify-between items-center px-4 sm:px-8 py-4 z-50">
        <div className="font-bold text-white text-xl sm:text-2xl">UpStack</div>
        {session?.user?.name ? (
          <div className="font-medium bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent text-lg sm:text-2xl">
            <Link
              href="/monitor"
              className="ml-4 inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-400 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-500  text-base sm:text-lg border border-white/10 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Dashboard
            </Link>
          </div>
        ) : (
          <Link href={"/signup"} className="px-4 sm:px-5 py-2 rounded text-gray-800 bg-gray-400 hover:cursor-pointer font-semibold shadow hover:bg-gray-100 transition text-sm sm:text-base">Get Started</Link>
        )}
      </header>

      <main className="w-full flex-1 flex flex-col items-center justify-center relative z-10 pt-20 mt-5 pb-10">
        <div className="text-center mb-20 sm:mb-40 px-4 sm:px-0">
          <div>
            <button className="border hover:cursor-pointer border-gray-500 text-white font-medium rounded-2xl z-100 bg-black px-3 sm:px-4 py-1 text-sm sm:text-base">
              Never miss a downtime
            </button>
          </div>
          <div className="gap-4 sm:gap-8 mt-4 sm:mt-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl text-white font-medium tracking-wide">
              You Sleep <br />
              {/* You Sleep <br /> */}
            </h1>
            <h1 className="bg-gradient-to-r text-4xl sm:text-5xl md:text-7xl font-medium tracking-wide from-white to-gray-400 text-transparent bg-clip-text pb-4 sm:pb-6">
              We Watch
              {/* We watch */}
            </h1>
          </div>
          <h3 className="pt-2 sm:pt-3 text-lg sm:text-xl max-w-[600px] font-medium text-gray-300 mx-auto">
            Get instant alerts when your website goes down—so you can fix it
            fast and keep your business running smoothly.
          </h3>
        </div>
        <div>
          {/* <Monitor /> */}
          <div className="w-[93vw] md:w-[80vw] flex flex-col divide-y border border-slate-600 divide-neutral-600 rounded-xl overflow-hidden ">
            <div className="w-full bg-slate-950 text-white h-10 flex items-center">
              <span className="px-4 font-medium">Monitors</span>
            </div>
            <MonitorChild
              responseTime={3.2}
              url="dakshyadav.com"
              status={"up"}
              statusCode={200}
            />
            <MonitorChild
              responseTime={3.0}
              url="garvdudy.com"
              status={"up"}
              statusCode={200}
            />
            <MonitorChild
              responseTime={2.5}
              url="somaychaudhary.com"
              status={"down"}
              statusCode={404}
            />
            <MonitorChild
              responseTime={3.7}
              url="gambhiryadav.com"
              status={"down"}
              statusCode={400}
            />
            <MonitorChild
              responseTime={4.1}
              url="yeshash.com"
              status={"up"}
              statusCode={200}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
