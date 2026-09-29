"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { WizardShell } from "@/components/WizardShell";
import { getDraft, saveDraft } from "@/lib/draft";

export default function BirthPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", gender: "female", birthDate: "", birthTime: "", birthTimeAccuracy: "exact", birthPlace: "" });
  useEffect(() => { const timer = window.setTimeout(() => setForm(current => ({ ...current, ...getDraft() })), 0); return () => window.clearTimeout(timer); }, []);
  function submit(event: FormEvent) { event.preventDefault(); saveDraft(form); router.push("/reading/new/context"); }
  const field = "mt-2 h-11 w-full rounded-md border border-[#cbc8bf] bg-[#fbfaf7] px-3 outline-none transition focus:border-[#27736d] focus:ring-2 focus:ring-[#27736d]/15";
  return <WizardShell step={1} title="Thông tin sinh" intro="Các dữ kiện nền giúp bài luận giữ đúng nhịp cá nhân của bạn."><form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
    <label className="sm:col-span-2">Họ và tên<input required className={field} value={form.name} onChange={e => setForm({...form,name:e.target.value})} /></label>
    <label>Giới tính<select className={field} value={form.gender} onChange={e => setForm({...form,gender:e.target.value})}><option value="female">Nữ</option><option value="male">Nam</option><option value="other">Khác / không muốn nêu</option></select></label>
    <label>Ngày sinh<input required type="date" className={field} value={form.birthDate} onChange={e => setForm({...form,birthDate:e.target.value})} /></label>
    <label>Giờ sinh<input type="time" className={field} disabled={form.birthTimeAccuracy === "unknown"} value={form.birthTime} onChange={e => setForm({...form,birthTime:e.target.value})} /></label>
    <label>Độ chính xác<select className={field} value={form.birthTimeAccuracy} onChange={e => setForm({...form,birthTimeAccuracy:e.target.value})}><option value="exact">Chính xác</option><option value="approximate">Ước lượng</option><option value="unknown">Không rõ giờ sinh</option></select></label>
    <label className="sm:col-span-2">Nơi sinh<input required className={field} placeholder="Ví dụ: Hà Nội, Việt Nam" value={form.birthPlace} onChange={e => setForm({...form,birthPlace:e.target.value})} /></label>
    <button className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#153c3a] px-5 font-semibold text-white sm:col-start-2">Tiếp tục <ArrowRight size={18} /></button>
  </form></WizardShell>;
}
