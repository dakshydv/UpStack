import { MonitorChild } from "./MonitorChild";
import { MonitorDetailsProps } from "@/lib/utils";

export function Monitor({ monitors }: { monitors: MonitorDetailsProps[] }) {
  return (
    <div className="glass rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white h-16 flex items-center px-6 border-b border-neutral-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
          </div>
          <span className="font-semibold text-lg">Website Monitors</span>
          <div className="ml-4 px-3 py-1 bg-neutral-800 rounded-full text-sm text-gray-300">
            {monitors.length} {monitors.length === 1 ? "monitor" : "monitors"}
          </div>
        </div>
      </div>
      <div className="divide-y divide-neutral-800">
        {monitors.map((monitor, index) => (
          <MonitorChild
            key={index}
            url={monitor.url}
            status={monitor.status}
            statusCode={monitor.statusCode}
            responseTime={monitor.responseTime}
          />
        ))}
      </div>
    </div>
  );
}