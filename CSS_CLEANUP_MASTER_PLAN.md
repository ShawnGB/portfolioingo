# CSS CLEANUP MASTER PLAN
**Created:** 2025-12-26
**Goal:** Clean, maintainable CSS architecture with clear separation of concerns
**Approach:** Desktop-first, multi-session executable plan
**Sacred:** index.templ & about.templ visual appearance must not change

---

## EXECUTIVE SUMMARY

### Current Problems Identified

1. **Template Structure Issue (CRITICAL)**:
   - Nav and Footer render OUTSIDE `<body>` tag (invalid HTML)
   - Should be: `<body>` → `<nav>` → `.page-container` → content → `<footer>` → `</body>`

2. **CSS Duplication**:
   - Grid system defined in BOTH `base.css` AND `about.css`
   - Typography variants scattered across base.css, utilities.css, about.css
   - Background colors repeated at multiple DOM levels
   - 60+ lines of legacy CSS variable aliases

3. **Unclear Separation**:
   - `base.css` contains variables + resets + typography + components + grid + page layout
   - Mixing of concerns makes it hard to find and maintain styles
   - No clear file structure

4. **Unused/Dead Code**:
   - `.page-main-header`, `.header-integrated` (not found in templates)
   - `.page-container ul.is-grid` (over-specific, likely unused)
   - Complex nested selectors trying to catch edge cases
   - RGB variables for alpha transparency (barely used)

5. **Background Color Hierarchy Issue**:
   - `body` has `background-color: var(--paper-warm)`
   - But `body` also has flex layout styles (should be on html or wrapper)
   - Background color should be set once at the highest level needed

---

## PROPOSED FILE STRUCTURE

```
static/css/
├── variables.css      # Design tokens ONLY (colors, spacing, typography scale)
├── base.css           # Global resets + base element styles (h1-h6, p, a, etc.)
├── grid.css           # 12-column grid system (extracted from base.css + about.css)
├── utilities.css      # Reusable component classes (baseline patterns only)
├── icons.css          # Icon system + button CTAs (keep as-is, already clean)
├── nav.css            # Navigation component (keep as-is)
├── footer.css         # Footer component (keep as-is)
├── home.css           # Homepage-specific layout (baseline, don't change visuals)
├── about.css          # About page-specific layout (baseline, don't change visuals)
├── arts.css           # Arts page layout only
├── experience.css     # Experience page layout only
├── projects.css       # Projects page layout only
└── contact.css        # Contact page layout only
```

### File Responsibilities

**variables.css** (NEW):
- CSS custom properties only
- Color palette (paper-*, ink-*, gray-*)
- Semantic assignments (bg-*, text-*, border-*)
- Typography scale (text-*, font-*, weight-*)
- Spacing scale (space-*)
- Shadows, transitions, radius, breakpoints
- NO styles, only variable declarations

**base.css** (CLEANED):
- CSS reset (`* { box-sizing: border-box }`)
- `html` and `body` base styles
- Typography base styles (`h1-h6`, `p`, `a`, `strong`, `em`, `code`, `pre`, `ul`, `ol`, `blockquote`)
- NO grid, NO utilities, NO components, NO page-specific styles

**grid.css** (NEW - extracted):
- `.page-grid-container` (max-width, padding, centering)
- `.grid-row` (12-column grid)
- `.grid-col-{1-12}` (column span utilities)
- `.grid-col-offset-*` (positioning utilities)
- `.grid-section` (vertical spacing)
- Responsive overrides for grid

**utilities.css** (KEEP - already clean):
- Component patterns from baseline (index + about)
- Typography patterns (`.section-header`, `.section-label`, `.body-text`, etc.)
- Image patterns (`.img-editorial`, `.image-caption`)
- Card patterns (`.card` + variants)
- List patterns (`.values-list`, `.checkmark-list`)
- Label patterns (`.label-mono`)
- Pull quote patterns

**Page CSS files (home.css, about.css, etc.)**:
- Layout arrangements ONLY (positioning, grid, spacing)
- Decorative elements unique to that page (section numbers, hairlines)
- Occasional overrides of utility classes when needed
- NO typography, NO colors, NO reusable components

---

## MULTI-SESSION EXECUTION PLAN

### ✅ SESSION 1: Fix Template Structure (CRITICAL - Do First)
**Duration:** 30-45 minutes
**Files:** `views/layouts/base.templ`
**Goal:** Fix invalid HTML structure

