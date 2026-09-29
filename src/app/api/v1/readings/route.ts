import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { buildReading } from "@/lib/reading";

export const runtime = "nodejs";
const inputSchema = z.object({
  name: z.string().trim().min(2).max(100), gender: z.string().min(1), birthDate: z.string().date(),
  birthTime: z.string().optional(), birthTimeAccuracy: z.enum(["exact","approximate","unknown"]),
  birthPlace: z.string().trim().min(2).max(160), focusArea: z.string().min(2).max(60),
  lifeContext: z.string().trim().min(20).max(3000), question: z.string().trim().min(10).max(500),
});

export async function POST(request: Request) {
  try {
    const input = inputSchema.parse(await request.json());
    const synthesis = buildReading(input);
    const slug = `${input.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0,24) || "reading"}-${crypto.randomUUID().slice(0,8)}`;
    const reading = await prisma.reading.create({ data: { slug, focusArea: input.focusArea, lifeContext: input.lifeContext, question: input.question, synthesis: synthesis as Prisma.InputJsonValue, profile: { create: { name: input.name, gender: input.gender, birthDate: new Date(`${input.birthDate}T12:00:00.000Z`), birthTime: input.birthTime || null, birthTimeAccuracy: input.birthTimeAccuracy, birthPlace: input.birthPlace } } }, select: { slug: true } });
    return NextResponse.json({ slug: reading.slug, url: `/r/${reading.slug}` }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Thông tin chưa đầy đủ hoặc chưa hợp lệ." }, { status: 400 });
    console.error(error); return NextResponse.json({ error: "Hệ thống chưa thể tạo bài luận. Vui lòng thử lại." }, { status: 500 });
  }
}
