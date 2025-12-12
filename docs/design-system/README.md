# Design System

> **Design principles, patterns, and implementation**

## Core Principles

### 1. Accessibility First ♿
- WCAG 2.1 Level AA (100%)
- Keyboard navigation
- Screen reader optimization
- Color contrast compliance

### 2. Consistency 🎨
- Unified color palette
- Semantic naming
- Reusable patterns

### 3. Performance ⚡
- Native CSS features
- Minimal JavaScript
- Efficient theme switching

### 4. Maintainability 🔧
- Clear documentation
- Single source of truth
- Modular architecture

---

## Design Tokens

### Color System ✅
- 40+ semantic tokens
- OKLCH color space
- Light & dark modes
- WCAG AAA (92%)

**See:** [Color System](./colors.md)

### Border Radius ✅

```css
--radius: 0.625rem;           /* 10px base */
--radius-sm: 0.375rem;        /* 6px */
--radius-lg: 0.625rem;        /* 10px */
```

---

## Architecture

### File Structure

```
app/
├── components/
│   ├── ThemeProvider.tsx    # Theme management
│   └── Hero.tsx             # Components
├── globals.css              # Design tokens
├── layout.tsx               # Root layout
└── page.tsx                 # Pages
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Fonts | Geist Sans/Mono |
| Colors | OKLCH |

---

## Components

### ThemeProvider ✅
Global theme management with React Context.

**Features:**
- Light/dark toggle
- System preference detection
- localStorage persistence
- FOUC prevention

**Usage:**
```tsx
import { useTheme } from '@/app/components/ThemeProvider';

const { theme, toggleTheme } = useTheme();
```

---

## Development Guidelines

### Adding New Colors

1. Define in OKLCH: `--new-color: oklch(L C H);`
2. Test contrast: Ensure 4.5:1 minimum (AA)
3. Add to both themes (`:root` and `.dark`)
4. Map to Tailwind: `--color-new-color: var(--new-color);`
5. Document in [colors.md](./colors.md)

### Creating Components

1. **Use semantic tokens:**
   ```tsx
   <div className="bg-card text-card-foreground" />
   ```

2. **Test both themes:**
   - Verify in light mode
   - Verify in dark mode

3. **Ensure accessibility:**
   - Proper heading hierarchy
   - ARIA labels when needed
   - Keyboard navigation

---

## Best Practices

### ✅ Do

```tsx
// Use semantic tokens
<button className="bg-primary text-primary-foreground">

// Use CSS variables
<div style={{ backgroundColor: 'var(--primary)' }} />
```

### ❌ Don't

```tsx
// Don't hardcode colors
<button className="bg-purple-600 text-white">

// Don't use hex values
<div style={{ backgroundColor: '#8b5cf6' }} />
```

---

## Testing Standards

### Visual
- [ ] Light mode appearance
- [ ] Dark mode appearance
- [ ] Theme transition
- [ ] Responsive (mobile, tablet, desktop)

### Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader compatible
- [ ] Color contrast (4.5:1 minimum)
- [ ] Focus indicators visible

### Performance
- [ ] Lighthouse score >90
- [ ] No layout shifts
- [ ] Fast theme switching

---

## Resources

### Internal
- [Color System](./colors.md)
- [WCAG Compliance](../accessibility/wcag-compliance.md)

### External
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [OKLCH Color Space](https://oklch.com)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Version:** 1.0.0  
**Last Updated:** December 12, 2025