**Actions:**
1. Move `@Navigation(pCtx)` inside `<body>` tag (after opening `<body>`)
2. Move `@Footer()` inside `<body>` tag (before closing `</body>`)
3. Adjust any CSS that relies on current structure
4. Test all pages render correctly

**Template Structure After:**
```go
<html lang={ pCtx.ActiveLang }>
  @Head(pCtx, pagetitle, pagedescription)
  <body>
    @Navigation(pCtx)
    <div class="page-container">
      { children... }
    </div>
    @Footer()
  </body>
</html>
```

**Success Criteria:**
- Valid HTML structure
- All pages render identically
- No layout shifts

---

### ✅ SESSION 2: Extract variables.css
**Duration:** 45-60 minutes
**Files:** `static/css/variables.css` (new), `static/css/base.css`, `static/styles.css`
**Goal:** Separate design tokens from styles

**Actions:**

1. **Create `static/css/variables.css`**:
   - Copy `:root { ... }` block from base.css (lines 5-159)
   - Remove legacy variable aliases (lines 58-77)
   - Keep only modern semantic names
   - Remove RGB variables (lines 79-82) if not actively used
   - Organize by category with clear comments

2. **Clean `base.css`**:
   - Delete `:root { ... }` block (now in variables.css)
   - Keep only section "2. Reset & Base Styles" and below

3. **Update `static/styles.css`**:
   - Add `@import "./css/variables.css";` as FIRST import
   - Ensure base.css comes second

**New variables.css structure:**
```css
/* Warm Paper Tones */
--paper-warm: #f8f6f2;
--paper-mid: #f7f6f4;
--paper-light: #fdfcfb;

/* Warm Ink Blacks */
--ink-warm: #2b2b2b;
--ink-soft: #3a3a3a;
--ink-muted: #5a5a58;

/* Semantic Assignments */
--bg-base: var(--paper-warm);
--text-primary: var(--ink-warm);
/* ... etc */

/* Typography Scale */
/* Spacing Scale */
/* Shadows */
/* Transitions */
/* Borders */
/* Layout */
```

**Success Criteria:**
- variables.css contains ONLY `:root { ... }`
- No duplicate variable declarations
- All pages still render correctly
- Build succeeds

---

### ✅ SESSION 3: Extract grid.css
**Duration:** 45-60 minutes
**Files:** `static/css/grid.css` (new), `static/css/base.css`, `static/css/about.css`, `static/styles.css`
**Goal:** Centralize grid system, remove duplication

**Actions:**

1. **Create `static/css/grid.css`**:
   - Extract `.page-grid-container` from base.css (lines 697-704)
   - Extract `.grid-row` from base.css (lines 707-711)
   - Extract `.grid-col-{1-12}` from base.css (lines 714-749)
   - Extract `.grid-col-offset-*` from base.css (lines 752-754)
   - Extract `.grid-section` from base.css (lines 757-766)
   - Add responsive overrides from base.css (lines 772-794)

2. **Delete from base.css**:
   - Section "6. 12-Column Grid System" (lines 693-767)
   - Grid-related responsive code (lines 772-794)

3. **Delete from about.css**:
   - ENTIRE "GLOBAL GRID SYSTEM" section (lines 7-48)
   - These are exact duplicates

4. **Update `static/styles.css`**:
   - Add `@import "./css/grid.css";` after variables.css
   - Order: variables → grid → base → utilities → ...

**grid.css structure:**
```css
/* 12-Column Grid Container */
.page-grid-container { ... }

/* Grid Row */
.grid-row { ... }

/* Column Span Utilities */
.grid-col-1 { ... }
/* ... through grid-col-12 */

/* Column Offsets */
.grid-col-offset-1 { ... }

/* Section Spacing */
.grid-section { ... }
.grid-section.major-break { ... }

/* Responsive */
@media (max-width: 900px) {
  .page-grid-container { ... }
  .grid-row { ... }
  [class^="grid-col-"] { ... }
}
```

**Success Criteria:**
- Grid system defined in ONE place only
- About page still looks identical
- All pages render correctly
- No duplicate grid CSS

---

### ✅ SESSION 4: Clean base.css - Remove Unused Styles
**Duration:** 45-60 minutes
**Files:** `static/css/base.css`
**Goal:** Remove dead code, simplify

**Actions:**

1. **Verify usage** (grep templates for these classes):
   ```bash
   grep -r "page-main-header" views/
   grep -r "header-integrated" views/
   grep -r "is-grid" views/
   ```

