import Link from "next/link";
import { ArrowRight, Compass, MoonStar, Sparkles } from "lucide-react";
import { Brand } from "@/components/Brand";

export default function Home() {
  const features = [[MoonStar, "Tử Vi", "Nhìn nhịp vận và cách phân bổ nội lực."], [Compass, "Chiêm tinh", "Soi những khuynh hướng đang định hình lựa chọn."], [Sparkles, "Tarot", "Mở một biểu tượng cho câu hỏi ngay lúc này."]] as const;
  return <main className="min-h-screen bg-[#f5f3ee] text-[#20302d]">
    <header className="border-b border-[#d8d4ca] bg-[#fbfaf7]/95"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8"><Brand /><Link href="/reading/new/birth" className="text-sm font-semibold text-[#153c3a]">Bắt đầu luận giải</Link></div></header>
    <section className="relative overflow-hidden border-b border-[#d8d4ca] bg-[#fbfaf7]"><div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[#153c3a] lg:block" /><div className="relative mx-auto grid min-h-[72vh] max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_.8fr] lg:py-24">
      <div className="max-w-2xl"><p className="mb-5 text-xs font-semibold uppercase text-[#b6533d]">Tử Vi · Chiêm tinh · Tarot</p><h1 className="text-5xl font-semibold leading-[1.08] text-[#153c3a] sm:text-7xl">Minh Kính</h1><p className="mt-6 max-w-xl text-lg leading-8 text-[#596461]">Một khoảng lặng để nhìn rõ nhịp sống hiện tại, kết nối các biểu tượng cổ điển với câu hỏi thật của bạn.</p><Link href="/reading/new/birth" className="mt-9 inline-flex h-12 items-center gap-3 rounded-md bg-[#b6533d] px-6 font-semibold text-white transition hover:bg-[#99442f]">Tạo bài luận của bạn <ArrowRight size={18} /></Link></div>
      <div className="relative mx-auto aspect-square w-full max-w-sm border border-[#7fa19b] bg-[#153c3a] p-8 text-white lg:mr-0"><div className="grid h-full place-items-center border border-[#7fa19b]/60"><div className="text-center"><MoonStar className="mx-auto text-[#efb968]" size={72} strokeWidth={1} /><p className="mt-6 font-serif text-3xl">Thấy mình rõ hơn</p><p className="mt-2 text-sm text-[#c9d8d4]">qua một câu hỏi đúng</p></div></div></div>
    </div></section>
    <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-3">{features.map(([Icon,title,text]) => <article key={title} className="border-t border-[#a9aaa3] pt-5"><Icon size={22} className="text-[#b6533d]" /><h2 className="mt-4 text-xl font-semibold text-[#153c3a]">{title}</h2><p className="mt-2 leading-7 text-[#65706d]">{text}</p></article>)}</section>
  </main>;
}
