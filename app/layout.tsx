import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Fragment_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import Atmosphere from "./components/Atmosphere";
import ScrollProgress from "./components/ScrollProgress";
import { ViewTransitionSettler } from "./components/TransitionLink";

const siteUrl = "https://jnwync-devfolio.vercel.app";

const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  preload: true,
});

const bodyFont = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const monoFont = Fragment_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1310" },
  ],
};

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

/**
 * Runs before first paint. Resolves the theme (stored choice → OS preference
 * → dark), flags JS as available for the reveal helpers, and arms the
 * sub-second intro once per session when motion is allowed.
 */
const bootScript =
  "(function(){var d=document.documentElement;d.dataset.js='1';var t=null;try{t=localStorage.getItem('jnwync-theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.dataset.theme=t;try{if(!sessionStorage.getItem('jnwync-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='play'}}catch(e){}})();";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <Atmosphere />
        <div className="grain" aria-hidden="true" />
        <MotionConfig reducedMotion="user">
          <ScrollProgress />
          <ViewTransitionSettler />
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
