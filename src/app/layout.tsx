import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minh Kính | Tử Vi, Chiêm tinh và Tarot",
  description: "Bài luận cá nhân kết hợp Tử Vi, chiêm tinh và Tarot.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
