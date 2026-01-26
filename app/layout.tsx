import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import CursorSpotlight from "./components/CursorSpotlight";
import ScrollProgress from "./components/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jon Wayne Cabusbusan | Full-Stack Developer",
  description: "Full-stack developer specializing in React, Next.js, and TypeScript. Building high-performance web applications with focus on accessibility and user experience.",
  keywords: ["Full-Stack Developer", "React Developer", "Next.js", "TypeScript", "Web Development", "Frontend", "Backend"],
  authors: [{ name: "Jon Wayne Cabusbusan" }],
  creator: "Jon Wayne Cabusbusan",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Jon Wayne Cabusbusan | Full-Stack Developer",
    description: "Full-stack developer specializing in React, Next.js, and TypeScript.",
    siteName: "Jon Wayne Cabusbusan Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') document.documentElement.classList.add('dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollProgress />
        <CursorSpotlight />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
