### Phase 4: IMPLEMENT — Generating the Definitive, Augmented `SKILL-MASTER.md`

Per your explicit validation, I have synthesized the complete, unapologetically detailed master skill file. This document is **not** constrained by length. It preserves every critical tactical detail (hex codes, full interfaces, hook mechanics, debugging guides) from the source files while ruthlessly eliminating contradictions and obsolete information. It serves as both the strategic constitution and the tactical playbook for any AI agent operating in this codebase.

Below is the complete content for **`SKILL-MASTER.md`**.

***

```markdown
name: personal-portfolio
description: >
  The definitive, production-grade master skill for building, modifying, or auditing the Nicholas Yun portfolio (The Engineered Soul v2.0). This document supersedes ALL previous skill files (SKILL.md, SKILL-1.md, SKILL-2.md). It encodes the deep design philosophy, strict architectural guardrails, exact implementation patterns, and debugging procedures required to maintain this React 19 + TypeScript 6 + Vite 6 + Tailwind CSS v4 codebase without regression or hallucination.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
license: MIT
version: 3.0.0 (MASTER)

# The Engineered Soul — Portfolio Master Skill (v3.0.0)

**One-Shot Prevention:** This skill was distilled from a real build cycle that migrated a 1265-line JSX + 4411-line CSS monolith into a clean, component-driven TypeScript + Tailwind v4 installation. It encodes both the deep architectural thinking (the "why") and the practical remediation lessons (the "what went wrong and how we fixed it"). Skipping any section creates rework. 

---

## 1. Project Identity & Non-Negotiables

### The Dual-Thesis
The aesthetic is a deliberate collision of two extremes. Every design decision must answer: *"Does this serve the tension between the mathematical and the emotional, or does it safely retreat to the middle?"*
- **Tactile Brutalism (The Machine):** Visible structure, 1px borders, `0px` border-radius, mono utility type, high contrast, no decoration without function.
- **High-End Editorial (The Soul):** Cormorant Garamond serif headlines, extreme whitespace (`--spacing-section: 104px`), cinematic motion, asymmetric spreads, human textures.

### The "AI Slop" Rejection List (Strictly Forbidden)
- Purple gradients on white backgrounds.
- Safe Inter/Roboto-only font pairings without distinct typographical hierarchy.
- Predictable card grids, hero sections, or Bootstrap-like aesthetics.
- **Any border radius other than `0px`** (See Section 3.3).
- Generic stock photography or placeholder aesthetics.
- External UI libraries (No shadcn/ui, no Framer Motion, no React Router). All components are bespoke.

### Mandatory Six-Phase Workflow
Every change to this codebase MUST follow:
1. **ANALYZE**: Deep requirement mining; trace component tree and data flow. Never assume.
2. **PLAN**: Write down every file change before touching code.
3. **VALIDATE**: Present the plan for explicit user approval before implementing.
4. **IMPLEMENT**: Write code following the patterns in this document.
5. **VERIFY**: Run `pnpm typecheck && pnpm build` after every change.
6. **DELIVER**: Confirm zero errors, zero warnings, and visual QA.

---

## 2. Tech Stack & Environment

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | React | ^19.0.0 | Concurrent rendering, StrictMode |
| Language | TypeScript | ^6.0.0 | Strict typing, erasable syntax only |
| Build Tool | Vite | ^6.3.0 | Zero-config HMR, `import.meta.glob` for content |
| Styling | Tailwind CSS | ^4.1.0 | CSS-first `@theme`, no config file, `@tailwindcss/vite` plugin |
| Package Manager | pnpm | >= 9 | Workspace support, strict resolution |
| Fonts | Google Fonts | — | Cormorant Garamond, IBM Plex Mono, Inter |

### Critical TypeScript Settings (`tsconfig.json`)
- `strict: true`
- `erasableSyntaxOnly: true` — **NON-NEGOTIABLE**. Rejects `enum`, `namespace`, and parameter properties. Always use union types (e.g., `icon: 'mail' | 'linkedin' | 'instagram' | 'github' | 'wix'`).
- `noUncheckedIndexedAccess: true` — Makes array/object index access return `T | undefined`. You must handle the `undefined` case or use a non-null assertion (`!`) *only* when logically guaranteed by bounds checking (e.g., `heroSlides[activeHeroIndex]!`).

### Vite Configuration (`vite.config.ts`)
- `base: './'` is **required** for GitHub Pages deployment (relative asset paths).
- Path alias: `'@': resolve(__dirname, './src')`

---

## 3. The Design System (Complete Code-First)

There is NO `tailwind.config.js`. All design tokens live in `src/styles/index.css` inside `@theme`.

### 3.1 Full Tailwind v4 `@theme` Block
```css
@import "tailwindcss";

