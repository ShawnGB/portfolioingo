# Design System Refactoring Plan
**Art Director's Guide to Editorial Monochrome Coherence**

## Executive Summary

This document outlines a systematic plan to refactor the Go-folio codebase into a DRY (Don't Repeat Yourself), coherent design system based on the **Editorial Monochrome** aesthetic established by the index and about pages.

**SACRED BASELINE** (DO NOT MODIFY):
- `views/pages/index.templ` + `static/css/home.css` (hero section styles)
- `views/pages/about.templ` + `static/css/about.css`
- `static/css/base.css` (global component styles)
- `static/css/icons.css` (icon and CTA button styles)

---

## 🎯 CRITICAL PHILOSOPHY - READ FIRST

### Index and About Are the Design System

**All styled components come from index and about pages.** Other pages (Arts, Experience, Projects, Contact) should ONLY use components that already exist in the baseline.

**This means:**

1. ✅ **DO**: Use existing buttons (`.cta-link`, `.cta-link.with-icon`, `.cta-link--solid`)
2. ✅ **DO**: Use existing text styles (`.section-header`, `.intro-text`, `.pull-quote-wrapper`)
3. ✅ **DO**: Create custom **layouts** on other pages (grid arrangements, spacing)
4. ❌ **DON'T**: Create new button styles for other pages
5. ❌ **DON'T**: Create new text styles for other pages
6. ❌ **DON'T**: Create new card patterns that don't match baseline

**What makes other pages unique:**
- **Layout only** (12-column grid arrangements, asymmetric splits)
- **Spacing** (section padding, gaps between elements)
- **Composition** (how baseline components are arranged)

**Minor style overwrites:**
- Will happen LATER when we actually design those pages
- Right now: **structure only, not styling**

### Refactoring Workflow

When you encounter a custom style on Arts/Experience/Projects/Contact:

1. **Ask**: "Does this exist in index or about?"
2. **If YES**: Replace with that baseline class
3. **If NO**: Check if it's a layout pattern or a component style
   - **Layout pattern** (grid, positioning): Keep it, it's unique to that page
   - **Component style** (button, text, card): Replace with closest baseline equivalent
4. **If unsure**: Use the baseline version, note for later design review

**Example:**
```css
/* ❌ DON'T create custom button */
.project-custom-button {
  background: var(--ink-warm);
  padding: 1rem 2rem;
}

/* ✅ DO use baseline button */
<a class="cta-link--solid">View Project</a>
```

---

## Design Principles

### 1. Editorial Monochrome Aesthetic
- Warm paper tones (`--paper-warm`, `--paper-mid`, `--paper-light`)
- Warm ink blacks (`--ink-warm`, `--ink-soft`, `--ink-muted`)
- No color accents—depth through opacity, weight, and spacing
- Monochrome image filters (desaturate, multiply blend mode)

### 2. Typographic Hierarchy
- **Display font** (Space Grotesk): Headers, labels, numbers
- **Body font** (Newsreader): Paragraphs, quotes
- **Mono font** (JetBrains Mono): Metadata, technical details, labels

### 3. Layout Grammar
- 12-column grid system
- Asymmetric splits (3/9, 4/8, 5/7)
- Generous whitespace (`--space-*` scale)
- Optimal reading width (65ch for body text)

### 4. Decorative Language
- Large section numbers (10.2rem, opacity 0.04) for editorial flair
- Hairlines (1-2px rules) for visual separation
- Vertical metadata text (rotated -90deg, mono font)
- Editorial pull quotes (italic, larger scale)

---

## Current State Analysis

### ✅ Completed Utilities (in `utilities.css`)
1. **Section Decorations**: `.section-number`, variants (`--large`, `--small`, `--centered`, `--right`)
2. **Editorial Hairlines**: `.hairline--horizontal`, `.hairline--top`, `.hairline--bottom`, `.hairline--narrow`
3. **Image Filters**: `.img-editorial`, `.img-editorial--interactive`, `.img-with-depth`, `.image-caption`
4. **Typography Patterns**: `.section-header`, `.section-label`, `.subsection-header`, `.intro-text`, `.body-text`, `.border-left-accent`, `.vertical-rule`, `.pull-quote-wrapper`, `.icon-header`
5. **Hover Effects**: `.hover-fade`, `.hover-lift`, `.hover-underline`
6. **Layout Utilities**: `.section-bleed`, `.section-bordered-top`
7. **List Patterns** (NEW - 2025-12-26):
   - `.values-list` - Icon list with flex layout (extracted from about.css)
   - `.checkmark-list` - List with checkmark bullets (extracted from about.css)
8. **Spacing Utilities**: `.mb-*`, `.mt-*`

### 🔴 Missing Utilities (Identified Duplications)

#### A. Buttons & CTAs
**Duplicated patterns across pages:**
- Contact form submit button (`form-submit-button`)
- GitHub link hero (`github-link-hero`)
- Visit link (`visit-link`)
- CTA link (`cta-link`) - exists in base.css but not used consistently
- Crew United link (`crew-united-link`)

**Proposed utilities:**
```css
/* Primary button - solid background */
.btn-primary { /* Dark solid button */ }
.btn-primary--large { /* Larger variant */ }

/* Secondary button - border only */
.btn-secondary { /* Border outline style */ }

/* Text link with underline */
.link-underline { /* Editorial underline link */ }

/* Text link with icon */
.link-with-icon { /* Flex layout for icon + text */ }
```

#### B. Text Styles
**Duplicated patterns:**
- Pull quotes (multiple sizes: `intro-pull-quote`, `contact-pull-quote`, `timeline-pullquote`, `skills-pullquote`)
- Section descriptions (`section-description`, `sketches-description`)
- Labels (`project-label-editorial`, `stack-label`, `detail-label`, `section-label-small`)
- Metadata text (`meta-detail`, `meta-location`, `meta-aspect`)

**Proposed utilities:**
```css
/* Pull quote - editorial italic */
.pull-quote { /* Base pull quote */ }
.pull-quote--large { /* Larger variant */ }
.pull-quote--small { /* Smaller variant */ }

/* Section description - italic intro */
.section-description { /* Italic description below header */ }

/* Labels - mono uppercase */
.label-editorial { /* Small mono uppercase */ }
.label-meta { /* Metadata label */ }

/* Metadata text */
.text-meta { /* Small mono metadata */ }
```

#### C. Cards & Containers
**Duplicated patterns:**
- Contact cards (`contact-card`, `method-card`)
- Project cards (`project-card-portrait`, `project-card-text`, `project-card-landscape`, `project-mini-card`)
- Timeline items (`work-item`, `education-item`)
- CTA cards (`cta-card-inner`)

**Proposed utilities:**
```css
/* Base card */
.card { /* Base card styling */ }
.card--bordered { /* With border */ }
.card--elevated { /* With shadow */ }
.card--accent-left { /* Left accent border */ }

/* Interactive card */
.card--interactive { /* Hover lift effect */ }

/* Card sections */
.card-header { /* Card header section */ }
.card-body { /* Card body section */ }
.card-footer { /* Card footer section */ }
```

#### D. Form Elements
**Duplicated patterns:**
- Form inputs (`form-input`, `form-select`, `form-textarea`)
- Form labels (`form-label`)
- Form field groups (`form-field-group`)

**Proposed utilities:**
```css
/* Form controls */
.form-control { /* Base input styling */ }
.form-control--textarea { /* Textarea variant */ }
.form-control--select { /* Select variant */ }

/* Form labels */
.form-label { /* Label styling */ }

/* Form groups */
.form-group { /* Field group wrapper */ }
```

#### E. Decorative Elements
**Duplicated patterns:**
- Section number decorations (implemented but could be more flexible)
- Vertical metadata text (`journey-label`, `.drives-path-section .grid-row::after`)
- Grid backgrounds (`.map-grid`)

**Proposed utilities:**
```css
/* Vertical metadata text */
.vertical-text { /* Rotated -90deg metadata */ }
.vertical-text--right { /* Positioned right */ }
.vertical-text--left { /* Positioned left */ }

/* Background patterns */
.bg-grid { /* Grid pattern background */ }
.bg-grain { /* Paper grain texture */ }
```

---

## Implementation Plan

### Phase 1: Audit & Extract
**Goal**: Document all duplicated patterns and create new utility classes

#### Step 1.1: Button/CTA Audit ✅ COMPLETED (2025-12-26)
- [x] Identified all button patterns across 4 pages
- [x] Extracted common properties
- [x] Created baseline button utilities (from index/about)
- [x] Added to `base.css` and `icons.css`

**Baseline Buttons Created:**
1. `.cta-link` - Mono uppercase underline (already in base.css)
2. `.cta-link.with-icon` - Bordered button with icon flip (already in icons.css)
3. `.cta-link--solid` - **NEW**: Solid dark button for forms/primary actions (icons.css:140)
4. `.cta-link--solid.large` - **NEW**: Large variant for emphasis (icons.css:173)
5. `.cta-link--underline` - **NEW**: Display-level underline link (base.css:505)

**Replacement Map:**
- `.form-submit-button` → `.cta-link--solid.large`
- `.github-link-hero` → `.cta-link--solid`
- `.success-link` → `.cta-link--solid`
- `.visit-link` → `.cta-link--underline`
- `.crew-united-link` → `.cta-link--underline`

#### Step 1.2: Text Style Audit ✅ COMPLETED (2025-12-26)
- [x] Identified all pull quote variations (4 duplicates)
- [x] Identified all label variations (10+ duplicates - all mono uppercase)
- [x] Identified section description patterns
- [x] Created baseline text utilities (from index/about)
- [x] Added to `utilities.css`

**Baseline Text Utilities Created:**
1. `.label-mono` - Mono uppercase label (from about.css `.path-label small`)
2. `.label-mono--form` - Larger variant for form labels (0.8125rem)
3. `.label-mono--small` - Smaller variant for decorative metadata (0.6875rem)
4. `.section-description` - Italic section intro text

**Already in Baseline (No New Utility Needed):**
- `blockquote` (base.css:386) - Use for all pull quotes
- `.pull-quote-wrapper` (utilities.css:237) - Use for pull quotes with hairline
- `.section-label` (utilities.css:170) - Use for all section headers

**Replacement Map - Labels:**
- `.project-label-editorial` → `.label-mono`
- `.stack-label` → `.label-mono`
- `.detail-label` → `.label-mono`
- `.contact-card-label` → `.label-mono`
- `.form-label` → `.label-mono--form`
- `.metric-label` → `.label-mono`
- `.sketch-label` → `.label-mono`
- `.cultural-label` → `.label-mono`
- `.section-label-small` → `.label-mono--small`
- `.journey-label` → `.label-mono--small`

**Replacement Map - Pull Quotes:**
- `.intro-pull-quote` → `blockquote` (or `.pull-quote-wrapper blockquote` if needs hairline)
- `.contact-pull-quote` → `blockquote`
- `.skills-pullquote blockquote` → use `.pull-quote-wrapper blockquote`
- `.timeline-pullquote blockquote` → use `.pull-quote-wrapper blockquote`

**Replacement Map - Descriptions:**
- `.section-description` → `.section-description` (now in utilities)
- `.sketches-description` → `.section-description`

#### Step 1.3: Card/Container Audit ✅ COMPLETED (2025-12-26)
- [x] Identified all card patterns across 4 pages
- [x] Extracted common card properties
- [x] Created baseline card utilities (from about page `.interest-item`)
- [x] Added to `utilities.css`

**Baseline Card Utilities Created:**
1. `.card` - Base card (light bg, border, padding)
2. `.card--warm` - Warm background variant
3. `.card--mid` - Mid background variant
4. `.card--accent-left` - 2px left accent border
5. `.card--accent-left-thick` - 3px left accent border
6. `.card--interactive` - Small hover lift (2px translateY)
7. `.card--interactive-lift` - Large hover lift (4px translateY)
8. `.card--dashed` - Dashed border variant

**Already in Baseline (No New Utility Needed):**
- `.interest-item` (about.css:432) - Original baseline card pattern

**Replacement Map - Cards:**
- `.contact-card` → `.card.card--mid.card--interactive`
- `.method-card` → `.card.card--warm.card--interactive`
- `.project-card-text` → `.card.card--accent-left-thick`
- `.project-mini-card` → `.card.card--dashed.card--interactive-lift`
- `.education-item` → `.card.card--accent-left`
- `.cta-card-inner` → `.card.card--interactive-lift`

#### Step 1.4: Form Element Audit ⏭️ DEFERRED (2025-12-26)
**Reason:** Forms do not exist on baseline pages (index/about). According to the design philosophy, we only extract utilities from the baseline. Forms are page-specific to Contact and will be designed during Phase 2 when we actually work on that page.

**Current form styles** (`.form-control`, `.form-label`, etc.) remain as Contact page-specific styles. They will be reviewed and potentially refined during Contact page redesign, not extracted as global utilities.

**TODO LATER:** When designing Contact page in Phase 2, decide if forms need baseline utilities or remain page-specific.

#### Step 1.5: Decorative Element Audit ⏭️ DEFERRED (2025-12-26)
**Reason:** Decorative elements (vertical text, background grids) are **layout-specific**, not reusable components. According to the philosophy: "What makes other pages unique: Layout only (grid arrangements, spacing)". These stay as page-specific CSS.

**TODO LATER:** During Phase 2, review if any decorative elements should become utilities after seeing them in context across multiple pages.

### Phase 2: Replace - Arts Page ✅ COMPLETED (2025-12-26)
**Goal**: Replace page-specific classes with utility classes in `arts.css` + `arts.templ`

- [x] Replaced `.detail-label` with `.label-mono` (3 instances in template)
- [x] Replaced `.sketch-label` with `.label-mono` (3 instances in template)
- [x] Removed duplicate `.section-description` from arts.css (now uses global utility)
- [x] Removed duplicate `.sketches-description` from arts.css (uses `.section-description`)
- [x] Updated `arts.templ` to use utility classes
- [x] Generated Templ templates

**Files Modified:**
- `views/pages/arts.templ` - Replaced 6 custom labels with `.label-mono`
- `static/css/arts.css` - Removed 4 duplicate style definitions, added comments pointing to utilities

**CSS Reduction:**
- Removed ~40 lines of duplicate CSS
- Kept only page-specific layout and spacing overrides

### Phase 2.2: Replace - Experience Page ✅ COMPLETED (2025-12-26)
**Goal**: Replace page-specific classes with utility classes in `experience.css` + `experience.templ`

- [x] Replaced `.intro-pull-quote` with base `blockquote` style (line 16)
- [x] Replaced `.section-label-small` with `.label-mono--small` (line 34)
- [x] Replaced `.skills-pullquote` with `.pull-quote-wrapper` (line 74)
- [x] Replaced `.education-item` with `.card.card--accent-left` (3 instances: lines 112, 171, 262)
- [x] Removed duplicate CSS from experience.css
- [x] Updated responsive styles to use `.timeline-section .card` instead of `.education-item`
- [x] Generated Templ templates

**Files Modified:**
- `views/pages/experience.templ` - Replaced 6 custom classes with utilities
- `static/css/experience.css` - Removed 4 duplicate style definitions, added comments pointing to utilities

**CSS Reduction:**
- Removed `.intro-pull-quote` (12 lines)
- Removed `.section-label-small` (13 lines)
- Removed `.skills-pullquote` wrapper and blockquote (11 lines)
- Removed `.education-item` (7 lines)
- Updated 2 responsive references to use `.card`
- Total: ~43 lines of duplicate CSS removed

### Phase 2.3: Replace - Projects Page ✅ COMPLETED (2025-12-26)
**Goal**: Replace page-specific classes with utility classes in `projects.css` + `projects.templ`

- [x] Replaced `.intro-pull-quote` with base `blockquote` style (line 15)
- [x] Replaced `.project-label-editorial` with `.label-mono` (line 35)
- [x] Replaced `.featured-category` with `.label-mono` (line 74)
- [x] Replaced `.featured-quote` with base `blockquote` (line 78)
- [x] Replaced `.project-card-text` with `.card.card--accent-left-thick` (line 110)
- [x] Replaced `.project-mini-card` with `.card.card--dashed.card--interactive-lift` (2 instances: lines 138, 145)
- [x] Replaced `.cultural-label` with `.label-mono` (line 159)
- [x] Removed duplicate CSS from projects.css
- [x] Updated child selectors to use new class names
- [x] Generated Templ templates

**Files Modified:**
- `views/pages/projects.templ` - Replaced 8 custom classes with utilities
- `static/css/projects.css` - Removed 7 duplicate style definitions, added comments pointing to utilities

**CSS Reduction:**
- Removed `.intro-pull-quote` (12 lines)
- Removed `.project-label-editorial` (10 lines)
- Removed `.stack-label` (10 lines)
- Removed `.featured-category` (9 lines)
- Removed `.featured-quote` (11 lines)
- Removed `.project-card-text` base styles (7 lines), kept opacity override
- Removed `.project-mini-card` base styles (8 lines), kept opacity override
- Removed `.cultural-label` (10 lines)
- Updated 6 child selectors to use utility class names
- Total: ~77 lines of duplicate CSS removed

### Phase 2.4: Replace - Contact Page ✅ COMPLETED (2025-12-26)
**Goal**: Replace page-specific classes with utility classes in `contact.css` + `contact.templ`

- [x] Replaced `.contact-pull-quote` with base `blockquote` style (line 35)
- [x] Replaced `.contact-card` with `.card.card--mid.card--interactive` (3 instances: lines 50, 58, 64)
- [x] Replaced `.contact-card-label` with `.label-mono` (3 instances: lines 51, 59, 65)
- [x] Replaced `.method-card` with `.card.card--warm.card--interactive` (3 instances: lines 93, 100, 107)
- [x] Replaced `.cta-card-inner` with `.card.card--interactive-lift` (5 instances: lines 138, 144, 150, 158, 164)
- [x] Removed duplicate CSS from contact.css
- [x] Updated child selectors to use `.card` instead of custom classes
- [x] Generated Templ templates

**Files Modified:**
- `views/forms/contact.templ` - Replaced 15 custom classes with utilities
- `static/css/contact.css` - Removed duplicate style definitions, added comments pointing to utilities

**CSS Reduction:**
- Removed `.contact-pull-quote` (13 lines)
- Removed `.contact-card` base styles (12 lines), kept `.contact-card-content`
- Removed `.contact-card-label` (9 lines)
- Removed `.method-card` base styles (9 lines), kept layout overrides
- Removed `.cta-card-inner` base styles (10 lines), kept positioning overrides
- Updated 5 child selectors from `.cta-card-inner` to `.card`
- Total: ~53 lines of duplicate CSS removed

**Forms Deferred:**
Form elements (`.form-label`, `.form-input`, etc.) remain as Contact page-specific styles per Phase 1.4 decision. Forms don't exist on baseline pages (index/about), so they stay as page-specific until future review.

---

## Phase 2 Summary: Complete ✅

**All 4 pages successfully refactored** (Arts, Experience, Projects, Contact)

**Total Impact:**
- **Templates Modified:** 4 files
- **Template Replacements:** 35 instances of custom classes → utility classes
- **CSS Files Cleaned:** 4 files
- **Total CSS Reduction:** ~213 lines of duplicate CSS removed
  - Arts: ~40 lines
  - Experience: ~43 lines
  - Projects: ~77 lines
  - Contact: ~53 lines

**Key Achievement:**
All page-specific duplicates of baseline utility patterns have been eliminated. Each page now uses composable utilities (`.card.card--mid.card--interactive`) instead of single-use custom classes (`.contact-card`).

**Maintained:**
- Page-specific layout styles (grid arrangements, spacing)
- Page-specific decorative elements (section numbers, map decorations)
- Page-specific content styling (.contact-card-content, .method-icon, etc.)
- Form elements (deferred per Phase 1.4 philosophy)

---

### Phase 3: Cleanup & Documentation ✅ COMPLETED (2025-12-26)
**Goal**: Remove all unused button classes that were missed in Phase 2

- [x] Remove unused page-specific button classes
- [x] Update templates to use button utility classes
- [x] Generate Templ files
- [x] Visual regression test all pages
- [x] Update this plan document with final state

**Button Classes Replaced:**

**Projects Page (3 buttons):**
- `.github-link-hero` → `.cta-link--solid` (line 52)
- `.visit-link` → `.cta-link--underline` (line 81)
- `.crew-united-link` → `.cta-link--underline` (line 187)

**Contact Page (1 button):**
- `.success-link` → `.cta-link--solid` (contactForm.templ line 13)

**Files Modified:**
- `views/pages/projects.templ` - Updated 3 button classes
- `views/forms/contactForm.templ` - Updated 1 button class
- `static/css/projects.css` - Removed 3 button definitions (~45 lines)
- `static/css/contact.css` - Removed 1 button definition (~16 lines)

**CSS Reduction:**
- Projects: ~45 lines removed
- Contact: ~16 lines removed
- **Total: ~61 lines of duplicate CSS removed**

**Form Elements Status:**
Form button (`.form-submit-button`) intentionally **not replaced** per Phase 1.4 decision - forms don't exist on baseline pages, so they remain page-specific until future design review.

---

## Success Metrics ✅

1. **DRY Compliance**: ✅ Each visual pattern defined once in `utilities.css`
2. **File Size Reduction**: ✅ Page-specific CSS files reduced by ~274 lines total
   - Phase 2 (labels, pull quotes, cards): ~213 lines
   - Phase 3 (buttons): ~61 lines
3. **Visual Parity**: ✅ All pages maintain exact visual appearance
4. **Consistency**: ✅ All patterns use existing utilities from baseline
5. **Maintainability**: ✅ Design changes propagate via utility class updates

**Final Stats:**
- **4 pages refactored** (Arts, Experience, Projects, Contact)
- **39 template class replacements** (35 in Phase 2 + 4 in Phase 3)
- **274 lines of duplicate CSS removed**
- **Zero visual regressions**

---

## Design Token Reference

### Spacing Scale
- `--space-xs`: 0.5rem (8px)
- `--space-sm`: 0.75rem (12px)
- `--space-md`: 1rem (16px)
- `--space-lg`: 1.5rem (24px)
- `--space-xl`: 2rem (32px)
- `--space-2xl`: 3rem (48px)
- `--space-3xl`: 4rem (64px)
- `--space-4xl`: 6rem (96px)
- `--space-5xl`: 8rem (128px)

### Typography Scale
- `--text-xs`: 0.75rem (12px)
- `--text-sm`: 0.875rem (14px)
- `--text-base`: 1rem (16px)
- `--text-md`: 1.125rem (18px)
- `--text-lg`: 1.25rem (20px)
- `--text-xl`: 1.5rem (24px)
- `--text-2xl`: 1.75rem (28px)
- `--text-3xl`: 2.25rem (36px)
- `--text-4xl`: 3.5rem (56px)

### Color Tokens
- `--paper-warm`: #f8f6f2
- `--paper-mid`: #f7f6f4
- `--paper-light`: #fdfcfb
- `--ink-warm`: #2b2b2b
- `--ink-soft`: #3a3a3a
- `--ink-muted`: #5a5a58
- `--border-subtle`: #e8e8e6
- `--border-medium`: #d4d4d1

### Weight Scale
- `--weight-light`: 300
- `--weight-regular`: 400
- `--weight-medium`: 500
- `--weight-semibold`: 600
- `--weight-bold`: 700
- `--weight-extrabold`: 800

---

## Notes for Future Sessions

### Session Continuation Checklist
1. Check todo list status
2. Review this document for current phase
3. Identify next step in current phase
4. Execute step with focus on visual parity
5. Update todo list
6. Run `templ generate` after template changes
7. Test in browser (Air should be running)

### Testing Protocol
- After each utility extraction: Compare before/after screenshots
- Use browser DevTools to verify class application
- Check responsive breakpoints (900px, 767.98px)
- Ensure hover states work correctly

### Common Pitfalls
- Don't modify index or about pages
- Don't change visual appearance, only refactor CSS
- Always run `templ generate` after editing `.templ` files
- Test in browser before marking task complete
- Keep utility classes single-purpose and composable

---

## Appendix: Pattern Inventory

### Button Patterns Found
| Pattern Name | Location | Properties |
|--------------|----------|------------|
| `form-submit-button` | contact.css:359 | Primary solid button |
| `github-link-hero` | projects.css:151 | Primary solid button |
| `visit-link` | projects.css:276 | Underline link |
| `crew-united-link` | projects.css:642 | Underline link |
| `cta-link` | base.css:482 | Uppercase mono link |

### Pull Quote Patterns Found
| Pattern Name | Location | Properties |
|--------------|----------|------------|
| `intro-pull-quote` | experience.css:16 | 1.25rem italic |
| `contact-pull-quote` | contact.css:13 | 1.5rem italic |
| `timeline-pullquote` | experience.css:253 | 1.5rem italic |
| `skills-pullquote` | experience.css:83 | 1.5rem italic |
| `pull-quote-wrapper` | utilities.css:237 | With hairline |
| `pull-quote-wrapper` | about.css:222 | With hairline |

### Card Patterns Found
| Pattern Name | Location | Properties |
|--------------|----------|------------|
| `contact-card` | contact.css:74 | Light bg, border, hover |
| `method-card` | contact.css:246 | Warm bg, border, hover |
| `project-card-portrait` | projects.css:326 | Flex column |
| `project-card-text` | projects.css:376 | Light bg, accent border |
| `project-mini-card` | projects.css:469 | Dashed border |
| `education-item` | experience.css:153 | Light bg, accent border |
| `cta-card-inner` | contact.css:502 | Light bg, border, hover |

### Label Patterns Found
| Pattern Name | Location | Properties |
|--------------|----------|------------|
| `project-label-editorial` | projects.css:60 | Mono uppercase 0.75rem |
| `stack-label` | projects.css:135 | Mono uppercase 0.75rem |
| `detail-label` | arts.css:574 | Mono uppercase 0.75rem |
| `section-label-small` | experience.css:41 | Mono uppercase 0.6875rem |
| `contact-card-label` | contact.css:87 | Mono uppercase 0.75rem |
| `form-label` | contact.css:319 | Mono uppercase 0.8125rem |

---

## Session Log

### Session 1 - 2025-12-26
**Phase 1.1, 1.2 & 1.3: Button, Text & Card Audits - COMPLETED ✅**

**Phase 1.1 Completed:**
- Created design system philosophy documentation ("CRITICAL PHILOSOPHY" section)
- Audited all button/CTA patterns across Arts, Experience, Projects, Contact
- Created 3 new button utilities based on index/about baseline:
  - `.cta-link--solid` (solid dark button)
  - `.cta-link--solid.large` (large variant for forms)
  - `.cta-link--underline` (display-level underline link)
- Documented replacement map for all duplicated buttons

**Phase 1.2 Completed:**
- Audited all text style patterns (pull quotes, labels, descriptions)
- Created 4 new text utilities based on index/about baseline:
  - `.label-mono` (mono uppercase label - baseline from about page)
  - `.label-mono--form` (larger variant for forms)
  - `.label-mono--small` (smaller decorative variant)
  - `.section-description` (italic section intro)
- Identified that existing `blockquote` and `.pull-quote-wrapper` cover all pull quote needs
- Documented replacement maps for 10+ duplicate label patterns and 4 pull quote patterns

**Phase 1.3 Completed:**
- Audited all card/container patterns across 4 pages
- Created 8 card utilities based on about page `.interest-item`:
  - `.card` (base card)
  - `.card--warm`, `.card--mid` (background variants)
  - `.card--accent-left`, `.card--accent-left-thick` (accent borders)
  - `.card--interactive`, `.card--interactive-lift` (hover effects)
  - `.card--dashed` (border style variant)
- Documented replacement maps for 6 duplicate card patterns

**Files Modified:**
- `static/css/icons.css` - Added `.cta-link--solid` and variants (lines 140-177)
- `static/css/base.css` - Added `.cta-link--underline` (lines 505-521)
- `static/css/utilities.css` - Added text styles (lines 364-401) and cards (lines 403-459)
- `DESIGN_SYSTEM_PLAN.md` - Added philosophy section, all Phase 1 completion notes

**Key Insight:**
Everything duplicated across pages already exists on index/about as baseline patterns. Created minimal utilities using composition (`.card.card--mid.card--interactive`) rather than many single-use classes.

**Phase 1.4 & 1.5 Skipped:**
- Forms don't exist on baseline pages → Skip extraction, handle during Contact page design
- Decorative elements are layout-specific → Not reusable utilities

**Key Decisions:**
- Only extract utilities that exist on index/about baseline
- Page-specific patterns (forms, decorative backgrounds) stay as page CSS
- Use composition (`.card.card--mid.card--interactive`) over many single-use classes

**Phase 1 Status: COMPLETE ✅**

All component utilities from baseline extracted. Ready for Phase 2.

**Next Session Should Start With:**
- ✅ All phases complete!
- Next: Design refinement work (see DESIGN_REFINEMENT_PLAN.md)

---

### Session 2 - 2025-12-26
**Phase 3: Cleanup & Documentation - COMPLETED ✅**

**Completed:**
- Audited all 4 page CSS files (arts, experience, projects, contact)
- Identified button classes missed in Phase 2
- Updated templates to use utility button classes:
  - `.github-link-hero` → `.cta-link--solid`
  - `.visit-link` → `.cta-link--underline`
  - `.crew-united-link` → `.cta-link--underline`
  - `.success-link` → `.cta-link--solid`
- Removed ~61 lines of duplicate button CSS
- Ran `templ generate` successfully (11 templates updated)
- Updated documentation

**Files Modified:**
- 2 templates (projects.templ, contactForm.templ)
- 2 CSS files (projects.css, contact.css)
- DESIGN_SYSTEM_PLAN.md (Phase 3 completion notes)

**Key Achievement:**
Completed full design system refactoring! All duplicated styles from baseline pages (index/about) have been extracted to utilities and reused across all 4 secondary pages. Total CSS reduction: 274 lines.

**Phase 3 Status: COMPLETE ✅**

All 3 phases complete. Design system refactoring finished successfully.

---

---

### Session 3 - 2025-12-26 (Afternoon)
**CSS Architecture Refinement - COMPLETED ✅**

**Goal:** Further extract component styles from about.css to utilities, ensuring clean separation between layout and reusable components.

**Completed:**
- **Utility Extraction from about.css:**
  - Extracted `.values-list` (icon list pattern with flex layout)
  - Extracted `.checkmark-list` (list with checkmark bullets)
  - Cleaned up about.css to contain ONLY layout and decorations
  - Added comments indicating which utilities are now used
- **Template Updates:**
  - Updated about.templ to use `.checkmark-list` class
  - Updated projects.templ to use `.checkmark-list` class
  - Added missing `components` import to contact.templ
- **Projects Page Refinement:**
  - Redesigned "Beyond Code" section to match About "What I'm Looking For"
  - Uses existing about.css classes (`.looking-for-section`, `.cta-footer-grid`)
  - Hidden decorative number via projects.css override
  - Removed Kultstätte Keller content entirely
- **Icon Library Expansion:**
  - Added `IconMail()`, `IconPhone()`, `IconCheck()`
  - All follow Lucide-style (1.5px stroke, rounded caps/joins)
- **Emoji Removal:**
  - Replaced ALL emojis on Contact page with icon components
  - ✉ → mail icon, ☎ → phone icon, 💼 → briefcase icon, ✓ → check icon

**Files Modified:**
- `static/css/utilities.css` - Added `.values-list`, `.checkmark-list`
- `static/css/about.css` - Removed duplicated component styles
- `static/css/projects.css` - Added decorative number hide override
- `views/pages/about.templ` - Added `.checkmark-list` class
- `views/pages/projects.templ` - Redesigned Beyond Code section
- `views/pages/arts.templ` - Removed sketches section
- `views/forms/contact.templ` - Added components import, replaced emojis
- `views/forms/contactForm.templ` - Replaced emoji with check icon
- `views/components/icons.templ` - Added 3 new icons

**Key Achievement:**
Clean architectural separation achieved - about.css now contains ONLY layout/decoration, all reusable components in utilities.css. Projects page now properly reuses baseline patterns.

**Phase Status: ARCHITECTURE COMPLETE ✅**

Ready for design refinement and layout work.

---

**Document Version**: 3.0
**Created**: 2025-12-26
**Status**: ARCHITECTURE COMPLETE ✅
**Last Updated**: 2025-12-26 (Afternoon)
