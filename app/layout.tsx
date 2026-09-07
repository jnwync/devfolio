import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Fragment_Mono } from "next/font/google";
import "./globals.css";
import Atmosphere from "./components/Atmosphere";
import { ViewTransitionSettler } from "./components/TransitionLink";
import { portfolioData } from "@/data/portfolio";

const siteUrl = "https://jnwync.vercel.app";
const siteName = "Jon Wayne Cabusbusan";
const siteTitle = "Jon Wayne Cabusbusan | Remote Full-Stack Web & Mobile Developer";
const siteDescription =
  "Remote full-stack web and mobile developer: Next.js, React, React Native/Expo, Node.js, PostgreSQL. Production apps for client teams and product organizations, from interface to deployment.";
const ogImageUrl = `${siteUrl}/opengraph-image`;

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
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Remote Full-Stack Developer",
    "Full-Stack Web Developer",
    "Mobile Developer",
    "React Native Developer",
    "Expo",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Prisma ORM",
    "Drizzle ORM",
    "Sanity CMS",
    "REST APIs",
    "OpenAPI",
    "RBAC",
    "Automated Testing",
    "Philippines",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: `${siteName} Portfolio`,
    firstName: "Jon Wayne",
    lastName: "Cabusbusan",
    username: "jnwync",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
  },
};

const knowsAbout = Array.from(
  new Set(
    portfolioData.skillCategories
      .filter((category) => category.title !== "Practices")
      .flatMap((category) => category.skills.map((skill) => skill.name))
  )
);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolioData.personal.name,
  givenName: "Jon Wayne",
  familyName: "Cabusbusan",
  url: siteUrl,
  image: `${siteUrl}/images/hero/hero-portrait.webp`,
  jobTitle: "Full-Stack Web & Mobile Developer",
  description: siteDescription,
  email: `mailto:${portfolioData.personal.email}`,
  telephone: portfolioData.personal.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Iloilo City",
    addressRegion: "Iloilo",
    addressCountry: "PH",
  },
  workLocation: {
    "@type": "Place",
    name: "Remote",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: portfolioData.education.institution,
  },
  knowsAbout,
  sameAs: portfolioData.contactLinks
    .filter((link) => link.icon === "github" || link.icon === "linkedin")
    .map((link) => link.href),
};

/**
 * Runs before first paint. Resolves the theme (stored choice → OS preference
 * → dark) and flags JS as available for the hero entrance and the toggle.
 */
const bootScript =
  "(function(){var d=document.documentElement;d.dataset.js='1';var t=null;try{t=localStorage.getItem('jnwync-theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.dataset.theme=t})();";

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
        <ViewTransitionSettler />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
