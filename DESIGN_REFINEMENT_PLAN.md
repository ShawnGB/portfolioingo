# Design Refinement Plan — Editorial Monochrome Portfolio

**Created:** 2025-12-26
**Purpose:** Track design improvements across all portfolio pages
**Baseline:** Homepage (index) + About page
**Philosophy:** Editorial Monochrome (warm paper tones, warm ink blacks, no color accents)

---

## Design Principles (from Editorial Monochrome)

### Core Aesthetic
- **Monochrome Only**: Warm paper tones + warm ink blacks, no color accents
- **Editorial Typography**: Varied layouts, generous whitespace, asymmetric grids
- **Warmth Through Tone**: Paper warmth (`--paper-warm`, `--paper-mid`, `--paper-light`)
- **Image Treatment**: Desaturated, low contrast, multiply blend mode
- **Hierarchy**: Large section numbers, mono labels, pull quotes

### Baseline Pattern Library (from Index & About)
✅ **What's Working:**
- Clean asymmetric 3/9 and 4/8 column splits
- Generous whitespace and breathing room
- Large decorative section numbers (opacity 0.04-0.08)
- Small mono uppercase labels for metadata
- Pull quotes as editorial anchors
- Vertical rules as subtle separators
- Card-based content with hover effects
- Minimal, purposeful navigation
- Footer with subtle copyright

---

## Page-by-Page Analysis & Action Plan

### ✅ Homepage (Index) — BASELINE (No Changes)
**Status:** Reference standard
**Characteristics:**
- Minimal hero with portrait + camera
- Clean typography with large display text
- Asymmetric 5/7 split (image left, text right)
- Underline CTA link
- Perfect embodiment of editorial monochrome

**Action:** None - maintain as reference

---

### ✅ About Page — BASELINE (No Changes)
**Status:** Reference standard
**Characteristics:**
- Asymmetric 4/8 intro split
- Large decorative "01" section number
- Icon-based value propositions
- "My Journey" narrative section
- "Beyond the Screen" with image + badges
- "What I'm Looking For" 3-column cards
- Download CV CTA with icon
- Excellent use of whitespace

**Action:** None - maintain as reference

---

### ✅ Arts Page — REFINED

**Current State:**
- ✅ Good: Editorial photo spreads with varied layouts
- ✅ Good: Vertical "Photography / Berlin" label
- ✅ Good: Magazine-style section numbers (01, 02, etc.)
- ✅ Fixed: All images use `.img-editorial` monochrome filter
- ✅ Fixed: Sketches section removed - replaced with "coming soon" note

**Completed Actions:**
- [x] **Priority 5:** Removed sketches section, added simple "coming soon" note
  - Decision: Keep page focused on photography until content ready
  - No placeholder visuals

---

### ✅ Experience Page — REFINED

**Current State:**
- ✅ Good: Asymmetric 3/9 intro split
- ✅ Good: Pull quote in intro
- ✅ Good: Skills section with 2-column layout
- ✅ Good: Timeline with alternating offset cards
- ✅ Good: Education cards with left accent
- ✅ Fixed: CTA buttons now use baseline patterns
- ✅ Fixed: Download CV button matches about page style

**Completed Actions:**
- [x] **Button Styling:** Fixed to match baseline
  - Download CV: `.cta-link with-icon download` (bordered with icon)
  - View Projects: `.cta-link` (inline style)
  - Removed `.cta-link--solid large` variants

---

### ✅ Projects Page — REFINED

**Current State:**
- ✅ Good: Asymmetric 3/9 intro with pull quote
- ✅ Good: Current project hero with 7/5 split
- ✅ Good: Large decorative section numbers (01, 02, 03)
- ✅ Good: Featured website screenshot with overlay
- ✅ Good: Variety in card layouts (portrait, text, landscape, mini)
- ✅ Fixed: "Beyond Code" section redesigned to match About page layout
- ✅ Fixed: Kultstätte Keller removed completely from page
- ✅ Fixed: Navigation buttons use baseline patterns
- ✅ Fixed: Decorative number hidden (::before display: none)

