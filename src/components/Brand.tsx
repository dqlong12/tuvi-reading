import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Brand() {
  return <Link href="/" className="inline-flex items-center gap-3 font-semibold text-[#153c3a]"><span className="grid size-9 place-items-center rounded-md bg-[#153c3a] text-white"><Sparkles size={18} /></span><span>Minh Kính</span></Link>;
}
