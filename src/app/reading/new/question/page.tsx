"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { WizardShell } from "@/components/WizardShell";
import { clearDraft, getDraft, saveDraft } from "@/lib/draft";

export default function QuestionPage() {
  const router=useRouter(); const [question,setQuestion]=useState(""); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
  useEffect(() => { const timer=window.setTimeout(() => { const draft=getDraft(); if (!draft.lifeContext) router.replace("/reading/new/context"); setQuestion(draft.question ?? ""); }, 0); return () => window.clearTimeout(timer); }, [router]);
  async function submit(e:FormEvent) { e.preventDefault(); setBusy(true); setError(""); saveDraft({question}); const response=await fetch("/api/v1/readings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(getDraft())}); const body=await response.json(); if (!response.ok) { setError(body.error ?? "Chưa thể tạo bài luận."); setBusy(false); return; } clearDraft(); router.push(body.url); }
  return <WizardShell step={3} title="Một câu hỏi rõ" intro="Câu hỏi đủ cụ thể sẽ giúp ba hệ biểu tượng cùng hướng về một điểm."><form onSubmit={submit} className="space-y-6"><label className="block">Câu hỏi của bạn<textarea required minLength={10} rows={6} className="mt-2 w-full rounded-md border border-[#cbc8bf] bg-[#fbfaf7] p-3 text-lg outline-none focus:border-[#27736d] focus:ring-2 focus:ring-[#27736d]/15" placeholder="Ví dụ: Mình nên nhìn điều gì trước khi quyết định thay đổi công việc?" value={question} onChange={e => setQuestion(e.target.value)} /></label><p className="border-l-2 border-[#efb968] pl-4 text-sm leading-6 text-[#65706d]">Bài luận mang tính chiêm nghiệm cá nhân. Với quyết định quan trọng, hãy luôn đối chiếu cùng dữ kiện thực tế.</p>{error && <p role="alert" className="text-sm text-[#a23e2c]">{error}</p>}<div className="flex items-center justify-between"><Link href="/reading/new/context" className="inline-flex items-center gap-2 text-sm font-semibold text-[#52615e]"><ArrowLeft size={17}/>Quay lại</Link><button disabled={busy} className="inline-flex h-12 items-center gap-2 rounded-md bg-[#b6533d] px-5 font-semibold text-white disabled:opacity-60"><Sparkles size={18}/>{busy ? "Đang luận giải…" : "Mở bài luận"}</button></div></form></WizardShell>;
}
