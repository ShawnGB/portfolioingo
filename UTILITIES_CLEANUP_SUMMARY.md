# Utilities Cleanup Summary
**Date:** 2025-12-26
**Status:** ✅ COMPLETE

---

## What Was Done

### Problem Identified
The original `utilities.css` extracted patterns from **rough, unfinished pages** (Arts, Experience, Projects, Contact) instead of only from the baseline pages (index/about). This codified bad design decisions and prevented proper redesign.

### Solution
Completely rewrote `utilities.css` to contain **ONLY** patterns from baseline pages.

---

## Changes

### Before Cleanup
- **File size:** 506 lines
- **Sources:** Mixed - baseline pages + rough pages
- **Card base class:** WRONG values (didn't match `.interest-item`)
- **Utility count:** 80+ utilities including variants

### After Cleanup
- **File size:** 197 lines (**61% reduction**)
- **Sources:** ONLY baseline (home.css, about.css, base.css)
- **Card base class:** ✅ Fixed to match `.interest-item` exactly
- **Utility count:** 12 baseline utilities only

---

## Kept (12 utilities from baseline)

**Images (2):**
- `.img-editorial` - From home.css line 39, about.css line 263
- `.image-caption` - From about.css lines 283-291

**Typography (8):**
- `.section-header` - From about.css line 328
- `.section-label` - From about.css line 59
- `.subsection-header` - From about.css lines 160-166
- `.intro-content` - From about.css lines 67-70
- `.body-text p` - From about.css lines 82-87
- `.vertical-rule` - From about.css lines 72-80
- `.pull-quote-wrapper` - From about.css lines 222-247
- `.icon-header` - From about.css lines 337-351

**Labels (1):**
- `.label-mono` - From about.css `.path-label small` (lines 187-194)

**Cards (1):**
- `.card` - From about.css `.interest-item` (lines 432-446)
  - **FIXED** to match baseline exactly

---

## Deleted (70+ utilities NOT in baseline)

**Section Decorations:**
- `.section-number` and all variants
- All `.hairline` variants

**Image variants:**
- `.img-editorial--interactive`
- `.img-with-depth`

**Typography variants:**
- `.section-header--large`
- `.intro-text`, `.intro-text--large`
- `.border-left-accent`, `.border-left-subtle`
- `.section-description`

**Labels:**
- `.label-mono--form`
- `.label-mono--small`

**Cards (all variants from rough pages):**
- `.card--warm`
- `.card--mid`
- `.card--accent-left`
- `.card--accent-left-thick`
- `.card--interactive-lift`
- `.card--dashed`

**Hover Effects:**
- `.hover-fade`
- `.hover-lift`, `.hover-lift--strong`
- `.hover-underline`

**Layout:**
- `.section-bleed`
- `.section-bordered-top`

**Spacing:**
- All `.mb-*` utilities (9 variants)
- All `.mt-*` utilities (9 variants)

---

## Fixed Issues

### Issue 1: Wrong `.card` Base Class
**Before:**
```css
.card {
  background: var(--paper-light);  /* ❌ WRONG */
  padding: var(--space-lg);        /* ❌ WRONG */
}
```

**After (matches `.interest-item`):**
```css
.card {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: var(--paper-warm);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
```

---

## Impact on Other Pages

**Pages that will break:**
- Arts
- Experience
- Projects
- Contact

**This is CORRECT!** These pages were using utilities extracted from their own rough designs. Breaking them forces redesign using ONLY baseline patterns.

---

## Next Steps

1. ✅ Utilities cleaned up
2. ⏭️ Redesign Arts/Experience/Projects/Contact using ONLY baseline utilities
3. ⏭️ Reference `DESIGN_REFINEMENT_PLAN.md` for page-by-page redesign tasks

---

## Files Modified

- `static/css/utilities.css` - Completely rewritten (506 → 197 lines)
- `CLAUDE.md` - Updated utility documentation
- `UTILITIES_CLEANUP_PLAN.md` - Created detailed audit
- `UTILITIES_CLEANUP_SUMMARY.md` - This file

---

## Design Philosophy Established

**Baseline Pages:**
- `home.css` (homepage/index)
- `about.css` (about page)
- `base.css` (global base styles)

**Rule:**
Utilities come ONLY from baseline. Other pages use these utilities + custom layout CSS only. No new utilities from non-baseline pages.
