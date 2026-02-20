# Devfolio

> **Modern portfolio with accessible design system**

Built with Next.js 15, TypeScript, and Tailwind CSS v4. Features OKLCH color system with comprehensive light/dark mode support.

[![WCAG AA](https://img.shields.io/badge/WCAG-AA_100%25-green)](./docs/accessibility/wcag-compliance.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)

---

## Features

- **OKLCH Color System** — 40+ semantic tokens, perceptually uniform
- **Smart Theming** — System preference detection, FOUC-free
- **WCAG AA Compliant** — 100% AA, 92% AAA coverage
- **Optimized** — Native CSS, minimal bundle
- **Type-Safe** — Full TypeScript support
- **Downloadable CV** — Resume available at `/cv.pdf`

---

## Sections

| Section | Description |
|---------|-------------|
| **Hero / About** | Professional summary with typing animation and CV download |
| **Experience** | Professional work history across 4 roles |
| **Projects** | Freelance and independent projects |
| **Skills** | 6 skill categories aligned with resume |
| **Contact** | Email, GitHub, LinkedIn, Phone |

---

## Quick Start

```bash
# Install
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Documentation

- **[Documentation Hub](./docs/README.md)** — Complete navigation
- **[Color System](./docs/design-system/colors.md)** — Color palette guide
- **[Design System](./docs/design-system/README.md)** — Design principles
- **[Accessibility](./docs/accessibility/README.md)** — WCAG compliance

---

## 🎨 Usage

### Theme Toggle

```tsx
import { useTheme } from '@/app/components/ThemeProvider';

export function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
```

### Color Tokens

```tsx
<button className="bg-primary text-primary-foreground">
  Primary Action
</button>

<div className="bg-card text-card-foreground border-border">
  Card content
</div>
```

---

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Geist Sans & Mono
- **Colors:** OKLCH
- **Animation:** Framer Motion
- **UI:** Radix UI, shadcn/ui

---

## License

MIT License — free to use in your projects!

---

**Built with accessibility and performance in mind.**