**Completed Actions:**
- [x] **Beyond Code Redesign:**
  - Now uses `.looking-for-section` from about.css
  - Single column layout with Film Projects only
  - Footer navigation: Experience (back) · Arts page (forward)
  - Removed Crew United button
  - Hidden decorative "03" number via projects.css override
- [x] **Content Cleanup:**
  - Removed Kultstätte Keller cultural card from magazine grid
  - Removed Kultstätte Keller from Beyond Code section
  - Removed related image and text content
- [x] **Button Styling:**
  - All navigation buttons now use `.cta-link` pattern
  - Removed custom button variants

---

### ✅ Contact Page — REFINED

**Current State:**
- ✅ Good: Asymmetric 3/9 intro with pull quote
- ✅ Good: Contact details as clean cards
- ✅ Good: Map decoration with grid pattern
- ✅ Good: Contact methods sidebar
- ✅ Good: "Reach out if" CTA cards
- ✅ Good: Large decorative section numbers (01, 02, 03)
- ✅ Fixed: All emojis replaced with icon library
- ✅ Fixed: Submit button uses baseline `.cta-link--solid` pattern
- ✅ Fixed: Success state uses check icon instead of emoji

**Completed Actions:**
- [x] **Emoji Removal:**
  - Contact methods: Replaced ✉ ☎ 💼 with mail/phone/briefcase icons
  - Success state: Replaced ✓ emoji with check icon
  - All icons use Lucide-style stroke-based library
- [x] **Icon Library Expansion:**
  - Added `IconMail()` - mail icon for email method
  - Added `IconPhone()` - phone icon for call method
  - Added `IconCheck()` - checkmark for success state
- [x] **Form Component Fix:**
  - Added missing `components` import to contact.templ
  - Fixed build errors in contactForm.templ
- [x] **Button Styling:**
  - Submit button uses `.cta-link--solid` (baseline pattern)
  - Return home link uses `.cta-link--solid`

---

## Cross-Page Consistency Issues

### Images & Photography
**Problem:** Inconsistent image treatment across pages
**Solution:**
- Apply `.img-editorial` filter universally
- Use `mix-blend-mode: multiply` for warmth
- Maintain consistent opacity (0.90)

### Whitespace & Breathing Room
**Problem:** Some pages feel cramped compared to baseline
**Solution:**
- Audit all section spacing
- Increase to baseline levels (--space-4xl, --space-5xl)
- Prioritize readability over density

### Typography Hierarchy
**Problem:** Inconsistent use of labels and section headers
**Solution:**
- Standardize on `.label-mono` for all metadata
- Use `.section-header` consistently
- Maintain baseline font sizes

### Card Opacity & Fading
**Problem:** Some cards use opacity to create hierarchy
**Solution:**
- Remove opacity from cards
- Use background color variations instead
- Maintain solid, confident design

### Section Numbers
**Problem:** Inconsistent placement and opacity
**Solution:**
- Standardize on opacity: 0.04
- Consistent positioning (top-right or top-left)
- Same font size: 10.2rem

---

## Implementation Strategy

**Philosophy:** Global utilities first, page-specific only when necessary for unique layouts.

### Phase 1: Global Utilities & Filters (Reusable Patterns)
**Goal:** Add missing global utilities that benefit all pages

1. **Add global image monochrome utility** (utilities.css)
   - Create `.img-monochrome` class with editorial filter
   - Apply via template class, not page CSS
   - Benefits: Arts, Projects, About pages

2. **Add spacing utility variants** (utilities.css)
   - Add `.mb-4xl { margin-bottom: var(--space-4xl); }`
   - Add `.mb-5xl { margin-bottom: var(--space-5xl); }`
   - Removes need for page-specific spacing overrides

3. **Standardize all images to use `.img-editorial`** (templates)
   - Update Arts page image tags
   - Update Projects workspace image
   - Update About page image
   - Global class, no new CSS needed

4. **Remove all card opacity overrides** (page CSS cleanup)
   - Delete `.card.card--accent-left-thick { opacity: 0.75; }` from projects.css
   - Delete `.card.card--dashed.card--interactive-lift { opacity: 0.65; }` from projects.css
   - Let base `.card` utility handle all styling

### Phase 2: Template Refactoring (Use Existing Utilities)
**Goal:** Replace page-specific classes with existing utilities

