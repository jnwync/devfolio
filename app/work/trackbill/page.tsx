import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyLayout from '@/app/components/CaseStudyLayout';
import { getCaseStudy } from '@/data/caseStudies';
import { portfolioData } from '@/data/portfolio';

const caseStudy = getCaseStudy('trackbill');

export const metadata: Metadata = {
  title: 'Trackbill — Case Study | Jon Wayne Cabusbusan',
  description:
    'Case study: contract full-stack product engineering across an Express/Prisma API, a Next.js dashboard, and an Expo mobile app — API-key security lifecycle, unified receipt routing, and workflow improvements.',
  openGraph: {
    type: 'article',
    title: 'Trackbill — Case Study | Jon Wayne Cabusbusan',
    description:
      'A remote contract case study across three production codebases: API-key hashing with zero-downtime migration, a per-user advisory lock for receipt routing, and web plus mobile delivery with tests in every layer.',
  },
};

export default function TrackbillCaseStudy() {
  if (!caseStudy) notFound();

  return <CaseStudyLayout caseStudy={caseStudy} email={portfolioData.personal.email} />;
}
