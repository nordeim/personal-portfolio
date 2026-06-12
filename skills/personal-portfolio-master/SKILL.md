---
name: personal-portfolio-master
description: >
  Build a Tactile Brutalist + High-End Editorial personal portfolio SPA using
  React 19, TypeScript 6 strict, Vite 6, and Tailwind CSS v4. Covers the complete
  lifecycle from project scaffold to shipping a type-safe, WCAG AAA-compliant,
  component-driven digital installation with kinetic typography, hash-based routing,
  import.meta.glob content ingestion, and dual-theme (night/day) design system.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
license: MIT
version: 3.0.0
---

# The Engineered Soul — Portfolio Master Skill (v3.0.0)

**One-Shot Prevention:** This skill was distilled from a real build cycle that migrated a monolithic codebase into a clean, component-driven TypeScript + Tailwind v4 installation. It encodes both the deep architectural thinking (the "why") and the practical remediation lessons (the "what went wrong and how we fixed it"). Skipping any section creates rework. 

---

## 1. Project Identity & Non-Negotiables

### The Dual-Thesis
The aesthetic is a deliberate collision of two extremes. Every design decision must answer: *"Does this serve the tension between the mathematical and the emotional, or does it safely retreat to the middle?"*
- **Tactile Brutalism (The Machine):** Visible structure, 1px borders, `0px` border-radius, mono utility type, high contrast, no decoration without function.
- **High-End Editorial (The Soul):** Cormorant Garamond serif headlines, extreme whitespace, cinematic motion, asymmetric spreads, human textures.

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
| Build Tool | Vite | ^6.3.0 | Zero-config HMR, `import.meta.glob` |
| Styling | Tailwind CSS | ^4.1.0 | CSS-first `@theme`, no config file |
| Package Manager | pnpm | >= 9 | Workspace support, strict resolution |
| Fonts | Google Fonts | — | Cormorant Garamond, IBM Plex Mono, Inter |

### Critical TypeScript Settings (`tsconfig.json`)
- `strict: true`
- `erasableSyntaxOnly: true` — **NON-NEGOTIABLE**. Rejects `enum`, `namespace`, and parameter properties. Always use union types (e.g., `icon: 'mail' | 'linkedin'`).
- `noUncheckedIndexedAccess: true` — Makes array/object index access return `T | undefined`. You must handle the `undefined` case or use a non-null assertion (`!`) *only* when logically guaranteed by bounds checking.

---

## 3. The Design System (Code-First)

There is NO `tailwind.config.js`. All design tokens live in `src/styles/index.css` inside `@theme`.

### 3.1 Tailwind v4 `@theme` Block
```css
@import "tailwindcss";

@theme {
  /* Grid Unit — the mathematical backbone */
  --unit: 28px;
  --spacing-grid: 28px;
  --spacing-section: 104px;

  /* Colors — Dark Theme (default) */
  --color-ink: #07080d;
  --color-surface: #11131d;
  --color-text: #ffffff;
  --color-text-secondary: rgba(255, 255, 255, 0.68);
  --color-border: rgba(255, 255, 255, 0.13);

  /* Colors — Light Theme */
  --color-day-bg: #fff8e8;
  --color-day-surface: #ffffff;
  --color-day-text: #15151b;
  --color-day-border: rgba(21, 21, 27, 0.1);

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
}
```

### 3.2 The 28px Grid
Every layout must align with the 28px rhythm. This is defined via a visible background grid:
```css
.theme-night::before, .theme-day::before {
  content: ''; position: fixed; inset: 0; z-index: -1;
  background-size: 28px 28px; opacity: 0.04; pointer-events: none;
}
```
**Rule:** All padding, margins, and grid gaps should be multiples of 28px (or fractions like 14px) unless there is a specific micro-justification.

### 3.3 Brutalist Borders (Absolute `rounded-none` Mandate)
**GROUND TRUTH:** Every single element must use `rounded-none`. This includes structural containers, interactive elements (buttons, badges), images, and inputs. 
- **Verification:** `grep -r "rounded-full\|rounded-md\|rounded-lg\|rounded-xl" src/` must return **zero matches**. Any documentation suggesting exceptions is obsolete.

---

## 4. Component Architecture

### 4.1 File Organization
```text
src/
├── App.tsx                    # Thin orchestrator, state lifted here
├── components/                # UI primitives and composite installations
│   ├── HeroKinetic.tsx        # Viewport-scaled hero with pointer parallax
│   ├── AboutFlow.tsx          # Asymmetric editorial about section
│   ├── BentoGrid.tsx          # Portfolio gateway grid
│   ├── ArchiveSpread.tsx      # Collection detail + item detail views
│   ├── MachineOverlay.tsx     # Terminal-style data overlay (MX)
│   └── ...
├── hooks/
│   ├── useWeightedScroll.ts   # Scroll velocity -> font-weight mapping
│   ├── useRouteHash.ts        # Hash-based routing
│   └── useReducedMotion.ts    # prefers-reduced-motion hook
├── lib/
│   ├── content.ts             # import.meta.glob data ingestion
│   ├── data.ts                # Static data, collection definitions
│   └── types.ts               # TypeScript interfaces
└── styles/index.css           # Global styles, Tailwind @theme, animations
```

