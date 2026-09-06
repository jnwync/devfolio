import { ImageResponse } from 'next/og';
import { portfolioData } from '@/data/portfolio';

/**
 * Open Graph card, generated at build time — no asset. The same quiet field
 * as the site: deep green-black, a nebula lift, a sparse deterministic
 * starfield, the wordmark, and the positioning line.
 */

export const alt = 'Jon Wayne Cabusbusan — remote full-stack web and mobile developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function prng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function OpenGraphImage() {
  const { personal } = portfolioData;
  const rand = prng(1201);
  const stars = Array.from({ length: 90 }, () => ({
    x: rand() * size.width,
    y: rand() * size.height,
    r: 1 + rand() * 2.2,
    a: 0.2 + rand() * 0.55,
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: '#0d1310',
          backgroundImage:
            'radial-gradient(circle at 18% 12%, rgba(64, 96, 78, 0.55) 0%, rgba(64, 96, 78, 0) 55%), radial-gradient(circle at 86% 78%, rgba(44, 70, 58, 0.5) 0%, rgba(44, 70, 58, 0) 50%)',
          color: '#edede7',
          fontFamily: 'sans-serif',
        }}
      >
        {stars.map((star, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: star.x,
              top: star.y,
              width: star.r,
              height: star.r,
              borderRadius: 999,
              backgroundColor: `rgba(244, 242, 232, ${star.a.toFixed(2)})`,
            }}
          />
        ))}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 44, fontWeight: 700, letterSpacing: -1.5 }}>
            jnwync
            <span style={{ color: '#72cf8e' }}>.</span>
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#a1ab9f', letterSpacing: 2 }}>
            JNWYNC.VERCEL.APP
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 74, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2.5 }}>
            <div style={{ display: 'flex' }}>Full-stack developer for</div>
            <div style={{ display: 'flex' }}>
              products that need to&nbsp;<span style={{ color: '#72cf8e' }}>ship.</span>
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 27, color: '#a1ab9f', lineHeight: 1.4 }}>
            {personal.name} · Remote web & mobile · TypeScript, Next.js, React Native, Node.js, PostgreSQL
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
