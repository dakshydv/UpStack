import { Monitor } from "@/components/Monitor";
import { MonitorDetailsProps } from "@/lib/utils";
import Link from "next/link";
import { Plus, BarChart3, Settings, Bell, CheckCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { prisma } from "@/lib/utils";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  let userMonitors: MonitorDetailsProps[] = [];

  try {
    if (session?.user?.email) {
      const user = await prisma.user.findFirst({
        where: {
          email: session.user.email,
        },
      });

      if (user) {
        const websites = await prisma.website.findMany({
          where: {
            userId: user.id,
          },
        });

        userMonitors = websites.map((website) => ({
          id: website.id,
          userId: website.userId,
          url: website.url,
          status: website.status,
          alertOn: website.alertOn,
          keyword: website.keyword,
          expectedStatus: website.expectedStatus,
          statusCode: website.statusCode,
          responseTime: website.responseTime,
          lastUpdated: website.lastUpdated.toISOString(),
        }));
      }
    }
  } catch (error) {
    console.error("Error fetching monitors:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {!session?.user?.email && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-green-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                You are not signed in
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Please signin to create monitor
              </p>
              <div className="space-y-4">
                <Link
                  href="/api/auth/signin"
                  className="w-full hover:cursor-pointer text-gray-400 hover:text-white px-6 py-3 rounded-xl border border-neutral-700 hover:border-neutral-600 transition-all duration-200 inline-block text-center"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <header className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                Hey there,
                <span className="gradient-text-blue">
                  {session?.user?.name?.split(" ")[0]}
                </span>
              </h1>
              <p className="text-xl text-gray-400">
                Here&#39;s an overview of your website monitors
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/monitor/new"
                className="group bg-[#2563EB] border border-gray-300/20 hover:bg-[#1D4ED8] text-[#FFFFFF] px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 create-monitor-btn ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                <Plus className="w-5 h-5" />
                <span>Create Monitor</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* total monitors */}
          <div className="glass rounded-2xl border border-neutral-600 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {userMonitors.length}
                </div>
                <div className="text-sm text-gray-400">Total Monitors</div>
              </div>
            </div>
            <div className="text-sm text-gray-300">Active website monitors</div>
          </div>

          {/* websites currently up */}
          <div className="glass rounded-2xl border border-neutral-600 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {
                    userMonitors.filter(
                      (m: MonitorDetailsProps) => m.status === "up"
                    ).length
                  }
                </div>
                <div className="text-sm text-gray-400">Online</div>
              </div>
            </div>
            <div className="text-sm text-gray-300">Websites currently up</div>
          </div>

          {/* websites with issues */}
          <div className="glass rounded-2xl border border-neutral-600 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {
                    userMonitors.filter(
                      (m: MonitorDetailsProps) => m.status === "down"
                    ).length
                  }
                </div>
                <div className="text-sm text-gray-400">Down</div>
              </div>
            </div>
            <div className="text-sm text-gray-300">Websites with issues</div>
          </div>
        </div>

        {/* Monitors Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Your Monitors</h2>
            <div className="flex items-center space-x-2 text-gray-400">
              <Settings className="w-5 h-5" />
              <span className="text-sm">Settings</span>
            </div>
          </div>

          {userMonitors.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                No monitors yet
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Get started by creating your first website monitor. We&#39;ll
                help you keep track of your websites and alert you when they go
                down.
              </p>
              <Link
                href="/monitor/new"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Monitor</span>
              </Link>
            </div>
          ) : (
            <Monitor monitors={userMonitors} />
          )}
        </div>
      </div>
    </div>
  );
}