2. **Delete if unused**:
   - `.page-main-header` (lines 618-639) - NOT FOUND
   - `.header-integrated` (lines 642-691) - NOT FOUND
   - `.page-container ul.is-grid` (lines 578-607) - LIKELY UNUSED
   - `.page-container > section` complex selector (lines 550-559) - TOO SPECIFIC

3. **Simplify `.page-container`**:
   - Keep basic structure: `width: 100%; max-width; margin: auto; padding`
   - Remove nested content selectors
   - Let page-specific CSS or utilities handle inner layout

4. **Clean up utility classes section** (lines 427-475):
   - Move `.flex-center-full` to utilities.css if used
   - Move `.text-success`, `.text-error` to utilities.css if used
   - Keep only `.hidden` in base.css

5. **Remove paper grain pseudo-element** (lines 197-209):
   - `body::before` with opacity 0.04 - extremely subtle, likely unnecessary
   - Adds complexity for minimal visual benefit
   - Remove and test if anyone notices

6. **Simplify body styles**:
   ```css
   /* BEFORE (lines 175-195) */
   body {
     margin: 0;
     padding: 0;
     background-color: var(--paper-warm);
     font-family: var(--font-body);
     /* ... */
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     min-height: 100vh;
   }

   /* AFTER */
   body {
     margin: 0;
     padding: 0;
     font-family: var(--font-body);
     font-size: 16px;
     line-height: 1.7;
     color: var(--ink-warm);
     background-color: var(--paper-warm);
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
   }
   ```
   - Remove flex layout from body (not semantic)
   - Remove `min-height: 100vh` (not needed)
   - Background color set once here, no need elsewhere

**Success Criteria:**
- base.css reduced by 200-300 lines
- Only essential base styles remain
- All pages render correctly
- No unused CSS

---

### ✅ SESSION 5: Clean page CSS files - Remove component styles
**Duration:** 60-90 minutes
**Files:** `about.css`, `home.css`, `experience.css`, `projects.css`, `contact.css`, `arts.css`
**Goal:** Remove all component/typography styles, keep only layout

**Actions per file:**

**about.css:**
- ✅ Grid system already removed (Session 3)
- DELETE: `.section-label`, `.subsection-header`, `.intro-content`, `.vertical-rule`, `.body-text p`, `.path-label small`, `.pull-quote-wrapper`, `.icon-header`, `.image-caption`, `.interest-item` (all now in utilities.css)
- KEEP: Layout classes (`.about-intro-section`, `.drives-path-section`, `.quote-image-beyond-module`, etc.)
- KEEP: Decorative elements (`::before`, `::after` for section numbers)
- KEEP: Unique layout patterns (`.image-wrapper-hero`, `.beyond-image-col`, etc.)

**home.css:**
- DELETE: Any typography styles that duplicate base.css
- KEEP: `.hero-section-wrapper` layout
- KEEP: `.hero-left-column`, `.hero-right-column` positioning
- KEEP: Image filter (`.hero-left-column img`) - unique to hero
- KEEP: `.hero-content`, `.hero-subtitle`, `.hero-cta` layout

**experience.css, projects.css, contact.css, arts.css:**
- Similar approach: delete component styles, keep layout
- Rely on utilities.css for cards, labels, typography
- Keep only grid positioning and page-specific decorations

**Success Criteria:**
- Page CSS files contain ONLY layout/positioning/spacing
- No duplicate component styles
- All pages render identically
- Clear separation of concerns

---

### ✅ SESSION 6: Consolidate Typography
**Duration:** 30-45 minutes
**Files:** `base.css`, `utilities.css`
**Goal:** Clear typography hierarchy

**Audit:**
- `h1, h2, h3, h4` in base.css (lines 241-289)
- `.section-header` in utilities.css (duplicate of h2?)
- `.section-label` in utilities.css (another h2 style)
- `.subsection-header` in utilities.css (h3 variant)

**Decision:**
- Keep semantic `h1-h6` in base.css for default tag styling
- Keep utility classes in utilities.css for when you need specific sizes decoupled from semantics
- Document when to use which:
  - Use `<h2>` when semantically a heading
  - Use `.section-header` when you need that size but different semantic tag

**Add comments to both files** explaining this.

**Success Criteria:**
- Clear documentation
- No confusion about which to use
- Both serve different purposes

---

