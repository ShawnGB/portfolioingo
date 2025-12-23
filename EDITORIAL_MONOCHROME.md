# Editorial Monochrome Design System

## For Senior Technical Professionals

### Near-Monochrome • Editorial • Warm Without Color

---

## Primary Objective

This site exists to communicate three things to employers, collaborators, and peers:

1. **Senior technical competence** - System design, product thinking, engineering judgment
2. **Taste and judgment** - Decision-making quality, restraint, attention to craft
3. **Human communication** - Readable, calm, accessible — not purely aesthetic

**The priority**: Professional signal first, editorial character second.

**Not a**: Portfolio studio, design agency, literary magazine, or personal blog aesthetic.

**Success metric**: A hiring manager or engineering lead scans the site in 30 seconds and thinks "senior, competent, trustworthy."

---

## Philosophy: Material, Rhythm, and Restraint

This system creates warmth and engagement through:

1. **Material** - Warm paper tone, subtle grain, tactile blacks
2. **Rhythm** - Typographic hierarchy, spacing cadence, reading flow
3. **Restraint** - Decorative elements only when they serve hierarchy or structure

**Aesthetic**: Confident professional site with editorial quality — not a literary journal.

---

## 1. COLOR SYSTEM: Warm Monochrome

### The Palette

```css
/* === WARM PAPER: Base === */
--paper-warm: #fafaf8; /* Warm off-white - subtle beige undertone */
--paper-mid: #f5f5f3; /* Mid paper - for subtle sections */
--paper-light: #fcfcfb; /* Lightest - for cards/elevated surfaces */

/* === WARM BLACKS: Text === */
--ink-warm: #1c1c1c; /* Warm near-black - not pure black */
--ink-soft: #2a2a28; /* Softer black - for secondary text */
--ink-muted: #494947; /* Muted - for tertiary text */

/* === WARM GRAYS: Dividers & Borders === */
--gray-warm-100: #e8e8e6; /* Light warm gray - subtle dividers */
--gray-warm-200: #d4d4d1; /* Medium warm gray - borders */
--gray-warm-300: #a8a8a5; /* Dark warm gray - de-emphasized elements */

/* === SEMANTIC ASSIGNMENTS === */
--bg-base: var(--paper-warm);
--bg-elevated: var(--paper-light);
--bg-section-alt: var(--paper-mid);

--text-primary: var(--ink-warm);
--text-secondary: var(--ink-soft);
--text-tertiary: var(--ink-muted);

--border-subtle: var(--gray-warm-100);
--border-medium: var(--gray-warm-200);
--border-strong: var(--gray-warm-300);
```

### The Rule: Warm Monochrome with Density Contrast

**Near-monochrome palette** - no hue or saturation accents.

Hierarchy and scannability come from:

- **Density contrast** - ink opacity, weight, underline thickness
- **Spatial hierarchy** - whitespace, size, position
- **Typographic hierarchy** - weight, size, family

**One controlled accent allowed**: Density-based emphasis for orientation cues (active nav, section index, primary CTA).

The warmth comes from:

