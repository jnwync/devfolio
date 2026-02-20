
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
      'Building Digital Experiences',
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
        'Built and maintained a mobile-first web app enabling MSMEs to access wholesale packaging at reduced MOQs, improving supply-chain accessibility for small businesses',
        'Developed and deployed back-end API routes and database schemas, ensuring data integrity across sender and courier workflows',
        'Collaborated on UI/UX design decisions and supported end-to-end production deployment, delivering a smooth, responsive experience on both mobile and desktop',
      ],
      impact: [],
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
        'Contributed full-stack features to a Next.js 15 + PostgreSQL e-commerce platform for MSMEs, covering product listings, cart, checkout, and a social feed with likes, comments, and real-time updates',
        'Implemented Supabase Auth (JWT + OAuth) and integrated Prisma ORM with versioned migrations, maintaining a clean, type-safe database layer across 6 migration iterations',
        'Participated in agile ceremonies (stand-ups, sprint reviews) and provided design feedback, driving continuous improvement of platform features and performance',
      ],
      impact: [],
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
        'Led front-end development of a patient portal and hospital booking system, delivering a responsive UI/UX serving both patients and admin staff',
        'Refactored back-end logic and optimized database structure, measurably reducing load times and enabling scalable, reliable performance under high-volume booking operations',
        'Shipped to production in a 2-developer agile team, contributing to design discussions, sprint reviews, and end-to-end QA before release',
      ],
      impact: [],
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
        'Built and deployed a government-backed interactive MSME map for Iloilo using Next.js, Firebase Firestore, and Google Maps API — enabling DTI admins to register, visualize, and monitor regional businesses',
        'Designed a RESTful API layer with role-based access control (superadmin / admin), a two-step signup approval workflow, and cascading Firestore operations across related collections',
        'Implemented Zod validation and end-to-end TypeScript type safety across API routes, form schemas, and Firestore utility abstractions, reducing runtime errors in production',
      ],
      impact: [],
      technologies: ['Next.js', 'Firebase Firestore', 'Google Maps API', 'TypeScript', 'Zod', 'REST APIs'],
      link: 'https://dti6-industry-map.vercel.app/',
    },
  ],

  // ---------------------------------------------------------------------------
  // PROJECTS
  // ---------------------------------------------------------------------------
  projects: [
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
