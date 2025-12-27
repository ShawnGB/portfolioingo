# CSS System Documentation

**Last updated:** December 2025
**Philosophy:** Semantic HTML first, utilities for composition, page CSS for unique layouts only

---

## Core Principle: Semantic HTML Does the Heavy Lifting

**Write less CSS by using more semantic HTML.** Most elements are styled globally in `base.css`.

---

## Quick Reference

### ✅ Use Semantic HTML (No Classes Needed)

```html
<!-- Section with automatic padding/spacing -->
<section>
  <h2>Heading</h2>
  <p>Body text with optimal line-length and spacing.</p>
  <blockquote>Pull quote with editorial hairline.</blockquote>
  <img src="photo.jpg" alt="..."/> <!-- Monochrome filter applied -->
</section>

<!-- Card with hover effect -->
<article>
  <h3>Card Title</h3>
  <p>Card content</p>
</article>

<!-- Button -->
<a href="/contact" class="button">Contact Me</a>
<a href="/download" class="button--solid">Download CV</a>
```

---

## File Structure

```
static/css/
├── variables.css    # Design tokens (colors, spacing, typography)
├── grid.css         # 12-column grid + common patterns
├── base.css         # Global semantic element styles
├── utilities.css    # Composed patterns only (icon-header, lists)
├── nav.css          # Navigation bar
├── footer.css       # Footer
├── icons.css        # Icon system
├── home.css         # Homepage hero (unique layout)
├── about.css        # About page (baseline for other pages)
└── [page].css       # Page-specific layouts only
```

**Import order in `styles.css`:**
1. Variables
2. Grid
3. Base
4. Utilities
5. Layout components (nav, footer)
6. Page-specific
7. Icons

---

## 1. Semantic Elements (base.css)

### Sections

```html
<section>
  <!-- Automatic padding: var(--space-4xl) top/bottom -->
  <!-- Automatic spacing between sections -->
</section>
```

**CSS:** Handled globally in `base.css`

---

### Typography

```html
<h1>Main page title</h1>           <!-- clamp(2rem, 5vw, 3.5rem) -->
<h2>Section heading</h2>            <!-- clamp(1.5rem, 3.5vw, 2.25rem) -->
<h3>Subsection</h3>                 <!-- clamp(1.125rem, 2.5vw, 1.5rem) -->
<p>Body text automatically styled</p> <!-- 1.125rem, 65ch max-width -->
<p class="lead">Larger intro text</p> <!-- Optional modifier -->
```

**CSS:** Handled globally in `base.css`

❌ **Don't use:** `.section-header`, `.section-label`, `.subsection-header` (deleted - use `<h1>`, `<h2>`, `<h3>`)

---

### Images

```html
<!-- Editorial monochrome filter applied by default -->
<img src="photo.jpg" alt="Description"/>

<!-- Remove filter when needed -->
<img src="logo.png" alt="Logo" class="img-original"/>
```

**CSS:** Handled globally in `base.css`

❌ **Don't use:** `.img-editorial` (deleted - default behavior)

---

### Blockquotes

```html
<!-- Pull quote with editorial hairline automatically styled -->
<blockquote>
  I build digital experiences that work with integrity.
</blockquote>
```

**CSS:** Handled globally in `base.css` (includes `::before` hairline)

❌ **Don't use:** `.pull-quote-wrapper` (deleted - use `<blockquote>`)

---

### Cards

```html
<!-- Default card with hover effect -->
<article>
  <h3>Card Title</h3>
  <p>Content here</p>
</article>

<!-- Column layout variant -->
<article class="article--column">
  <h3>Title</h3>
  <p>Stacked content</p>
</article>

<!-- Accent border variant -->
<article class="article--accent">
  <h3>Title</h3>
  <p>With left border</p>
</article>
```

**CSS:** Handled globally in `base.css`

❌ **Don't use:** `.card` (deleted - use `<article>`)

---

### Buttons/Links

```html
<!-- Bordered button -->
<a href="/about" class="button">Learn More</a>

<!-- Solid button -->
<a href="/download" class="button--solid">Download CV</a>
<button type="submit" class="button--solid">Submit</button>
```

**CSS:** Handled globally in `base.css`

✅ **Legacy support:** `.cta-link` still works but prefer `.button`

---

## 2. Grid System (grid.css)

### 12-Column Grid (Manual)

```html
<div class="page-grid-container">
  <div class="grid-row">
    <div class="grid-col-4">Sidebar</div>
    <div class="grid-col-8">Main content</div>
  </div>
</div>
```

### Common Grid Patterns (Recommended)

```html
<!-- Intro layout: 4/8 split -->
<section class="grid--intro">
  <h2>Title</h2>
  <p>Wide content column</p>
</section>

<!-- Hero layout: 5/7 split -->
<section class="grid--hero">
  <img src="hero.jpg" alt="..."/>
  <div>
    <h1>Headline</h1>
    <p>Content</p>
  </div>
</section>

<!-- Three equal columns -->
<section class="grid--thirds">
  <article>Item 1</article>
  <article>Item 2</article>
  <article>Item 3</article>
</section>

<!-- Two equal columns -->
<section class="grid--halves">
  <div>Column 1</div>
  <div>Column 2</div>
</section>

<!-- Asymmetric 7/5 split -->
<section class="grid--feature">
  <div>Featured content</div>
  <aside>Sidebar</aside>
</section>
```

