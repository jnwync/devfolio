
// PORTFOLIO DATA TYPES

export interface ImpactItem {
  metric: string;
  description: string;
}

export interface ProofPoint {
  value: string;
  label: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: 'contract' | 'freelance' | 'internship' | 'startup' | 'professional' | 'academic';
  period: string;
  startDate: string;
  endDate: string;
  location?: string;
  description: string;
  homepageSummary: string;
  scope: string;
  achievements: string[];
  impact?: ImpactItem[];
  technologies: string[];
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  type: 'freelance' | 'professional' | 'startup' | 'academic';
  period: string;
  startDate: string;
  endDate: string;
  description: string;
  homepageSummary: string;
  homepageOutcome: string;
  context: string;
  responsibility: string;
  outcomes: string[];
  achievements: string[];
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  caseStudyPath?: string;
}

export interface Skill {
  name: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export interface CapabilityGroup {
  title: string;
  summary: string;
  evidence: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  coursework: string[];
}

export interface ContactLink {
  label: string;
  href: string;
  icon: string;
  primary?: boolean;
}

export interface PersonalInfo {
  name: string;
  githubUsername: string;
  tagline: string;
  positioning: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  roles: string[];
  availability: {
    status: 'available' | 'employed' | 'unavailable';
    message: string;
  };
}

export interface PortfolioData {
  personal: PersonalInfo;
  proofPoints: ProofPoint[];
  experiences: Experience[];
  projects: Project[];
  featuredSkills: Skill[];
  skillCategories: SkillCategory[];
  capabilityGroups: CapabilityGroup[];
  education: Education;
  contactLinks: ContactLink[];
}

// =============================================================================
// PORTFOLIO DATA
// =============================================================================

export const portfolioData: PortfolioData = {
  // ---------------------------------------------------------------------------
  // PERSONAL INFORMATION
  // ---------------------------------------------------------------------------
  personal: {
    name: 'Jon Wayne Cabusbusan',
    githubUsername: 'jnwync',
    tagline: 'Production web systems',
    positioning: 'Full-stack developer for products that need to ship.',
    summary: 'I build production web systems across interface, APIs, data, authentication, testing, and deployment — for client teams and product organizations.',
    email: 'jonwayne.cabusbusan@gmail.com',
    phone: '+63 945 289 7584',
    location: 'Iloilo, Philippines',
    bio: 'Full-stack web developer experienced in delivering production-oriented applications across responsive React interfaces, REST APIs, relational and NoSQL databases, authentication, authorization, business workflows, automated testing, and cloud deployment. Strong in TypeScript, Next.js, React, Node.js, PostgreSQL, Drizzle ORM, Prisma, Firebase, and Supabase, with hands-on experience in shared validation contracts, RBAC, secure file handling, real-time collaboration, accessibility, and containerized development.',
    roles: [
      'Full-Stack Web Developer',
      'Next.js / TypeScript Developer',
    ],
    availability: {
      status: 'available',
      message: 'Available for New Opportunities',
    },
  },

  proofPoints: [
    {
      value: 'End-to-end ownership',
      label: 'Interface, APIs, data, authentication, testing, and deployment in one delivery loop',
    },
    {
      value: 'Reliable delivery',
      label: 'Accessible flows, secure defaults, and release-ready checks built into the work',
    },
    {
      value: 'Shipped in context',
      label: 'Client work, product teams, startups, and academic partnerships',
    },
    {
      value: 'Production-minded',
      label: 'Type-safe systems designed to remain understandable after launch',
    },
  ],

  // ---------------------------------------------------------------------------
  // PROFESSIONAL EXPERIENCE
  // ---------------------------------------------------------------------------
  experiences: [
    {
      id: 'okra',
      company: 'Mashup Technology Ventures Inc. - OKRa',
      role: 'Software Engineering Intern / Full-Stack Developer (OJT)',
      type: 'internship',
      period: 'May 2026 - Jul 2026',
      startDate: '2026-05',
      endDate: '2026-07',
      description: 'Internal department-first work tracking platform for workspaces, tickets, workflow columns, cross-department sharing, comments, attachments, invites, and admin oversight.',
      homepageSummary: 'Built a collaborative work-tracking platform with workspace permissions, realtime updates, attachments, and administrative workflows.',
      scope: 'Built and contributed full-stack features across the Next.js App Router, PostgreSQL/Drizzle data model, Auth.js/NextAuth authentication, RBAC, secure attachments, and realtime board updates.',
      achievements: [
        'Built a department-first collaborative work-tracking platform spanning workspaces, workflow columns, tickets, cross-department sharing, comments, labels, activity history, invitations, attachments, and administrative oversight.',
        'Connected frontend, API, and database layers through reusable React workflows, shared TypeScript/Zod contracts, 32 route handlers, PostgreSQL, Drizzle ORM, and 21 database migrations.',
        'Implemented Auth.js credential sessions, session versioning, route protection, role- and workspace-scoped permissions, password and invite flows, database-backed rate limiting, and administrative safeguards.',
        'Integrated S3-compatible attachment and avatar storage with validation, staged persistence, size controls, protected preview/download behavior, missing-object handling, and recovery states.',
        'Authored 83 automated test files covering API routes, database behavior, authentication, responsive UI, accessibility, keyboard interaction, and end-to-end workflows.',
      ],
      impact: [
        { metric: '32', description: 'Current route handlers across frontend and API workflows' },
        { metric: '21', description: 'Database migrations supporting the platform data model' },
        { metric: '83', description: 'Automated test files across API, database, auth, UI, accessibility, and E2E workflows' },
      ],
      technologies: ['Next.js App Router', 'TypeScript', 'React', 'PostgreSQL', 'Drizzle ORM', 'Auth.js/NextAuth', 'Zod', 'SSE'],
    },
    {
      id: 'reisky',
      company: 'Reisky Martial Arts',
      role: 'Freelance Full-Stack Developer',
      type: 'freelance',
      period: 'Jan 2026 - Apr 2026',
      startDate: '2026-01',
      endDate: '2026-04',
      location: 'Surrey, BC, Canada',
      description: 'Solo freelance engagement: a production website and headless-CMS platform for a Filipino martial arts studio.',
      homepageSummary: 'Delivered a production marketing site and CMS platform for a martial arts studio, from content architecture through launch.',
      scope: 'Designed and built a production website end-to-end on Next.js 16, React 19, strict-mode TypeScript, Sanity CMS, GROQ, and a tested dual-source content pipeline.',
      achievements: [
        'Designed and built a production website end-to-end: ~34K LOC across 23 routes, 74 React components, and 6 API route handlers in strict-mode TypeScript on Next.js 16 / React 19.',
        'Architected an env-switched dual data source: 12 service-layer modules route at runtime between Sanity CMS (GROQ) and static fallback data behind a single feature flag.',
        'Built an end-to-end type-safe content pipeline: 50 Sanity schema types to TypeGen to 12 unit-tested anti-corruption mappers to domain types.',
        'Established a 55-test suite and achieved Lighthouse Accessibility 100 across all 12 routes on mobile + desktop, with Best Practices 96 and SEO 92.',
      ],
      impact: [
        { metric: '~34K', description: 'Lines of strict-mode TypeScript' },
        { metric: '100', description: 'Lighthouse Accessibility across all 12 routes' },
        { metric: '55', description: 'Automated tests in the project suite' },
      ],
      technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Sanity CMS', 'GROQ', 'TypeGen'],
    },
    {
      id: 'packup',
      company: 'PackUp - Suppliipack',
      role: 'Full-Stack Developer',
      type: 'startup',
      period: 'Jun 2025 - Nov 2025',
      startDate: '2025-06',
      endDate: '2025-11',
      description: 'Student-led startup project for product, order, and notification workflows in a packaging marketplace.',
      homepageSummary: 'Built product, order, and notification workflows for a packaging marketplace with protected admin operations.',
      scope: 'Built product and order API routes, service-layer logic, admin-only Firebase Admin SDK/RBAC protection, event-driven notifications, and atomic Firestore transaction safeguards.',
      achievements: [
        'Built product and order API routes in Next.js 15 with full CRUD, order placement, updates, deletion, and admin-only Firebase Admin SDK/RBAC protection.',
        'Implemented a service layer for products, orders, and notifications, triggering event-driven notifications across 5 order lifecycle events.',
        'Built an atomic sequential ID generator using Firestore transactions to prevent duplicate IDs under concurrent writes.',
      ],
      impact: [
        { metric: '5', description: 'Order lifecycle events implemented' },
        { metric: 'CRUD', description: 'Product and order API route coverage' },
      ],
      technologies: ['Next.js 15', 'Firebase', 'Firestore', 'Firebase Admin SDK', 'RBAC', 'Node.js'],
    },
    {
      id: 'baylo',
      company: 'DemiGAD - BayloCentral',
      role: 'Full-Stack Developer',
      type: 'startup',
      period: 'Jun 2025 - Nov 2025',
      startDate: '2025-06',
      endDate: '2025-11',
      description: 'Student-led startup marketplace platform for MSMEs, covering browsing flows, social feed interactions, cart functionality, and seller dashboard contributions.',
      homepageSummary: 'Built marketplace browsing, social feed, cart, and seller workflows for an MSME commerce platform.',
      scope: 'Built marketplace browsing, social feed interactions, cart behavior, and seller dashboard pieces for an MSME e-commerce platform.',
      achievements: [
        'Built marketplace browsing flows — product listings, category navigation, detail pages, search, autocomplete, and filters — using Next.js 15, Prisma ORM, PostgreSQL, and SWR.',
        'Developed a social feed supporting 4 post formats with likes, comments, shares, and real-time updates; enforced duplicate-action prevention via database constraints.',
        'Built cart functionality and contributed to the seller dashboard within a domain-sliced React 19 / Radix UI component architecture.',
      ],
      impact: [
        { metric: '4', description: 'Social feed post formats supported' },
        { metric: 'React 19', description: 'Domain-sliced component architecture' },
      ],
      technologies: ['Next.js 15', 'React 19', 'PostgreSQL', 'Prisma ORM', 'SWR', 'Radix UI'],
    },
    {
      id: 'apollo',
      company: 'Wisdomous Inc. - Apollo Medical Group',
      role: 'Full-Stack Developer',
      type: 'professional',
      period: 'Jan 2025 - May 2025',
      startDate: '2025-01',
      endDate: '2025-05',
      description: 'Patient portal and hospital booking web application for healthcare facility management.',
      homepageSummary: 'Led frontend delivery and backend improvements for a patient portal and hospital booking system.',
      scope: 'Led patient portal and hospital booking UI work while supporting backend refactors and database improvements in a two-developer team.',
      achievements: [
        'Led frontend development of a patient portal and hospital booking system, delivering responsive UI/UX for patients and admin staff.',
        'Refactored backend logic and optimized database structure, reducing load times and improving reliability for high-volume booking operations.',
        'Shipped to production as part of a 2-developer agile team, contributing to design discussions, sprint reviews, and end-to-end QA.',
      ],
      impact: [
        { metric: '2', description: 'Developer agile delivery team' },
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    },
    {
      id: 'dti',
      company: 'DTI Iloilo - MSME Industry Map',
      role: 'Full-Stack Developer',
      type: 'academic',
      period: 'Aug 2024 - May 2025',
      startDate: '2024-08',
      endDate: '2025-05',
      location: 'Iloilo, Philippines',
      description: 'Government-backed interactive MSME map for Iloilo, enabling DTI admins to register, visualize, and monitor regional businesses.',
      homepageSummary: 'Built map, admin, and API workflows for an MSME industry map delivered with an external government client.',
      scope: 'Developed MSME and user management APIs, GeoJSON map data delivery, role-based API access, an interactive MSME map, and an admin dashboard for an external academic client partnership.',
      achievements: [
        'Developed MSME and user management API routes in Next.js 14 and a GeoJSON endpoint for Iloilo map data, built on reusable Firestore utility abstractions.',
        'Applied role-based access control at the API layer with end-to-end TypeScript safety and Zod validation.',
        'Built an interactive MSME map and admin dashboard with Tailwind CSS, Recharts, and shadcn.',
      ],
      impact: [
        { metric: 'GeoJSON', description: 'Endpoint for Iloilo map data' },
        { metric: 'RBAC', description: 'Role-based access control at the API layer' },
      ],
      technologies: ['Next.js 14', 'Firebase Firestore', 'TypeScript', 'Zod', 'REST APIs', 'Tailwind CSS', 'Recharts', 'shadcn'],
    },
  ],

  // ---------------------------------------------------------------------------
  // PROJECTS
  // ---------------------------------------------------------------------------
  projects: [
    {
      id: 'reisky',
      title: 'Reisky — Filipino Martial Arts Studio Platform',
      type: 'freelance',
      period: 'Jan 2026 - Apr 2026',
      startDate: '2026-01',
      endDate: '2026-04',
      description: 'International client project for Reisky Martial Arts in Surrey, BC, Canada.',
      homepageSummary: 'A production website and headless-CMS platform designed and built end-to-end for a Filipino martial arts studio.',
      homepageOutcome: 'Gave the client a maintainable content system with a tested fallback path and Lighthouse Accessibility 100 across all routes.',
      context: 'Production website and headless-CMS platform for a Filipino martial arts studio, designed and built end-to-end as a freelance client project.',
      responsibility: 'Designed and built the site across 23 routes, 74 React components, and 6 API route handlers in strict-mode TypeScript on Next.js 16 / React 19.',
      outcomes: [
        'Architected an env-switched dual data source: 12 service-layer modules route at runtime between Sanity CMS (GROQ) and static fallback data behind a single feature flag.',
        'Built an end-to-end type-safe content pipeline: 50 Sanity schema types to TypeGen to 12 unit-tested anti-corruption mappers to domain types.',
        'Established a 55-test suite and achieved Lighthouse Accessibility 100 across all 12 routes on mobile + desktop, with Best Practices 96 and SEO 92.',
      ],
      achievements: [
        'Designed and built a production website end-to-end: ~34K LOC across 23 routes, 74 React components, and 6 API route handlers in strict-mode TypeScript on Next.js 16 / React 19.',
        'Architected an env-switched dual data source across 12 service-layer modules for Sanity CMS (GROQ) and static fallback data.',
        'Built a type-safe content pipeline from 50 Sanity schema types through TypeGen and 12 unit-tested anti-corruption mappers.',
        'Established a 55-test suite and achieved Lighthouse Accessibility 100 across all 12 routes on mobile + desktop, with Best Practices 96 and SEO 92.',
      ],
      technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Sanity CMS', 'GROQ', 'TypeGen'],
      image: '/images/projects/reisky-home.png',
      caseStudyPath: '/work/reisky',
    },
    {
      id: 'okra',
      title: 'OKRa — Internal Work Tracking Platform',
      type: 'professional',
      period: 'May 2026 - Jul 2026',
      startDate: '2026-05',
      endDate: '2026-07',
      description: 'OJT internship project at Mashup Technology Ventures Inc. - OKRa.',
      homepageSummary: 'A department-first work-tracking platform for tickets, collaboration, attachments, and admin oversight.',
      homepageOutcome: 'Connected frontend, API, database, authentication, and storage layers into one tested internal product.',
      context: 'Department-first collaborative work-tracking platform with workspaces, workflow columns, tickets, cross-department sharing, comments, labels, activity history, invitations, attachments, and administrative oversight.',
      responsibility: 'Connected reusable React workflows, shared TypeScript/Zod contracts, 32 route handlers, PostgreSQL, Drizzle ORM, Auth.js/NextAuth, secure storage, and realtime board updates.',
      outcomes: [
        'Connected frontend, API, and database layers through 21 migrations and shared TypeScript/Zod contracts.',
        'Implemented Auth.js sessions, session versioning, route protection, scoped permissions, invite/password flows, rate limiting, and admin safeguards.',
        'Integrated S3-compatible attachments and avatar storage, SSE/Postgres LISTEN/NOTIFY updates, and 83 automated test files.',
      ],
      achievements: [
        'Built a department-first collaborative work-tracking platform spanning workspaces, workflow columns, tickets, cross-department sharing, comments, labels, activity history, invitations, attachments, and administrative oversight.',
        'Connected frontend, API, and database layers through reusable React workflows, shared TypeScript/Zod contracts, 32 route handlers, PostgreSQL, Drizzle ORM, and 21 database migrations.',
        'Authored 83 automated test files covering API routes, database behavior, authentication, responsive UI, accessibility, keyboard interaction, and end-to-end workflows.',
      ],
      technologies: ['Next.js App Router', 'TypeScript', 'React', 'PostgreSQL', 'Drizzle ORM', 'Zod', 'Auth.js/NextAuth', 'SSE'],
      caseStudyPath: '/work/okra',
    },
    {
      id: 'packup',
      title: 'PackUp (Suppliipack) — Packaging Marketplace',
      type: 'startup',
      period: 'Jun 2025 - Nov 2025',
      startDate: '2025-06',
      endDate: '2025-11',
      description: 'Student-led startup project focused on product, order, and notification workflows.',
      homepageSummary: 'Product, order, and notification workflows for a packaging marketplace.',
      homepageOutcome: 'Protected admin operations and transaction-safe order workflows supported a dependable marketplace foundation.',
      context: 'Marketplace platform work for products, orders, notifications, admin-only access, and Firestore-backed operations.',
      responsibility: 'Built product and order API routes in Next.js 15 with CRUD, order placement, updates, deletion, and Firebase Admin SDK/RBAC protection.',
      outcomes: [
        'Implemented a service layer for products, orders, and notifications.',
        'Triggered event-driven notifications across 5 order lifecycle events.',
        'Used Firestore transactions to prevent duplicate sequential IDs under concurrent writes.',
      ],
      achievements: [
        'Built product and order API routes in Next.js 15 with full CRUD and admin-only Firebase Admin SDK/RBAC protection.',
        'Implemented service-layer logic for products, orders, and notifications across 5 lifecycle events.',
        'Used Firestore transactions for atomic sequential ID generation under concurrent writes.',
      ],
      technologies: ['Next.js 15', 'Firebase Admin SDK', 'Firestore', 'RBAC', 'REST APIs'],
    },
    {
      id: 'baylo',
      title: 'DemiGAD (BayloCentral) — MSME Marketplace',
      type: 'startup',
      period: 'Jun 2025 - Nov 2025',
      startDate: '2025-06',
      endDate: '2025-11',
      description: 'Student-led startup marketplace for MSME browsing, social feed, cart, and seller dashboard workflows.',
      homepageSummary: 'Marketplace browsing, social feed, cart, and seller dashboard work for an MSME commerce platform.',
      homepageOutcome: 'Shipped practical commerce flows with search, realtime interactions, and database-backed safeguards.',
      context: 'E-commerce and marketplace flows for listings, category navigation, detail pages, search, autocomplete, filters, social feed interactions, cart, and seller dashboard work.',
      responsibility: 'Built marketplace browsing flows using Next.js 15, Prisma ORM, PostgreSQL, and SWR, and contributed React 19 / Radix UI component architecture.',
      outcomes: [
        'Developed a social feed supporting 4 post formats with likes, comments, shares, and real-time updates.',
        'Enforced duplicate-action prevention via database constraints.',
        'Built cart functionality and contributed to the seller dashboard within a domain-sliced component architecture.',
      ],
      achievements: [
        'Built product listings, category navigation, detail pages, search, autocomplete, and filters using Next.js 15, Prisma ORM, PostgreSQL, and SWR.',
        'Developed social feed interactions for 4 post formats with real-time updates and database-backed duplicate-action prevention.',
        'Built cart functionality and seller dashboard pieces with React 19 and Radix UI.',
      ],
      technologies: ['Next.js 15', 'React 19', 'Prisma ORM', 'PostgreSQL', 'SWR', 'Radix UI'],
    },
    {
      id: 'apollo',
      title: 'Apollo Medical Group — Patient Portal and Booking System',
      type: 'professional',
      period: 'Jan 2025 - May 2025',
      startDate: '2025-01',
      endDate: '2025-05',
      description: 'Project-based full-stack development work for Wisdomous Inc. and Apollo Medical Group.',
      homepageSummary: 'Patient portal and hospital booking work delivered in a small agile product team.',
      homepageOutcome: 'Improved booking reliability and patient/admin usability through frontend leadership and backend refactoring.',
      context: 'Patient portal and hospital booking system serving patients and admin staff.',
      responsibility: 'Led frontend development, contributed backend refactors, optimized database structure, and supported end-to-end QA in a 2-developer agile team.',
      outcomes: [
        'Delivered responsive UI/UX for patients and admin staff.',
        'Refactored backend logic and optimized database structure to improve page responsiveness, booking reliability, and maintainability.',
        'Shipped to production as part of a 2-developer agile team with end-to-end QA.',
      ],
      achievements: [
        'Led frontend development of the patient portal and hospital booking system.',
        'Improved backend logic and database structure for booking reliability.',
        'Contributed to design discussions, sprint reviews, and end-to-end QA.',
      ],
      technologies: ['Responsive UI/UX', 'Backend Refactoring', 'Database Optimization', 'End-to-End QA'],
    },
    {
      id: 'dti',
      title: 'DTI Iloilo MSME Industry Map',
      type: 'academic',
      period: 'Aug 2024 - May 2025',
      startDate: '2024-08',
      endDate: '2025-05',
      description: 'Academic client project through an external client partnership via Central Philippine University.',
      homepageSummary: 'Built map, admin, and API workflows for an MSME industry map delivered with an external government client.',
      homepageOutcome: 'Turned geographic and administrative data into usable map, management, and approval workflows.',
      context: 'Interactive MSME map and admin dashboard for Iloilo map data, MSME management, user management, and API-layer access control.',
      responsibility: 'Developed MSME and user management API routes, GeoJSON delivery, reusable Firestore utility abstractions, runtime validation, API-layer RBAC, and account-approval workflows.',
      outcomes: [
        'Built a GeoJSON endpoint for Iloilo map data.',
        'Applied role-based access control at the API layer with end-to-end TypeScript safety and Zod validation.',
        'Built an interactive MSME map and admin dashboard with Tailwind CSS, Recharts, and shadcn.',
      ],
      achievements: [
        'Built an interactive geographic information system for browsing and managing Iloilo MSMEs, including map markers, filters, administrative forms, user management, and statistical dashboards.',
        'Developed REST APIs, GeoJSON delivery, Firestore abstractions, runtime validation, API-layer RBAC, and account-approval workflows.',
        'Delivered map and admin dashboard UI with Tailwind CSS, Recharts, and shadcn.',
      ],
      technologies: ['Next.js 14', 'Firestore', 'GeoJSON', 'TypeScript', 'Zod', 'Tailwind CSS', 'Recharts', 'shadcn'],
    },
  ],

  // ---------------------------------------------------------------------------
  // FEATURED SKILLS (shown in main skills section)
  // ---------------------------------------------------------------------------
  featuredSkills: [
    { name: 'TypeScript' },
    { name: 'Next.js' },
    { name: 'React' },
    { name: 'PostgreSQL' },
    { name: 'Drizzle ORM' },
    { name: 'Node.js' },
  ],

  // ---------------------------------------------------------------------------
  // SKILL CATEGORIES
  // ---------------------------------------------------------------------------
  skillCategories: [
    {
      title: 'Languages',
      description: 'Core programming languages',
      skills: [
        { name: 'TypeScript' },
        { name: 'JavaScript (ES6+)' },
        { name: 'HTML5' },
        { name: 'CSS3' },
        { name: 'SQL' },
      ],
    },
    {
      title: 'Frontend',
      description: 'Modern UI frameworks and libraries',
      skills: [
        { name: 'Next.js' },
        { name: 'React' },
        { name: 'React Native' },
        { name: 'Tailwind CSS v4' },
        { name: 'Radix UI' },
        { name: 'Framer Motion' },
        { name: 'SWR' },
        { name: 'CVA' },
        { name: 'Axios' },
      ],
    },
    {
      title: 'Backend',
      description: 'Server-side technologies and APIs',
      skills: [
        { name: 'Node.js' },
        { name: 'Express.js' },
        { name: 'REST APIs' },
        { name: 'Next.js API Routes' },
        { name: 'Zod' },
        { name: 'Server-Sent Events' },
        { name: 'Nodemailer' },
      ],
    },
    {
      title: 'Authentication and security',
      description: 'Identity, authorization, session, and application safeguards',
      skills: [
        { name: 'Auth.js/NextAuth' },
        { name: 'Firebase Auth' },
        { name: 'Supabase Auth' },
        { name: 'JWT' },
        { name: 'OAuth 2.0' },
        { name: 'RBAC' },
        { name: 'Session management' },
        { name: 'Rate limiting' },
      ],
    },
    {
      title: 'CMS & Data',
      description: 'CMS, query, ORM, relational, and document data tools',
      skills: [
        { name: 'Sanity CMS' },
        { name: 'GROQ' },
        { name: 'PostgreSQL' },
        { name: 'Drizzle ORM' },
        { name: 'Prisma ORM' },
        { name: 'Firebase Firestore' },
        { name: 'Firebase Realtime DB' },
      ],
    },
    {
      title: 'Testing & DevOps',
      description: 'Quality assurance, deployment, and operations tooling',
      skills: [
        { name: 'Vitest' },
        { name: 'Playwright' },
        { name: 'Node test runner' },
        { name: 'Jest' },
        { name: 'React Testing Library' },
        { name: 'Postman' },
        { name: 'ESLint' },
        { name: 'Lighthouse' },
        { name: 'Git/GitHub' },
        { name: 'GitHub Actions (CI/CD)' },
        { name: 'Docker' },
        { name: 'Docker Compose' },
        { name: 'Vercel' },
        { name: 'Husky' },
        { name: 'Sentry' },
        { name: 'MinIO' },
      ],
    },
    {
      title: 'Practices',
      description: 'Engineering practices and product-quality concerns',
      skills: [
        { name: 'RBAC' },
        { name: 'API Validation' },
        { name: 'Service layers' },
        { name: 'Database migrations' },
        { name: 'Shared contracts' },
        { name: 'Accessibility/WCAG' },
        { name: 'SEO' },
        { name: 'RESTful API Design' },
        { name: 'Responsive Web Design' },
        { name: 'UI/UX Principles' },
        { name: 'CI/CD' },
        { name: 'Agile/Scrum' },
        { name: 'TDD' },
      ],
    },
  ],

  capabilityGroups: [
    {
      title: 'Frontend systems',
      summary: 'Responsive UIs, marketplace browsing flows, patient/admin portals, interactive maps, and component architecture in the Next.js/React ecosystem.',
      evidence: 'Built interfaces for OKRa, Reisky, Apollo Medical Group, PackUp, DemiGAD, and the DTI Iloilo MSME Industry Map.',
      skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      title: 'Backend and APIs',
      summary: 'REST APIs, Next.js API routes, authentication, RBAC, service layers, event-driven notifications, and API validation.',
      evidence: 'Implemented OKRa RBAC/session validation, PackUp product/order APIs, DTI API-layer access control, and Baylo marketplace data flows.',
      skills: ['Node.js', 'REST APIs', 'Zod', 'SSE'],
    },
    {
      title: 'Authentication and security',
      summary: 'Credential sessions, role- and workspace-scoped authorization, ownership checks, rate limiting, and protected file workflows.',
      evidence: 'Implemented OKRa session versioning and RBAC, PackUp Firebase Admin safeguards, and API-layer access control for DTI.',
      skills: ['Auth.js/NextAuth', 'Firebase Auth', 'RBAC', 'Rate limiting'],
    },
    {
      title: 'CMS and data',
      summary: 'PostgreSQL/Drizzle domain models, Prisma-backed marketplace data, Firebase Firestore utilities, and Sanity CMS/GROQ content pipelines.',
      evidence: 'Built Reisky’s 50-schema Sanity pipeline, OKRa PostgreSQL/Drizzle features, Baylo Prisma/PostgreSQL flows, and DTI Firestore-backed map APIs.',
      skills: ['PostgreSQL', 'Drizzle ORM', 'Sanity CMS', 'Firestore'],
    },
    {
      title: 'Delivery and quality',
      summary: 'Testing, accessibility, SEO, secure file handling, cloud deployment, and production-minded QA.',
      evidence: 'Established a 55-test Reisky suite, contributed to OKRa’s 83-file test suite, and shipped Apollo Medical Group to production in a 2-developer agile team.',
      skills: ['Vitest', 'Playwright', 'Lighthouse', 'ESLint'],
    },
  ],

  // ---------------------------------------------------------------------------
  // EDUCATION
  // ---------------------------------------------------------------------------
  education: {
    degree: 'B.S. Software Engineering',
    institution: 'Central Philippine University',
    year: '2021 - 2026',
    coursework: [
      'Data Structures',
      'Algorithms',
      'Web Application Development',
      'Database Systems',
      'Software Architecture',
      'Software Development I-III',
      'Software Testing',
      'Software Quality Management',
      'Network Protocols',
      'Machine Learning',
      'Engineering Data Analysis',
    ],
  },

  // ---------------------------------------------------------------------------
  // CONTACT LINKS
  // ---------------------------------------------------------------------------
  contactLinks: [
    {
      label: 'Email',
      href: 'mailto:jonwayne.cabusbusan@gmail.com',
      icon: 'mail',
      primary: true,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/jnwync',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jnwync/',
      icon: 'linkedin',
    },
    {
      label: 'Phone',
      href: 'tel:+639452897584',
      icon: 'phone',
    },
  ],
};

// UTILITY FUNCTIONS

export const getExperienceById = (id: string): Experience | undefined => {
  return portfolioData.experiences.find((exp) => exp.id === id);
};

export const getProjectById = (id: string): Project | undefined => {
  return portfolioData.projects.find((proj) => proj.id === id);
};

export const getSkillsByCategory = (categoryTitle: string): Skill[] => {
  const category = portfolioData.skillCategories.find(
    (cat) => cat.title.toLowerCase() === categoryTitle.toLowerCase()
  );
  return category?.skills || [];
};

export const getPrimaryContacts = (): ContactLink[] => {
  return portfolioData.contactLinks.filter((contact) => contact.primary);
};

export const getSecondaryContacts = (): ContactLink[] => {
  return portfolioData.contactLinks.filter((contact) => !contact.primary);
};

export const getTopSkills = (limit: number = 6): Skill[] => {
  return portfolioData.featuredSkills.slice(0, limit);
};

export const getExperienceByType = (
  type: Experience['type']
): Experience[] => {
  return portfolioData.experiences.filter((exp) => exp.type === type);
};

export const getRecentExperience = (limit: number = 3): Experience[] => {
  return portfolioData.experiences.slice(0, limit);
};

export const getProjectsByType = (
  type: Project['type']
): Project[] => {
  return portfolioData.projects.filter((proj) => proj.type === type);
};