- Warm paper base (beige undertone, not stark white)
- Warm blacks (charcoal-tinted, not pure #000)
- Warm grays (slight sepia/beige tint)

---

## 1A. ACCENT SYSTEM: Density Contrast

### Controlled Non-Chromatic Accent

**Purpose**: Orientation cues for scanners (recruiters, employers) without color.

**Implementation**:

```css
/* === SEMANTIC ACCENT: Density-Based === */
--accent-density: rgba(43, 43, 43, 1); /* Full density ink */
--accent-medium: rgba(43, 43, 43, 0.85); /* Medium density */
--accent-subtle: rgba(43, 43, 43, 0.65); /* Subtle density */

/* === USAGE === */
/* Active navigation */
nav a.active {
  color: var(--accent-density);
  border-bottom: 2px solid var(--accent-density); /* Thickness for emphasis */
  font-weight: 500;
}

/* Section index / markers */
.section-marker {
  color: var(--accent-density);
  font-weight: 600;
}

/* Primary CTA */
.cta-primary {
  color: var(--accent-density);
  border-bottom: 2px solid var(--accent-density);
  font-weight: 500;
}
```

**What's forbidden**:

- Hue accents (blue, sienna, green)
- Saturation changes
- Background color blocks

**The rule**: Use ink density and weight, not color, for emphasis.

---

## 2. TYPOGRAPHY: Editorial Hierarchy

### Font Pairing: Refined Contrast

**Current**: Space Grotesk (800) + Newsreader Italic
**Refined**: Keep the pairing but use weight and size contrast more deliberately

```css
/* === DISPLAY: Headers === */
--font-display: "Space Grotesk", system-ui, sans-serif; /* Geometric sans */
--weight-display-regular: 400; /* For subheadings */
--weight-display-medium: 600; /* For section titles */
--weight-display-bold: 800; /* For main headings only */

/* === BODY: Reading Text === */
--font-body: "Newsreader", "Georgia", serif; /* Editorial serif */
--weight-body-light: 300; /* For large introductory text */
--weight-body-regular: 400; /* For body paragraphs */
--weight-body-medium: 500; /* For emphasis */
--weight-body-semibold: 600; /* For strong emphasis */

/* === MONO: Technical Details === */
--font-mono: "JetBrains Mono", "Courier New", monospace;
--weight-mono-regular: 400;
--weight-mono-medium: 500;
```

### Typographic Scale: Refined Modular

**Critical**: No massive 15vw hero text - hero must fit in viewport

```css
/* === HEADLINES === */
/* H1: Main page headline - NOT oversized */
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem); /* 32px → 5vw → 56px */
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: var(--ink-warm);
  margin: 0 0 1.5rem 0;
}

/* H2: Section headings */
h2 {
  font-size: clamp(1.5rem, 3.5vw, 2.25rem); /* 24px → 3.5vw → 36px */
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--ink-warm);
  margin: 2.5rem 0 1rem 0;
}

/* H3: Subsection headings */
h3 {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem); /* 18px → 2.5vw → 24px */
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--ink-soft);
  margin: 2rem 0 0.75rem 0;
}

/* === BODY TEXT === */
/* Body paragraph - optimized for reading */
p {
  font-family: var(--font-body);
  font-size: clamp(1rem, 1.5vw, 1.125rem); /* 16px → 1.5vw → 18px */
  font-weight: 400;
  line-height: 1.7; /* Generous for readability */
  letter-spacing: 0.01em;
  color: var(--text-secondary);
  margin: 0 0 1.5rem 0;
  max-width: 65ch; /* Optimal line length */
}

/* Lead paragraph - larger, lighter weight */
p.lead {
  font-size: clamp(1.125rem, 2vw, 1.375rem); /* 18px → 2vw → 22px */
  font-weight: 300; /* Light weight for elegance */
  line-height: 1.65;
  color: var(--ink-soft);
  max-width: 60ch;
  margin: 0 0 2rem 0;
}

/* Small text - captions, metadata */
small,
.text-small {
  font-family: var(--font-mono);
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--text-tertiary);
}
```

### Typographic Rhythm Elements (Opt-In)

**Usage guideline**: Literary devices are powerful but can undermine technical seriousness. Use sparingly.

**Allowed contexts**:

- Drop caps: Essays or long-form writing only (NOT landing pages, portfolio, about)
- Pull quotes: Max one per article
- Sidenotes: Essays only (NOT portfolio or about pages)

```css
/* === DROP CAP === */
/* First letter of opening paragraph - OPT-IN ONLY */
/* Apply manually with class .drop-cap on essay opening paragraphs */
p.drop-cap::first-letter {
  font-size: 3.5em;
  font-weight: 800;
  line-height: 0.85;
  float: left;
  margin: 0.1em 0.15em 0 0;
  color: var(--ink-warm);
  font-family: var(--font-display);
}

/* === PULL QUOTE === */
/* For highlighting key phrases - MAX ONE PER ARTICLE */
blockquote.pull-quote {
  font-family: var(--font-body);
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 500;
  font-style: italic;
  line-height: 1.5;
  color: var(--ink-warm);
  margin: 3rem 0;
  padding: 0;
  max-width: 55ch;
  border: none;
}

/* === SIDE NOTE === */
/* Marginal annotations - ESSAYS ONLY */
.sidenote {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-tertiary);
  margin: 1rem 0;
  padding-left: 1.5rem;
  border-left: 1px solid var(--border-subtle);
}
```

---

## 3. HERO SECTION: Single Column with Authority

### Layout Philosophy: Author-Expert, Not Studio

**Layout**: Single column, centered, max-width controlled
**Height**: 55-65vh — fits in viewport without scrolling
**Portrait**: Appears below headline/subtitle as editorial figure, not beside it

**Design goal**: Signal authorship and seniority, not agency portfolio.

```css
/* === HERO CONTAINER === */
.hero-section {
  width: 100%;
  min-height: 55vh;
  max-height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem 4rem;
  background: var(--paper-warm);
}

/* === HERO CONTENT === */
.hero-content {
  max-width: 680px;
  text-align: left;
  position: relative;
}

/* === EDITORIAL HAIRLINE === */
/* Subtle 1px rule above headline */
.hero-content::before {
  content: "";
  position: absolute;
  top: -2rem;
  left: 0;
  width: 4rem;
  height: 1px;
  background: rgba(43, 43, 43, 0.15);
  pointer-events: none;
}

/* === HERO HEADLINE === */
/* Confident, readable - not oversized */
.hero-headline {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 4.5vw, 3.25rem); /* 36px → 4.5vw → 52px */
  font-weight: 600; /* Confident, not heavy */
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--ink-warm);
  margin: 0 0 1.5rem 0;
}

/* === HERO SUBTITLE === */
/* Clear professional statement */
.hero-subtitle {
  font-family: var(--font-body);
  font-size: clamp(1.125rem, 2vw, 1.375rem); /* 18px → 2vw → 22px */
  font-weight: 400; /* Regular, not light */
  line-height: 1.65;
  color: var(--ink-soft);
  margin: 0 0 2rem 0;
  max-width: 60ch;
}

/* === HERO CTA === */
/* Density accent for primary action */
.hero-cta {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  color: var(--accent-density);
  text-decoration: none;
  border-bottom: 2px solid var(--accent-density); /* Density emphasis */
  padding-bottom: 3px;
  display: inline-block;
  transition: opacity 0.2s ease;
}

.hero-cta:hover {
  opacity: 0.65;
}

/* === HERO PORTRAIT (Optional) === */
/* Editorial figure - appears after copy, not beside */
.hero-portrait {
  width: 280px;
  height: 320px;
  margin: 3rem 0 0 0;
  object-fit: cover;
  object-position: center;
  opacity: 0.88;
  mix-blend-mode: multiply;
  filter: saturate(0.85) contrast(0.95); /* Muted color, not grayscale */
}
```

### Hero Structure

```html
<!-- Single column hero - authority signal -->
<section class="hero-section">
  <div class="hero-content">
    <h1 class="hero-headline">Shawn Becker</h1>
    <p class="hero-subtitle">
      Product-minded engineer. I build systems that scale, design interfaces
      that work, and solve problems that matter.
    </p>
    <a href="/work" class="hero-cta">See my work</a>

    <!-- Optional portrait - editorial figure -->
    <img src="/portrait.jpg" alt="Shawn Becker" class="hero-portrait" />
  </div>
</section>
```

**Why single column**:

- Split layout suggests agency/portfolio
- Single column suggests authority and authorship
- You are closer to author-expert than studio

---

## 4. TEXTURE: Subtle Paper Grain

### Refined Grain Treatment

**Actual implementation**: 0.05 opacity - subtle but perceptible warmth

```css
/* === PAPER GRAIN === */
/* Subtle texture for warmth without distraction */
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" /></filter><rect width="400" height="400" filter="url(%23grain)" opacity="0.06" /></svg>');
  opacity: 0.05; /* Subtle but visible grain texture */
  mix-blend-mode: multiply;
  pointer-events: none;
  z-index: 1;
}
```

### Decorative Radial Gradients

**Subtle depth elements** - barely perceptible radial gradients for visual interest

```css
/* === RADIAL DEPTH === */
/* Used sparingly for editorial hierarchy */
.hero-right-column::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  pointer-events: none;
  z-index: -1;
}
```

### Paper Texture on Sections

```css
/* === SECTION BACKGROUND VARIATION === */
/* Subtle alternating backgrounds for rhythm */
section:nth-child(even) {
  background: var(--paper-mid);
}

section:nth-child(odd) {
  background: var(--paper-warm);
}
```

---

## 5. SPACING: Generous Breathing Room

### Vertical Rhythm

**Key principle**: Use whitespace generously to avoid density

```css
/* === SPACING SCALE === */
:root {
  --space-xs: 0.5rem; /* 8px */
  --space-sm: 0.75rem; /* 12px */
  --space-md: 1rem; /* 16px */
  --space-lg: 1.5rem; /* 24px */
  --space-xl: 2rem; /* 32px */
  --space-2xl: 3rem; /* 48px */
  --space-3xl: 4rem; /* 64px */
  --space-4xl: 6rem; /* 96px */
  --space-5xl: 8rem; /* 128px */
}

/* === SECTION SPACING === */
section {
  padding: var(--space-4xl) var(--space-xl);
}

/* === CONTENT SPACING === */
.content-block {
  margin-bottom: var(--space-3xl);
}

/* === PARAGRAPH SPACING === */
p + p {
  margin-top: 1.5rem; /* Generous between paragraphs */
}

p + h2,
p + h3 {
  margin-top: 3rem; /* Strong section break */
}
```

### Horizontal Rhythm

```css
/* === READING MEASURE === */
/* Optimal line length for comfortable reading */
.prose {
  max-width: 65ch; /* 65 characters - optimal readability */
}

.prose-narrow {
  max-width: 55ch; /* Tighter for emphasis */
}

.prose-wide {
  max-width: 75ch; /* Slightly wider for technical content */
}
```

---

## 6. LAYOUT: Context-Aware Widths

### Page Structure: Adaptive to Content Type

**Context-aware widths** - you explain systems, not just write essays.

**Width guidelines**:

- **Reading pages** (essays, about): 65ch optimal line length (~700px)
- **Case studies / technical pages**: up to 1000-1100px for diagrams, code
- **Code blocks**: allowed wider overflow for readability

```css
/* === PAGE LAYOUT: Reading Pages === */
.page-container {
  max-width: 700px; /* Optimal for reading */
  margin: 0 auto;
  padding: 0 2rem;
}

/* === PAGE LAYOUT: Technical/Work Pages === */
.page-container-wide {
  max-width: 1100px; /* Wider for case studies, diagrams */
  margin: 0 auto;
  padding: 0 2rem;
}

/* === CODE BLOCKS: Allow Overflow === */
pre {
  max-width: 100%;
  overflow-x: auto; /* Horizontal scroll for long code */
}

/* === PROSE SECTIONS WITHIN WIDE LAYOUTS === */
.page-container-wide .prose {
  max-width: 65ch; /* Constrain text within wide layout */
  margin-left: 0;
}

@media (min-width: 900px) {
  .page-container {
    padding: 0 3rem;
  }

  .page-container-wide {
    padding: 0 3rem;
  }
}
```

**Usage**:

- `/about`, `/writing/*` → `.page-container` (reading width)
- `/work/*`, `/projects/*` → `.page-container-wide` (technical width)

### Section Dividers

**Minimal, understated** - no decorative elements

```css
/* === SECTION DIVIDER === */
/* Subtle horizontal rule */
hr,
.divider {
  width: 100%;
  height: 1px;
  background: var(--border-subtle);
  border: none;
  margin: var(--space-4xl) 0;
}

/* === SPACER DIVIDER === */
/* Whitespace divider - no line */
.divider-space {
  height: var(--space-4xl);
  background: transparent;
}
```

---

## 7. IMAGERY: Muted Color Treatment

### Photo Treatment

**Full color with reduced saturation** - professional and contemporary, not nostalgic

```css
/* === IMAGES === */
img {
  display: block;
  max-width: 100%;
  height: auto;
  /* Muted color - NOT grayscale */
  filter: saturate(0.85) contrast(0.95); /* Reduced saturation, not duotone */
  opacity: 0.9;
  mix-blend-mode: multiply;
}

/* === FIGURE ELEMENT === */
figure {
  margin: var(--space-3xl) 0;
}

figcaption {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  margin-top: var(--space-sm);
  text-align: center;
}
```

---

## 8. NAVIGATION: Intentional Hierarchy

### Navigation Order and Structure

**Ordering principle**: Employers care about what you do first, not who you are.

**Required structure**:

1. **Left**: Name or mark (logo link to home)
2. **Center/Right**: Primary links (work-first ordering)
   - Work / Projects
   - Writing / Thinking
   - About
   - Contact
3. **Right end**: Meta links (GitHub, LinkedIn) - visually secondary

**Active state**: Uses density accent for orientation cue

```css
/* === NAVIGATION === */
nav {
  width: 100%;
  padding: 1.25rem 2rem; /* Slightly reduced height */
  background: var(--paper-warm);
  border-bottom: 1px solid var(--border-subtle);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
  background: rgba(250, 250, 248, 0.95);
}

/* === NAVIGATION CONTAINER === */
.nav-container {
  max-width: 1100px; /* Consistent with page container */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

/* === LOGO/NAME === */
.nav-logo {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--ink-warm);
}

/* === PRIMARY LINKS === */
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 2rem;
  align-items: baseline;
}

nav a {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-secondary);
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
  transition:
    opacity 0.2s ease,
    border-bottom-color 0.2s ease;
}

nav a:hover {
  opacity: 0.65;
}

/* === ACTIVE STATE: Density Accent === */
nav a.active {
  color: var(--accent-density);
  border-bottom: 2px solid var(--accent-density); /* Thickness for emphasis */
  font-weight: 500;
}

/* === META LINKS === */
.nav-meta {
  display: flex;
  gap: 1rem;
  opacity: 0.5; /* Visually secondary */
}

.nav-meta a:hover {
  opacity: 0.7;
}
```

### Navigation HTML Structure

```html
<nav>
  <div class="nav-container">
    <a href="/" class="nav-logo">Shawn Becker</a>
    <ul>
      <li><a href="/work" class="active">Work</a></li>
      <li><a href="/writing">Writing</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
    <div class="nav-meta">
      <a href="https://github.com/username">GitHub</a>
      <a href="https://linkedin.com/in/username">LinkedIn</a>
    </div>
  </div>
</nav>
```

---

## 9. FOOTER: Editorial Colophon

### Minimal Footer

```css
/* === FOOTER === */
footer {
  padding: var(--space-4xl) var(--space-xl);
  background: var(--paper-warm);
  border-top: 1px solid var(--border-subtle);
  margin-top: var(--space-5xl);
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--ink-warm);
}

.footer-copyright {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## 10. INTERACTION: Subtle Transitions

### Hover States

**No color changes** - use opacity and subtle transforms

```css
/* === LINK HOVER === */
a {
  transition: opacity 0.2s ease;
}

a:hover {
  opacity: 0.65;
}

/* === BUTTON HOVER === */
button {
  transition:
    opacity 0.2s ease,
    transform 0.15s ease;
}

button:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

/* === CARD HOVER === */
.card {
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(28, 28, 28, 0.08);
}
```

---

## 11. TYPOGRAPHY CADENCE: Reading Rhythm

### Elements for Varied Pacing

```css
/* === EMPHASIZED TEXT === */
em,
i {
  font-style: italic;
  color: var(--ink-soft);
}

strong,
b {
  font-weight: 600;
  color: var(--ink-warm);
}

/* === LISTS === */
ul,
ol {
  margin: 1.5rem 0;
  padding-left: 2rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

li {
  margin-bottom: 0.5rem;
}

/* === CODE BLOCKS === */
code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  padding: 0.2em 0.4em;
  background: var(--paper-mid);
  border-radius: 3px;
  color: var(--ink-warm);
}

pre {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.6;
  padding: 1.5rem;
  background: var(--paper-mid);
  border-left: 2px solid var(--border-medium);
  overflow-x: auto;
  margin: 2rem 0;
}
```

---

## 12. WORK PRESENTATION PRINCIPLES

### How to Present Technical Work

**Goal**: Show credibility through reasoning, not just visuals.

This aligns perfectly with your product + systems background. Employers scan for proof of competence.

### Presentation Guidelines

**Content principles**:

1. **Fewer projects, more depth** - 3-5 strong case studies > 20 thumbnails
2. **Clear problem → decision → outcome** - show your thinking, not just the result
3. **No thumbnails without text** - every visual must have explanatory context
4. **Emphasis on reasoning** - explain WHY, not just WHAT
5. **Concrete metrics when possible** - "Reduced load time by 40%" > "Improved performance"

**Structure for case studies**:

```html
<article class="work-case-study">
  <header>
    <h2>Project Name</h2>
    <p class="meta">Role • Tech Stack • Timeline</p>
  </header>

  <section class="problem">
    <h3>Problem</h3>
    <p>What needed solving and why it mattered</p>
  </section>

  <section class="approach">
    <h3>Approach</h3>
    <p>Your decision-making process and trade-offs considered</p>
  </section>

  <section class="outcome">
    <h3>Outcome</h3>
    <p>Results with concrete metrics or user impact</p>
  </section>

  <!-- Optional: Technical details -->
  <section class="technical-details">
    <h4>Technical Highlights</h4>
    <ul>
      <li>Architecture decisions with rationale</li>
      <li>Interesting technical challenges solved</li>
      <li>Code samples or diagrams (use .page-container-wide)</li>
    </ul>
  </section>
</article>
```

**What to avoid**:

- Thumbnail grids without context
- "Tech stack laundry lists" without explanation
- Results without showing the problem
- Visuals without captions or context
- Decoration over substance

**The test**: Can a senior engineer scan your work page and understand your competence in 30 seconds?

---

## 13. BEFORE/AFTER COMPARISON

| Element                | Inky Minimalism                   | Editorial Monochrome           |
| ---------------------- | --------------------------------- | ------------------------------ |
| **Philosophy**         | Scale, Texture, Precision         | Material, Rhythm, Restraint    |
| **Colors**             | Linen + Ink + Burnt Sienna accent | Warm whites + Warm blacks only |
| **Accent Color**       | Burnt sienna (4 locations)        | **NONE** - pure monochrome     |
| **Background**         | Raw linen #F4F1EA                 | Warm paper #FAFAF8             |
| **Text**               | All ink #1A1A1B                   | Warm near-black #1C1C1C        |
| **Hero Size**          | 100vh full-screen, 15vw text      | **60vh compact, 5vw text**     |
| **Hero Fits Viewport** | No - requires scroll              | **Yes - fully visible**        |
| **Typography**         | Massive scale for impact          | **Refined scale for reading**  |
| **Grain Opacity**      | 0.08 (heavy, tactile)             | **0.04 (subtle, warm)**        |
| **Layout**             | Split 40/60 hero                  | **Single column centered**     |
| **Spacing**            | Minimal offset                    | **Generous breathing room**    |
| **Borders**            | None - negative space             | **1px subtle borders**         |
| **Images**             | Duotone (linen + sienna)          | **Grayscale + slight sepia**   |
| **Navigation**         | Floating translucent              | **Sticky top bar**             |
| **Footer**             | Colophon with mono+serif          | **Editorial colophon**         |
| **Interaction**        | Font weight changes               | **Opacity transitions**        |
| **Warmth Source**      | Burnt sienna accent               | **Paper tone + warm blacks**   |
| **Reading Feel**       | Bold, geometric                   | **Calm, editorial**            |

---

## 13. KEY PRINCIPLES

### 1. Material Warmth

- Warm paper base (beige undertone)
- Warm blacks (not pure #000)
- Warm grays (slight sepia)
- Subtle grain (0.04 opacity)

### 2. Typographic Rhythm

- Weight contrast (light 300 vs bold 800)
- Size contrast (refined scale)
- Spacing cadence (generous breathing room)
- Reading elements (drop caps, pull quotes, sidenotes)

### 3. Single Column Authority

- **55-65vh hero** - fits in viewport
- **Single column** - author-expert signal, not agency portfolio
- **Portrait below copy** - editorial figure, not side-by-side

### 4. Density-Based Hierarchy

- **No hue accents** - warm monochrome only
- **Density contrast for orientation** - active nav, section markers, primary CTAs
- **Editorial decoration** - hairlines, section numbers, radial gradients (extremely subtle)

### 5. Editorial Quality

- Optimal line length (65ch)
- Generous line height (1.7)
- Clear hierarchy
- Breathing room between sections

---

## 14. PRECISION REFINEMENTS

**Note**: Current site already follows the design system. These are micro-adjustments only.

### A. Decorative Rules Consolidation

**Single coherent implementation** - no stacking, no variation.

```css
/* === GRAIN: Single Global Layer === */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" /></filter><rect width="400" height="400" filter="url(%23grain)" opacity="0.06" /></svg>');
  opacity: 0.04;           /* Extremely subtle */
  mix-blend-mode: multiply;
  pointer-events: none;
  z-index: 1;
}
/* DO NOT add grain to hero or sections - single layer only */

