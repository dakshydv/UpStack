import { CircleDotDashed, Dot } from "lucide-react";

interface MonitorChildProps {
  url: string;
  isSiteUp: boolean;
}

export function MonitorChild({ url, isSiteUp }: MonitorChildProps) {
  return (
    <div className="w-full bg-[#0f121f] text-white h-16 flex items-center justify-between">
      <div className="flex items-center">
        <Dot size={40} color={isSiteUp ? "green" : "red"} />
        <div className="flex flex-col">
          <span className="font-medium text-sm">{url}</span>
          <div className="flex text-sm items-center gap-1">
            {isSiteUp ? (
              <span className="text-green-700">Up</span>
            ) : (
              <span className="text-red-400">down</span>
            )}
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
