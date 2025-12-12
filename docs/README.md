# Documentation

> **Complete guide to Devfolio's design system and accessibility**

## �� Structure

```
docs/
├── README.md                    # This file
├── design-system/
│   ├── README.md                # Design principles
│   └── colors.md                # Color palette
├── accessibility/
│   ├── README.md                # Accessibility overview
│   └── wcag-compliance.md       # WCAG audit
└── assets/                      # Screenshots (future)
```

---

## 🎨 Design System

### Core Documentation
- **[Design System Overview](./design-system/README.md)** - Principles and architecture
- **[Color System](./design-system/colors.md)** - Complete color guide with:
  - Selection process and rationale
  - OKLCH color space
  - Light/dark implementation
  - Usage guidelines

---

## ♿ Accessibility

- **[Accessibility Overview](./accessibility/README.md)** - Commitment and features
- **[WCAG Compliance](./accessibility/wcag-compliance.md)** - Detailed audit with contrast ratios

**Status:** WCAG 2.1 Level AA (100%) | AAA (92%)

---

## 🚀 Quick Start

### For Developers
1. Review [Color System](./design-system/colors.md) for token usage
2. Check [WCAG Compliance](./accessibility/wcag-compliance.md) for requirements
3. See main [README](../README.md) for setup

### For Designers
- Color palettes: Coming to `assets/`
- Design principles: [Design System](./design-system/README.md)
- Accessibility: [WCAG Compliance](./accessibility/wcag-compliance.md)

---

## 🤝 Contributing

### File Organization
- Design decisions → `design-system/`
- Accessibility audits → `accessibility/`
- Visual assets → `assets/`

### Naming Conventions
- Use lowercase with hyphens: `color-system.md`
- Be descriptive: `wcag-compliance.md`

### Documentation Standards
- Proper heading hierarchy (h1 → h2 → h3)
- Code examples in fenced blocks
- Tables for comparisons
- Update this README when adding files

---

## 📚 External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [OKLCH Color Space](https://oklch.com)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated:** December 12, 2025