/* === HAIRLINES: Structural Only === */
/* Only for baseline of headlines or section separators */
.hero-content::before {
  content: "";
  position: absolute;
  top: -2rem;
  left: 0;
  width: 4rem;             /* Structural, not decorative */
  height: 1px;
  background: rgba(43, 43, 43, 0.15);
}
/* DO NOT use hairlines as decorative accents */

/* === GRADIENTS: Minimal Depth Only === */
/* Only for barely perceptible depth - one per major container */
.hero-right-column::before {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.02) 0%,  /* Reduced from 0.03 */
    rgba(255, 255, 255, 0) 70%
  );
}
/* DO NOT stack gradients or vary by section */
```

**Rules**:
- Grain: single fixed layer, never sectional
- Hairlines: structural separators only
- Gradients: one per container max, extremely subtle

### B. Image Treatment Consistency

**Full color with muted treatment** - no grayscale/sepia/duotone.

```css
/* === ALL IMAGES === */
img {
  display: block;
  max-width: 100%;
  height: auto;
  filter: saturate(0.82) contrast(0.92);  /* Muted, not grayscale */
  opacity: 0.90;
  mix-blend-mode: multiply;
}

/* Maintains natural skin tones while reducing vibrancy */
/* NO grayscale(), NO sepia(), NO duotone */
```

**Portrait treatment**:
```css
.hero-portrait {
  width: 280px;
  height: 320px;
  object-fit: cover;
  object-position: center;           /* Editorial crop acceptable */
  filter: saturate(0.82) contrast(0.92);
  opacity: 0.90;
  mix-blend-mode: multiply;
}
```

### C. Header/Navigation Refinement

**Improved legibility** - one adjustment only.

```css
/* === NAVIGATION CONTAINER === */
.nav-container {
  max-width: 700px;                  /* Aligned with .page-container */
  margin: 0 auto;
}

