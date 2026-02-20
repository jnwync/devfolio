
// PORTFOLIO DATA TYPES

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
  achievements: string[];
  impact?: {
    metric: string;
    description: string;
  }[];
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
  achievements: string[];
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface Skill {
  name: string;
  proficiency: number; // 0-100
  yearsUsed: number;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
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
  icon: string; // Icon identifier: 'mail' | 'github' | 'linkedin' | 'phone' | 'globe'
  primary?: boolean;
}

export interface PersonalInfo {
  name: string;
  tagline: string;
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
  experiences: Experience[];
  projects: Project[];
  featuredSkills: Skill[];
  skillCategories: SkillCategory[];
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
    email: 'jonwayne.cabusbusan@gmail.com',
    phone: '+639452897584',
    location: 'Iloilo, Philippines',
    bio: 'Motivated full-stack web developer with hands-on experience shipping production-grade applications across government, e-commerce, healthcare, and marketplace domains. Proficient in the Next.js / TypeScript ecosystem end-to-end — from building responsive UIs with React and TailwindCSS to designing RESTful APIs, managing relational and NoSQL databases, and deploying to cloud platforms.',
    roles: [
      'Full-Stack Web Developer',
      'React & Next.js Specialist',
    ],
    availability: {
      status: 'available',
      message: 'Available for New Opportunities',
    },
  },

  // ---------------------------------------------------------------------------
  // PROFESSIONAL EXPERIENCE
  // ---------------------------------------------------------------------------
  experiences: [
    {
      id: 'packup',
      company: 'PackUp - Suppliipack',
      role: 'Full-Stack Developer',
      type: 'contract',
      period: 'Jun 2025 - Nov 2025',
      startDate: '2025-06',
      endDate: '2025-11',
      location: 'Hybrid',
      description: 'Mobile-first web application enabling MSMEs to access wholesale packaging at reduced minimum order quantities (MOQs), improving supply-chain accessibility for small businesses.',
      achievements: [
        'Architected key front-end flows with Next.js App Router and server components, covering product catalog, order creation, and supplier-facing dashboards',
        'Designed and deployed PostgreSQL schemas using Prisma ORM, modeling cascading relations across supplier, order, and courier entities with foreign-key integrity constraints',
        'Iterated on mobile checkout UX through direct client collaboration, translating wireframe feedback into responsive, production-ready interfaces on both iOS and Android web views',
      ],
      impact: [
        { metric: '3', description: 'Core workflow modules shipped (supplier, sender, courier)' },
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Firebase'],
      link: 'https://www.packup.ph/',
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
      description: 'Next.js 15 + PostgreSQL e-commerce platform for MSMEs, covering product listings, cart, checkout, and a social feed with real-time updates.',
      achievements: [
        'Implemented a real-time social feed with optimistic UI updates using Supabase Realtime, enabling instant likes and comment threads across the product marketplace',
        'Configured Supabase Auth with JWT + Google OAuth, integrating role-based access control and persisting sessions across server and client components in Next.js 15',
        'Maintained a versioned Prisma migration history across 6 schema iterations, performing zero-data-loss upgrades in both staging and production environments',
      ],
      impact: [
        { metric: '6', description: 'Versioned DB migrations in production' },
        { metric: '2', description: 'Auth strategies integrated (JWT + Google OAuth)' },
      ],
      technologies: ['Next.js', 'React', 'PostgreSQL', 'Supabase', 'Prisma', 'TypeScript'],
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
      achievements: [
        'Owned the patient-facing portal UI with React and TailwindCSS, building scheduling, appointment history, and admin management views from Figma designs to production',
        'Refactored back-end API routes and restructured the PostgreSQL schema, reducing average query latency and improving reliability under concurrent booking loads',
        'Coordinated end-to-end QA in a 2-developer agile team — writing regression test cases, validating against production data, and clearing release gates before each sprint deployment',
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
      achievements: [
        'Integrated the Google Maps JavaScript API with dynamic marker clustering and custom info windows, enabling DTI staff to visually monitor MSME density and filter by industry category across Iloilo',
        'Designed a RESTful API layer with role-based access control (superadmin / admin), a two-step signup approval workflow, and cascading Firestore write operations across related business collections',
        'Applied Zod schema validation end-to-end — across API route handlers, multi-step registration forms, and Firestore utility abstractions — eliminating a class of runtime type errors before production launch',
      ],
      impact: [
        { metric: '3', description: 'Access tiers with approval workflows (superadmin, admin, viewer)' },
        { metric: '100%', description: 'TypeScript & Zod coverage across API routes and forms' },
      ],
      technologies: ['Next.js', 'Firebase Firestore', 'Google Maps API', 'TypeScript', 'Zod', 'REST APIs'],
      link: 'https://dti6-industry-map.vercel.app/',
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
      achievements: [
        'Built on Next.js 16 App Router and React 19 with Tailwind v4, using an oklch-based design token system covering full light/dark mode, semantic color roles, and smooth 200ms theme transitions with no FOUC',
        'Achieved WCAG 2.1 compliance throughout — skip-to-content link, aria-labelledby on every section, aria-live on dynamic content, and prefers-reduced-motion support across all Framer Motion animations',
        'Centralized all content in a single typed data file (portfolio.ts) with domain interfaces and utility functions, so every section updates from one place without touching component code',
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    },
    {
      id: 'reisky',
      title: 'Reisky - Traditional Filipino Martial Arts Website',
      type: 'freelance',
      period: 'Jan 2026 - Feb 2026',
      startDate: '2026-01',
      endDate: '2026-02',
      description: 'Multi-section marketing and class booking website for a traditional Filipino martial arts school, targeting students of all ages — from kids to adults.',
      achievements: [
        'Sole developer on a multi-section marketing and class booking website for a traditional Filipino martial arts school, built with Next.js',
        'Designed the site to highlight the school\'s achievements including award-winning students with international competition results and upcoming events featuring international mentors and seminars',
        'Achieved Lighthouse scores of 92 Performance / 99 Accessibility / 96 Best Practices / 100 SEO through semantic HTML, optimized assets, and Next.js image and metadata best practices',
      ],
      technologies: ['Next.js', 'React', 'TailwindCSS', 'TypeScript'],
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
        { name: 'Radix UI', proficiency: 80, yearsUsed: 1 },
        { name: 'Framer Motion', proficiency: 80, yearsUsed: 1 },
        { name: 'SWR', proficiency: 75, yearsUsed: 1 },
        { name: 'Axios', proficiency: 80, yearsUsed: 2 },
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
        { name: 'React Testing Library', proficiency: 70, yearsUsed: 1 },
        { name: 'Postman', proficiency: 85, yearsUsed: 2 },
        { name: 'ESLint', proficiency: 80, yearsUsed: 2 },
        { name: 'Selenium', proficiency: 65, yearsUsed: 1 },
        { name: 'Git / GitHub', proficiency: 85, yearsUsed: 3 },
        { name: 'GitHub Actions (CI/CD)', proficiency: 70, yearsUsed: 1 },
        { name: 'Docker', proficiency: 65, yearsUsed: 1 },
        { name: 'Vercel', proficiency: 85, yearsUsed: 2 },
        { name: 'Husky', proficiency: 70, yearsUsed: 1 },
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
      ],
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
