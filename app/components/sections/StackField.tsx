import type { IconType } from 'react-icons';
import {
  SiDocker,
  SiDrizzle,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiSanity,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { portfolioData } from '@/data/portfolio';

/** Simple Icons, inlined as SVG paths from react-icons — nothing is hotlinked. */
const ICONS: Record<string, IconType> = {
  typescript: SiTypescript,
  react: SiReact,
  nextdotjs: SiNextdotjs,
  nodedotjs: SiNodedotjs,
  express: SiExpress,
  postgresql: SiPostgresql,
  prisma: SiPrisma,
  drizzle: SiDrizzle,
  firebase: SiFirebase,
  supabase: SiSupabase,
  sanity: SiSanity,
  tailwindcss: SiTailwindcss,
  expo: SiExpo,
  docker: SiDocker,
};

/**
 * The signature moment: the tools in production, as a single row of glyphs
 * that sit in loose 3D space and settle flat as you scroll to them. The
 * markup is a plain list with visible labels; StackMotion (client) adds the
 * depth, and without it the row is simply flat.
 */
export default function StackField() {
  const { stack } = portfolioData;

  return (
    <section id="stack" aria-labelledby="stack-heading" className="stack-scene">
      <div className="section-shell">
        <div className="stack-head rv">
          <h2 id="stack-heading" className="mono-meta text-foreground">
            The stack
          </h2>
          <p className="mono-meta text-muted-foreground">{stack.length} tools · shipped in production</p>
        </div>

        <ul className="stack-field" data-stack-field role="list">
          {stack.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.name} className="stack-item" data-stack-item>
                <span className="stack-glyph" aria-hidden="true">
                  {Icon ? <Icon /> : null}
                </span>
                <span className="stack-label">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
