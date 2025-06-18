import { CircleDotDashed, Dot } from "lucide-react";
import { MonitorChild } from "./MonitorChild";

export function Monitor() {
  return (
    <div className="w-[93vw] md:w-[80vw] flex flex-col divide-y border border-slate-600 divide-neutral-600 rounded-xl overflow-hidden bg-red-100 h-full">
      <div className="w-full bg-slate-950 text-white h-10 flex items-center">
        <span className="px-4 font-medium">Monitors</span>
      </div>
      <MonitorChild url="dakshyadav.com" isSiteUp={true} />
      <MonitorChild url="garvdudy.com" isSiteUp={true} />
      <MonitorChild url="somaychaudhary.com" isSiteUp={false} />
      <MonitorChild url="gambhiryadav.com" isSiteUp={false} />
      <MonitorChild url="yeshash.com" isSiteUp={true} />
    </div>
  );
}
