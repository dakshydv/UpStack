import { MonitorChild } from "./MonitorChild";
import { MonitorDetailsProps } from "@/lib/utils";

export function Monitor({ monitors }: { monitors: MonitorDetailsProps[] }) {
  return (
    <div className="w-[93vw] md:w-[80vw] flex flex-col divide-y border border-slate-600 divide-neutral-600 rounded-xl overflow-hidden ">
      <div className="w-full bg-slate-950 text-white h-10 flex items-center">
        <span className="px-4 font-medium">Monitors</span>
      </div>
      {monitors.map((monitor, index) => (
        <MonitorChild key={index} url={monitor.url} status={monitor.status} />
      ))}
    </div>
  );
}
