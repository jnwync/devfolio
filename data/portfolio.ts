
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
  type: 'contract' | 'freelance' | 'internship' | 'academic';
  period: string;
  startDate: string;
  endDate: string;
  location?: string;
  description: string;
  scope: string;
  achievements: string[];
  impact?: ImpactItem[];
  technologies: string[];
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  type: 'freelance' | 'personal' | 'academic';
  period: string;
  startDate: string;
  endDate: string;
  description: string;
  context: string;
  responsibility: string;
  outcomes: string[];
  achievements: string[];
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  featured?: boolean;
  caseStudyPath?: string;
}

export interface Skill {
  name: string;
  proficiency: number;
  yearsUsed: number;
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
    tagline: 'Full-Stack Web Developer',
    positioning: 'Full-stack engineer for production web systems people rely on.',
    summary: 'I build responsive interfaces, API surfaces, and data workflows across government, healthcare, e-commerce, and marketplace products, with enough range to move from architecture through deployment. I work spec-first and use modern AI-assisted tooling to move quickly, keeping automated tests and code review as the quality gate.',
    email: 'jonwayne.cabusbusan@gmail.com',
    phone: '+639452897584',
    location: 'Iloilo, Philippines',
    bio: 'Full-stack web developer with hands-on experience shipping production-grade applications across government, e-commerce, healthcare, and marketplace platforms. Proficient in the Next.js / TypeScript ecosystem end-to-end — from building responsive UIs with React and Tailwind CSS to designing RESTful APIs, managing relational and NoSQL databases, and deploying to cloud platforms. Comfortable contributing independently from architecture through deployment in agile, cross-functional teams. Works in a disciplined, AI-assisted workflow — specification-driven development, MCP-enabled tooling, and structured planning, with automated testing, code review, and human validation kept as the quality gate — to improve delivery speed without trading away code quality or maintainability.',
    roles: [
      'Full-Stack Web Developer',
      'React & Next.js Specialist',
    ],
    availability: {
      status: 'available',
      message: 'Available for New Opportunities',
    },
  },

  proofPoints: [
    {
      value: '4 product domains',
      label: 'Government, healthcare, e-commerce, and marketplace platforms',
    },
    {
      value: 'Frontend to deployment',
      label: 'Next.js and React UIs, REST APIs, relational and document data, and cloud delivery',
    },
    {
      value: 'Production delivery',
      label: 'Architecture to launch with a spec-driven, AI-assisted workflow and human review at every gate',
    },
    {
      value: 'Iloilo, Philippines',
      label: 'Available for remote, hybrid, contract, and full-time conversations',
    },
  ],

  // ---------------------------------------------------------------------------
  // PROFESSIONAL EXPERIENCE
  // ---------------------------------------------------------------------------
  experiences: [
    {
      id: 'reisky',
      company: 'Reisky Martial Arts',
      role: 'Freelance Full-Stack Developer',
      type: 'freelance',
      period: 'Jan 2026 - Mar 2026',
      startDate: '2026-01',
      endDate: '2026-03',
      location: 'Remote · Surrey, BC',
      description: 'Solo freelance engagement: a production website and headless-CMS platform for a Filipino martial arts studio.',
      scope: 'Sole architect, designer, and developer — design system through data layer, on Next.js 16 and Sanity, deploying on Vercel.',
      achievements: [
        'Architected an env-switched dual data source so the site ships on static data and adopts the Sanity CMS as a zero-downtime feature flag — no rewrite, no big-bang cutover.',
        'Drove the product to Lighthouse Accessibility 100 across all 12 routes (mobile and desktop) against WCAG 2.1 AA, backed by a 55-test unit and E2E suite.',
      ],
      impact: [
        { metric: '100', description: 'Accessibility score across all 12 routes (mobile + desktop)' },
        { metric: 'Solo', description: 'Sole architect, designer, and developer' },
      ],
      technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Sanity CMS', 'GROQ', 'Vercel'],
      link: 'https://reisky.vercel.app',
    },
    {
      id: 'packup',
      company: 'PackUp - Suppliipack',
      role: 'Full-Stack Developer',
      type: 'contract',
      period: 'Jun 2025 - Nov 2025',
      startDate: '2025-06',
      endDate: '2025-11',
      location: 'Hybrid',
      description: 'Mobile-first web application enabling MSMEs to access wholesale packaging at reduced minimum order quantities (MOQs). Concurrent contract engagement alongside BayloCentral (Jun-Nov 2025).',
      scope: 'Owned product/order APIs, role-aware admin flows, Firestore data operations, uploads, and lifecycle notifications for a packaging marketplace.',
      achievements: [
        'Built product and order API routes in Next.js 15 (full CRUD) with Firebase Admin SDK token verification and RBAC, enforcing admin vs. msme_user role separation',
        'Implemented a service layer encapsulating Firestore CRUD and triggering event-driven notifications across 5 order lifecycle events (NEW_ORDER_PLACED, PAYMENT_VERIFIED, ORDER_SHIPPED)',
        'Built an atomic sequential ID generator using Firestore transactions (ORD-00001 format) to prevent duplicate IDs under concurrent writes without external queue/lock',
        'Integrated Firebase Storage for image and payment screenshot uploads; centralized Firestore timestamp serialization via dedicated dataTransformers.ts utility',
      ],
      impact: [
        { metric: '5', description: 'Order lifecycle events implemented' },
        { metric: '100%', description: 'Atomic ID generation with Firestore transactions' },
      ],
      technologies: ['Next.js 15', 'Firebase', 'Firestore', 'Firebase Admin SDK', 'RBAC', 'Node.js'],
    },
    {
      id: 'baylo',
      company: 'DemiGAD - BayloCentral',
      role: 'Full-Stack Developer',
      type: 'contract',
      period: 'Jun 2025 - Nov 2025',
      startDate: '2025-06',
      endDate: '2025-11',
      location: 'Hybrid',
      description: 'Next.js 15 + PostgreSQL e-commerce platform for MSMEs, covering product listings, cart, checkout, and a social feed with real-time updates. Concurrent contract engagement alongside PackUp (Jun-Nov 2025).',
      scope: 'Built marketplace browsing, social feed interactions, cart behavior, and seller dashboard pieces for an MSME e-commerce platform.',
      achievements: [
        'Built the full marketplace browsing experience — product listings, category navigation, detail pages, and search with autocomplete and filters using Next.js 15, Prisma ORM, PostgreSQL, and SWR',
        'Developed a social feed supporting 4 post formats (text, photo, video, event) with likes, comments, shares, and real-time updates; enforced duplicate-action prevention via unique constraints',
        'Built cart functionality and contributed to seller dashboard within a domain-sliced component architecture using React 19, SWR, and Radix UI, separating data-fetching from rendering layers',
      ],
      impact: [
        { metric: '4', description: 'Post formats supported (text, photo, video, event)' },
        { metric: '6', description: 'Versioned DB migrations in production' },
      ],
      technologies: ['Next.js 15', 'React 19', 'PostgreSQL', 'Supabase', 'Prisma', 'SWR', 'Radix UI'],
    },
    {
      id: 'apollo',
      company: 'Wisdomous Inc. - Apollo Medical Group',
      role: 'Full-Stack Developer',
      type: 'contract',
      period: 'Jan 2025 - May 2025',
      startDate: '2025-01',
      endDate: '2025-05',
      location: 'Remote',
      description: 'Patient portal and hospital booking web application for healthcare facility management.',
      scope: 'Led patient portal and hospital booking UI work while supporting backend refactors and database improvements in a two-developer team.',
      achievements: [
        'Led frontend development of patient portal and hospital booking system — delivering responsive UI/UX serving both patients and admin staff',
        'Refactored backend logic and optimized database structure, measurably reducing load times and enabling reliable performance under high-volume booking operations',
        'Shipped to production as part of a 2-developer agile team, contributing to design discussions, sprint reviews, and end-to-end QA',
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
      scope: 'Built government-backed MSME mapping workflows, admin management, GeoJSON data delivery, and role-based API protection.',
      achievements: [
        'Developed MSME and user management API routes in Next.js 14 (full CRUD with joined address data) and a GeoJSON endpoint for Iloilo map data, built on reusable Firestore utility abstractions',
        'Applied role-based access control (superadmin / admin) at the API layer with end-to-end TypeScript type safety and Zod validation on all form inputs',
        'Built the interactive MSME map (markers, filters, detail panels) and admin dashboard covering MSME management, Recharts statistics, and user management using Next.js App Router, Tailwind CSS, and shadcn',
      ],
      impact: [
        { metric: '3', description: 'Access tiers with approval workflows (superadmin, admin, viewer)' },
        { metric: '100%', description: 'TypeScript & Zod coverage across API routes and forms' },
      ],
      technologies: ['Next.js', 'Firebase Firestore', 'Google Maps API', 'TypeScript', 'Zod', 'REST APIs', 'shadcn'],
    },
  ],

  // ---------------------------------------------------------------------------
  // PROJECTS
  // ---------------------------------------------------------------------------
  projects: [
    {
      id: 'devfolio',
      title: 'Devfolio — Personal Portfolio',
      type: 'personal',
      period: 'Jan 2026 - Present',
      startDate: '2026-01',
      endDate: '2026-02',
      description: 'Fully custom portfolio built from scratch with a focus on accessibility, a production-grade design system, and a centralized data architecture — no templates used.',
      context: 'A personal portfolio that needs to work as a recruiter scan, a technical proof surface, and a polished professional identity.',
      responsibility: 'Designed and implemented the full app, including content architecture, typed portfolio data, theme tokens, accessibility affordances, and motion behavior.',
      outcomes: [
        'Centralized the portfolio content into a typed data source so sections can change without component rewrites.',
        'Built a WCAG-minded one-page flow with skip navigation, section labels, reduced-motion handling, and semantic landmarks.',
        'Used Next.js 16, React 19, Tailwind v4, and Framer Motion to create a production-ready personal site.',
      ],
      achievements: [
        'Built on Next.js 16 App Router and React 19 with Tailwind v4, using an oklch-based design token system covering full light/dark mode, semantic color roles, and smooth 200ms theme transitions with no FOUC',
        'Achieved WCAG 2.1 compliance throughout — skip-to-content link, aria-labelledby on every section, aria-live on dynamic content, and prefers-reduced-motion support across all Framer Motion animations',
        'Centralized all content in a single typed data file (portfolio.ts) with domain interfaces and utility functions, so every section updates from one place without touching component code',
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'WCAG 2.1'],
      image: '/images/projects/devfolio-home.png',
      featured: false,
    },
    {
      id: 'reisky',
      title: 'Reisky — Filipino Martial Arts Studio Platform',
      type: 'freelance',
      period: 'Jan 2026 - Mar 2026',
      startDate: '2026-01',
      endDate: '2026-03',
      description: 'Solo freelance build of a production website and headless-CMS platform for a Filipino martial arts studio (Surrey, BC), architected around an env-switched dual data source so the site ships on static data and adopts a live Sanity CMS as a zero-downtime feature flag.',
      context: 'A real client engagement: the studio needed editable content, but the site had to ship before any CMS was provisioned. Sole architect, designer, and developer — design system through data layer.',
      responsibility: 'Owned the full stack end-to-end — brand and design system, a 74-component library, the env-switched service layer, a typed Sanity/GROQ content pipeline, 6 API routes, and production hardening — deploying on Vercel.',
      outcomes: [
        'Env-switched dual data layer: 12 service modules route at runtime between a live Sanity CMS (GROQ) and static fallback data behind one flag — CMS adoption is a zero-downtime config change, not a rewrite.',
        'End-to-end type safety: 50 Sanity schema types → TypeGen → 12 unit-tested anti-corruption mappers → hand-authored domain types, keeping the CMS shape out of application code.',
        'Accessibility 100 across all 12 routes (mobile + desktop), Best Practices 96, SEO 92 — verified by a Lighthouse audit sweep against WCAG 2.1 AA.',
        'Designed the brand and token-driven design system (74 components) and engineered 6 API routes, a Stripe webhook, Sentry across 3 runtimes, and a 55-test unit + E2E suite.',
      ],
      achievements: [
        'Architected an env-switched dual data source: 10 of 12 services route at runtime between a GROQ-backed Sanity CMS and static fallback data behind a single feature flag, making CMS adoption a zero-downtime, type-safe config change rather than a rewrite.',
        'Built an end-to-end type-safe content pipeline (Sanity schema extract → TypeGen → 1,547 LOC of generated types → 12 unit-tested anti-corruption mappers → domain types), with an embedded Sanity Studio and live visual editing.',
        'Implemented 6 API route handlers (contact, free-trial, booking, Stripe webhook, draft-mode toggling) with server-side validation and honeypot spam protection; instrumented Sentry across client, server, and edge runtimes.',
        'Drove the product to Lighthouse Accessibility 100 across all 12 routes on mobile and desktop by remediating WCAG 2.1 AA issues (contrast, heading order, ARIA table semantics, Label-in-Name, target size); enforced a zero-warning ESLint + strict-type + pre-commit toolchain over ~34k LOC.',
      ],
      technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Sanity CMS', 'GROQ', 'Tailwind CSS v4', 'Stripe', 'Playwright', 'Vitest', 'Sentry'],
      link: 'https://reisky.vercel.app',
      image: '/images/projects/reisky-home.png',
      featured: true,
      caseStudyPath: '/work/reisky',
    },
  ],

  // ---------------------------------------------------------------------------
  // FEATURED SKILLS (shown in main skills section)
  // ---------------------------------------------------------------------------
  featuredSkills: [
    { name: 'TypeScript', proficiency: 90, yearsUsed: 2 },
    { name: 'Next.js', proficiency: 90, yearsUsed: 2 },
    { name: 'React', proficiency: 90, yearsUsed: 2 },
    { name: 'TailwindCSS', proficiency: 90, yearsUsed: 2 },
  ],

  // ---------------------------------------------------------------------------
  // SKILL CATEGORIES
  // ---------------------------------------------------------------------------
  skillCategories: [
    {
      title: 'Languages',
      description: 'Core programming languages',
      skills: [
        { name: 'TypeScript', proficiency: 90, yearsUsed: 2 },
        { name: 'JavaScript (ES6+)', proficiency: 90, yearsUsed: 3 },
        { name: 'HTML5', proficiency: 90, yearsUsed: 3 },
        { name: 'CSS3', proficiency: 85, yearsUsed: 3 },
        { name: 'SQL', proficiency: 80, yearsUsed: 2 },
      ],
    },
    {
      title: 'Frontend',
      description: 'Modern UI frameworks and libraries',
      skills: [
        { name: 'Next.js', proficiency: 90, yearsUsed: 2 },
        { name: 'React', proficiency: 90, yearsUsed: 2 },
        { name: 'React Native', proficiency: 75, yearsUsed: 1 },
        { name: 'TailwindCSS', proficiency: 90, yearsUsed: 2 },
        { name: 'shadcn/ui', proficiency: 85, yearsUsed: 1 },
        { name: 'Radix UI', proficiency: 80, yearsUsed: 1 },
        { name: 'Framer Motion', proficiency: 80, yearsUsed: 1 },
        { name: 'CVA', proficiency: 80, yearsUsed: 1 },
        { name: 'SWR', proficiency: 75, yearsUsed: 1 },
        { name: 'Axios', proficiency: 80, yearsUsed: 2 },
        { name: 'React Server Components', proficiency: 85, yearsUsed: 1 },
        { name: 'Static Generation (SSG)', proficiency: 85, yearsUsed: 1 },
      ],
    },
    {
      title: 'Backend',
      description: 'Server-side technologies and APIs',
      skills: [
        { name: 'Node.js', proficiency: 80, yearsUsed: 2 },
        { name: 'Express.js', proficiency: 75, yearsUsed: 2 },
        { name: 'REST APIs', proficiency: 85, yearsUsed: 2 },
        { name: 'WebSockets (Socket.IO)', proficiency: 70, yearsUsed: 1 },
        { name: 'JWT', proficiency: 80, yearsUsed: 2 },
        { name: 'OAuth 2.0', proficiency: 75, yearsUsed: 1 },
      ],
    },
    {
      title: 'Databases',
      description: 'Relational and NoSQL data stores',
      skills: [
        { name: 'PostgreSQL (Supabase)', proficiency: 80, yearsUsed: 2 },
        { name: 'Prisma ORM', proficiency: 80, yearsUsed: 2 },
        { name: 'Firebase Firestore', proficiency: 75, yearsUsed: 2 },
        { name: 'Firebase Realtime DB', proficiency: 70, yearsUsed: 1 },
      ],
    },
    {
      title: 'Testing & DevOps',
      description: 'Quality assurance and deployment pipelines',
      skills: [
        { name: 'Jest', proficiency: 70, yearsUsed: 1 },
        { name: 'Vitest', proficiency: 70, yearsUsed: 1 },
        { name: 'React Testing Library', proficiency: 70, yearsUsed: 1 },
        { name: 'Postman', proficiency: 85, yearsUsed: 2 },
        { name: 'ESLint', proficiency: 80, yearsUsed: 2 },
        { name: 'Prettier', proficiency: 85, yearsUsed: 2 },
        { name: 'Selenium', proficiency: 65, yearsUsed: 1 },
        { name: 'Git / GitHub', proficiency: 85, yearsUsed: 3 },
        { name: 'GitHub Actions (CI/CD)', proficiency: 70, yearsUsed: 1 },
        { name: 'Docker', proficiency: 65, yearsUsed: 1 },
        { name: 'Vercel', proficiency: 85, yearsUsed: 2 },
        { name: 'Husky', proficiency: 70, yearsUsed: 1 },
        { name: 'Sentry', proficiency: 75, yearsUsed: 1 },
      ],
    },
    {
      title: 'Performance & Accessibility',
      description: 'Web performance optimization and inclusive design',
      skills: [
        { name: 'WCAG 2.1', proficiency: 85, yearsUsed: 1 },
        { name: 'Core Web Vitals', proficiency: 85, yearsUsed: 1 },
        { name: 'Lighthouse Optimization', proficiency: 90, yearsUsed: 1 },
        { name: 'useReducedMotion', proficiency: 80, yearsUsed: 1 },
      ],
    },
    {
      title: 'Practices',
      description: 'Development methodologies and principles',
      skills: [
        { name: 'Agile / Scrum', proficiency: 80, yearsUsed: 2 },
        { name: 'RESTful API Design', proficiency: 85, yearsUsed: 2 },
        { name: 'Responsive Web Design', proficiency: 90, yearsUsed: 3 },
        { name: 'UI/UX Principles', proficiency: 80, yearsUsed: 2 },
        { name: 'Design-to-Code', proficiency: 80, yearsUsed: 2 },
        { name: 'TDD', proficiency: 70, yearsUsed: 1 },
      ],
    },
  ],

  capabilityGroups: [
    {
      title: 'Frontend systems',
      summary: 'Responsive interfaces, component architecture, accessibility, and motion that supports the product instead of decorating it.',
      evidence: 'Built Next.js and React interfaces for marketplaces, patient booking, government dashboards, and static marketing systems.',
      skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'shadcn/ui', 'Framer Motion'],
    },
    {
      title: 'Backend and APIs',
      summary: 'RESTful API routes, authentication checks, role-based access, service layers, and event-driven workflows.',
      evidence: 'Implemented product/order APIs, RBAC boundaries, lifecycle notifications, and CRUD flows across Firebase and PostgreSQL-backed products.',
      skills: ['Node.js', 'REST APIs', 'Firebase Admin SDK', 'JWT', 'OAuth 2.0', 'Express.js'],
    },
    {
      title: 'Data and cloud',
      summary: 'Relational and document data modeling, migrations, uploads, storage, serialization, and deployment workflows.',
      evidence: 'Worked with PostgreSQL, Supabase, Prisma, Firestore, Firebase Storage, Vercel, and production migration flows.',
      skills: ['PostgreSQL', 'Supabase', 'Prisma', 'Firestore', 'Firebase Storage', 'Vercel'],
    },
    {
      title: 'Delivery and quality',
      summary: 'End-to-end delivery from architecture through QA, with attention to accessibility, performance, SEO, and maintainability.',
      evidence: 'Contributed independently and in small agile teams across production, freelance, contract, and government-backed systems.',
      skills: ['WCAG 2.1', 'Core Web Vitals', 'Lighthouse', 'ESLint', 'GitHub Actions', 'Sentry'],
    },
    {
      title: 'Agentic engineering',
      summary: 'An agentic, spec-driven workflow — MCP-enabled tooling and structured planning across agent-based assistants — backed by automated testing, documentation, code review, and human validation as the quality gate, so AI accelerates delivery and code quality without replacing engineering judgment.',
      evidence: 'Agent-based and AI-assisted tools used day to day inside a disciplined process — planning, implementation, and review kept under human oversight.',
      skills: ['Claude Code', 'Cursor', 'GitHub Copilot', 'Codex', 'OpenCode', 'MCP workflows'],
    },
  ],

  // ---------------------------------------------------------------------------
  // EDUCATION
  // ---------------------------------------------------------------------------
  education: {
    degree: 'B.S. Software Engineering',
    institution: 'Central Philippine University',
    year: '2026',
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
  return [...portfolioData.featuredSkills]
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, limit);
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
