import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import ScrollProgress from "./components/ScrollProgress";

const displayFont = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const bodyFont = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Jon Wayne Cabusbusan | Full-Stack Engineer",
  description:
    "Full-stack engineer building production web systems across government, healthcare, e-commerce, and marketplace products with Next.js, TypeScript, APIs, databases, and cloud deployment.",
  keywords: [
    "Full-Stack Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Web Development",
    "Frontend",
    "Backend",
    "Iloilo Philippines",
  ],
  authors: [{ name: "Jon Wayne Cabusbusan" }],
  creator: "Jon Wayne Cabusbusan",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Jon Wayne Cabusbusan | Full-Stack Engineer",
    description:
      "Production web systems across government, healthcare, e-commerce, and marketplace products.",
    siteName: "Jon Wayne Cabusbusan Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} antialiased`}
      >
        <div aria-hidden="true" className="page-grain pointer-events-none fixed inset-0 -z-10" />
        <MotionConfig reducedMotion="user">
          <ScrollProgress />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
