import { CircleDotDashed, Dot } from "lucide-react";

interface MonitorChildProps {
  url: string;
  status: string;
}

export function MonitorChild({ url, status }: MonitorChildProps) {
  return (
    <div className="w-full bg-[#0f121f] text-white h-16 flex items-center justify-between">
      <div className="flex items-center">
        {status === "up" && <Dot size={40} color="green" />}
        {status === "down" && <Dot size={40} color="red" />}
        <div className="flex flex-col">
          <span className="font-medium text-sm">{url.split("//")[1]}</span>
          <div className="flex text-sm items-center gap-1">
            {status === "up" && <span className="text-green-700">Up</span>}
            {status === "down" && <span className="text-red-400">Down</span>}
            <Dot size={9} />
            <span className="text-gray-400">33m</span>
          </div>
        </div>
      </div>
      <div className="flex items-center px-4">
        <div className="flex gap-2">
          <CircleDotDashed color="gray" />
          <span className="text-gray-400">3 m</span>
        </div>
      </div>
    </div>
  );
}
