import type { Metadata } from "next";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Big Rocket | ROS-Ready Hardware as a Service",
  description:
    "Lease ROS-ready mobile bases, quadrupeds, and cobots for AI research, secondary development, and algorithmic testing.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-[#05070b]">
      <body className="antialiased"><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}