/* === LEGIBILITY IMPROVEMENT (choose ONE) === */
nav a {
  font-size: 0.9375rem;              /* Option 1: Slightly larger (15px) */
  /* OR opacity: 0.85; */            /* Option 2: Increased default opacity */
  /* OR letter-spacing: 0.04em; */   /* Option 3: Reduced letter-spacing */
}

/* === ICON CONSISTENCY === */
.nav-utility-icons svg {
  width: 18px;                       /* Match nav text optical weight */
  height: 18px;
  stroke-width: 1.5;
  opacity: 0.5;                      /* Same rhythm as nav links */
}
```

**Implementation**: Choose font-size increase for best readability.

### D. Hero Readability Micro-Adjustments

**Spacing and contrast refinement** - no font/color changes.

```css
/* === HERO SPACING === */
.hero-headline {
  margin: 0 0 1.25rem 0;             /* Reduced from 1.5rem */
}

.hero-subtitle {
  margin: 0 0 2.5rem 0;              /* Increased from 2rem */
  line-height: 1.7;                  /* Increased from 1.65 */
}

/* === CONTRAST IMPROVEMENT === */
.hero-headline {
  color: #2b2b2b;                    /* Slightly darker than var(--ink-warm) */
}

.hero-subtitle {
  color: #3a3a3a;                    /* Improved readability */
}

