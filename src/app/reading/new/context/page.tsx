"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WizardShell } from "@/components/WizardShell";
import { getDraft, saveDraft } from "@/lib/draft";

const areas = ["Tình cảm", "Sự nghiệp", "Tài chính", "Gia đình", "Nội tâm", "Hướng đi chung"];
export default function ContextPage() {
  const router = useRouter(); const [focusArea,setFocusArea] = useState("Hướng đi chung"); const [lifeContext,setLifeContext] = useState("");
  useEffect(() => { const timer=window.setTimeout(() => { const draft=getDraft(); if (!draft.name) router.replace("/reading/new/birth"); setFocusArea(draft.focusArea ?? "Hướng đi chung"); setLifeContext(draft.lifeContext ?? ""); }, 0); return () => window.clearTimeout(timer); }, [router]);
  function submit(e:FormEvent) { e.preventDefault(); saveDraft({focusArea,lifeContext}); router.push("/reading/new/question"); }
  return <WizardShell step={2} title="Điều đang diễn ra" intro="Chọn vùng đời sống bạn muốn soi chiếu và đặt nó vào bối cảnh hiện tại."><form onSubmit={submit} className="space-y-6"><fieldset><legend className="mb-3 font-medium">Trọng tâm</legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{areas.map(area => <button type="button" key={area} onClick={() => setFocusArea(area)} className={`min-h-11 rounded-md border px-3 text-sm transition ${focusArea===area ? "border-[#27736d] bg-[#e6f0ed] font-semibold text-[#153c3a]" : "border-[#d4d1c9] bg-[#fbfaf7]"}`}>{area}</button>)}</div></fieldset><label className="block">Bối cảnh hiện tại<textarea required minLength={20} rows={7} className="mt-2 w-full rounded-md border border-[#cbc8bf] bg-[#fbfaf7] p-3 outline-none focus:border-[#27736d] focus:ring-2 focus:ring-[#27736d]/15" placeholder="Chuyện gì đang khiến bạn nghĩ nhiều nhất?" value={lifeContext} onChange={e => setLifeContext(e.target.value)} /></label><div className="flex items-center justify-between"><Link href="/reading/new/birth" className="inline-flex items-center gap-2 text-sm font-semibold text-[#52615e]"><ArrowLeft size={17}/>Quay lại</Link><button className="inline-flex h-12 items-center gap-2 rounded-md bg-[#153c3a] px-5 font-semibold text-white">Tiếp tục <ArrowRight size={18}/></button></div></form></WizardShell>;
}