### 4.2 The "Thin Orchestrator" Pattern (`App.tsx`)
`App.tsx` is the single source of truth for application state. It lifts state up and passes it down via props. No context providers, no state management libraries. Max prop drilling depth is 2 (e.g., App → Navigation → ThemeToggle).

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

### 5.2 Content Directory Structure
```text
src/content/
├── portrait/          # Hero slide photos
├── portfolio/         # Portfolio project markdown + sibling images
└── collections/       # Archive items (markdown + images + PDFs)
```
**Rule:** If a markdown file and an image share the same folder and base filename (e.g., `poetry/anger.md` and `poetry/anger.jpg`), they are "siblings" and the image is automatically associated as the visual.

---

## 6. Custom Hooks (SSR-Safe)

- **`useRouteHash`**: Custom hash-based routing. Listens to `hashchange` events. Includes `typeof window !== 'undefined'` SSR guard.
- **`useWeightedScroll`**: Maps scroll velocity to `font-weight` (200–950) using `requestAnimationFrame` throttling. Returns static `950` if `prefers-reduced-motion` is true.
- **`useReducedMotion`**: Checks `window.matchMedia('(prefers-reduced-motion: reduce)')`. **Must** gate ALL motion behind this hook.

---

## 7. Accessibility (WCAG AAA)

### 7.1 Mandatory Checks
- [ ] **Meaningful Alt Text:** All content images MUST have meaningful `alt` text (e.g., `alt={item.title}`, `alt="Nicholas Yun"`). 
- [ ] **No Empty Alt for Content:** `alt=""` is strictly reserved for purely decorative UI elements (e.g., `GrainOverlay`, `BrandMark`). 
- [ ] **Motion Gating:** All animations check `useReducedMotion()`. Global CSS `@media (prefers-reduced-motion: reduce)` disables ALL transitions.
- [ ] **Focus Visible:** All interactive elements have visible focus indicators (e.g., `outline: 3px solid rgba(36, 87, 255, 0.35); outline-offset: 3px;`).
- [ ] **Skip Link:** A "Skip to main content" link is present and functional.

---

## 8. Anti-Patterns & Debugging Guide

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
- **Verification:** Add `console.log('Portrait images:', Object.keys(portraitImages));` in `content.ts`. It must not be empty.

### Bug 3: Unstable React Keys
- **Symptom:** React warnings about duplicate keys or unexpected re-rendering.
- **Root Cause:** Using paragraph strings or dynamic content as `key` props.
- **Fix:** Use a stable, unique identifier. If no ID exists, use a stable hash or the array index as a last resort.
  ```tsx
  // WRONG
  <p key={paragraph}>{paragraph}</p>
  // CORRECT
  <p key={`para-${index}`}>{paragraph}</p>
  ```

---

## 9. TypeScript Interface Reference

All interfaces live in `src/lib/types.ts`. Key design decisions: `Project` and `CollectionItem` share fields via `extends`. Optional fields (`image`, `link`, `body`) use `?`. `SocialLink.icon` uses a union type (not `enum`) due to `erasableSyntaxOnly`.

```typescript
export interface HeroSlide {
  label: string; portraitKey: string; headline: string; subtitle: string;
  artifactTitle: string; artifactMeta: string; signature: string;
  accent: string; secondaryAccent: string; tags: string[];
}

export interface Project {
  title: string; category: string; accent: string; medium?: string;
  status: string; description: string; link?: string; linkLabel: string;
  slug: string; image?: string; body?: string;
}

export interface CollectionItem extends Project {
  collectionSlug: string; document?: string;
}

export interface Collection {
  slug: string; title: string; category: string; accent: string;
  description: string; status: string;
}

export interface ArchiveRoute {
  collectionSlug: string; itemSlug: string | null;
}

export interface SocialLink {
  label: string; icon: 'mail' | 'linkedin' | 'instagram' | 'github' | 'wix';
  href: string; description: string;
}
```

---

## 10. Pre-Ship Checklist & Verification

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

### Quality Assurance Checklist
- [ ] `grep -r "rounded-full\|rounded-md\|rounded-lg" src/` returns **empty**.
- [ ] No purple gradients or generic card grids anywhere.
- [ ] All `<img>` tags have meaningful `alt` text (not `alt=""` unless truly decorative).
- [ ] All animations check `useReducedMotion()`.
- [ ] `pnpm typecheck` passes with zero errors.
- [ ] No `any`, `enum`, or `namespace` keywords in the codebase.
- [ ] All React `key` props are stable and unique (e.g., `key={item.slug}`).
- [ ] `import.meta.glob` paths in `content.ts` are correct (`../content/...`).
- [ ] Build output shows all expected content assets.

---
*Built from the ground up to be a digital installation, not a generic portfolio. Every line of code serves the "Engineered Soul" thesis.*
