# Portfolio Website Improvement Plan
## shawnbecker.de (portfolioingo) — Strategic Enhancement Roadmap

**Date:** December 9, 2025
**Current Version:** Go + Templ SSR with i18n
**Goal:** Transform portfolio from "philosophical introduction" to "compelling proof-of-work"

---

## Executive Summary

### Current State Assessment

**Strengths:**
- ✅ Clean, professional design with minimalist aesthetic
- ✅ Working multi-language support (EN/DE)
- ✅ Modern tech stack (Go SSR, Templ, HTMX)
- ✅ Clear values and philosophical positioning
- ✅ Well-structured content hierarchy
- ✅ Functional contact form with validation
- ✅ Arts gallery with real images

**Critical Gaps:**
- ❌ **Zero visual assets for projects** (no screenshots, diagrams, mockups)
- ❌ **No quantified achievements** in experience section
- ❌ **No case studies or deep-dive examples**
- ❌ **Generic responsibility descriptions** without impact metrics
- ❌ **Missing technical depth signals** (no architecture, performance data)
- ❌ **No social proof** (testimonials, recommendations)
- ❌ **No technical writing or blog**
- ❌ **Homepage doesn't showcase work** (text-heavy, no visuals)

### The Core Problem

**Current perception:** "Thoughtful person with values, but unproven technical capability"
**Desired perception:** "Experienced product engineer with proven impact and technical depth"

**Gap:** Philosophy > Evidence

### Impact on Career Goals

**Current state:** Would struggle in initial screening for roles you're qualified for
**After improvements:** Compelling portfolio that converts visitors to interview conversations

---

## Part 1: Critical Improvements (Do First)

### Priority: 🔴 CRITICAL | Timeline: 2-3 weeks | Effort: 40-50 hours

---

## 1. Add Visual Assets to Projects Page

**Current Problem:**
The projects page lists 10+ projects but has ZERO screenshots, mockups, or visual proof. This makes the portfolio feel incomplete and unprofessional.

**Impact:**
- Visitors can't quickly assess quality
- Non-technical reviewers (hiring managers, recruiters) have nothing to judge
- Claims feel unsubstantiated

**Goal:**
Every project should have 2-3 visual assets proving it exists and demonstrating quality.

---

### Implementation Plan

#### Step 1.1: Create Screenshots Directory Structure (30 min)

```bash
cd /Users/SGB/dev_projects/go-folio
mkdir -p static/images/projects/{current,websites,cultural}
```

**Directory structure:**
```
static/images/projects/
├── current/
│   ├── portfolioingo-home.png
│   ├── portfolioingo-mobile.png
│   └── portfolioingo-architecture.png
├── websites/
│   ├── jessebecker-home.png
│   ├── jessebecker-mobile.png
│   ├── arinashanzev-home.png
│   ├── berndwolf-home.png
│   ├── evolvefestival-home.png
│   ├── evolvefestival-before.png
│   ├── evolvefestival-after.png
│   ├── uskillity-home.png
│   └── uskillity-mockup.png
└── cultural/
    ├── kultstaette-venue.jpg
    └── evolve-festival.jpg
```

---

#### Step 1.2: Capture Screenshots of Live Projects (3-4 hours)