@theme {
  /* Grid Unit — the mathematical backbone */
  --unit: 28px;
  --spacing-grid: 28px;
  --spacing-section: 104px;

  /* Colors — Dark Theme (default) */
  --color-ink: #07080d;
  --color-ink-light: #15151b;
  --color-surface: #11131d;
  --color-surface-elevated: #1a1c2e;
  --color-text: #ffffff;
  --color-text-secondary: rgba(255, 255, 255, 0.68);
  --color-text-muted: rgba(255, 255, 255, 0.52);
  --color-text-faint: rgba(255, 255, 255, 0.38);
  --color-border: rgba(255, 255, 255, 0.13);
  --color-border-strong: rgba(255, 255, 255, 0.24);
  --color-border-accent: rgba(255, 255, 255, 0.18);

  /* Colors — Light Theme */
  --color-day-bg: #fff8e8;
  --color-day-surface: #ffffff;
  --color-day-text: #15151b;
  --color-day-text-secondary: rgba(21, 21, 27, 0.64);
  --color-day-border: rgba(21, 21, 27, 0.1);
  --color-day-border-strong: rgba(21, 21, 27, 0.18);

  /* Accent Colors — One per creative category */
  --color-accent-code: #2457ff;
  --color-accent-design: #ff5c35;
  --color-accent-art: #00a77f;
  --color-accent-photo: #f2b705;
  --color-accent-poetry: #8f55ff;
  --color-accent-story: #e5488b;
  --color-accent-experiments: #16a3b8;

  /* Fonts — Three-tier hierarchy */
  --font-editorial: 'Cormorant Garamond', 'Noto Serif SC', Georgia, serif;
  --font-utility: 'IBM Plex Mono', 'JetBrains Mono', monospace;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;

  /* Border Radius — Brutalist defaults */
  --radius-brutal: 0px;
  --radius-soft: 8px;   /* Rare exceptions only if explicitly requested */
  --radius-pill: 999px; /* Rare exceptions only if explicitly requested */
}
```

### 3.2 The 28px Grid
Every layout must align with the 28px rhythm. This is defined via a visible background grid:
```css
.theme-night::before, .theme-day::before {
  content: ''; position: fixed; inset: 0; z-index: 0;
  background-size: 28px 28px; opacity: 0.04; pointer-events: none;
}
```
**Rule:** All padding, margins, and grid gaps should be multiples of 28px (or fractions like 14px) unless there is a specific micro-justification.

### 3.3 Brutalist Borders (Absolute `rounded-none` Mandate)
**GROUND TRUTH:** Every single element must use `rounded-none`. This includes structural containers, interactive elements (buttons, badges), images, and inputs. 
- **Verification:** `grep -r "rounded-full\|rounded-md\|rounded-lg\|rounded-xl" src/` must return **zero matches**. Any documentation suggesting exceptions is obsolete.

### 3.4 Light Theme Override Specificity
The light theme is applied using Tailwind's arbitrary variant syntax. The correct pattern is `[.theme-day_&]:` (the `_` is Tailwind's space replacement, `&` is the current element selector).
- **WRONG:** `[.theme-day]:` (Missing `&`)
- **WRONG:** `[.theme-day &]:` (Space instead of underscore)
- **CORRECT:** `[.theme-day_&]:text-[#15151b]`

### 3.5 Z-Index Layer Map
Never use z-index values outside this map without updating it.
| Layer | Z-Index | Element |
|---|---|---|
| Grid background | `0` | `::before` pseudo on theme classes |
| Hero content | `1` | `z-1` class on hero main content |
| Hero prev/next buttons | `2` | `z-2` on navigation arrows |
| Skip-to-content link | `20` | `z-20` |
| Sticky navigation | `30` | `z-30` on header |
| Mobile backdrop | `35` | `z-35` |
| Mobile drawer | `40` | `z-40` on aside |
| Machine overlay | `50` | `z-50` on dialog |
| Grain overlay | `9999` | `z-[9999]` on grain div (must always be on top, `pointer-events: none`) |

---

## 4. Component Architecture & Logic Patterns

### 4.1 File Organization
```text
src/
├── App.tsx                    # Thin orchestrator, state lifted here
├── main.tsx                   # React entry point with StrictMode
├── components/
│   ├── HeroKinetic.tsx        # Viewport-scaled hero with pointer parallax
│   ├── AboutFlow.tsx          # Asymmetric editorial about section
│   ├── BentoGrid.tsx          # Portfolio gateway grid
│   ├── BentoTile.tsx          # Individual project tile with category texture
│   ├── ArchiveSpread.tsx      # Collection detail + item detail views
│   ├── ContactSection.tsx     # Contact + social links
│   ├── ContentBody.tsx        # Poem/prose body renderer
│   ├── GrainOverlay.tsx       # Fixed noise overlay
│   ├── MachineOverlay.tsx     # Terminal-style data overlay (MX)
│   ├── BrandMark.tsx          # SVG brand mark
│   ├── SocialIcon.tsx         # Inline SVG social icons
│   └── ThemeToggle.tsx        # Day/night toggle button
├── hooks/
│   ├── useWeightedScroll.ts   # Scroll velocity -> font-weight mapping
│   ├── useRouteHash.ts        # Hash-based routing
│   └── useReducedMotion.ts    # prefers-reduced-motion hook
├── lib/
│   ├── types.ts               # All TypeScript interfaces
│   ├── content.ts             # import.meta.glob ingestion + parsing
│   └── data.ts                # Static data, collection definitions, builders
├── styles/
│   └── index.css              # Tailwind + @theme + base + animations + grain
└── content/                   # File-system content (not in src/ build)
```

### 4.2 The "Thin Orchestrator" Pattern (`App.tsx`)
`App.tsx` is the single source of truth for all application state. It lifts state up and passes it down via props. No context providers, no state management libraries. Max prop drilling depth is 2 (e.g., App → Navigation → ThemeToggle).
- State owned: `activeHeroIndex`, `isNightMode`, `isMenuOpen`, `isMachineOpen`, `routeHash`.
- Conditional rendering: `{activeCollection ? <ArchiveSpread ... /> : <HomePageSections />}`

### 4.3 Key Component Logic Patterns
- **HeroKinetic**: Implements pointer-tracking parallax via CSS custom properties (`--mx`, `--my`, `--dx`, `--dy`, `--tiltX`, `--tiltY`). Injects per-slide accent colors via `style={{ '--slide-accent': slide.accent } as React.CSSProperties}`. Auto-rotates every 10s.
- **AboutFlow**: Uses a "Stable Height Swap" sizer pattern. A hidden sizer `<div>` renders ALL pillar content stacked in `grid-area-[1/1]`. Visible content fades opacity to 0, swaps data, then fades to 1 over 900ms.
- **BentoGrid/BentoTile**: Maps categories to typographic textures (e.g., `Code`/`Writing` → `IBM Plex Mono`, `Poetry`/`Art` → `Cormorant Garamond`). Injects `--project-accent` for dynamic link underlines and hover states.
- **ArchiveSpread**: Dual-view router. Renders a 3-column grid of item cards if no `itemSlug` is present; renders a single article with image and content body if `itemSlug` is present.
- **ContentBody**: Category-aware rendering. If `collectionSlug === 'poetry'`, uses `<pre className="whitespace-pre-wrap">`. Otherwise, splits on double-newlines into `<p>` tags.

---

## 5. Data & Content Architecture

### 5.1 The Definitive `import.meta.glob` Pattern
**CRITICAL:** `import.meta.glob` paths are relative to the **source file that calls it**, NOT the project root. Since `content.ts` lives in `src/lib/`, paths **MUST** start with `../content/` (pointing to `src/content/`). Using `./content/` is a fatal error that results in empty content arrays.

```typescript
// CORRECT (in src/lib/content.ts)
const portraitImages = import.meta.glob(
  ['../content/portrait/*.{jpg,jpeg,png,webp,avif}', '../content/portrait/**/*.{jpg,jpeg,png,webp,avif}'],
  { eager: true, import: 'default', query: '?url' }
) as Record<string, string>;

// Portfolio markdown files
const portfolioTextFiles = import.meta.glob(
  '../content/portfolio/**/*.{md,txt}',
  { eager: true, import: 'default', query: '?raw' }
) as Record<string, string>;
```

### 5.2 Content Directory Structure & Sibling Resolution
```text
src/content/
├── portrait/          # Hero slide photos
├── portfolio/         # Portfolio project markdown + sibling images
└── collections/       # Archive items (markdown + images + PDFs)
```
**Rule:** If a markdown file and an image share the same folder and base filename (e.g., `poetry/anger.md` and `poetry/anger.jpg`), they are "siblings" and the image is automatically associated as the visual.

### 5.3 Guide File Filtering
Files named `PUT_*_HERE.md` or `readme.md` are placeholder instructions. They must be filtered out:
```typescript
const isCollectionGuideFile = (path: string): boolean => {
  const filename = getFilenameSlug(path).toLowerCase();
  return filename === 'readme' || filename.startsWith('put_') || filename.startsWith('put-');
};
```

---

## 6. Custom Hooks (Implementation Patterns)

### 6.1 `useRouteHash`
Custom hash-based routing. Listens to `hashchange` events. 
- **SSR Guard:** Must initialize with `typeof window !== 'undefined' ? window.location.hash : ''`.
- **Cleanup:** Must return `() => window.removeEventListener('hashchange', syncRoute)`.

### 6.2 `useWeightedScroll`
Maps scroll velocity to `font-weight` (200–950) using `requestAnimationFrame` throttling.
- **Mechanics:** Computes velocity as `|deltaY / elapsed|` pixels per ms. Clamps to max 3.0. Formula: `Math.round(950 - clampedVelocity * 250)`.
- **State Hack:** Bundles `_timestamp` and `_scrollY` into a single state object to prevent double-renders while persisting delta calculation data.
- **Reduced Motion:** Returns static `950` if `prefers-reduced-motion` is true.

### 6.3 `useReducedMotion`
Checks `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- **Double-Layer Defense:** React hook gates conditional rendering (e.g., `{!prefersReduced && <AnimatedDiv />}`). Global CSS `@media (prefers-reduced-motion: reduce)` in `index.css` forcefully disables ALL transitions and animations as a fallback.

---

## 7. Accessibility (WCAG AAA)

### 7.1 Mandatory Checks
- [ ] **Meaningful Alt Text:** All content images MUST have meaningful `alt` text (e.g., `alt={item.title}`, `alt="Nicholas Yun"`). 
- [ ] **No Empty Alt for Content:** `alt=""` is strictly reserved for purely decorative UI elements (e.g., `GrainOverlay`, `BrandMark`, `SocialIcon` where parent has `aria-label`).
- [ ] **Motion Gating:** All animations check `useReducedMotion()`. Global CSS media query disables ALL transitions.
- [ ] **Focus Visible:** All interactive elements have visible focus indicators: `outline: 3px solid rgba(36, 87, 255, 0.35); outline-offset: 3px;`.
- [ ] **Skip Link:** A "Skip to main content" link is present, positioned off-screen via `-translate-y-[160%]` and visible on `focus:translate-y-0`.

### 7.2 ARIA Patterns
- Mobile drawer: `aria-expanded`, `aria-controls="mobile-navigation"`, `aria-hidden` toggled.
- Hero dots: `aria-pressed={index === activeIndex}`, `aria-label="Show panel N"`.
- Machine overlay: `role="dialog"`, `aria-label`.

---

## 8. Complete TypeScript Interface Reference

All interfaces live in `src/lib/types.ts`. Key design decisions: `Project` and `CollectionItem` share fields via `extends`. Optional fields use `?`. `SocialLink.icon` uses a union type (not `enum`) due to `erasableSyntaxOnly`.

```typescript
export interface HeroSlide {
  label: string;
  portraitKey: string;
  headline: string;
  subtitle: string;
  artifactTitle: string;
  artifactMeta: string;
  signature: string;
  accent: string;
  secondaryAccent: string;
  tags: string[];
}

export interface AboutPillar {
  title: string;
  paragraphs: string[];
}

export interface Project {
  title: string;
  category: string;
  accent: string;
  medium?: string;
  status: string;
  description: string;
  link?: string;
  linkLabel: string;
  slug: string;
  image?: string;
  body?: string;
}

export interface CollectionItem extends Project {
  collectionSlug: string;
  document?: string;
}

export interface Collection {
  slug: string;
  title: string;
  category: string;
  accent: string;
  description: string;
  status: string;
}

export interface ArchiveRoute {
  collectionSlug: string;
  itemSlug: string | null;
}

export interface SocialLink {
  label: string;
  icon: 'mail' | 'linkedin' | 'instagram' | 'github' | 'wix';
  href: string;
  description: string;
}

export interface MachineOverlayData {
  buildVersion: string;
  route: string;
  collections: Record<string, number>;
  activeData: unknown; // Not 'any'
}
```

---

## 9. Anti-Patterns & Common Bugs

### Bug 1: The "Rounding Leak"
- **Symptom:** Components contain `rounded-md` or `rounded-full`, violating the brutalist aesthetic.
- **Fix:** Use `sed` to replace all rounded classes.
  ```bash
  sed -i 's/rounded-full/rounded-none/g; s/rounded-md/rounded-none/g; s/rounded-lg/rounded-none/g' src/components/*.tsx
  ```
- **Verification:** `grep -r "rounded-full\|rounded-md\|rounded-lg" src/` must return empty.

### Bug 2: Incorrect `import.meta.glob` Paths
- **Symptom:** All content images fail to load; browser shows "NY" placeholder text.
- **Root Cause:** Paths were `./content/...` (pointing to non-existent `src/lib/content/`).
- **Fix:** Update all glob paths in `content.ts` to `../content/...`.

### Bug 3: Unstable React Keys
- **Symptom:** React warnings about duplicate keys or unexpected re-rendering.
- **Root Cause:** Using paragraph strings or dynamic content as `key` props.
- **Fix:** Use a stable, unique identifier. If no ID exists, use a stable hash or the array index as a last resort.
  ```tsx
  // WRONG: <p key={paragraph}>{paragraph}</p>
  // CORRECT: <p key={`para-${index}`}>{paragraph}</p>
  ```

### Bug 4: Light Theme Override Specificity Failures
- **Symptom:** Light theme styles don't apply.
- **Fix:** Ensure the pattern is exactly `[.theme-day_&]:` (underscore, not space, with `&`).

### Bug 5: Body Scroll Lock Cleanup Failures
- **Symptom:** Page remains unscrollable after closing the mobile menu.
- **Fix:** Ensure `useEffect` cleanup always resets: `return () => { document.body.style.overflow = ''; };`

### Bug 6: `erasableSyntaxOnly` Rejecting Enums
- **Symptom:** TS build fails with "This syntax is not allowed when 'erasableSyntaxOnly' is enabled".
- **Fix:** Replace `enum` with union types (e.g., `type Icon = 'mail' | 'linkedin';`).

---

## 10. Debugging Guide

1. **Broken Images:** Open DevTools Network tab. In `content.ts`, add `console.log('Portrait images:', Object.keys(portraitImages));`. If empty, glob path is wrong.
2. **TypeScript Errors:** 
   - "Object is possibly 'undefined'" → Add `!` non-null assertion or null check.
   - "Cannot find module '@/lib/types'" → Verify `@/` path alias in `tsconfig.json` and `vite.config.ts`.
3. **Build Failures:** Run `pnpm typecheck` first. Check `vite.config.ts` for `base: './'`. Verify `@tailwindcss/vite` plugin is present.
4. **Content Not Appearing:** Log `Object.keys(portfolioTextFiles)`. If empty, check glob paths. Verify `isCollectionGuideFile()` isn't accidentally filtering your new content.
5. **Theme Toggle Not Working:** Check that the root `<div>` has `theme-night` or `theme-day` class. Verify `[.theme-day_&]` overrides are present on child elements.
6. **Mobile Menu Not Closing:** Verify `onMenuToggle` is called on backdrop click. Check `translate-x-[105%]` is applied when closed. Verify scroll lock cleanup.

---

## 11. Pre-Ship Checklist & Verification

Run EVERY item before claiming completion. No exceptions.

### Build Verification
```bash
# Must pass with ZERO errors
pnpm typecheck

# Must produce dist/ output with ZERO errors
pnpm build

# Verify build output sizes are reasonable and assets are present
ls -la dist/assets/
```

### Responsive Breakpoint Table
| Width | Expected Layout |
|---|---|
| 360px | Single column, compact spacing, mobile drawer |
| 430px | Single column, slightly more spacing |
| 620px | Single/two-column hybrid |
| 760px | **Major mobile breakpoint** — drawer nav appears, grid adjusts, padding reduces |
| 900px | Two-column layouts begin, desktop nav visible |
| 1200px | Full desktop layout with max-width containers |
| 1536px | Content centered with `max-w-[1320px]` |

### Quality Assurance Checklist
- [ ] `grep -r "rounded-full\|rounded-md\|rounded-lg" src/` returns **empty**.
- [ ] No purple gradients or generic card grids anywhere.
- [ ] All `<img>` tags have meaningful `alt` text (not `alt=""` unless truly decorative).
- [ ] All animations check `useReducedMotion()`.
- [ ] `pnpm typecheck` passes with zero errors.
- [ ] No `any`, `enum`, or `namespace` keywords in the codebase.
- [ ] All React `key` props are stable and unique (e.g., `key={item.slug}`).
- [ ] `import.meta.glob` paths in `content.ts` are correct (`../content/...`).
- [ ] Hash navigation works: `#/collections/poetry`, `#/collections/poetry/anger`.
- [ ] Mobile menu opens/closes properly with body scroll lock cleanup.

---

## 12. Summary: The Non-Negotiables

| Area | The Rule |
|---|---|
| **Aesthetic** | `rounded-none` across ALL components. Absolutely no pill buttons or rounded cards. |
| **Grid** | 28px rhythm. Every pixel serves the grid. |
| **Accessibility** | WCAG AAA. `useReducedMotion()` gates all motion. Meaningful `alt` on all images. |
| **TypeScript** | Strict mode, `erasableSyntaxOnly`. No `any`, `enum`, `namespace`. Handle `T \| undefined`. |
| **Content** | `import.meta.glob` with correct paths (`../content/...`). Build-time ingestion only. |
| **Typography** | Editorial (serif) for headlines, Utility (mono) for labels, Inter for body. |
| **Installation** | Every change is an "installation piece", not a template widget. |

*Built from the ground up to be a digital installation, not a generic portfolio. Every line of code serves the "Engineered Soul" thesis.*
```

***

### Phase 5: VERIFY — Quality Assurance Against Success Criteria

1. **Audit Resolution**: The file now explicitly includes the full `@theme` hex codes, Z-Index map, complete TypeScript interfaces, detailed component logic patterns, hook mechanics, and the 6-part debugging guide. It is no longer "dangerously thin" for generative tasks.
2. **Ground Truth Enforcement**: Absolute `rounded-none`, `../content/...` glob paths, meaningful `alt` text, and `erasableSyntaxOnly` union types are codified as non-negotiable laws, directly overriding any historical contradictions.
3. **No Truncation**: All relevant tactical details from `SKILL-1.md` and `SKILL.md` have been preserved, deduplicated, and structured for maximum AI-agent retrieval efficiency.
4. **Actionability**: Includes exact `grep`, `sed`, and `pnpm` commands for agents to verify their work before delivery.

### Phase 6: DELIVER — Handoff & Next Steps

**Usage Instructions:**
1. Save the content above as `SKILL-MASTER.md` in the root of your project (or in your `.cursor/rules`, `.github/copilot-instructions.md`, or equivalent AI agent configuration directory).
2. Update your primary agent prompt (e.g., `CLAUDE.md` or `AGENTS.md`) to include a single, overriding directive: *"For all implementation details, design system rules, hook patterns, and debugging procedures, strictly adhere to `SKILL-MASTER.md` as the single, definitive source of truth."*
3. You may safely archive or delete the older `SKILL.md`, `SKILL-1.md`, and `SKILL-2.md` files to prevent future agent confusion or conflicting context retrieval.

**Recommendations for Future Work:**
- Consider adding a CI/CD step (e.g., a GitHub Actions workflow) that runs the `grep -r "rounded-full\|rounded-md\|rounded-lg" src/` command and fails the build if it returns any matches, enforcing the brutalist aesthetic at the pipeline level.
- If the content directory grows significantly (>50MB of images), revisit Section 5.1 to implement lazy `import.meta.glob` (`{ eager: false }`) to optimize initial bundle size, as noted in the "Lessons Learnt" section of the source docs.

The definitive, production-grade master skill file is now complete and ready for deployment.
