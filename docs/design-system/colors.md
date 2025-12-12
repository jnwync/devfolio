# Color System

> **Color palette, selection process, and usage guidelines**

## Philosophy

1. **Accessibility First** - WCAG AA minimum, AAA target
2. **Perceptual Uniformity** - OKLCH color space for consistent brightness
3. **Semantic Naming** - Purpose-driven tokens

---

## Color Selection Process

**1. Brand Definition**
- Base hue: Violet (290°) - represents creativity + innovation
- Built on [OKLCH color space](https://oklch.com) for perceptual uniformity

**2. Palette Expansion**
- Primary: Rich violet for brand identity
- Accent: Magenta for contrast
- Neutrals: Indigo-tinted grays
- Semantic: Success, warning, error, info

**3. WCAG Testing**
- All combinations tested for 4.5:1 minimum (AA)
- Most achieve 7:1 (AAA)
- See [WCAG Compliance](../accessibility/wcag-compliance.md) for full audit

**4. Light/Dark Optimization**
- Light mode: High contrast, minimal saturation
- Dark mode: Rich colors, higher saturation
- Brand consistency across both themes

---

## Color Palettes

### Light Mode

```css
/* Base */
--background: oklch(0.98 0.003 280);
--foreground: oklch(0.15 0.015 280);

/* Surfaces */
--card: oklch(1.00 0.000 280);
--muted: oklch(0.92 0.01 280);

/* Brand */
--primary: oklch(0.55 0.22 290);
--accent: oklch(0.60 0.24 320);

/* Semantic */
--success: oklch(0.55 0.20 155);
--warning: oklch(0.65 0.18 80);
--destructive: oklch(0.55 0.22 25);
```

### Dark Mode

```css
/* Base */
--background: oklch(0.10 0.015 280);
--foreground: oklch(0.98 0.005 280);

/* Surfaces */
--card: oklch(0.15 0.015 280);
--muted: oklch(0.25 0.02 280);

/* Brand */
--primary: oklch(0.65 0.20 290);
--accent: oklch(0.68 0.22 320);

/* Semantic */
--success: oklch(0.65 0.18 155);
--warning: oklch(0.75 0.15 80);
--destructive: oklch(0.58 0.22 25);
```

**Complete tokens:** See `app/globals.css`

---

## Usage Guidelines

### ✅ Use Semantic Tokens

```tsx
// Good - semantic naming
<button className="bg-primary text-primary-foreground">
  Primary Action
</button>

<div className="bg-card text-card-foreground border-border">
  Card content
</div>
```

### ❌ Don't Hardcode

```tsx
// Bad - hardcoded colors
<button className="bg-purple-600 text-white">

// Good - semantic tokens
<button className="bg-primary text-primary-foreground">
```

---

## Token Reference

| Token | Purpose | Usage |
|-------|---------|-------|
| `background` | Page background | Body, main containers |
| `foreground` | Primary text | Headings, body text |
| `card` | Elevated surfaces | Cards, panels |
| `muted` | Subtle backgrounds | Code blocks, disabled states |
| `primary` | Main actions | Buttons, links |
| `accent` | Highlights | Badges, accents |
| `destructive` | Errors | Delete, error states |
| `success` | Success states | Confirmations, success messages |
| `warning` | Warnings | Alerts, cautions |
| `border` | Borders | Dividers, outlines |

---

## Example Components

### Buttons

```tsx
<button className="bg-primary text-primary-foreground">Primary</button>
<button className="bg-destructive text-destructive-foreground">Delete</button>
```

### Alerts

```tsx
<div className="bg-success text-success-foreground p-4 rounded">
  ✓ Success message
</div>

<div className="bg-destructive text-destructive-foreground p-4 rounded">
  ✕ Error message
</div>
```

### Cards

```tsx
<div className="bg-card text-card-foreground border-border p-6 rounded-lg">
  <h2 className="font-bold">Title</h2>
  <p className="text-muted-foreground">Description</p>
</div>
```

---

**See Also:**
- [WCAG Compliance](../accessibility/wcag-compliance.md) - Full accessibility audit
- [Design System](./README.md) - Design principles

**Last Updated:** December 12, 2025