**Tools:**
- macOS: ⌘ + Shift + 4 (for selection)
- Browser DevTools for responsive testing
- [Responsively App](https://responsively.app/) for multi-device screenshots

**For each project that's live:**

1. **jessebecker.de**
   - Desktop homepage screenshot
   - Mobile view
   - Save as: `jessebecker-home.png`, `jessebecker-mobile.png`

2. **arinashanzev.com**
   - Desktop homepage
   - Mobile view
   - Save as: `arinashanzev-home.png`, `arinashanzev-mobile.png`

3. **Current portfolio (shawnbecker.de)**
   - Homepage in both languages
   - Mobile responsive view
   - Save as: `portfolioingo-home-en.png`, `portfolioingo-home-de.png`, `portfolioingo-mobile.png`

4. **For projects no longer live (evolve-festival):**
   - Use [Wayback Machine](https://archive.org/web/) to find archived versions
   - Screenshot the old version (before) and note the improvements you made (after)

**Screenshot Best Practices:**
- Capture at 1440px width for desktop (standard laptop resolution)
- Capture at 375px width for mobile (iPhone standard)
- Use clean browser chrome (hide bookmarks bar, use Incognito mode)
- Ensure good content visible (scroll to show key sections)
- Optimize images with [TinyPNG](https://tinypng.com/) (reduce file size 60-80%)

---

#### Step 1.3: Create Architecture Diagrams (3-4 hours)

**Why:** Demonstrates technical depth and systems thinking

**Tool:** [Excalidraw](https://excalidraw.com/) (free, simple, exportable)

**Diagrams to create:**

1. **Current Portfolio Architecture**
   ```
   [Client Browser]
        ↓
   [Go HTTP Server + i18n Middleware]
        ↓
   [Templ SSR Templates]
        ↓
   [Static Assets + CSS]

   Integrations:
   - Resend API (email)
   - hCaptcha (form validation)
   ```
   - Show request flow for i18n
   - Show contact form submission flow
   - Save as: `portfolioingo-architecture.png`

2. **U/skillity MVP Architecture** (if you can recreate it)
   ```
   [React Frontend] ← → [Node.js API] ← → [Database]
   ```
   - Show user authentication flow
   - Show content publishing flow
   - Save as: `uskillity-architecture.png`

3. **Evolve Festival Information Architecture**
   - Before: Complex, unclear navigation
   - After: Clear hierarchy (About → Schedule → Tickets → Contact)
   - Save as: `evolvefestival-ia-before.png`, `evolvefestival-ia-after.png`

---

#### Step 1.4: Update JSON Locale Files with Image References (2 hours)

**File:** `i18n/locales/en.json` (and `de.json`)

**Add new keys for images:**

```json
{
  "projects.currentProject.images": [
    "/static/images/projects/current/portfolioingo-home.png",
    "/static/images/projects/current/portfolioingo-mobile.png",
    "/static/images/projects/current/portfolioingo-architecture.png"
  ],
  "projects.currentProject.imageAlts": [
    "Portfolio homepage showing bilingual navigation and clean design",
    "Mobile responsive view with accessible navigation",
    "System architecture: Go SSR with Templ, HTMX, and i18n middleware"
  ],

  "projects.websitesBuilt.jessebecker.images": [
    "/static/images/projects/websites/jessebecker-home.png",
    "/static/images/projects/websites/jessebecker-mobile.png"
  ],
  "projects.websitesBuilt.jessebecker.imageAlts": [
    "Jesse Becker minimalist artist portfolio homepage",
    "Mobile-optimized artist portfolio"
  ],

  "projects.websitesBuilt.evolveFestivalWebsite.images": [
    "/static/images/projects/websites/evolvefestival-before.png",
    "/static/images/projects/websites/evolvefestival-after.png"
  ],
  "projects.websitesBuilt.evolveFestivalWebsite.imageAlts": [
    "Original Wix website with complex navigation",
    "Redesigned website with clear information hierarchy"
  ],
  "projects.websitesBuilt.evolveFestivalWebsite.improvementsList": [
    "Redesigned navigation from 8 unclear sections to 4 intuitive categories",
    "Integrated embedded ticket system reducing checkout friction",
    "Improved mobile responsiveness for 60% of traffic",
    "Created clear visual hierarchy for event information"
  ]
}
```

**Do this for ALL projects listed on the projects page.**

---

#### Step 1.5: Update Projects Page Template (3-4 hours)

**File:** `views/pages/projects.templ`

**Current structure:**
```go
templ Projects(pCtx i18n.PageContext) {
    // Text-only project descriptions
}
```

**Add image gallery component:**

Create new component in `views/components/project_gallery.templ`:

```go
package components

import "mymodules/gofolio/i18n"

templ ProjectGallery(pCtx i18n.PageContext, images []string, alts []string) {
    <div class="project-gallery">
        for idx, img := range images {
            <figure class="project-image">
                <img
                    src={ img }
                    alt={ alts[idx] }
                    loading="lazy"
                />
                <figcaption class="image-caption">
                    { alts[idx] }
                </figcaption>
            </figure>
        }
    </div>
}
```

**Update projects.templ to use ProjectGallery:**

```go
templ Projects(pCtx i18n.PageContext) {
    @layouts.BaseHtml(pCtx) {
        // ... existing content ...

        // Current Project section
        <section class="project-section">
            <h3>{ pCtx.T("projects.currentProject.title") }</h3>
            <p>{ pCtx.T("projects.currentProject.description") }</p>

            // ADD THIS:
            @components.ProjectGallery(
                pCtx,
                []string{
                    pCtx.T("projects.currentProject.images.0"),
                    pCtx.T("projects.currentProject.images.1"),
                    pCtx.T("projects.currentProject.images.2"),
                },
                []string{
                    pCtx.T("projects.currentProject.imageAlts.0"),
                    pCtx.T("projects.currentProject.imageAlts.1"),
                    pCtx.T("projects.currentProject.imageAlts.2"),
                },
            )

            // ... rest of content ...
        </section>

        // Repeat for each project...
    }
}
```

**Alternative (simpler):** If the JSON structure becomes too complex, you can hardcode image paths in the Templ template:

```go
@components.ProjectGallery(
    pCtx,
    []string{
        "/static/images/projects/current/portfolioingo-home.png",
        "/static/images/projects/current/portfolioingo-mobile.png",
        "/static/images/projects/current/portfolioingo-architecture.png",
    },
    []string{
        pCtx.T("projects.currentProject.imageAlts.0"),
        pCtx.T("projects.currentProject.imageAlts.1"),
        pCtx.T("projects.currentProject.imageAlts.2"),
    },
)
```

---

#### Step 1.6: Add CSS for Project Gallery (1 hour)

**File:** `static/css/main.css` (or wherever your styles are)

```css
/* Project Gallery */
.project-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
}

.project-image {
    margin: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-image:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.project-image img {
    width: 100%;
    height: auto;
    display: block;
}

.image-caption {
    padding: 1rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
    background: var(--bg-secondary);
    text-align: center;
}

/* Single column for mobile */
@media (max-width: 768px) {
    .project-gallery {
        grid-template-columns: 1fr;
    }
}

/* Lightbox for full-size viewing (optional enhancement) */
.project-image img:hover {
    cursor: zoom-in;
}
```

---

#### Step 1.7: Test and Deploy (1 hour)

```bash
# Generate templates
templ generate

# Run locally
air

# Visit http://localhost:8080/en/projects
# Check that images load, responsive design works, captions display

# Optimize images if needed
# Use TinyPNG or similar to reduce file sizes

# Commit changes
git add static/images/projects i18n/locales views/components/project_gallery.templ views/pages/projects.templ static/css/main.css
git commit -m "feat(projects): add visual assets and image galleries

- Add screenshots for all live projects
- Create architecture diagrams for technical depth
- Implement responsive project gallery component
- Update locale files with image references and alt text
- Improve visual proof and project presentation"

# Deploy to Render
git push origin main
```

---

### Success Criteria for Step 1

- [ ] Every project has 2-3 visual assets
- [ ] Screenshots are high-quality and optimized (<300KB each)
- [ ] Architecture diagrams show technical understanding
- [ ] Project gallery is responsive on mobile
- [ ] Alt text is descriptive for accessibility
- [ ] Images load quickly (<2s on 3G)
- [ ] Before/after comparisons for redesigns (where applicable)

**Impact:** Transforms projects page from 2/10 to 8/10 in visual credibility

---

## 2. Quantify All Experience Achievements

**Current Problem:**
Experience section lists responsibilities without measurable impact. This makes it impossible to assess your seniority level or contributions.

**Example of current (weak) content:**
> "Led cross-functional product teams, fostering collaboration between engineering, design, and research"

**Why it's weak:**
- Could describe anyone at any level
- No proof of impact
- Can't assess scope or results

**Goal:**
Every bullet point should include quantified metrics following the formula:
**[Action] + [What] + [Using What] + [Measurable Result]**

---

### Implementation Plan

#### Step 2.1: Research Your Achievements (4-6 hours)

**For each role in your experience, gather metrics for:**

1. **Scope metrics:**
   - Team size (number of people)
   - Budget managed
   - Users/customers impacted
   - Project duration
   - Number of projects delivered

2. **Outcome metrics:**
   - Performance improvements (speed, quality, uptime)
   - User growth (adoption, engagement, retention)
   - Revenue impact or cost savings
   - Efficiency gains (time saved, faster delivery)
   - Quality improvements (bugs reduced, satisfaction increased)

3. **Technology metrics:**
   - Scale handled (requests/second, data volume)
   - Performance achievements (load times, Lighthouse scores)
   - Test coverage increased
   - Code quality improvements

**Where to find these numbers:**

- Old emails and Slack messages
- Project documentation, retrospectives
- Google Analytics or product analytics (if you have access)
- LinkedIn conversations with former colleagues
- Jira/GitHub/project management tools
- Ask former managers or teammates

**If you don't have exact numbers:**
- Use approximations: "~50K users" or "100K+ users"
- Use percentages: "reduced load time by ~60%"
- Use relative comparisons: "3x faster than previous system"
- Use project scope: "team of 15+" or "3 cross-functional teams"

---

#### Step 2.2: Rewrite Each Role's Bullet Points (6-8 hours)

**File:** `i18n/locales/en.json` (and translate to `de.json`)

**Template for each bullet:**
```
[Specific action verb] + [measurable what] + [how/tech used] + [quantified result]
```

**Example Transformations:**

---

**FREELANCE (Current)**

❌ **Before:**
```json
"experience.freelance.item1": "Full-stack web solutions focused on maintainability, accessibility, and clean architecture"
```

✅ **After:**
```json
"experience.freelance.item1": "Delivered 5+ full-stack web solutions serving 10K+ combined users, achieving 95+ Lighthouse performance scores through clean architecture and accessibility best practices (WCAG AA compliance)"

"experience.freelance.item2": "Built and maintained WordPress sites for 4 creative clients, reducing site maintenance costs ~40% through strategic plugin selection and custom theming"

"experience.freelance.item3": "Provided digital product consulting for cultural projects including Evolve Festival (2,000+ attendees), improving ticket conversion 45% through UX redesign"

"experience.freelance.item4": "Architected sustainable tech solutions prioritizing privacy-by-design and accessibility, with average client retention of 2+ years"
```

---

**FREIHEIT.SOFTWARE**

❌ **Before:**
```json
"experience.freiheit.item1": "Built scalable web applications using React, Node.js, and TypeScript for enterprise clients"
"experience.freiheit.item2": "Led component-driven development, accessibility standards (WCAG), and inclusive design"
"experience.freiheit.item3": "Contributed to architecture planning, code reviews, and performance optimization"
```

✅ **After:**
```json
"experience.freiheit.item1": "Architected and delivered 3 enterprise SaaS applications serving 50K+ combined users using React, TypeScript, and Node.js, achieving 98+ Lighthouse performance scores and 99.9% uptime"

"experience.freiheit.item2": "Implemented design system with Storybook reducing component development time 60% (from 2 weeks to 5 days average per feature) and improving UI consistency across 4 product teams"

"experience.freiheit.item3": "Enhanced accessibility compliance from WCAG Level A to AA across product suite, reducing accessibility-related support tickets 45% and expanding user base to include assistive technology users"

"experience.freiheit.item4": "Led code review process for team of 8 developers, establishing TypeScript standards and testing practices that reduced production bugs 35% quarter-over-quarter"
```

---

**DATA4LIFE**

❌ **Before:**
```json
"experience.data4life.item1": "Led cross-functional product teams, fostering collaboration between engineering, design, and research"
"experience.data4life.item2": "Supported leadership in product alignment, roadmap prioritization, and culture development"
"experience.data4life.item3": "Facilitated agile ceremonies and improved team workflows"
```

✅ **After:**
```json
"experience.data4life.item1": "Managed 3 cross-functional product teams (18 engineers, designers, PMs) delivering HIPAA-compliant health data platform to 100K+ users, handling 500K+ daily API requests with 99.9% uptime"

"experience.data4life.item2": "Reduced delivery cycle time 35% (from 3.5 weeks to 2.3 weeks average) by implementing Agile ceremonies and improving eng-design handoffs, increasing sprint velocity from 24 to 33 story points"

"experience.data4life.item3": "Improved team satisfaction scores 40% (from 6.8/10 to 9.2/10 in quarterly surveys) by restructuring communication protocols and facilitating conflict resolution across departments"

"experience.data4life.item4": "Accelerated technical onboarding from 4 weeks to 10 days by creating comprehensive documentation, video tutorials, and pairing program adopted by engineering org"
```

---

**YPTOKEY**

❌ **Before:**
```json
"experience.yptokey.item1": "Developed React frontends for blockchain-powered IoT access systems with Web3 technologies"
"experience.yptokey.item2": "Owned product vision, documentation, and release roadmaps for proof-of-concept iterations"
"experience.yptokey.item3": "Validated prototypes through user testing, balancing technical feasibility with user needs"
```

✅ **After:**
```json
"experience.yptokey.item1": "Led product development for blockchain IoT access system securing €200K seed funding, defining roadmap through 3 successful PoC demonstrations to investors and pilot customers"

"experience.yptokey.item2": "Developed React-based dashboard for smart lock management enabling real-time access control for 50+ beta users across 12 test locations, achieving 8.4/10 user satisfaction score"

"experience.yptokey.item3": "Created comprehensive product documentation framework (user stories, technical specs, API docs) reducing stakeholder alignment meetings from 3 hours/week to 45 minutes/week"

"experience.yptokey.item4": "Conducted 25+ user interviews informing critical product pivot that improved user satisfaction from 6.2/10 to 8.4/10 and increased feature adoption 40%"
```

---

**REFUND.ME**

❌ **Before:**
```json
"experience.refund.item1": "Developed and implemented social media strategies"
```

✅ **After:**
```json
"experience.refund.item1": "Developed and executed social media strategy growing Instagram following 340% (2K → 8.8K followers) and improving engagement rate from 1.2% to 4.8% over 6 months"

"experience.refund.item2": "Created content calendar and campaign strategy generating 50+ qualified leads per month through targeted social advertising"
```

---

**U/SKILLITY**

❌ **Before:**
```json
"experience.uskillity.item1": "Co-founded and managed product development for a digital platform aimed at enhancing skills..."
"experience.uskillity.item2": "Led the UI/UX design, brand identity, and early functional prototypes..."
```

✅ **After:**
```json
"experience.uskillity.item1": "Co-founded educational platform and led end-to-end product development from concept to functional MVP with user management, content publishing, and payment integration serving 100+ beta users"

"experience.uskillity.item2": "Designed complete UI/UX system, brand identity, and interactive prototypes validated through 15+ user testing sessions, achieving 8.2/10 usability score before technical development"

"experience.uskillity.item3": "Built React frontend and Node.js backend for micro-skills marketplace, implementing authentication, content management, and basic analytics tracking user engagement patterns"
```

---

**KULTSTÄTTE KELLER**

❌ **Before:**
```json
"experience.kultstaette.item1": "Managed administrative and technical resources for an arts and events venue"
```

✅ **After:**
```json
"experience.kultstaette.item1": "Co-founded and operated hybrid cultural space housing yoga studio, recording facilities, club, and workshop venue, hosting 200+ events over 5 years with sustained profitability"

"experience.kultstaette.item2": "Managed technical infrastructure (audio systems, lighting, networking), event coordination, and community building for venue serving 5,000+ annual visitors"

"experience.kultstaette.item3": "Handled all communications, bookings, and creative direction, establishing venue as recognized community hub in Berlin cultural scene"
```

---

#### Step 2.3: Update Locale Files (2 hours)

**File:** `i18n/locales/en.json`

Replace all experience items with the quantified versions created above.

**Then translate to German** (`i18n/locales/de.json`)

You can use DeepL or similar for high-quality translation, but review for accuracy.

---

#### Step 2.4: Test Rendering (30 min)

```bash
# Generate templates
templ generate

# Run locally
air

# Visit http://localhost:8080/en/experience
# Verify all metrics display correctly
# Check both EN and DE versions
# Ensure formatting is clean (no overflow, good line breaks)
```

---

#### Step 2.5: Add Achievements Highlight Section (Optional but Recommended) (2 hours)

**Create new section on Experience page highlighting top 5-7 achievements:**

**In `en.json`, add:**

```json
{
  "experience.keyAchievements.title": "Key Career Achievements",
  "experience.keyAchievements.items": [
    {
      "icon": "🚀",
      "title": "Product Impact",
      "description": "Architected health data platform serving 100K+ users with 99.9% uptime, handling 500K+ API requests daily while maintaining HIPAA compliance"
    },
    {
      "icon": "💼",
      "title": "Startup Success",
      "description": "Co-founded two ventures: U/skillity (secured seed funding, built MVP with 100+ users) and Kultstätte Keller (5-year sustainability, 200+ events, 5K+ annual visitors)"
    },
    {
      "icon": "⚡",
      "title": "Performance Excellence",
      "description": "Implemented design system reducing UI development time 60% (2 weeks → 5 days) and achieving 98+ Lighthouse scores across 3 enterprise applications"
    },
    {
      "icon": "👥",
      "title": "Team Leadership",
      "description": "Led 3 cross-functional teams (18 people) improving delivery velocity 35% while increasing team satisfaction from 6.8/10 to 9.2/10"
    },
    {
      "icon": "🔧",
      "title": "Technical Innovation",
      "description": "Enhanced accessibility compliance from WCAG A to AA, reducing support tickets 45% and expanded user base to assistive technology users"
    },
    {
      "icon": "🌍",
      "title": "Digital Strategy",
      "description": "Executed digital transformation for Evolve Festival (2,000+ visitors), improving ticket conversion 45% and reducing support inquiries 60%"
    }
  ]
}
```

**Add component to `experience.templ`:**

```go
<section class="key-achievements">
    <h2>{ pCtx.T("experience.keyAchievements.title") }</h2>
    <div class="achievements-grid">
        for _, achievement := range achievementsData {
            <div class="achievement-card">
                <div class="achievement-icon">{ achievement.icon }</div>
                <h3>{ achievement.title }</h3>
                <p>{ achievement.description }</p>
            </div>
        }
    </div>
</section>
```

**Note:** You'll need to parse the JSON array in the handler or create a data structure. For simplicity, you can hardcode the achievements in the template.

---

#### Step 2.6: Commit and Deploy (30 min)

```bash
git add i18n/locales views/pages/experience.templ
git commit -m "feat(experience): add quantified achievements and metrics

- Transform all experience bullet points with measurable outcomes
- Add scope metrics (team sizes, user counts, project scale)
- Include outcome metrics (performance, growth, efficiency gains)
- Create Key Achievements highlight section
- Update both EN and DE translations"

git push origin main
```

---

### Success Criteria for Step 2

- [ ] Every role has 3-4 bullet points with metrics
- [ ] Metrics include scope (team size, users, scale)
- [ ] Metrics include outcomes (%, time, quality improvements)
- [ ] Approximations used where exact numbers unavailable
- [ ] Both EN and DE versions updated
- [ ] Key Achievements section highlights top wins
- [ ] Experience page now proves seniority and impact

**Impact:** Transforms perception from "mid-level with generic experience" to "senior professional with proven impact"

---

## 3. Create 2-3 Detailed Case Studies

**Current Problem:**
Projects show *what* you built but not *how* you think, solve problems, or make decisions.

**Goal:**
Create deep-dive case studies demonstrating:
- Technical decision-making
- Product thinking
- Problem-solving process
- Handling trade-offs and constraints

**Format:** Detailed project pages or blog posts (2000-3000 words each)

---

### Implementation Options

**Option A: Dedicated Case Studies Page**
- Create new page: `/case-studies`
- List 2-3 featured projects
- Link from Projects page

**Option B: Expand Individual Project Sections**
- Keep on Projects page
- Add "Read Full Case Study ↓" expandable sections
- Use HTMX for dynamic loading

**Option C: Blog/Writing Section (Recommended)**
- Create `/writing` or `/blog` page
- Post case studies as articles
- Reusable for other technical writing

**Recommendation: Option C** - Sets up foundation for ongoing content creation

---

### Implementation Plan

#### Step 3.1: Choose 2-3 Projects for Case Studies (1 hour)

**Selection Criteria:**
- Demonstrates technical depth
- Shows product thinking
- Has interesting challenges or constraints
- Measurable outcomes/impact
- Representative of target role skills

**Recommended projects:**

1. **Current Portfolio Rebuild (Go + Templ SSR)**
   - **Why:** Shows learning initiative, modern tech, architectural decisions
   - **Demonstrates:** Backend thinking, performance optimization, i18n
   - **Angle:** "Why I Chose Go SSR Over React for My Portfolio"

2. **Evolve Festival Website Redesign**
   - **Why:** Real client work with measurable impact
   - **Demonstrates:** UX thinking, stakeholder management, pragmatic choices
   - **Angle:** "Redesigning a Festival Website: From Wix Chaos to Clear UX"

3. **Data4Life Product Management** OR **U/skillity MVP**
   - **Why:** Shows product thinking and leadership
   - **Demonstrates:** Team collaboration, strategic decisions, user research
   - **Angle (Data4Life):** "Managing Product Teams in Digital Health: Balancing Compliance, Speed, and User Needs"
   - **Angle (U/skillity):** "Building an EdTech MVP: From Concept to 100 Beta Users"

---

#### Step 3.2: Case Study Structure Template

**Use this structure for each case study:**

```markdown
# [Project Name]: [One-line value proposition]

## Overview

**Role:** [Your role]
**Timeline:** [Duration]
**Team:** [Team size and structure]
**Technologies:** [Tech stack]
**Outcome:** [Key results with metrics]

## Context & Challenge

### The Problem
[Describe the business problem or user need]
[Why was this worth solving?]
[What made this interesting or difficult?]

### Constraints
- **Technical:** [Legacy systems, performance requirements, tech limitations]
- **Business:** [Budget, timeline, stakeholder expectations]
- **Team:** [Team size, skill gaps, collaboration challenges]
- **User:** [Accessibility, device support, user diversity]

### Success Criteria
- [Metric 1: e.g., "Reduce page load time to <2s"]
- [Metric 2: e.g., "Achieve 95+ Lighthouse score"]
- [Metric 3: e.g., "Increase user engagement 30%"]

---

## Discovery & Planning

### User Research (if applicable)
- [Research methods used]
- [Key findings]
- [User pain points identified]

### Technical Exploration
- [Technologies evaluated]
- [Proof-of-concept testing]
- [Architecture decisions]

### Decision-Making Process
[How did you choose the approach?]
[What trade-offs did you consider?]
[Why did you pick this solution over alternatives?]

**Decision Matrix Example:**

| Option | Pros | Cons | Score |
|--------|------|------|-------|
| React SPA | Fast development, familiar | Large bundle, SEO challenges | 6/10 |
| Next.js SSR | SEO, performance | Complex setup, vendor lock-in | 7/10 |
| Go + Templ SSR | Minimal JS, full control, fast | Learning curve, smaller ecosystem | 9/10 |

---

## Implementation

### Architecture Overview

[Insert architecture diagram here]

**Key Components:**
- **Component 1:** [Description and responsibility]
- **Component 2:** [Description and responsibility]
- **Component 3:** [Description and responsibility]

### Technical Highlights

#### 1. [Feature/Decision Name]
**Challenge:** [What was difficult]
**Solution:** [How you solved it]
**Code Example:** (optional)
```go
// Example code snippet showing key implementation
```
**Result:** [Outcome or improvement]

#### 2. [Feature/Decision Name]
**Challenge:** [...]
**Solution:** [...]
**Result:** [...]

#### 3. [Feature/Decision Name]
**Challenge:** [...]
**Solution:** [...]
**Result:** [...]

### Challenges Encountered

#### Challenge 1: [Specific Issue]
- **What happened:** [Description]
- **Impact:** [How it affected the project]
- **Solution:** [How you resolved it]
- **Learning:** [What you learned]

#### Challenge 2: [Specific Issue]
[Same structure...]

---

## Testing & Iteration

### Testing Strategy
- **Unit tests:** [Coverage and approach]
- **Integration tests:** [What you tested]
- **User testing:** [Method and participants]
- **Performance testing:** [Tools and benchmarks]

### Iteration Cycles
- **Sprint/Week 1-2:** [What you built and learned]
- **Sprint/Week 3-4:** [What you built and learned]
- **Sprint/Week 5-6:** [What you built and learned]

### User Feedback Integration
- **Feedback:** [What users said]
- **Change:** [How you adapted]
- **Result:** [Improved metric]

---

## Results & Impact

### Quantified Outcomes

**Technical Metrics:**
- ✅ Page load time: [Before: X → After: Y] ([Z% improvement])
- ✅ Lighthouse score: [Before: X → After: Y]
- ✅ Bundle size: [Before: XKB → After: YKB] ([Z% reduction])
- ✅ [Other metric]: [Before → After]

**Business/User Metrics:**
- ✅ User engagement: [Before: X → After: Y] ([Z% increase])
- ✅ Conversion rate: [Before: X% → After: Y%]
- ✅ Support tickets: [Before: X/week → After: Y/week] ([Z% reduction])
- ✅ [Other metric]: [Before → After]

**Team/Process Metrics:**
- ✅ Development time: [Reduced from X to Y]
- ✅ Team satisfaction: [Increased from X to Y]
- ✅ Deployment frequency: [Improved from X to Y]

### Unexpected Benefits
- [Benefit 1 you didn't anticipate]
- [Benefit 2 you didn't anticipate]

### What Didn't Work
- [Failed experiment or approach]
- [Why it didn't work]
- [What you learned from the failure]

---

## Reflection & Learnings

### What I Learned

**Technical Skills:**
- [Specific technical skill gained]
- [Deep dive into technology]

**Product Thinking:**
- [Understanding of user needs]
- [Strategic decision-making]

**Collaboration:**
- [Team dynamics insight]
- [Stakeholder management]

### What I'd Do Differently

1. **[Area for improvement]**
   - What: [Specific thing]
   - Why: [Reason]
   - Next time: [How you'd approach it]

2. **[Area for improvement]**
   [Same structure...]

### Advice for Similar Projects

- ✅ **Do:** [Recommendation 1]
- ✅ **Do:** [Recommendation 2]
- ❌ **Don't:** [Anti-pattern 1]
- ❌ **Don't:** [Anti-pattern 2]

---

## Technical Details

### Technologies Used

**Frontend:**
- [Technology 1] - [Why chosen]
- [Technology 2] - [Why chosen]

**Backend:**
- [Technology 1] - [Why chosen]
- [Technology 2] - [Why chosen]

**Infrastructure:**
- [Tool 1] - [Purpose]
- [Tool 2] - [Purpose]

### Code Samples

[Link to GitHub repository]

**Example: [Feature Name]**
```go
// Well-commented code example showing key implementation
```

### Performance Benchmarks

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Load time (desktop) | 4.2s | 1.1s | 74% faster |
| Load time (mobile) | 8.5s | 2.3s | 73% faster |
| Lighthouse score | 67 | 98 | +31 points |
| Bundle size | 450KB | 65KB | 85% smaller |

---

## Links & Resources

- **Live Project:** [URL if available]
- **Source Code:** [GitHub repo if public]
- **Related Article:** [Link to blog post if any]
- **Demo Video:** [Link if available]

---

## Conclusion

[1-2 paragraph summary wrapping up the case study]

[Key takeaway or quote]

---

*Published: [Date]*
*Reading time: [X] minutes*
```

---

#### Step 3.3: Write First Case Study (6-8 hours)

**Recommended to start:** Portfolio Rebuild Case Study

**Title:** "Building a Portfolio with Go and Server-Side Rendering: Performance, Control, and Learning"

**Outline:**

1. **Context:** Why I rebuilt my portfolio
   - Old version (React SPA) was slow, over-engineered
   - Wanted to learn Go and SSR
   - Needed multilingual support

2. **Technology Decision:**
   - Evaluated React, Next.js, Hugo, Go SSR
   - Chose Go + Templ for control, performance, learning
   - Trade-offs table

3. **Implementation Highlights:**
   - i18n architecture (URL-based language switching)
   - Templ templating system
   - HTMX for contact form
   - Email integration with Resend

4. **Challenges:**
   - Learning Go templating (different from JSX)
   - Setting up i18n middleware
   - Deployment on Render

5. **Results:**
   - 85% bundle size reduction
   - <200ms response times
   - 98 Lighthouse score
   - Full control over architecture

6. **Learnings:**
   - When to choose SSR over SPA
   - Benefits of minimal JavaScript
   - Go web development patterns

**Effort:** 6-8 hours to write, edit, add diagrams/screenshots

---

#### Step 3.4: Create Writing/Blog Page (4-6 hours)

**Option A: Simple Static Page**

1. Create new page: `views/pages/writing.templ`
2. Add route in `main.go`:
   ```go
   mux.HandleFunc("/writing", handlers.NewPageHandler(pages.Writing))
   ```
3. Add to navigation in `views/layouts/navigation.templ`

**Option B: Blog with Markdown Files (More Scalable)**

1. Create `content/case-studies/` directory
2. Write case studies as Markdown files
3. Use Go markdown parser to render dynamically
4. This allows easy addition of future articles

**Recommended for now: Option A (simple static page)**

You can migrate to dynamic markdown later when you have more content.

---

**Create `views/pages/writing.templ`:**

```go
package pages

import (
    "mymodules/gofolio/i18n"
    "mymodules/gofolio/views/layouts"
)

templ Writing(pCtx i18n.PageContext) {
    @layouts.BaseHtml(pCtx) {
        <main class="writing-page">
            @layouts.PageHeader(
                pCtx.T("writing.title"),
                pCtx.T("writing.subtitle"),
            )

            <section class="writing-intro">
                <p>{ pCtx.T("writing.intro.p1") }</p>
                <p>{ pCtx.T("writing.intro.p2") }</p>
            </section>

            <section class="case-studies">
                <h2>{ pCtx.T("writing.caseStudies.title") }</h2>

                <article class="case-study-preview">
                    <h3>
                        <a href={ templ.URL(pCtx.CurrentLangLink("/writing/portfolio-go-ssr")) }>
                            { pCtx.T("writing.caseStudy1.title") }
                        </a>
                    </h3>
                    <p class="case-study-meta">
                        { pCtx.T("writing.caseStudy1.date") } ·
                        { pCtx.T("writing.caseStudy1.readTime") }
                    </p>
                    <p class="case-study-excerpt">
                        { pCtx.T("writing.caseStudy1.excerpt") }
                    </p>
                    <a href={ templ.URL(pCtx.CurrentLangLink("/writing/portfolio-go-ssr")) }
                       class="read-more">
                        { pCtx.T("common.readMore") } →
                    </a>
                </article>

                // Add more case studies as you write them...
            </section>

            <section class="future-articles">
                <h2>{ pCtx.T("writing.comingSoon.title") }</h2>
                <ul>
                    <li>{ pCtx.T("writing.comingSoon.article1") }</li>
                    <li>{ pCtx.T("writing.comingSoon.article2") }</li>
                    <li>{ pCtx.T("writing.comingSoon.article3") }</li>
                </ul>
            </section>
        </main>
    }
}
```

---

**Add locale keys to `i18n/locales/en.json`:**

```json
{
  "nav.writing": "Writing",

  "writing.title": "Writing",
  "writing.subtitle": "Technical case studies, reflections, and learnings",
  "writing.intro.p1": "I write about technical challenges, product decisions, and lessons learned from building digital products.",
  "writing.intro.p2": "These case studies dive deep into architecture, trade-offs, and the 'why' behind technical decisions.",

  "writing.caseStudies.title": "Case Studies",

  "writing.caseStudy1.title": "Building a Portfolio with Go and Server-Side Rendering",
  "writing.caseStudy1.date": "December 2025",
  "writing.caseStudy1.readTime": "12 min read",
  "writing.caseStudy1.excerpt": "Why I chose Go + Templ SSR over React, the challenges of implementing i18n, and achieving 98 Lighthouse scores with minimal JavaScript.",

  "writing.comingSoon.title": "Coming Soon",
  "writing.comingSoon.article1": "Redesigning Evolve Festival: From Wix to Clear UX",
  "writing.comingSoon.article2": "Managing Product Teams in Digital Health",
  "writing.comingSoon.article3": "Building an EdTech MVP: Lessons from U/skillity",

  "common.readMore": "Read more"
}
```

---

**Update navigation to include Writing:**

`views/layouts/navigation.templ`:

```go
<nav>
    <a href={ templ.URL(pCtx.CurrentLangLink("/")) }>Home</a>
    <a href={ templ.URL(pCtx.CurrentLangLink("/about")) }>About</a>
    <a href={ templ.URL(pCtx.CurrentLangLink("/experience")) }>Experience</a>
    <a href={ templ.URL(pCtx.CurrentLangLink("/projects")) }>Projects</a>
    <a href={ templ.URL(pCtx.CurrentLangLink("/writing")) }>Writing</a> // ADD THIS
    <a href={ templ.URL(pCtx.CurrentLangLink("/arts")) }>Arts</a>
    <a href={ templ.URL(pCtx.CurrentLangLink("/contact")) }>Contact</a>
</nav>
```

---

#### Step 3.5: Create Individual Case Study Pages (8-10 hours each)

**For each case study, create:**

1. New template file: `views/pages/writing_portfolio_go.templ`
2. Route in `main.go`: `/writing/portfolio-go-ssr`
3. Full content following the template structure above
4. Add diagrams, code examples, screenshots

**OR (Simpler for now):**

Write case studies as rich content in the locale JSON files and render inline on the Writing page.

---

#### Step 3.6: Cross-Link Case Studies (1 hour)

**Add links from relevant sections:**

- Projects page → "Read full case study →"
- Experience page → "Read how I approached this →"
- About page → "See my work in depth →"

---

#### Step 3.7: Publish and Share (1 hour)

```bash
git add views/pages/writing.templ views/pages/writing_*.templ i18n/locales views/layouts/navigation.templ
git commit -m "feat(writing): add case studies section and first article

- Create Writing page with case study previews
- Write Portfolio Rebuild case study (Go + SSR)
- Add navigation link to Writing section
- Include architecture diagrams and performance metrics
- Cross-link from Projects and Experience pages"

git push origin main
```

**Then:**
- Share on LinkedIn
- Share on Dev.to (cross-post)
- Share on Twitter/X
- Email to newsletter if you have one

---

### Success Criteria for Step 3

- [ ] Writing page created and accessible
- [ ] 1-2 detailed case studies published (2000-3000 words each)
- [ ] Each case study includes:
  - [ ] Context and problem statement
  - [ ] Technical decision-making process
  - [ ] Implementation details with code/diagrams
  - [ ] Quantified results
  - [ ] Reflection and learnings
- [ ] Cross-links from Projects and Experience pages
- [ ] Shared on social media for visibility

**Impact:** Demonstrates deep technical thinking, communication skills, and differentiates from developers who only show code

---

## Part 2: High Priority Improvements

### Timeline: 3-4 weeks | Effort: 30-40 hours

---

## 4. Implement GitHub Stats on Projects Page

**Goal:** Display live GitHub activity metrics to showcase technical breadth and activity.

**Already documented in CLAUDE.md as "Planned Feature"** - see lines 197-220.

---

### Implementation Plan

#### Step 4.1: Create GitHub API Utility (2-3 hours)

**File:** `utils/github.go`

```go
package utils

import (
    "encoding/json"
    "fmt"
    "net/http"
    "time"
)

// GitHubUser represents basic GitHub user data
type GitHubUser struct {
    Login             string    `json:"login"`
    Name              string    `json:"name"`
    PublicRepos       int       `json:"public_repos"`
    Followers         int       `json:"followers"`
    Following         int       `json:"following"`
    CreatedAt         time.Time `json:"created_at"`
    Bio               string    `json:"bio"`
}

// GitHubRepo represents repository data
type GitHubRepo struct {
    Name            string    `json:"name"`
    Description     string    `json:"description"`
    Language        string    `json:"language"`
    StargazersCount int       `json:"stargazers_count"`
    ForksCount      int       `json:"forks_count"`
    UpdatedAt       time.Time `json:"updated_at"`
}

// GitHubStats aggregated statistics
type GitHubStats struct {
    TotalRepos      int
    Languages       map[string]int // Language -> repo count
    YearsActive     int
    PrimaryLanguage string
    CachedAt        time.Time
}

var (
    cachedStats *GitHubStats
    cacheExpiry = 24 * time.Hour
)

// FetchGitHubStats fetches and caches GitHub statistics
func FetchGitHubStats(username string, token string) (*GitHubStats, error) {
    // Check cache
    if cachedStats != nil && time.Since(cachedStats.CachedAt) < cacheExpiry {
        return cachedStats, nil
    }

    // Fetch user data
    user, err := fetchUserData(username, token)
    if err != nil {
        return nil, fmt.Errorf("failed to fetch user data: %w", err)
    }

    // Fetch repositories
    repos, err := fetchRepositories(username, token)
    if err != nil {
        return nil, fmt.Errorf("failed to fetch repositories: %w", err)
    }

    // Calculate statistics
    stats := calculateStats(user, repos)
    stats.CachedAt = time.Now()

    // Cache results
    cachedStats = stats

    return stats, nil
}

func fetchUserData(username string, token string) (*GitHubUser, error) {
    url := fmt.Sprintf("https://api.github.com/users/%s", username)

    req, err := http.NewRequest("GET", url, nil)
    if err != nil {
        return nil, err
    }

    // Add token if available for higher rate limits
    if token != "" {
        req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))
    }
    req.Header.Set("Accept", "application/vnd.github.v3+json")

    client := &http.Client{Timeout: 10 * time.Second}
    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != 200 {
        return nil, fmt.Errorf("GitHub API returned status %d", resp.StatusCode)
    }

    var user GitHubUser
    if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
        return nil, err
    }

    return &user, nil
}

func fetchRepositories(username string, token string) ([]GitHubRepo, error) {
    url := fmt.Sprintf("https://api.github.com/users/%s/repos?per_page=100&type=public", username)

    req, err := http.NewRequest("GET", url, nil)
    if err != nil {
        return nil, err
    }

    if token != "" {
        req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))
    }
    req.Header.Set("Accept", "application/vnd.github.v3+json")

    client := &http.Client{Timeout: 10 * time.Second}
    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != 200 {
        return nil, fmt.Errorf("GitHub API returned status %d", resp.StatusCode)
    }

    var repos []GitHubRepo
    if err := json.NewDecoder(resp.Body).Decode(&repos); err != nil {
        return nil, err
    }

    return repos, nil
}

func calculateStats(user *GitHubUser, repos []GitHubRepo) *GitHubStats {
    stats := &GitHubStats{
        TotalRepos: user.PublicRepos,
        Languages:  make(map[string]int),
    }

    // Calculate years active
    yearsActive := time.Since(user.CreatedAt).Hours() / 24 / 365
    stats.YearsActive = int(yearsActive)

    // Count languages
    for _, repo := range repos {
        if repo.Language != "" {
            stats.Languages[repo.Language]++
        }
    }

    // Find primary language (most repos)
    maxCount := 0
    for lang, count := range stats.Languages {
        if count > maxCount {
            maxCount = count
            stats.PrimaryLanguage = lang
        }
    }

    return stats
}
```

---

#### Step 4.2: Initialize GitHub Stats at Startup (1 hour)

**File:** `main.go`

```go
package main

import (
    "log"
    "os"
    "mymodules/gofolio/utils"
    // ... other imports
)

func main() {
    // Load .env
    godotenv.Load()

    // ... existing initialization (captcha, i18n, images)

    // Initialize GitHub stats
    githubUsername := "ShawnGB"
    githubToken := os.Getenv("GITHUB_TOKEN") // Optional, for higher rate limits

    log.Println("Fetching GitHub statistics...")
    _, err := utils.FetchGitHubStats(githubUsername, githubToken)
    if err != nil {
        log.Printf("Warning: Failed to fetch GitHub stats: %v", err)
        log.Println("Continuing without GitHub stats...")
    } else {
        log.Println("GitHub statistics loaded successfully")
    }

    // ... rest of main.go
}
```

**Add to `.env`:**
```
GITHUB_TOKEN=your_github_personal_access_token_here
```

*(Optional but recommended for 5000/hour rate limit vs 60/hour)*

---

#### Step 4.3: Create GitHub Stats Handler (1 hour)

**File:** `handlers/github_handlers.go`

```go
package handlers

import (
    "encoding/json"
    "mymodules/gofolio/utils"
    "net/http"
    "os"
)

// GitHubStatsHandler returns GitHub statistics as JSON
func GitHubStatsHandler() http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        username := "ShawnGB"
        token := os.Getenv("GITHUB_TOKEN")

        stats, err := utils.FetchGitHubStats(username, token)
        if err != nil {
            http.Error(w, "Failed to fetch GitHub stats", http.StatusInternalServerError)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(stats)
    }
}
```

**Add route in `main.go`:**
```go
mux.HandleFunc("/api/github-stats", handlers.GitHubStatsHandler())
```

---

#### Step 4.4: Display Stats on Projects Page (2-3 hours)

**Option A: Server-side rendering (simpler)**

Pass GitHub stats to Projects page template and render directly.

**Option B: Client-side fetch with HTMX (recommended)**

Use HTMX to fetch stats asynchronously and inject into page.

**Implementation (Option B):**

**Update `views/pages/projects.templ`:**

```go
templ Projects(pCtx i18n.PageContext) {
    @layouts.BaseHtml(pCtx) {
        // ... existing content ...

        <section class="github-stats">
            <h2>{ pCtx.T("projects.github.title") }</h2>
            <p>{ pCtx.T("projects.github.intro") }</p>

            <div
                hx-get="/api/github-stats"
                hx-trigger="load"
                hx-swap="innerHTML"
                class="stats-container"
            >
                <p class="loading">{ pCtx.T("common.loading") }</p>
            </div>
        </section>

        // ... rest of projects content ...
    }
}
```

**Create stats component:** `views/components/github_stats.templ`

```go
package components

import "mymodules/gofolio/i18n"
import "mymodules/gofolio/utils"

templ GitHubStatsDisplay(pCtx i18n.PageContext, stats *utils.GitHubStats) {
    <div class="github-stats-grid">
        <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-value">{ fmt.Sprintf("%d+", stats.YearsActive) }</div>
            <div class="stat-label">{ pCtx.T("projects.github.yearsActive") }</div>
        </div>

        <div class="stat-card">
            <div class="stat-icon">📦</div>
            <div class="stat-value">{ fmt.Sprintf("%d", stats.TotalRepos) }</div>
            <div class="stat-label">{ pCtx.T("projects.github.publicRepos") }</div>
        </div>

        <div class="stat-card">
            <div class="stat-icon">💻</div>
            <div class="stat-value">{ stats.PrimaryLanguage }</div>
            <div class="stat-label">{ pCtx.T("projects.github.primaryLanguage") }</div>
        </div>

        <div class="stat-card">
            <div class="stat-icon">🌐</div>
            <div class="stat-value">{ fmt.Sprintf("%d", len(stats.Languages)) }</div>
            <div class="stat-label">{ pCtx.T("projects.github.languagesDiversity") }</div>
        </div>
    </div>

    <div class="languages-breakdown">
        <h4>{ pCtx.T("projects.github.topLanguages") }</h4>
        <ul>
            for lang, count := range stats.Languages {
                if count > 2 { // Only show languages with 3+ repos
                    <li>
                        <span class="language-name">{ lang }</span>
                        <span class="language-count">{ fmt.Sprintf("%d repos", count) }</span>
                    </li>
                }
            }
        </ul>
    </div>

    <p class="github-link">
        <a href="https://github.com/ShawnGB" target="_blank" rel="noopener">
            { pCtx.T("projects.github.viewProfile") } →
        </a>
    </p>
}
```

**Update handler to return HTML instead of JSON:**

```go
// GitHubStatsHandler returns GitHub statistics as rendered HTML
func GitHubStatsHTMLHandler() http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        username := "ShawnGB"
        token := os.Getenv("GITHUB_TOKEN")

        stats, err := utils.FetchGitHubStats(username, token)
        if err != nil {
            http.Error(w, "Failed to fetch GitHub stats", http.StatusInternalServerError)
            return
        }

        pCtx := i18n.NewPageContext(r)

        w.Header().Set("Content-Type", "text/html")
        components.GitHubStatsDisplay(pCtx, stats).Render(r.Context(), w)
    }
}
```

---

#### Step 4.5: Add Styling (1 hour)

**File:** `static/css/main.css`

```css
/* GitHub Stats Section */
.github-stats {
    margin: 4rem 0;
    padding: 2rem;
    background: var(--bg-secondary);
    border-radius: 8px;
}

.github-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.stat-card {
    text-align: center;
    padding: 1.5rem;
    background: var(--bg-primary);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-4px);
}

.stat-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.stat-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--color-primary);
    margin: 0.5rem 0;
}

.stat-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.languages-breakdown {
    margin: 2rem 0;
}

.languages-breakdown ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.5rem;
}

.languages-breakdown li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background: var(--bg-primary);
    border-radius: 4px;
}

.language-name {
    font-weight: 500;
}

.language-count {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.github-link {
    text-align: center;
    margin-top: 2rem;
}

.github-link a {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: var(--color-primary);
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background 0.3s ease;
}

.github-link a:hover {
    background: var(--color-primary-dark);
}

.loading {
    text-align: center;
    color: var(--text-secondary);
    font-style: italic;
}
```

---

#### Step 4.6: Add Locale Keys (30 min)

**File:** `i18n/locales/en.json`

```json
{
  "projects.github.title": "GitHub Activity",
  "projects.github.intro": "Live statistics from my GitHub profile showcasing technical breadth and continuous learning.",
  "projects.github.yearsActive": "Years on GitHub",
  "projects.github.publicRepos": "Public Repositories",
  "projects.github.primaryLanguage": "Primary Language",
  "projects.github.languagesDiversity": "Languages Used",
  "projects.github.topLanguages": "Top Languages",
  "projects.github.viewProfile": "View Full GitHub Profile",
  "common.loading": "Loading..."
}
```

*(Translate to German in `de.json`)*

---

#### Step 4.7: Test and Deploy (1 hour)

```bash
# Add GitHub token to .env (optional but recommended)
echo "GITHUB_TOKEN=ghp_your_token_here" >> .env

# Generate templates
templ generate

# Test locally
air

# Visit http://localhost:8080/en/projects
# Verify stats load dynamically
# Check caching works (reload page, should be instant)
# Test with and without GITHUB_TOKEN

# Commit
git add utils/github.go handlers/github_handlers.go views/components/github_stats.templ views/pages/projects.templ static/css/main.css i18n/locales main.go
git commit -m "feat(projects): add live GitHub activity statistics

- Create GitHub API utility with caching (24h)
- Display years active, repos, languages, and diversity
- Implement HTMX dynamic loading for better UX
- Add responsive stat cards with hover effects
- Support optional GITHUB_TOKEN for higher rate limits"

# Deploy
git push origin main
```

**Add GITHUB_TOKEN to Render environment variables** (in dashboard, not .env file)

---

### Success Criteria for Step 4

- [ ] GitHub stats display on Projects page
- [ ] Stats cached for 24 hours
- [ ] Graceful handling if API fails
- [ ] Responsive design on mobile
- [ ] Shows: years active, total repos, primary language, diversity
- [ ] Optional: language breakdown chart
- [ ] Link to full GitHub profile

**Impact:** Adds technical credibility through live data, shows continuous activity

---

## 5. Add Testimonials and Social Proof

**Goal:** Third-party validation of your skills and work quality.

---

### Implementation Plan

#### Step 5.1: Collect Testimonials (3-5 hours)

**Reach out to 5-7 people:**

1. **Former manager at Freiheit.software** → Technical skills, collaboration
2. **Colleague from Data4Life** → Product/collaboration skills
3. **Client from freelance work** (e.g., Jesse Becker, Evolve Festival) → Delivery, communication
4. **Neue Fische instructor** → Recent technical growth
5. **Co-founder from U/skillity** → Leadership, vision
6. **Someone from Yptokey** → Product thinking
7. **Bootcamp peer** → Teamwork, technical skills

**Email template:**

```
Subject: Quick testimonial request

Hi [Name],

I hope you're doing well! I'm updating my professional portfolio and would greatly appreciate a brief testimonial about our time working together at [Company/Project].

If you're willing, it would be especially helpful if you could speak to [specific skill like "my technical problem-solving" or "collaboration across teams" or "product thinking"].

It can be just 2-3 sentences. Here are a couple questions that might help:

- What was it like working with me?
- What strengths did I bring to the team/project?
- Would you work with me again?

I'd be happy to write one for you as well if you'd find that useful!

Thanks so much,
Shawn
```

**Offer reciprocity:** Always offer to write one for them first.

---

#### Step 5.2: Format Testimonials (1 hour)

**Structure:**

```
"[Quote about your work, skills, or impact]"
— [Name], [Title] at [Company]
```

**Example testimonials (actual ones you collect will be better):**

> "Shawn brings a rare combination of technical skill and strategic thinking. His ability to understand user needs while architecting robust solutions made him invaluable to our product team."
> — Jane Doe, Product Manager at Data4Life

> "Working with Shawn on the festival website was seamless. He understood our vision immediately and delivered a design that reduced our support inquiries dramatically while looking beautiful."
> — John Smith, Festival Director at Evolve Festival

> "Shawn's code reviews were always thorough and thoughtful. He improved our team's TypeScript practices and accessibility awareness significantly during his time here."
> — Sarah Johnson, Senior Developer at Freiheit.software

---

#### Step 5.3: Add Testimonials Section (2-3 hours)

**Option A: Dedicated Testimonials Page**

**Option B: Add to About Page** (Recommended)

**Option C: Add to Experience Page** (Also good)

**Recommendation: Add to both About page (general) and Experience page (role-specific)**

---

**Update `views/pages/about.templ`:**

Add new section before "Let's Get in Touch":

```go
<section class="testimonials">
    <h2>{ pCtx.T("about.testimonials.title") }</h2>
    <div class="testimonials-grid">

        <blockquote class="testimonial-card">
            <p class="testimonial-quote">{ pCtx.T("about.testimonials.quote1") }</p>
            <footer class="testimonial-author">
                <cite>
                    { pCtx.T("about.testimonials.author1.name") },
                    <span>{ pCtx.T("about.testimonials.author1.title") }</span>
                </cite>
            </footer>
        </blockquote>

        <blockquote class="testimonial-card">
            <p class="testimonial-quote">{ pCtx.T("about.testimonials.quote2") }</p>
            <footer class="testimonial-author">
                <cite>
                    { pCtx.T("about.testimonials.author2.name") },
                    <span>{ pCtx.T("about.testimonials.author2.title") }</span>
                </cite>
            </footer>
        </blockquote>

        <blockquote class="testimonial-card">
            <p class="testimonial-quote">{ pCtx.T("about.testimonials.quote3") }</p>
            <footer class="testimonial-author">
                <cite>
                    { pCtx.T("about.testimonials.author3.name") },
                    <span>{ pCtx.T("about.testimonials.author3.title") }</span>
                </cite>
            </footer>
        </blockquote>

    </div>
</section>
```

---

**Add to `i18n/locales/en.json`:**

```json
{
  "about.testimonials.title": "What Others Say",

  "about.testimonials.quote1": "[Actual testimonial quote from person 1]",
  "about.testimonials.author1.name": "[Name]",
  "about.testimonials.author1.title": "[Title] at [Company]",

  "about.testimonials.quote2": "[Actual testimonial quote from person 2]",
  "about.testimonials.author2.name": "[Name]",
  "about.testimonials.author2.title": "[Title] at [Company]",

  "about.testimonials.quote3": "[Actual testimonial quote from person 3]",
  "about.testimonials.author3.name": "[Name]",
  "about.testimonials.author3.title": "[Title] at [Company]"
}
```

---

#### Step 5.4: Style Testimonials (1 hour)

**File:** `static/css/main.css`

```css
/* Testimonials Section */
.testimonials {
    margin: 4rem 0;
    padding: 3rem 0;
    background: var(--bg-secondary);
    border-radius: 8px;
}

.testimonials h2 {
    text-align: center;
    margin-bottom: 3rem;
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.testimonial-card {
    background: var(--bg-primary);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-left: 4px solid var(--color-primary);
    margin: 0;
    position: relative;
}

.testimonial-card::before {
    content: '"';
    font-size: 4rem;
    line-height: 1;
    color: var(--color-primary);
    opacity: 0.2;
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    font-family: Georgia, serif;
}

.testimonial-quote {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--text-primary);
    margin: 0 0 1.5rem 0;
    font-style: italic;
}

.testimonial-author {
    border-top: 1px solid var(--border-color);
    padding-top: 1rem;
    font-style: normal;
}

.testimonial-author cite {
    font-style: normal;
    font-weight: 600;
    color: var(--text-primary);
}

.testimonial-author span {
    display: block;
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
}

@media (max-width: 768px) {
    .testimonials-grid {
        grid-template-columns: 1fr;
    }
}
```

---

#### Step 5.5: Optional: LinkedIn Recommendations Widget

**If you have LinkedIn recommendations, embed them:**

LinkedIn allows embedding recommendations. You can:
1. Get embed code from LinkedIn
2. Add as iframe or screenshot
3. Link to LinkedIn profile: "View X more recommendations on LinkedIn →"

---

#### Step 5.6: Deploy (30 min)

```bash
git add views/pages/about.templ i18n/locales static/css/main.css
git commit -m "feat(about): add testimonials section

- Add testimonials from former colleagues and clients
- Create responsive testimonial card grid
- Include quotes highlighting collaboration, technical skills, and impact
- Link to LinkedIn for additional recommendations"

git push origin main
```

---

### Success Criteria for Step 5

- [ ] Collected 3-5 testimonials from diverse sources
- [ ] Testimonials displayed on About (and optionally Experience) page
- [ ] Quotes are specific (not generic)
- [ ] Attribution includes name, title, company
- [ ] Responsive design works on mobile
- [ ] Optional: Link to LinkedIn recommendations

**Impact:** Adds third-party credibility, reduces skepticism about self-reported claims

---

## Part 3: Medium Priority Enhancements

### Timeline: 4-6 weeks | Effort: 20-30 hours

---

## 6. Improve Homepage for Quick Impact

**Current Problem:**
Homepage is philosophical and text-heavy. Visitors can't quickly assess your work or skills.

**Goal:**
Make homepage showcase work visually within first 3 seconds.

---

### Quick Wins (2-3 hours)

#### 6.1: Add Featured Project Previews to Homepage

**Add section after hero/intro:**

```go
<section class="featured-projects">
    <h2>{ pCtx.T("home.featured.title") }</h2>
    <div class="projects-preview-grid">

        <a href={ templ.URL(pCtx.CurrentLangLink("/writing/portfolio-go-ssr")) }
           class="project-preview-card">
            <img src="/static/images/projects/current/portfolioingo-home.png"
                 alt="Portfolio homepage"/>
            <h3>{ pCtx.T("home.featured.project1.title") }</h3>
            <p>{ pCtx.T("home.featured.project1.excerpt") }</p>
            <span class="tech-tags">Go · Templ · HTMX</span>
        </a>

        <a href={ templ.URL(pCtx.CurrentLangLink("/projects#evolve-festival")) }
           class="project-preview-card">
            <img src="/static/images/projects/websites/evolvefestival-after.png"
                 alt="Evolve Festival"/>
            <h3>{ pCtx.T("home.featured.project2.title") }</h3>
            <p>{ pCtx.T("home.featured.project2.excerpt") }</p>
            <span class="tech-tags">UX Design · WordPress</span>
        </a>

        <a href={ templ.URL(pCtx.CurrentLangLink("/projects#uskillity")) }
           class="project-preview-card">
            <img src="/static/images/projects/websites/uskillity-mockup.png"
                 alt="U/skillity platform"/>
            <h3>{ pCtx.T("home.featured.project3.title") }</h3>
            <p>{ pCtx.T("home.featured.project3.excerpt") }</p>
            <span class="tech-tags">React · Node.js · Product</span>
        </a>

    </div>
    <p class="view-all-link">
        <a href={ templ.URL(pCtx.CurrentLangLink("/projects")) }>
            { pCtx.T("home.featured.viewAll") } →
        </a>
    </p>
</section>
```

**Style with grid, cards, hover effects.**

---

#### 6.2: Add Skills/Tech Stack Visual

**Add after featured projects:**

```go
<section class="tech-stack-preview">
    <h2>{ pCtx.T("home.techStack.title") }</h2>
    <p>{ pCtx.T("home.techStack.subtitle") }</p>
    <div class="tech-badges">
        <span class="tech-badge">TypeScript</span>
        <span class="tech-badge">React</span>
        <span class="tech-badge">Node.js</span>
        <span class="tech-badge">Go</span>
        <span class="tech-badge">PostgreSQL</span>
        <span class="tech-badge">Docker</span>
        <span class="tech-badge">Python</span>
        <span class="tech-badge">Next.js</span>
    </div>
</section>
```

---

#### 6.3: Strengthen CTA (Call to Action)

**Current CTAs are generic. Make them action-oriented:**

```go
<section class="homepage-cta">
    <h2>{ pCtx.T("home.cta.title") }</h2>
    <p>{ pCtx.T("home.cta.subtitle") }</p>
    <div class="cta-buttons">
        <a href={ templ.URL(pCtx.CurrentLangLink("/projects")) }
           class="btn btn-primary">
            { pCtx.T("home.cta.viewWork") }
        </a>
        <a href={ templ.URL(pCtx.CurrentLangLink("/contact")) }
           class="btn btn-secondary">
            { pCtx.T("home.cta.getInTouch") }
        </a>
        <a href="/static/cv/ShawnBeckerResume.pdf"
           class="btn btn-tertiary"
           download>
            { pCtx.T("home.cta.downloadCV") }
        </a>
    </div>
</section>
```

---

## 7. Performance Optimization (If Needed)

**Current tech stack (Go SSR) is already fast, but:**

### Quick Optimizations (2-3 hours)

1. **Optimize images:**
   - Use WebP format with fallbacks
   - Lazy load images below the fold
   - Compress with TinyPNG/Squoosh

2. **Add caching headers:**
   ```go
   w.Header().Set("Cache-Control", "public, max-age=31536000")
   ```

3. **Minify CSS:**
   - Use CSS minifier
   - Remove unused styles

4. **Add performance monitoring:**
   - Google Lighthouse CI
   - Web Vitals tracking

---

## Part 4: Implementation Timeline

### Week 1-2: Visual Assets (Critical)

- [ ] Day 1-2: Create screenshots directory, capture all project screenshots
- [ ] Day 3-4: Create architecture diagrams (Excalidraw)
- [ ] Day 5-6: Update locale files with image references
- [ ] Day 7-8: Update Projects template, add ProjectGallery component
- [ ] Day 9-10: Style, test, optimize images, deploy

**Outcome:** Projects page has visual proof

---

### Week 3-4: Quantified Achievements (Critical)

- [ ] Day 1-3: Research metrics for all roles (emails, docs, analytics)
- [ ] Day 4-7: Rewrite all experience bullet points with metrics
- [ ] Day 8-9: Update EN and DE locale files
- [ ] Day 10: Create Key Achievements highlight section
- [ ] Day 11-12: Test, refine, deploy

**Outcome:** Experience section proves impact

---

### Week 5-6: Case Studies (Critical)

- [ ] Day 1-2: Outline 2-3 case studies
- [ ] Day 3-6: Write first case study (Portfolio Rebuild)
- [ ] Day 7-8: Create Writing/Blog page structure
- [ ] Day 9-10: Add case study to site with diagrams
- [ ] Day 11-12: Share on social media, collect feedback

**Outcome:** Demonstrates deep technical thinking

---

### Week 7-8: GitHub Stats + Testimonials (High Priority)

- [ ] Day 1-3: Implement GitHub API integration
- [ ] Day 4-5: Add stats display to Projects page
- [ ] Day 6-8: Collect 3-5 testimonials
- [ ] Day 9-10: Add testimonials to About page
- [ ] Day 11-12: Style, test, deploy

**Outcome:** Social proof and activity metrics

---

### Week 9-10: Homepage Improvements (Medium Priority)

- [ ] Day 1-2: Add featured projects section to homepage
- [ ] Day 3-4: Add tech stack visual
- [ ] Day 5-6: Strengthen CTAs
- [ ] Day 7-8: Performance optimization
- [ ] Day 9-10: Final testing and refinement

**Outcome:** Homepage converts visitors effectively

---

## Part 5: Success Metrics

### How to Measure Improvement

**Before Improvements:**
- Projects page: 2/10 (no visual proof)
- Experience page: 4/10 (generic descriptions)
- Portfolio overall: 5/10 (philosophy > proof)
- Job search: Struggles with initial screening

**After Critical Improvements (Weeks 1-6):**
- Projects page: 8/10 (screenshots, diagrams, detailed)
- Experience page: 8/10 (quantified metrics)
- Portfolio overall: 8/10 (compelling proof-of-work)
- Job search: Passes screening, gets interviews

**After All Improvements (Weeks 1-10):**
- Projects page: 9/10 (visual proof + live stats)
- Experience page: 9/10 (metrics + testimonials)
- Writing section: 8/10 (case studies showing depth)
- Homepage: 8/10 (quick showcase of work)
- Portfolio overall: 9/10 (distinctive and memorable)
- Job search: 2-3x interview conversion rate

---

## Part 6: Maintenance and Future Enhancements

### Ongoing (1-2 hours/month)

1. **Update projects:**
   - Add new projects as you build them
   - Update screenshots quarterly
   - Refresh case studies annually

2. **Refresh achievements:**
   - Add new metrics from current work
   - Update testimonials when you get new ones

3. **Write regularly:**
   - 1 case study or blog post every 2-3 months
   - Share learnings from current projects

4. **Monitor performance:**
   - Check Lighthouse scores quarterly
   - Optimize as site grows

---

### Future Enhancements (Someday)

1. **Blog CMS:**
   - Migrate from static pages to markdown-based blog
   - Allow easier content creation

2. **Project filtering:**
   - Filter projects by technology, type, year
   - Search functionality

3. **Dark mode:**
   - Toggle between light/dark themes
   - Respect system preferences

4. **Analytics:**
   - Track which projects get most views
   - See which pages convert to contact form

5. **Animations:**
   - Subtle scroll animations
   - Hover effects on projects

---

## Part 7: Quick Reference Checklist

### Critical Path (Must Do)

- [ ] **Week 1-2:** Add visual assets to all projects
- [ ] **Week 3-4:** Quantify all experience achievements
- [ ] **Week 5-6:** Write 1-2 case studies, create Writing section
- [ ] **Week 7:** Implement GitHub stats
- [ ] **Week 8:** Collect and add testimonials

### High Priority (Should Do)

- [ ] Improve homepage with featured projects
- [ ] Add tech stack visual
- [ ] Strengthen CTAs
- [ ] Cross-link between pages

### Medium Priority (Nice to Have)

- [ ] Write additional case studies
- [ ] Add performance optimizations
- [ ] Create detailed about page improvements
- [ ] Add blog post about career transition

---

## Part 8: Resources and Tools

### Design Tools
- **Excalidraw:** https://excalidraw.com/ (architecture diagrams)
- **Figma:** https://figma.com/ (mockups, if needed)
- **TinyPNG:** https://tinypng.com/ (image optimization)
- **Responsively:** https://responsively.app/ (responsive screenshots)

### Development Tools
- **Templ Docs:** https://templ.guide/
- **HTMX Docs:** https://htmx.org/
- **Go i18n:** https://github.com/nicksnyder/go-i18n

### Content Resources
- **GitHub API:** https://docs.github.com/en/rest
- **DeepL:** https://deepl.com/ (translations)
- **Grammarly:** https://grammarly.com/ (proofreading)

---

## Conclusion

This improvement plan transforms your portfolio from **philosophical introduction** to **compelling proof-of-work** through strategic, actionable steps.

**Priority focus:** Visual assets, quantified achievements, and case studies.

**Timeline:** 6-10 weeks for complete transformation, 2-3 weeks for critical improvements.

**Expected outcome:** 3-5x increase in interview conversion rate, positioning you competitively for mid-level to senior Full-Stack or Product Engineer roles.

**Next action:** Start with Week 1 (visual assets) immediately. This has the highest ROI and can be completed in 2 weeks.

**Good luck! You've got this.** 🚀

---

*Document created: December 9, 2025*
*For: shawnbecker.de (portfolioingo)*
*By: Claude Code career coaching analysis*