/* === HEIGHT CONSTRAINT === */
.hero-section {
  min-height: 55vh;
  max-height: 60vh;                  /* Restrained - no scroll required */
  padding: 5rem 2rem 4rem;           /* Reduced top padding */
}
```

**Result**: Calm deliberate spacing, improved scannability, restrained height.

---

---

---

## 18. EDITORIAL DECORATIVE ELEMENTS (Allowed)

The design system allows **subtle editorial decoration** for visual hierarchy and rhythm:

### Allowed Decorative Elements

**1. Editorial Hairlines**

- 1px subtle rules: `rgba(43, 43, 43, 0.15)` or `rgba(43, 43, 43, 0.12)`
- Used to create visual breaks and hierarchy
- Example: Hero content hairline extends into image column

**2. Large Section Numbers**

- Very low opacity (0.02-0.04) decorative numerals
- Font size: 7-12rem
- Positioned behind content as visual markers
- Example: "01", "02", "03" for major sections

**3. Radial Gradients for Depth**

- Extremely subtle: `rgba(255, 255, 255, 0.03)`
- Used to create barely perceptible depth
- Applied to backgrounds, not interactive elements

**4. Vertical Side Text**

- Rotated -90deg metadata labels
- Very low opacity (0.25)
- Monospace uppercase micro-text
- Example: "Portfolio / About" on page edge

**5. Stepped Diagonal Layouts**

- Progressive `translateX` offsets for visual rhythm
- Creates editorial "broken grid" aesthetic
- Example: Value items at 0, 2rem, 4rem, 6rem offsets

**6. Photo Metadata Captions**

- Small monospace labels overlaid on photos
- Semi-transparent backgrounds with backdrop blur
- Example: "DSC01657 / Berlin 2024"

### Decoration Guidelines

**What's allowed:**

- Elements that enhance hierarchy and rhythm
- Extremely subtle opacity (0.02-0.15)
- Warm monochrome only (no color accents)
- Editorial character (refined, not playful)

**What's forbidden:**

- Color accents (burnt sienna, blue, etc.)
- Heavy decoration (thick borders, backgrounds)
- Playful elements (emojis, icons, illustrations)
- Anything that distracts from content

**The rule:** Decoration should be **barely perceptible** and **editorially purposeful**.

---

End of Editorial Monochrome Design System