1. **Forms: Create global form utilities** (utilities.css - NEW)
   - Extract `.form-input`, `.form-label`, `.form-textarea` from contact.css
   - Make them reusable utilities (currently deferred, but needed now)
   - Remove from contact.css, add to utilities.css

2. **Section spacing: Use existing utilities** (templates)
   - Replace custom margins with `.mb-4xl`, `.mb-5xl` classes
   - No new CSS, just template updates

3. **Labels: Ensure consistent `.label-mono` usage** (templates)
   - Audit all pages for custom label classes
   - Replace with `.label-mono` or variants
   - Already have the utility, just need template updates

### Phase 3: Page-Specific Layout Only (What Can't Be Utilities)
**Goal:** Only touch page CSS for unique layouts, not reusable patterns

1. **Arts page spreads** (arts.css)
   - Layout-only: `.spread-*` classes for photo arrangements
   - Keep these page-specific (unique to Arts)

2. **Experience timeline** (experience.css)
   - Layout-only: `.timeline-row`, `.offset-up`, `.offset-down-wrapper`
   - Keep these page-specific (unique timeline layout)

3. **Projects magazine grid** (projects.css)
   - Layout-only: `.project-card-portrait`, `.project-card-landscape`
   - Keep these page-specific (unique grid arrangements)

4. **Contact map decoration** (contact.css)
   - Layout-only: `.map-decoration`, `.map-grid`
   - Keep these page-specific (unique to Contact)

### Phase 4: Content & Testing
**Goal:** Final polish and verification

1. Visual regression test
2. Ensure all utilities are reused properly
3. Verify no duplicate CSS patterns
4. Test responsive behavior

---

## Success Metrics

**Visual Consistency:**
- [ ] All images use monochrome filter
- [ ] Whitespace matches baseline generosity
- [ ] Typography hierarchy is clear and consistent
- [ ] No orphaned opacity overrides

**Editorial Quality:**
- [ ] Each page feels confident and purposeful
- [ ] Breathing room allows content to speak
- [ ] No visual noise or unnecessary decoration
- [ ] Warm, inviting monochrome throughout

**User Experience:**
- [ ] Easy to scan and navigate
- [ ] Clear content hierarchy
- [ ] Smooth, subtle interactions
- [ ] Fast, performant rendering

---

## Session Tracking

### Session 1 (2025-12-26 - Morning)
- [x] Analyzed all pages with full desktop screenshots
- [x] Created comprehensive refinement plan
- [x] Identified baseline pages (Index + About)

### Session 2 (2025-12-26 - Afternoon)
- [x] **CSS Architecture Cleanup:**
  - Extracted `.values-list` from about.css to utilities.css
  - Extracted `.checkmark-list` from about.css to utilities.css
  - Removed duplicated component styles from about.css
  - About.css now contains only layout and decorations
- [x] **Button Pattern Standardization:**
  - Fixed Experience page: CV download + navigation buttons
  - Fixed Projects page: All buttons now use baseline patterns
  - Fixed Contact page: Form submit uses `.cta-link--solid`
- [x] **Icon Library Enhancement:**
  - Added `IconMail()` for email contact method
  - Added `IconPhone()` for phone contact method
  - Added `IconCheck()` for form success state
  - All icons follow Lucide-style (1.5px stroke, rounded)
- [x] **Emoji Removal (Contact Page):**
  - Replaced all emojis with proper icon components
  - ✉ → mail icon, ☎ → phone icon, 💼 → briefcase icon
  - ✓ → check icon in success state
- [x] **Projects Page Refinement:**
  - Redesigned "Beyond Code" section to match About "What I'm Looking For"
  - Removed Kultstätte Keller cultural card completely
  - Simplified to single Film Projects column
  - Added navigation: Experience (back) · Arts page (forward)
  - Hidden decorative "03" number via CSS override
- [x] **Arts Page Refinement:**
  - Removed sketches section (SVG placeholders)
  - Added "coming soon" note for future content
- [x] **Build Fixes:**
  - Added missing `components` import to contact.templ
  - Fixed contactForm.templ build errors

### Next Session
- Begin layout and spacing refinement
- Consider responsive design pass
- Final visual consistency audit
