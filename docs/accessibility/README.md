# Accessibility

> **Ensuring Devfolio is accessible to everyone**

## Our Commitment

Devfolio follows WCAG 2.1 Level AA standards (100% coverage) with AAA where possible (92% coverage).

---

## Compliance Status

**Current Level:** WCAG 2.1 Level AA ✅ (100%) | AAA (92%)

### Quick Stats
- ✅ 24/24 color combinations meet AA
- ✅ 22/24 meet AAA
- ✅ 100% keyboard navigable
- ✅ Screen reader compatible
- ✅ Respects reduced motion
- ✅ System theme preference

**Full Audit:** [WCAG Compliance](./wcag-compliance.md)

---

## Color Accessibility

### Contrast Ratios

| Combination | Ratio | Status |
|-------------|-------|--------|
| Primary text | 15.1:1 | ✅ AAA |
| Secondary text | 5.8:1 | ✅ AA |
| UI components | 3.2:1+ | ✅ AA |

### Colorblind Support

✅ Tested with protanopia, deuteranopia, tritanopia, achromatopsia  
✅ All UI elements distinguishable  
✅ Icons + color (not color alone)

---

## Keyboard Navigation

### Focus Indicators

```css
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

✅ 2px minimum width  
✅ High contrast both modes  
✅ Visible offset  
✅ No keyboard traps

---

## Mobile Accessibility

**Touch Targets:** All interactive elements ≥44x44px ✅  
**Zoom:** Supports up to 200% text scaling ✅  
**Responsive:** No horizontal scroll ✅

---

## Screen Reader Support

### Semantic HTML

```html
<header>, <nav>, <main>, <footer>
<h1>-<h6> in logical order
<button> for actions, <a> for links
<label> for all inputs
```

### ARIA Labels

```tsx
<button aria-label="Toggle theme">
  {theme === 'dark' ? '☀️' : '🌙'}
</button>
```

**Tested:** VoiceOver, NVDA, JAWS, TalkBack

---

## Animation & Motion

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

✅ No motion for users who prefer reduced motion  
✅ Instant theme transitions  
✅ User-controlled interactions only

---

## Testing Process

### Automated
- Lighthouse (Chrome DevTools)
- axe DevTools
- WAVE checker

### Manual
- Keyboard navigation
- Screen readers
- Multiple displays
- Colorblind simulators

**Frequency:** Every deployment + quarterly full audit

---

## WCAG 2.1 Compliance

### Level A
- [x] Non-text content
- [x] Info and relationships
- [x] Keyboard accessible
- [x] Use of color

### Level AA
- [x] Contrast (minimum) 4.5:1
- [x] Non-text contrast 3:1
- [x] Focus visible
- [x] Reflow/responsive

### Level AAA
- [x] Contrast (enhanced) 7:1 (92%)
- [x] Reduced motion
- [x] Target size ≥44px

**See:** [WCAG Compliance](./wcag-compliance.md) for complete audit

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Resources](https://webaim.org/resources/)
- [Color Oracle](https://colororacle.org/)

---

**Last Updated:** December 12, 2025  
**Status:** ✅ Compliant
