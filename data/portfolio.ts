
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

export interface ContactLink {
  label: string;
  href: string;
  icon: string; // Icon identifier: 'mail' | 'github' | 'linkedin' | 'phone'
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
  featuredSkills: Skill[];
  skillCategories: SkillCategory[];
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
    bio: 'I craft clean, high-performance web experiences that solve real problems. From database optimization to accessible UI, I focus on building products that users love and businesses trust.',
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

  // PROFESSIONAL EXPERIENCE
  experiences: [
    {
      id: 'packup',
      company: 'PackUp (Suppliipack)',
      role: 'Full-Stack Developer',
      type: 'contract',
      period: 'Jun 2024 - Dec 2024',
      startDate: '2024-06',
      endDate: '2024-12',
      location: 'Hybrid',
      description: 'Mobile-first web application enabling MSMEs to access wholesale packaging pricing with reduced MOQs.',
      achievements: [
        'Architected and deployed full-stack features from database schema to production UI',
        'Optimized database queries with Prisma, reducing API response times',
        'Built responsive component library used across 10+ views, ensuring design consistency',
        'Collaborated with 3-person cross-functional team to deliver features on 2-week sprint cycles',
      ],
      impact: [],
      technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Firebase'],
      link: 'https://www.packup.ph/',
    },
    {
      id: 'apollo',
      company: 'Wisdomous Inc. (Apollo Medical Group)',
      role: 'Front-End Developer',
      type: 'contract',
      period: 'Jan 2024 - May 2024',
      startDate: '2024-01',
      endDate: '2024-05',
      location: 'Remote',
      description: 'Patient portal and hospital booking web application for healthcare facility management.',
      achievements: [
        'Architected and built the entire front-end stack for a patient-facing portal, owning UI/UX design, component architecture, and responsiveness',
        'Designed and implemented a fully responsive, accessible UI using TailwindCSS, achieving 95+ Lighthouse accessibility scores',
        'Integrated front-end with backend services, resolving data flow issues and correcting database schema design flaws',
        'Collaborated in a 2-developer agile team, contributing to sprint planning, code reviews, and cross-stack problem solving',
      ],
      impact: [],
      technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    },
    {
      id: 'dti',
      company: 'Department of Trade and Industry (DTI) Iloilo',
      role: 'Full-Stack Developer',
      type: 'academic',
      period: 'Aug 2024 - May 2025',
      startDate: '2024-08',
      endDate: '2025-05',
      location: 'Iloilo, Philippines',
      description: 'Government-backed MSME e-commerce platform mapping and promoting regional industries.',
      achievements: [
        'Architected and deployed a full-stack government platform connecting local vendors to regional markets',
        'Developed an interactive, map-based vendor discovery system, organized by district and municipality, with integrated Maps API for accurate location pinning',
        'Implemented secure REST APIs and relational database schemas, supporting full CRUD workflows for administrators and vendors',
        'Delivered fully responsive interface, aligned with public sector accessibility and usability standards',
      ],
      impact: [],
      technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'REST APIs'],
      link: 'https://dti6-industry-map.vercel.app/',
    },
    {
      id: 'baylo',
      company: 'DemiGAD (Baylo Central)',
      role: 'Full-Stack Developer',
      type: 'contract',
      period: 'Jun 2025 - Nov 2025',
      startDate: '2025-06',
      endDate: '2025-11',
      location: 'Hybrid',
      description: 'E-commerce platform for MSMEs with integrated payment and inventory management.',
      achievements: [
        'Implemented market section features based on approved UI/UX designs, ensuring responsive layouts and consistency with overall system architecture',
        'Built vendor-facing onboarding flows within the marketplace module, connecting frontend components to backend services in scope',
        'Developed market dashboards for product listings and inventory management, aligned with existing data models and workflows',
        'Contributed to sprint execution and agile ceremonies, collaborating with the team to deliver marketplace features on schedule',
      ],
      impact: [],
      technologies: ['React', 'Next.js', 'Express.js', 'MongoDB', 'Stripe'],
    },
  ],

  // FEATURED SKILLS (shown in main skills section)
  featuredSkills: [
    { name: 'React', proficiency: 90, yearsUsed: 2 },
    { name: 'Next.js', proficiency: 85, yearsUsed: 2 },
    { name: 'TypeScript', proficiency: 85, yearsUsed: 2 },
    { name: 'TailwindCSS', proficiency: 90, yearsUsed: 2 },
  ],

  // SKILL CATEGORIES
  skillCategories: [
    {
      title: 'Frontend Development',
      description: 'Modern JavaScript frameworks and libraries',
      skills: [
        { name: 'React', proficiency: 90, yearsUsed: 2 },
        { name: 'Next.js', proficiency: 85, yearsUsed: 2 },
        { name: 'React Native', proficiency: 75, yearsUsed: 1 },
        { name: 'TypeScript', proficiency: 85, yearsUsed: 2 },
        { name: 'JavaScript (ES6+)', proficiency: 90, yearsUsed: 3 },
      ],
    },
    {
      title: 'Styling & UI',
      description: 'Component-driven design systems',
      skills: [
        { name: 'TailwindCSS', proficiency: 90, yearsUsed: 2 },
        { name: 'CSS3', proficiency: 85, yearsUsed: 3 },
        { name: 'Responsive Design', proficiency: 90, yearsUsed: 3 },
        { name: 'Accessibility (WCAG)', proficiency: 80, yearsUsed: 2 },
      ],
    },
    {
      title: 'Backend & Database',
      description: 'Full-stack capabilities and data persistence',
      skills: [
        { name: 'Node.js', proficiency: 80, yearsUsed: 2 },
        { name: 'Express.js', proficiency: 75, yearsUsed: 2 },
        { name: 'PostgreSQL', proficiency: 75, yearsUsed: 2 },
        { name: 'Prisma ORM', proficiency: 80, yearsUsed: 2 },
        { name: 'Firebase', proficiency: 75, yearsUsed: 2 },
        { name: 'REST APIs', proficiency: 85, yearsUsed: 2 },
      ],
    },
    {
      title: 'Tools & Workflow',
      description: 'Professional development environment',
      skills: [
        { name: 'Git/GitHub', proficiency: 85, yearsUsed: 3 },
        { name: 'Agile/Scrum', proficiency: 80, yearsUsed: 2 },
        { name: 'Postman', proficiency: 85, yearsUsed: 2 },
        { name: 'ESLint', proficiency: 80, yearsUsed: 2 },
        { name: 'VS Code', proficiency: 90, yearsUsed: 3 },
      ],
    },
  ],

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
