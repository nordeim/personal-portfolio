---
name: personal-portfolio
description: >
  The definitive skill for building, modifying, or auditing the Nicholas Yun
  portfolio (The Engineered Soul v2.0). This is a consolidated, production-grade
  reference that merges deep design philosophy with practical implementation
  details, remediation lessons, and strict quality guardrails. Use this skill when
  working with the React 19 + TypeScript 6 + Vite 6 + Tailwind CSS v4 codebase.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
license: MIT
version: 2.0.0
---

# The Engineered Soul — Portfolio Skill (Consolidated v2.0)

> **One-Shot Prevention:** This skill was distilled from a real build cycle that migrated a 1265-line JSX + 4411-line CSS monolith into a clean, component-driven TypeScript + Tailwind v4 codebase. It encodes both the deep architectural thinking (the "why") and the practical remediation lessons (the "what went wrong and how we fixed it").
>
> **Scope**: Every section in this document has been validated against the current codebase. Skipping any section creates rework. Always follow the full checklist in the Pre-Ship section before claiming completion.

---

## 1. Project Identity & Design Philosophy

### Name and Concept

- **Name**: The Engineered Soul (v2.0)
- **Purpose**: A personal portfolio website for Nicholas Yun — a "Digital Installation" that serves as both a functional portfolio and an avant-garde artistic statement.
- **Tagline**: **"Post-AI Authenticity"** — a rejection of generic "AI slop" web design in favor of intentional, mathematical, and tactile digital craft.

### The Dual-Thesis: Tactile Brutalism + High-End Editorial

The aesthetic is a deliberate collision of two extremes that create intentional visual tension. Every design decision must answer: **"Does this serve the tension between the mathematical and the emotional, or does it safely retreat to the middle?"**

**Tactile Brutalism** — Structure is visible, honest, and unapologetic:
- 1px borders on every interactive element
- `border-radius: 0px` as the default (`--radius-brutal: 0px`)
- A visible 28px grid as the background pattern
- Mono-spaced utility typography for metadata and labels
- No decoration without function. The "machine".

**High-End Editorial** — The soul beneath the structure:
- Cormorant Garamond serif for headlines (cinematic, editorial)
- Extreme whitespace (`--spacing-section: 104px`)
- `text-wrap: balance` on all headlines
- Cinematic motion: calm 900ms fades, subtle light-sheet animations
- Accent colors assigned per creative category. The "soul".

**The synthesis**: **Engineered Soul** — the cold precision of brutalism carrying the warmth of editorial craft.

### Anti-Patterns to Reject (The "AI Slop" List)

- Purple gradients on white backgrounds
- Safe Inter/Roboto-only font pairings without distinct hierarchy
- Predictable card grids and hero sections
- Bootstrap-like rounded corners (`rounded-md`, `rounded-lg`, `rounded-full`)
- Generic stock photography or placeholder aesthetics
- Templates, not installations

### Mandatory Six-Phase Workflow

Every change to this codebase MUST follow:

1. **ANALYZE** — Read existing code, understand the data flow, trace the component tree
2. **PLAN** — Write down every file change before touching code
3. **VALIDATE** — Present the plan for review before implementing
4. **IMPLEMENT** — Write code following the patterns in this document
5. **VERIFY** — Run `pnpm typecheck && pnpm build` after every change
6. **DELIVER** — Confirm zero errors, zero warnings, and visual QA

**No phase can be skipped. No code is written without user confirmation.**

---

## 2. Tech Stack & Environment

### Exact Versions

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | React | ^19.0.0 | Concurrent rendering, `useId`, `useRef` |
| **Language** | TypeScript | ^6.0.0 | Strict typing with `erasableSyntaxOnly: true` |
| **Build Tool** | Vite | ^6.3.0 | Zero-config HMR, `import.meta.glob` for content |
| **Styling** | Tailwind CSS | ^4.1.0 | CSS-first `@theme`, no config file, `@tailwindcss/vite` plugin |
| **Package Manager** | pnpm | >= 9 | Workspace support, strict resolution |
| **Fonts** | Google Fonts | — | Cormorant Garamond, IBM Plex Mono, Inter |

**No additional UI libraries**: No shadcn/ui, no Framer Motion, no React Router. All components are bespoke.

### Critical TypeScript Settings (`tsconfig.json`)

The `tsconfig.json` must include:

- `strict: true`
- `erasableSyntaxOnly: true` — Rejects `enum`, `namespace`, and parameter properties in constructors. Always use union types (e.g., `icon: 'mail' | 'linkedin'`) instead of `enum`.
- `noUncheckedIndexedAccess: true` — Makes array/object index access return `T | undefined`. This is why you see `heroSlides[activeHeroIndex]!` — the `!` is a non-null assertion after a logical bounds check.

