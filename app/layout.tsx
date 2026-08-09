import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import ScrollProgress from "./components/ScrollProgress";

const siteUrl = "https://jnwync-devfolio.vercel.app";

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
  metadataBase: new URL(siteUrl),
  title: "Jon Wayne Cabusbusan | Full-Stack Developer",
  description:
    "Full-stack developer building production web systems for client teams and product organizations, from interface and APIs through data, testing, and deployment.",
  keywords: [
    "Full-Stack Web Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "PostgreSQL",
    "Drizzle ORM",
    "Sanity CMS",
    "Node.js",
    "REST APIs",
    "RBAC",
    "Automated Testing",
    "Web Development",
    "Frontend",
    "Backend",
  ],
  authors: [{ name: "Jon Wayne Cabusbusan" }],
  creator: "Jon Wayne Cabusbusan",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Jon Wayne Cabusbusan | Full-Stack Developer",
    description:
      "Portfolio covering client delivery, product engineering, responsive interfaces, APIs, data systems, testing, accessibility, and deployment.",
    siteName: "Jon Wayne Cabusbusan Portfolio",
    images: [
      {
        url: "/images/hero/hero-portrait.webp",
        alt: "Professional headshot of Jon Wayne Cabusbusan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jon Wayne Cabusbusan | Full-Stack Developer",
    description:
      "Production web development for client teams and product organizations across interface, APIs, data, testing, and deployment.",
    images: ["/images/hero/hero-portrait.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jon Wayne Cabusbusan",
  url: siteUrl,
  jobTitle: "Full-Stack Web Developer",
  email: "jonwayne.cabusbusan@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Iloilo",
    addressCountry: "PH",
  },
  sameAs: [
    "https://github.com/jnwync",
    "https://www.linkedin.com/in/jnwync/",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
