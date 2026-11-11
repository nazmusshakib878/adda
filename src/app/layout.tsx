import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { BondhuProvider } from "@/components/context/BondhuContext";
import { StudioTopNav } from "@/components/ui/StudioTopNav";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bondhu — Closer, wherever you are.",
  description:
    "Social, Chat, HD Calling, and Community Operations platform designed in Bondhu Emerald & Ivory.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${notoSansBengali.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--text)] antialiased">
        <BondhuProvider>
          <StudioTopNav />
          {children}
        </BondhuProvider>
      </body>
    </html>
  );
}
