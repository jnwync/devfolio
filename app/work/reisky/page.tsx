import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyLayout from '@/app/components/CaseStudyLayout';
import { getCaseStudy } from '@/data/caseStudies';
import { portfolioData } from '@/data/portfolio';

const caseStudy = getCaseStudy('reisky');

export const metadata: Metadata = {
  title: 'Reisky — Case Study | Jon Wayne Cabusbusan',
  description:
    'Case study: a freelance full-stack production website and headless-CMS platform for Reisky Martial Arts, built with Next.js 16, React 19, TypeScript, Sanity CMS, and GROQ.',
  openGraph: {
    type: 'article',
    title: 'Reisky — Case Study | Jon Wayne Cabusbusan',
    description:
      'A production full-stack case study covering a dual data-source architecture, Sanity CMS pipeline, test suite, and Lighthouse accessibility outcomes.',
  },
};

export default function ReiskyCaseStudy() {
  if (!caseStudy) notFound();

  return <CaseStudyLayout caseStudy={caseStudy} email={portfolioData.personal.email} />;
}
