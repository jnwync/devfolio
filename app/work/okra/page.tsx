import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyLayout from '@/app/components/CaseStudyLayout';
import { getCaseStudy } from '@/data/caseStudies';
import { portfolioData } from '@/data/portfolio';

const caseStudy = getCaseStudy('okra');

export const metadata: Metadata = {
  title: 'OKRa — Case Study | Jon Wayne Cabusbusan',
  description:
    'Case study: a department-first work-tracking platform built with Next.js, TypeScript, PostgreSQL, Drizzle ORM, Auth.js, secure storage, realtime updates, and automated testing.',
  openGraph: {
    type: 'article',
    title: 'OKRa — Case Study | Jon Wayne Cabusbusan',
    description:
      'A full-stack engineering case study covering work-tracking workflows, authentication, authorization, storage, realtime behavior, and testing.',
  },
};

export default function OkraCaseStudy() {
  if (!caseStudy) notFound();

  return <CaseStudyLayout caseStudy={caseStudy} email={portfolioData.personal.email} />;
}
