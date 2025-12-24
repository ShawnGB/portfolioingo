# Experience Page Redesign - Editorial Variety & Asymmetry

## Overview
The redesigned Experience page breaks away from the uniform timeline structure and embraces true editorial variety, inspired by the About page's dynamic layouts.

## Key Design Changes

### 1. INTRO Section (3/9 Split)
**Status:** UNCHANGED - Already excellent
- Asymmetric 3/9 column split
- Pull quote in left column: "7+ years bridging code and strategy"
- Vertical rule accent on content

### 2. SKILLS Section - Playful Card Arrangement
**Old:** Rigid 4/8 two-column layout with uniform styling
**New:** Dynamic card grid with varied layouts

#### First Row (5/4/3 Split):
- **Development** (5 columns): Primary card with thick left border
- **Tooling** (4 columns): Secondary card with top border accent
- **Creative** (3 columns): Gradient background card

#### Second Row (Offset 5/6 Split):
- **Emerging** (offset 1, span 5): Highlighted card with shadow
- **Soft Skills** (6 columns): Dashed border card

**Visual Variety:**
- 5 different card styles (primary, secondary, accent, highlight, soft)
- Varied border treatments (solid, dashed, gradient)
- Different border positions (left, top, all sides)
- Hover effects with lift and shadow
- Non-uniform column widths create playful rhythm

### 3. TIMELINE Section - Dynamic & Asymmetric
**Old:** Uniform vertical timeline with consistent dots on the left
**New:** Varied layouts with entries breaking in different directions

#### Timeline Entry Variations:

**Wide Education Card (8 columns):**
- Neue Fische education
- Large card with gradient background
- Thick left border (6px)
- Floating metric box on the right: "7+ Years in Tech"

**Asymmetric 7-column + Pull Quote:**
- Freelance entry (7 columns left)
- Pull quote floating outside timeline (4 columns right): "Building sustainable digital products with care"
- Standard timeline dot on left

**Offset Right (5-6 columns):**
- Freiheit, Yptokey, U/skillity
- Timeline breaks RIGHT instead of left
- Border on right side, dot on right
- Text aligned right, lists aligned left
- Creates visual variety and prevents monotony

**Standard Left (7 columns):**
- Data4Life, Refund.me
- Traditional timeline position
- Maintains rhythm between offset entries

**Spanning Education Card (10 columns, offset 2):**
- CODE University
- Wide card spanning across the grid
- Top border accent (4px)
- Breaks the timeline completely for emphasis

**Compact Education Cards (4-5 columns):**
- Ireland, IHK, SAE
- Smaller, lighter treatment
- Various grid positions (left, center, right)
- Subtle left border (3px)

#### Special Decorative Elements:

**Floating Metric Box:**
- "7+ Years in Tech" next to Neue Fische
- Large display number (3.5rem)
- Boxed with border and shadow
- Visually emphasizes experience

**Pull Quote:**
- Floats outside timeline track
- Large italic text (1.5rem)
- Top accent line
- Breaks uniform flow

**Year Marker:**
- Large vertical "2018" text
- 80% opacity, massive scale (4rem)
- Vertical writing mode
- Marks significant transition points

**Journey Marker:**
- "The Beginning" vertical label
- Next to Kultstätte entry
- Subtle, elegant closure

**Metric Callout:**
- "WCAG Accessibility Standards" for Freiheit
- Inline achievement badge
- Left border accent
- Mono font, uppercase

### 4. Real Metrics & Content
**Extracted from translations:**
- "7+ Years in Tech" (calculated from timeline)
- "WCAG Accessibility Standards" (from Freiheit role)
- Timeline spans 2006-2025 (19 years of continuous growth)
- No fabricated metrics - all grounded in real achievements

## Visual Rhythm & Editorial Flow

### Section 01 (Intro):
- Calm, asymmetric opening
- 3/9 split with pull quote

### Section 02 (Skills):
- Energetic, playful cards
- 5/4/3 then offset 5/6 split
- Full-bleed background (paper-mid)
- 5 different visual treatments

### Section 03 (Timeline):
- **Dynamic alternation:**
  - Wide card (8 col) → LEFT
  - Asymmetric (7 col) with pull quote → LEFT
  - Offset (5 col) → RIGHT
  - Standard (7 col) → LEFT
  - Spanning (10 col) → CENTER
  - Offset (6 col) → RIGHT
  - Compact card (5 col) → LEFT
  - Standard (7 col) → CENTER-LEFT
  - Offset (5 col) → RIGHT
  - Compact card (4 col) → CENTER-LEFT
  - Standard (6 col) → LEFT
  - Compact card (5 col) → RIGHT

- **Never uniform:** Every entry has unique positioning, sizing, or styling
- **Education cards stand out:** 3 different treatments (wide, spanning, compact)
- **Experience entries vary:** Standard left, offset right, with/without metrics

## Responsive Design
**Mobile strategy:**
- All cards stack to single column
- Reset all grid-start positions
- Remove floating elements (metrics, pull quotes, markers)
- Unified left-aligned timeline
- Hide decorative numbers
- Reduce padding to conserve space

## Design Principles Applied

1. **Asymmetry:** No two rows are the same width
2. **Varied Treatments:** Education gets 3 styles, skills get 5 styles
3. **Breaking the Grid:** Pull quotes and metrics float outside timeline
4. **Visual Hierarchy:** Important entries (Neue Fische, CODE) get larger cards
5. **Directional Flow:** Timeline breaks left AND right, not just left
6. **Editorial Decoration:** Year markers, journey labels, floating quotes
7. **Metric Integration:** Real achievements highlighted as design elements

## Comparison to About Page Variety

**About page layouts:**
- 4/8 split (intro)
- 7/5 split (values + journey)
- 3/4/4 split (quote + image + beyond)
- Three-card layout (looking for)

**Experience redesign layouts:**
- 3/9 split (intro)
- 5/4/3 split (skills row 1)
- 5/6 offset split (skills row 2)
- 8 + 3 metric (timeline)
- 7 + 4 pull quote (timeline)
- 5 offset right (timeline)
- 10 spanning (timeline)
- 4-6 varied compact (timeline)

**Result:** Experience page now has EQUAL or GREATER variety than About page.

## Files Created
- `/Users/SGB/dev_projects/go-folio/views/pages/experience_REDESIGN.templ`
- `/Users/SGB/dev_projects/go-folio/static/css/experience_REDESIGN.css`

## Next Steps (Optional)
1. Generate templ files: `templ generate`
2. Update handler to use `ExperienceRedesign` component
3. Link new CSS file in head
4. Test responsive breakpoints
5. Validate accessibility (ARIA labels, focus states)
6. Consider adding more real metrics if found in content