### Why This Stack?

The portfolio has only ~5 pieces of state, all lifted to `App.tsx`. No context, no Redux, no Zustand. Adding a state management library for 5 booleans/numbers would be over-engineering. The max prop drilling depth is 2 (App → Navigation → ThemeToggle), which is acceptable.

---

## 3. The Design System (Exact Implementation)

### 3.1 Tailwind v4 CSS-First Configuration

There is **NO** `tailwind.config.js`. All design tokens live in `src/styles/index.css` inside `@theme`:

```css
@theme {
  /* Grid Unit — the mathematical backbone of the design */
  --unit: 28px;
  --spacing-grid: 28px;

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

  /* Spacing */
  --spacing-section: 104px;

  /* Border Radius — Brutalist defaults */
  --radius-brutal: 0px;
  --radius-soft: 8px;
  --radius-pill: 999px;
}
```

### 3.2 The 28px Grid

Every layout must align with the 28px rhythm. This is defined via a visible background grid:

```css
.theme-night::before,
.theme-day::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background-size: 28px 28px;
  opacity: 0.04;
  pointer-events: none;
}
```

**Rule**: All padding, margins, and grid gaps should be multiples of 28px (or fractions thereof like 14px) unless there is a specific micro-justification for breaking the rhythm.

### 3.3 Brutalist Borders (0px Radius)

**CRITICAL**: Every single element must use `rounded-none`. This includes:
- Structural containers (cards, panels, tiles)
- Interactive elements (buttons, badges, toggles)
- Images, thumbnails, avatars
- Inputs, selects, modals

The `REMEDIATION_SUMMARY.md` documents a real incident where `rounded-full` and `rounded-md` were missed in several components. **Use `grep` to enforce this rule**:

```bash
grep -r "rounded-full\|rounded-md\|rounded-lg\|rounded-xl" src/
# Expected output: empty (zero matches)
```

### 3.4 Typography Hierarchy

| Role | Font | Usage |
|---|---|---|
| **Editorial** | `Cormorant Garamond` | Hero headlines, kinetic type, longform body |
| **Utility** | `IBM Plex Mono` | Labels, metadata, Machine Mode data, timestamps |
| **Body** | `Inter` | General reading text, UI controls |

**Three-tier typography hierarchy is non-negotiable.**

**Pattern for applying kinetic typography**:
```tsx
<h1 className="type-kinetic-hero" style={{ fontWeight: prefersReduced ? 950 : fontWeight }}>
  Nicholas Yun
</h1>
```

### 3.5 Color System

- **Dark Theme (`.theme-night`)**: Deep navy/midnight (`#11131d`, `#07080d`) with high-contrast white text
- **Light Theme (`.theme-day`)**: Warm cream/white (`#fff8e8`, `#ffffff`) with deep ink text
- **Accent Colors**: Category-specific colors defined in tokens above and used via CSS variables in components.

---

## 4. Component Architecture

### 4.1 Component Philosophy

Components are organized by **function** not by layer. Each component is a self-contained "installation piece" that handles its own concerns (presentation + minor state). No over-abstraction.

### 4.2 File Organization

```
src/
├── App.tsx                    # Thin orchestrator, state lifted here
├── main.tsx                   # React entry point with StrictMode
├── vite-env.d.ts              # Vite type declarations
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
│   ├── content.ts             # import.meta.glob data ingestion
│   ├── data.ts                # Static data, collection definitions
│   └── types.ts               # TypeScript interfaces
├── styles/
│   └── index.css              # Global styles, Tailwind @theme, animations
└── content/                   # File-system content (not in src/ build)
    ├── portrait/              # Hero portrait images
    ├── portfolio/             # Portfolio project markdown + images
    └── collections/           # Collection markdown + images + PDFs
```

### 4.3 Key Components

#### HeroKinetic.tsx
- **Purpose**: Full-viewport hero with auto-rotating slides
- **Interaction**: Scroll velocity dynamically affects `font-weight` via `useWeightedScroll`
- **Slide Rotation**: Auto-advances every 10 seconds with `setInterval`
- **Reduced Motion**: If `prefers-reduced-motion`, skip the light-sheet animation entirely by conditionally rendering the animated `div`s
- **Dynamic theming**: Each slide injects accent colors via CSS custom properties (`--slide-accent`, `--slide-alt`)

#### BentoGrid.tsx + BentoTile.tsx
- **Purpose**: Non-linear project shelf
- **Texture Logic**: Each tile applies a different font family based on `category`:
  - **Code/Writing**: `IBM Plex Mono` (utility)
  - **Art/Photography**: `Cormorant Garamond` (serif, editorial)
  - **Falls back to default body font**

