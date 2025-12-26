# Utilities.css Cleanup Plan
**Audit Date:** 2025-12-26
**Problem:** utilities.css contains patterns extracted from rough, unfinished pages instead of only from baseline (index/about)

---

## Baseline Source of Truth

**ONLY extract utilities from:**
1. `static/css/home.css` (homepage/index)
2. `static/css/about.css` (about page)
3. `static/css/base.css` (global base styles)

**DO NOT extract from:** Arts, Experience, Projects, Contact (these need redesign)

---

## Utilities.css Audit Results

### ✅ KEEP - Exists in Baseline

**Image Styles:**
- `.img-editorial` - Filter exists in home.css (line 39) and about.css (line 263)
  - `filter: saturate(0.82) contrast(0.92); opacity: 0.90; mix-blend-mode: multiply;`
- `.image-caption` - Exists in about.css (lines 283-291)

**Typography:**
- `.section-header` - Exists in about.css (line 328 `.looking-for-header .section-header`)
- `.section-label` - Exists in about.css (line 59 `.about-intro-section .section-label`)
- `.subsection-header` - Exists in about.css (lines 160-166)
- `.intro-content` - Exists in about.css (lines 67-70)
- `.body-text p` - Exists in about.css (lines 82-87, 176-178, 417-422)
- `.vertical-rule` - Exists in about.css (lines 72-80)
- `.pull-quote-wrapper` - Exists in about.css (lines 222-247)
- `.pull-quote-wrapper blockquote` - Exists in about.css (lines 238-247)
- `.icon-header` - Exists in about.css (lines 337-351)
- `.label-mono` - Based on about.css `.path-label small` (lines 187-194)

**Buttons (from base.css):**
- `.cta-link` - Exists in base.css (lines 482-502)
- `.cta-link--underline` - Exists in base.css (lines 505-521)

**Base Card (BUT NEEDS FIX):**
- `.card` - Based on about.css `.interest-item` (lines 432-446)
  - **PROBLEM**: Current utilities.css `.card` has WRONG values!
  - Current: `background: var(--paper-light); padding: var(--space-lg);`
  - Should be: `background: var(--paper-warm); padding: var(--space-sm) var(--space-md);`

**Card Hover (from baseline):**
- `.card--interactive` (or inline hover) - about.css `.interest-item:hover` (lines 448-451)
  - `transform: translateY(-2px); box-shadow: 0 4px 12px rgba(43, 43, 43, 0.08);`

---

### ❌ DELETE - NOT in Baseline (came from rough pages)

**Section Decorations:**
- `.section-number` and all variants - Section numbers use inline `::before`, not utility classes
- All `.hairline` variants - Hairlines use inline `::before`/`::after`, not utility classes

**Image Styles:**
- `.img-editorial--interactive` - Hover effect not in baseline
- `.img-with-depth` - Radial gradient overlay not in baseline

**Typography:**
- `.section-header--large` - Variant not in baseline
- `.intro-text` - Not a class in baseline
- `.intro-text--large` - Not in baseline
- `.border-left-accent` - Not in baseline
- `.border-left-subtle` - Not in baseline
- `.section-description` - Came from arts.css, not baseline

**Hover Effects:**
- `.hover-fade` - Not a class in baseline (opacity is inline)
- `.hover-lift` - Not a class in baseline (hover is inline)
- `.hover-underline` - Not in baseline

**Layout:**
- `.section-bleed` - Full-bleed done inline, not as utility
- `.section-bordered-top` - Not in baseline

**Labels:**
- `.label-mono--form` - Forms don't exist in baseline
- `.label-mono--small` - Size variant not in baseline

**Cards (all variants from rough pages):**
- `.card--warm` - Variant not in baseline (base `.interest-item` already uses `--paper-warm`)
- `.card--mid` - NOT in baseline
- `.card--accent-left` - NOT in baseline
- `.card--accent-left-thick` - NOT in baseline
- `.card--interactive-lift` - Different hover distance (4px vs 2px in baseline)
- `.card--dashed` - NOT in baseline

**Spacing Utilities:**
- All `.mb-*` and `.mt-*` classes - Not in baseline (spacing is contextual, not utility)

---

## Cleanup Actions

### Action 1: Fix Base `.card` to Match Baseline
```css
/* CURRENT (WRONG): */
.card {
  background: var(--paper-light);  /* ❌ Should be --paper-warm */
  padding: var(--space-lg);        /* ❌ Should be var(--space-sm) var(--space-md) */
  ...
}

/* CORRECT (matches .interest-item): */
.card {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: var(--paper-warm);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(43, 43, 43, 0.08);
}
```

### Action 2: Delete All Non-Baseline Utilities
Remove entire sections:
- Section Decorations (lines 11-47)
- Editorial Hairlines (lines 49-99)
- Image hover/depth variants (lines 112-138)
- Typography variants not in baseline (lines 165-168, 188-198, 215-223, 392-401)
- Hover Effects (lines 281-335)
- Layout Utilities (lines 337-362)
- All card variants except base (lines 416-459)
- All spacing utilities (lines 461-484)

### Action 3: Create Clean Baseline-Only Utilities File

**Final utilities.css should contain ONLY:**
1. Image styles (`.img-editorial`, `.image-caption`)
2. Typography (`.section-header`, `.section-label`, `.subsection-header`, `.intro-content`, `.body-text p`, `.vertical-rule`)
3. Pull quotes (`.pull-quote-wrapper` + blockquote)
4. Icon header (`.icon-header`)
5. Labels (`.label-mono` only)
6. Cards (`.card` with corrected values matching `.interest-item`)

**Total: ~150 lines instead of 506 lines**

---

## Impact on Other Pages

After cleanup, pages using deleted utilities will break:
- **Arts, Experience, Projects, Contact** - will need redesign using ONLY baseline utilities
- This is CORRECT - forces redesign to match baseline aesthetic

---

## Next Steps

1. ✅ Create this cleanup plan
2. Create `utilities-CLEAN.css` with only baseline patterns
3. Replace `utilities.css` with clean version
4. Identify broken styles on Arts/Experience/Projects/Contact
5. Plan redesign of those pages using ONLY baseline utilities
