import { CircleDotDashed, Dot, ExternalLink } from "lucide-react";
import { MonitorChildProps } from "@/lib/utils";

export function MonitorChild({
  url,
  status,
  responseTime,
  statusCode,
}: MonitorChildProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "up":
        return "text-green-400";
      case "down":
        return "text-red-400";
      case "pending":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "up":
        return "bg-green-500/20";
      case "down":
        return "bg-red-500/20";
      case "pending":
        return "bg-yellow-500/20";
      default:
        return "bg-gray-500/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "up":
        return "Online";
      case "down":
        return "Down";
      case "pending":
        return "Pending";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="w-full bg-neutral-900/50 hover:bg-neutral-800/50 text-white h-20 flex items-center justify-between px-6 transition-all duration-200 group">
      <div className="flex items-center space-x-4">
        {/* Status Indicator */}
        <div
          className={`w-3 h-3 rounded-full ${
            status === "up"
              ? "bg-green-400 animate-pulse"
              : status === "down"
              ? "bg-red-400"
              : "bg-yellow-400"
          }`}
        ></div>

        {/* URL and Status Info */}
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-white group-hover:text-blue-300 transition-colors">
              {url.split("//")[1] || url}
            </span>
            <ExternalLink className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-medium ${getStatusColor(status)}`}>
              {getStatusText(status)}
            </span>
            <Dot size={12} className="text-gray-600" />
            <span className={`text-sm font-medium ${getStatusColor(status)}`}>
              {statusCode}
            </span>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="flex items-center space-x-3">
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(
            status
          )} ${getStatusColor(status)}`}
        >
          {/* {responseTime}ms */}
          {responseTime !== 0 ? `${responseTime} ms` : "timeout"}
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <CircleDotDashed className="w-4 h-4" />
          <span className="text-sm">5m interval</span>
        </div>
      </div>
    </div>
  );
}