**CSS:** Defined in `grid.css`

---

## 3. Utilities (utilities.css)

**ONLY for composed patterns that can't be achieved with single semantic elements.**

### Decorative Elements

```html
<!-- Vertical rule accent (optional decoration) -->
<div style="position: relative;">
  <div class="vertical-rule"></div>
  <p>Content with left accent line</p>
</div>

<!-- Image caption -->
<img src="photo.jpg" alt="..."/>
<span class="image-caption">Italy, 2025</span>
```

### Composed Patterns

```html
<!-- Icon + heading pattern -->
<div class="icon-header">
  <svg class="icon">...</svg>
  <h3>Heading with icon</h3>
</div>

<!-- Mono label (metadata) -->
<span class="label-mono">2023 – Present</span>

<!-- Icon list -->
<ul class="values-list">
  <li>
    <svg class="icon">...</svg>
    <div class="value-content">
      <h3>Title</h3>
      <p>Description</p>
    </div>
  </li>
</ul>

<!-- Checkmark list -->
<ul class="checkmark-list">
  <li>First item (✓ automatic)</li>
  <li>Second item</li>
</ul>
```

---

## 4. Page-Specific CSS

**Page CSS files should ONLY contain unique layouts, not styling.**

### What Goes in Page CSS ✅

- Unique grid arrangements (photo spreads, timelines)
- Decorative pseudo-elements (section numbers, backgrounds)
- Page-specific layout wrappers
- Full-bleed section overrides

### What DOESN'T Go in Page CSS ❌

- Typography styling (use semantic elements)
- Spacing/padding (use grid patterns or section defaults)
- Button/link styling (use global button classes)
- Card styling (use `<article>`)
- Image filters (use global img)

---

## Before & After Examples

### Example 1: Intro Section

**Before (verbose):**
```html
<div class="grid-section about-intro-section">
  <div class="grid-row">
    <div class="grid-col-4">
      <h2 class="section-label">About</h2>
    </div>
    <div class="grid-col-8">
      <div class="intro-content">
        <div class="vertical-rule"></div>
        <div class="body-text">
          <p>Text here</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

**After (semantic):**
```html
<section class="grid--intro">
  <h2>About</h2>
  <p>Text here</p>
</section>
```

**Classes:** 7 → 1
**Elements:** 8 → 3

---

### Example 2: Card Grid

**Before:**
```html
<div class="interests-grid">
  <div class="card">
    <svg class="icon">...</svg>
    <span>Music</span>
  </div>
  <div class="card">
    <svg class="icon">...</svg>
    <span>Cycling</span>
  </div>
</div>
```

**After:**
```html
<div class="grid--thirds">
  <article>
    <svg class="icon">...</svg>
    <span>Music</span>
  </article>
  <article>
    <svg class="icon">...</svg>
    <span>Cycling</span>
  </article>
</div>
```

**Classes:** `card` → none (article is semantic)
**Benefit:** Semantic HTML + accessibility

---

### Example 3: Pull Quote

**Before:**
```html
<div class="pull-quote-wrapper">
  <blockquote>
    Quote text here
  </blockquote>
</div>
```

**After:**
```html
<blockquote>
  Quote text here
</blockquote>
```

**Classes:** 1 → 0
**CSS:** Handled globally

---

## Migration Checklist

When updating a page to semantic-first:

- [ ] Replace `.section-header` with `<h1>`
- [ ] Replace `.section-label` with `<h2>`
- [ ] Replace `.subsection-header` with `<h3>`
- [ ] Remove `.body-text` wrappers (p is styled globally)
- [ ] Replace `.pull-quote-wrapper` with `<blockquote>`
- [ ] Replace `.card` with `<article>`
- [ ] Remove `.img-editorial` (applied by default)
- [ ] Replace manual grid-col-* with grid patterns where applicable
- [ ] Replace `.cta-link` with `.button` (legacy support remains)

---

## Decision Tree: When to Use What

```
Need a heading?
├─ Yes → Use <h1>, <h2>, or <h3>
└─ No

Need body text?
├─ Yes → Use <p> (styled globally)
└─ No

Need a quote?
├─ Yes → Use <blockquote>
└─ No

Need a card?
├─ Yes → Use <article>
└─ No

Need a button?
├─ Yes → Use <a class="button"> or <button>
└─ No

Need a layout?
├─ Common pattern? → Use grid pattern (.grid--intro, .grid--thirds, etc.)
├─ Unique layout? → Add to page CSS
└─ Single column? → Just use <section> (auto padding)

Need an image?
├─ Yes → Use <img> (monochrome filter default)
├─ Need original colors? → Add class="img-original"
└─ No

Need icon + heading?
├─ Yes → Use .icon-header utility
└─ No

Need special list styling?
├─ Icon bullets? → Use .values-list
├─ Checkmarks? → Use .checkmark-list
└─ Default bullets → Just use <ul> or <ol>
```

---

## Performance Benefits

**Reduced CSS size:**
- utilities.css: 269 lines → 138 lines (48% reduction)
- Fewer class names in HTML
- Smaller bundle size

**Improved maintainability:**
- Change heading sizes globally in base.css
- Update button styles in one place
- Semantic HTML = better accessibility

**Faster development:**
- Less thinking about class names
- More semantic, readable code
- Patterns emerge naturally

---

## Questions?

See `CLAUDE.md` for full system architecture or check individual CSS files for inline documentation.