#### MachineOverlay.tsx (MX)
- **Purpose**: Technical transparency layer showing raw state, build info, route data
- **Toggle**: "MX" button in Navigation
- **Design**: Strict mono font (`IBM Plex Mono`), `lime`/`green` terminal text (`#4dff4d` on `rgba(0,20,0,0.92)`)

#### ArchiveSpread.tsx
- **Purpose**: Collection detail pages (e.g., `#/collections/poetry`)
- **Content**: Renders `CollectionItem` data — title, description, body text, and optional images/PDFs
- **Key Accessibility Fix**: Content images use `alt={item.title}`, not `alt=""` (this was a real bug)

---

## 5. Data Architecture

### 5.1 Content Ingestion Pattern

All content is ingested at **build time** via `import.meta.glob` in `src/lib/content.ts`:

```typescript
const portraitImages = import.meta.glob(
  ['../content/portrait/*.{jpg,jpeg,png,webp,avif}',
   '../content/portrait/**/*.{jpg,jpeg,png,webp,avif}'],
  { eager: true, import: 'default', query: '?url' }
) as Record<string, string>;
```

**CRITICAL**: `import.meta.glob` paths are relative to the **source file that calls it**, NOT relative to the project root. Since `content.ts` lives in `src/lib/`, paths must start with `../content/` (pointing to `src/content/`), NOT `./content/` (which would point to the non-existent `src/lib/content/`).

### 5.2 Content Directory Structure

```
src/content/
├── portrait/
│   ├── creative-technologist/    # Hero slide 1 photo
│   ├── nicholas-yun/             # Main profile photo
│   ├── project-archive/          # Hero slide 2 photo
│   └── open-to-collaborate/      # Hero slide 3 photo
├── portfolio/
│   ├── art/                      # Portfolio gateway: Art
│   ├── code/                     # Portfolio gateway: Code
│   ├── design/                   # Portfolio gateway: Design
│   ├── experiments/              # Portfolio gateway: Experiments
│   ├── photography/             # Portfolio gateway: Photography
│   ├── poetry/                   # Portfolio gateway: Poetry
│   └── storytelling/            # Portfolio gateway: Storytelling
└── collections/                  # Archive items (detail pages)
    ├── artworks/
    ├── design/
    ├── photography/
    ├── poetry/
    ├── stories/
    └── web-experiments/
```

### 5.3 Adding New Content

To add a new portfolio project or collection item:
1. Create a `.md` text file in the correct subfolder (e.g., `src/content/portfolio/code/my-project.md`)
2. Add an image with the **same base filename** in the same folder for a preview thumbnail
3. The `import.meta.glob` in `src/lib/content.ts` will pick it up automatically on the next build

---

## 6. Custom Hooks (Deep Dive)

### 6.1 useWeightedScroll.ts

Maps scroll velocity to a `font-weight` range (200–950) for kinetic typography.

**Key Implementation**: Uses `requestAnimationFrame` throttling to prevent 60fps re-renders. The `fontWeight` is applied via inline `style` on the heading to avoid React Virtual DOM overhead for class changes.

**Reduced Motion**: If `prefers-reduced-motion` is detected, the hook returns a static `fontWeight` of 950 (maximum weight), effectively disabling the kinetic effect while maintaining the bold aesthetic.

### 6.2 useRouteHash.ts

Custom hash-based routing without any router library.

**How it works**:
- Listens for `hashchange` events on `window`
- Returns the current `window.location.hash`
- Used by `App.tsx` to conditionally render different "pages" (Home vs Archive Spread)

**Why no react-router**: The site is a single-page application where "sub-pages" are displayed inline based on hash. Installing a router library would be unnecessary overhead.

### 6.3 useReducedMotion.ts

Checks `window.matchMedia('(prefers-reduced-motion: reduce)')`.

**Usage**: Gate ALL motion behind this hook. If true:
- Skip `animate-*` classes entirely (do not render them)
- Return heavy static values (e.g., `fontWeight: 950`)
- CSS media query `@media (prefers-reduced-motion: reduce)` also globally disables transitions

---

## 7. Accessibility (WCAG AAA)

### 7.1 Mandatory Checks for Any Agent

- [ ] All images have meaningful `alt` text. **Never use `alt=""` for content images.**
- [ ] All animations check `useReducedMotion()` and skip or simplify
- [ ] Global CSS `@media (prefers-reduced-motion: reduce)` disables ALL transitions and animations
- [ ] All motion-affected elements are targeted in the CSS media query (e.g., `.light-sheet`, `.hero-stage`, `#mobile-navigation`)

### 7.2 Known Remediation (Now Fixed)

**Issue**: Archive images in `ArchiveSpread.tsx` used empty `alt=""` attributes, violating WCAG AAA for content images.
**Fix**: Changed `alt=""` to `alt={activeItem.title}` and `alt={item.title}`.

---

## 8. Anti-Patterns & Common Bugs (With Fixes)

