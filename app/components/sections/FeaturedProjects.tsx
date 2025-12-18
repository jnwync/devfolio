import Image from 'next/image';

export default function FeaturedProjects() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern shopping experience with real-time inventory management and seamless checkout.",
      image: "/images/projects/ecommerce.jpg",
      imageAlt: "Screenshot of e-commerce platform showing product grid, shopping cart, and checkout flow",
      tags: ["React", "Next.js", "Stripe", "PostgreSQL"],
      href: "/projects/ecommerce",
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      description: "Real-time data visualization and business intelligence tool for decision makers.",
      image: "/images/projects/analytics.jpg",
      imageAlt: "Analytics dashboard interface with charts, graphs, and real-time metrics",
      tags: ["React", "D3.js", "Node.js", "MongoDB"],
      href: "/projects/analytics",
    },
    {
      id: 3,
      title: "Mobile App Design",
      description: "End-to-end UX/UI design system for a social productivity application.",
      image: "/images/projects/mobile-app.jpg",
      imageAlt: "Mobile app design mockups showing interface screens and user flow",
      tags: ["Figma", "User Research", "Prototyping"],
      href: "/projects/mobile-app",
    },
    {
      id: 4,
      title: "Branding Project",
      description: "Complete visual identity including logo, typography, and design guidelines.",
      image: "/images/projects/branding.jpg",
      imageAlt: "Brand identity system showcasing logo variations, color palette, and typography",
      tags: ["Brand Strategy", "Design System", "Guidelines"],
      href: "/projects/branding",
    },
  ];

  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Featured Work</p>
          <h2 id="projects-heading" className="text-balance text-4xl font-bold md:text-5xl">
            Selected Projects
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            A curated selection of recent projects showcasing my approach to design and development.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-xl border border-border transition-[border-color,box-shadow,transform] duration-200 hover:border-accent hover:shadow-lg hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:motion-safe:scale-105"
                />
              </div>

              {/* Project Info */}
              <div className="space-y-4 border-t border-border p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>

                {/* Tags */}
                <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <span className="block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={project.href}
                  className="inline-flex text-sm font-medium text-accent transition-colors hover:text-accent/80 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  View Project →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