### ✅ SESSION 7: Final Verification & Testing
**Duration:** 30-45 minutes
**Goal:** Ensure everything works, no regressions

**Actions:**

1. **Visual regression test** (manual):
   - Visit each page: /, /about, /experience, /projects, /arts, /contact
   - Compare to baseline (take screenshots before Session 1)
   - Index and About must look IDENTICAL
   - Other pages should look similar/better

2. **Build test**:
   ```bash
   templ generate
   go build -o ./tmp/main .
   ./tmp/main
   ```
   - No errors
   - Server starts successfully

3. **Browser dev tools check**:
   - Check for CSS errors in console
   - Verify no 404s for CSS files
   - Check computed styles for any surprises

4. **Responsive test** (basic):
   - Resize browser to mobile width
   - Ensure nothing breaks catastrophically
   - (Full responsive design comes later)

5. **Create backup branch**:
   ```bash
   git checkout -b backup-before-css-cleanup
   git add -A
   git commit -m "backup: snapshot before CSS cleanup"
   git checkout refinement
   ```

**Success Criteria:**
- All pages render correctly
- Index and About look identical to before
- No console errors
- Build succeeds
- Server runs

---

### ✅ SESSION 8: Documentation & Commit
**Duration:** 20-30 minutes
**Goal:** Document changes, clean commit

**Actions:**

1. **Update CLAUDE.md**:
   - Document new file structure
   - Update CSS architecture section
   - Add guidelines for where new styles should go

2. **Update this plan**:
   - Mark all sessions as ✅ complete
   - Add "COMPLETED" section at top with summary

3. **Create comprehensive commit**:
   ```bash
   git add -A
   git commit -m "refactor(css): complete CSS architecture cleanup

   - Extract variables to variables.css (design tokens only)
   - Extract grid system to grid.css (remove duplication)
   - Clean base.css (remove unused styles, simplify body)
   - Clean page CSS files (layout only, no components)
   - Fix template structure (nav/footer inside body tag)
   - Consolidate typography (clear h1-h6 vs utility usage)
   - Remove 400+ lines of duplicate/unused CSS

   BREAKING: none (visual appearance identical)
   FILES: base.css, about.css, home.css, grid.css (new), variables.css (new)
   VISUAL: Index and About pages unchanged, other pages maintained"
   ```

**Success Criteria:**
- CLAUDE.md updated
- Clean git history
- Changes documented

---

## GUIDELINES FOR FUTURE

### Where to add new styles:

**Question:** I need to style a new button.
**Answer:**
1. Check if a similar button exists in index or about pages
2. If YES → use that utility class from utilities.css
3. If NO → add to page-specific CSS and mark as potential future utility

**Question:** I need layout for a new section.
**Answer:**
1. Use grid.css for column layout (`.grid-row`, `.grid-col-*`)
2. Add page-specific layout class in that page's CSS file
3. Use utilities.css for components (cards, labels, typography)

**Question:** I need a new color/spacing value.
**Answer:**
1. Check variables.css first - does it exist?
2. If NO → add to variables.css with semantic name
3. Use the variable in your styles

**Question:** A style is used on 3+ pages.
**Answer:**
1. If it exists on index or about → extract to utilities.css
2. If it's NEW → discuss extracting to utilities after testing

---

## SESSION CHECKLIST

Use this to track progress:

- [ ] Session 1: Fix template structure (nav/footer inside body)
- [ ] Session 2: Extract variables.css
- [ ] Session 3: Extract grid.css
- [ ] Session 4: Clean base.css (remove unused)
- [ ] Session 5: Clean page CSS files (layout only)
- [ ] Session 6: Consolidate typography
- [ ] Session 7: Final verification & testing
- [ ] Session 8: Documentation & commit

---

## ESTIMATED IMPACT

**Lines of CSS removed:** 400-500 lines
**Duplicate code removed:** ~200 lines
**New files created:** 2 (variables.css, grid.css)
**Files modified:** 8-10 CSS files + 1 template
**Visual regressions:** 0 (index and about unchanged)
**Maintainability improvement:** Significant
**Developer experience:** Much clearer structure

---

## NOTES

- Desktop-first approach: mobile styles addressed in separate future session
- Index and About are sacred baselines: visual appearance must not change
- This plan is designed to be executed across multiple sessions
- Each session is independent and can be paused/resumed
- Always test after each session before moving to next
- Keep git commits granular (one per session for easy rollback)

---

**End of Master Plan**