### Bug 1: Inconsistent Border Radii (The "Rounding Leak")
**Symptom**: Components contain a mix of `rounded-none`, `rounded-full`, `rounded-md`, and `rounded-lg`, violating the brutalist aesthetic.
**Root Cause**: Adding interactive elements (buttons, badges) and using default Tailwind utilities.
**Fix**: Use `sed` or `grep` to find and replace all rounded classes with `rounded-none`.
```bash
sed -i 's/rounded-full/rounded-none/g; s/rounded-md/rounded-none/g; s/rounded-lg/rounded-none/g' src/components/*.tsx
```
**Verification**: `grep -r "rounded-full\|rounded-md\|rounded-lg" src/` must return empty.

### Bug 2: Incorrect `import.meta.glob` Paths
**Symptom**: All content images fail to load, falling back to `/nicholas-portrait.jpg` (which does not exist). Browser shows "NY" placeholder text instead of images.
**Root Cause**: Paths in `src/lib/content.ts` were `./content/...` (relative to `src/lib/`, pointing to non-existent `src/lib/content/`). Correct path is `../content/...` pointing to `src/content/`.
**Fix**: Update all glob paths in `content.ts`:
```typescript
// WRONG
'./content/portrait/*.{jpg,jpeg,png,webp,avif}'
// CORRECT
'../content/portrait/*.{jpg,jpeg,png,webp,avif}'
```

### Bug 3: Unstable React Keys
**Symptom**: React warnings about duplicate keys, or unexpected re-rendering when list items have identical text.
**Root Cause**: Using paragraph strings or other dynamic content as `key` props.
**Fix**: Use a stable, unique identifier. If no ID exists, use a stable hash or the array index as a last resort.
```tsx
// WRONG
<p key={paragraph}>{paragraph}</p>
// CORRECT
<p key={`para-${index}`}>{paragraph}</p>
```

---

## 9. Build & Verification Commands

### Critical Commands (Run in this order)

| Command | Purpose |
|---|---|
| `pnpm typecheck` | Run TypeScript strict check (mandatory before any commit) |
| `pnpm build` | Production build — verifies type safety AND bundles all assets |
| `pnpm dev` | Start Vite dev server with HMR |

### Build Verification Steps

1. After any content or code change, run `pnpm typecheck` (zero errors expected)
2. Run `pnpm build` (should succeed and list all content assets in output)
3. Check for your files in the build output (e.g., `dist/assets/nicholas-0--...webp`)
4. If a file is missing from the build output, check the `import.meta.glob` path in `content.ts`

---

## 10. Pre-Ship Checklist (Before Any Deployment)

### Aesthetic Consistency
- [ ] `grep -r "rounded-full\|rounded-md\|rounded-lg" src/` returns empty
- [ ] No purple gradients or generic card grids anywhere
- [ ] All layout elements align with 28px grid rhythm
- [ ] Typography hierarchy uses the correct font (Editorial/Utility/Body)

### Accessibility (WCAG AAA)
- [ ] All `<img>` tags have meaningful `alt` text (not `alt=""` unless truly decorative)
- [ ] All animations check `useReducedMotion()`
- [ ] CSS `@media (prefers-reduced-motion: reduce)` disables all transitions
- [ ] High contrast maintained in both `.theme-night` and `.theme-day`

### Code Quality
- [ ] `pnpm typecheck` passes with zero errors
- [ ] `noUnusedLocals` and `noUnusedParameters` are satisfied
- [ ] No `any`, `enum`, or `namespace` keywords in the codebase
- [ ] All React `key` props are stable and unique

### Content Integrity
- [ ] New content files are placed in the correct `src/content/` subfolder
- [ ] `import.meta.glob` paths in `content.ts` are correct (`../content/...` not `./content/...`)
- [ ] Build output shows all expected content assets
- [ ] Preview images share the same base filename as their corresponding text files

---

## 11. Summary: The Non-Negotiables

| Area | The Rule |
|---|---|
| **Aesthetic** | `rounded-none` across ALL components. Absolutely no pill buttons or rounded cards. |
| **Grid** | 28px rhythm. Every pixel serves the grid. |
| **Accessibility** | WCAG AAA. `useReducedMotion()` gates all motion. Meaningful `alt` on all images. |
| **TypeScript** | Strict mode, `erasableSyntaxOnly`. No `any`, `enum`, `namespace`. |
| **Content** | `import.meta.glob` with correct paths (`../content/...`). Build-time ingestion only. |
| **Typography** | Editorial (serif) for headlines, Utility (mono) for labels, Inter for body. |
| **Installation** | Every change is an "installation piece", not a template widget. |

---

*Built from the ground up to be a digital installation, not a generic portfolio. Every line of code serves the "Engineered Soul" thesis.*