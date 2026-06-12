---
name: personal-portfolio
personal-portfolio
  Use when building, modifying, or auditing a portfolio website for Nicholas Yun (The Engineered Soul v2.0). This skill encodes the complete design philosophy, architecture, and implementation details needed to replicate or extend this brutalist-editorial digital installation.
description: >
  Use when building, modifying, or auditing a portfolio website for Nicholas Yun (The Engineered Soul v2.0). This skill encodes the complete design philosophy, architecture, and implementation details needed to replicate or extend this brutalist-editorial digital installation.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
version: 1.0.0
---

# The Engineered Soul — Portfolio Skill

## 1. Project Identity

### Name and Purpose
- **Name**: The Engineered Soul (v2.0)
- **Purpose**: A personal portfolio website for Nicholas Yun — a "Digital Installation" that serves as both a functional portfolio and an avant-garde artistic statement.
- **Tagline**: "Post-AI Authenticity" — a rejection of generic "AI slop" web design in favor of intentional, mathematical, and tactile digital craft.

### Design Philosophy: Tactile Brutalism Meets High-End Editorial
The aesthetic is a deliberate collision of two extremes:
- **Tactile Brutalism**: Rigid, visible structure — 28px grid, 1px borders, 0px radius, mono utility type, high contrast. The "machine".
- **High-End Editorial**: Cinematic motion, extreme whitespace, serif display type, asymmetric spreads, human textures. The "soul".

Every design decision must answer: **"Does this serve the tension between the mathematical and the emotional, or does it safely retreat to the middle?"**

### Anti-Patterns to Reject (The "AI Slop" List)
- Purple gradients on white backgrounds
- Safe Inter/Roboto-only font pairings without distinct hierarchy
- Predictable card grids and hero sections
- Bootstrap-like rounded corners (`rounded-md`, `rounded-lg`, `rounded-full`)
- Generic stock photography or placeholder aesthetics
- Templates, not installations

---

## 2. Tech Stack (Exact Versions)

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | React | ^19.0.0 | Concurrent rendering, `useId`, `useRef` etc |
| Language | TypeScript | ^6.0.0 | Strict typing with `erasableSyntaxOnly: true` |
| Build Tool | Vite | ^6.3.0 | Zero-config HMR, `import.meta.glob` for content |
| Styling | Tailwind CSS | ^4.1.0 | CSS-first via `@theme` in `src/styles/index.css` |
| Package Manager | pnpm | >= 9 | Dependency management |
| Fonts | Google Fonts | — | Cormorant Garamond, IBM Plex Mono, Inter |

**No additional UI libraries**: No shadcn/ui, no Framer Motion, no React Router. All components are bespoke.

---

## 3. Bootstrapping from Zero

If you ever need to rebuild this from scratch:

```bash
# 1. Scaffold with Vite
npm create vite@latest personal-portfolio -- --template react-ts
cd personal-portfolio

# 2. Install dependencies
npm install react@^19.0.0 react-dom@^19.0.0

# 3. Install dev dependencies
npm install -D typescript@^6.0.0 vite@^6.3.0 @vitejs/plugin-react@^4.0.0 \
  tailwindcss@^4.1.0 @tailwindcss/vite@^4.1.0

# 4. Configure path aliases in vite.config.ts
# alias: { '@': '/src' }

# 5. Remove tailwind.config.js — everything is CSS-first in src/styles/index.css
```

### Critical TypeScript Settings (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "erasableSyntaxOnly": true     // CRITICAL: No enum, namespace, etc.
  }
}
```

---

## 4. The Design System (Exact Implementation)

### 4.1 Tailwind v4 CSS-First Configuration

There is **NO** `tailwind.config.js`. All design tokens live in `src/styles/index.css` inside `@theme`:

```css
@theme inline {
  /* Grid Unit */
  --unit: 28px;
  --spacing-grid: 28px;

  /* Typography */
  --font-editorial: 'Cormorant Garamond', serif;
  --font-utility: 'IBM Plex Mono', monospace;
  --font-body: 'Inter', sans-serif;

  /* Colors (OKLCH for perceptual uniformity) */
  --color-ink: #07080d;
  --color-surface: #11131d;
  --color-day-bg: #fff8e8;
  --color-day-surface: #ffffff;

  /* Brutalist Border */
  --radius-brutal: 0px;
}
```

### 4.2 The 28px Grid
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

**Rule**: All padding, margins, and grid gaps should be multiples of 28px (or fractions thereof like 14px) unless there's a specific micro-justification for breaking the rhythm.

### 4.3 Brutalist Borders (0px Radius)
```css
/* The brutalist mandate */
--radius-brutal: 0px;
```

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

### 4.4 Typography Hierarchy
| Role | Font | Usage |
|---|---|---|
| **Editorial** | `Cormorant Garamond` | Hero headlines, kinetic type, longform body |
| **Utility** | `IBM Plex Mono` | Labels, metadata, Machine Mode data, timestamps |
| **Body** | `Inter` | General reading text, UI controls |

**Pattern for applying kinetic typography**:
```tsx
<h1 className="type-kinetic-hero" style={{ fontWeight: prefersReduced ? 950 : fontWeight }}>
  Nicholas Yun
</h1>
```

### 4.5 Color System
- **Dark Theme (`.theme-night`)**: Deep navy/midnight (`#11131d`, `#07080d`) with high-contrast white text
- **Light Theme (`.theme-day`)**: Warm cream/white (`#fff8e8`, `#ffffff`) with deep ink text
- **OKLCH-based accents**: Category-specific colors (Art: `#00a77f`, Code: `#2457ff`, etc.) defined in `src/lib/data.ts`

---

## 5. Component Architecture

### 5.1 Component Philosophy
Components are organized by **function** not by layer. Each component is a self-contained "installation piece" that handles its own concerns (presentation + minor state). No over-abstraction.

### 5.2 File Organization
```
src/
├── components/     # UI primitives and composite installations
│   ├── HeroKinetic.tsx      # Hero with scroll-weighted typography
│   ├── AboutFlow.tsx        # Editorial "calm friction" section
│   ├── BentoGrid.tsx        # Asymmetric project shelf
│   ├── BentoTile.tsx        # Individual bento items with texture logic
│   ├── Navigation.tsx       # Fixed nav with mobile drawer
│   ├── MachineOverlay.tsx   # Technical transparency overlay (MX)
│   ├── GrainOverlay.tsx     # Subtle noise texture
│   ├── ArchiveSpread.tsx    # Collection detail page
│   ├── ContentBody.tsx      # Renders Markdown/text content
│   ├── ContactSection.tsx   # Contact CTA and social links
│   ├── SocialIcon.tsx       # SVG icon renderer
│   ├── BrandMark.tsx        # Custom "NY" SVG logo
│   └── ThemeToggle.tsx      # Dark/light mode toggle
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
└── App.tsx                    # Root layout, state, routing logic
```

### 5.3 Key Components

#### HeroKinetic.tsx
- **Purpose**: Full-viewport hero with auto-rotating slides
- **Interaction**: Scroll velocity dynamically affects `font-weight` via `useWeightedScroll`
- **Slide Rotation**: Auto-advances every 10 seconds with `setInterval`
- **Reduced Motion**: If `prefers-reduced-motion`, skip the light-sheet animation entirely by conditionally rendering the animated `div`s

#### BentoGrid.tsx + BentoTile.tsx
- **Purpose**: Non-linear project shelf
- **Texture Logic**: Each tile applies a different font family based on `category`:
  - **Code/Writing**: `IBM Plex Mono` (utility)
  - **Art/Photography**: `Cormorant Garamond` (serif, editorial)
  - **Falls back to Inter**

#### MachineOverlay.tsx (MX)
- **Purpose**: Technical transparency layer showing raw state, build info, route data
- **Toggle**: "MX" button in Navigation
- **Design**: Strict mono font (`IBM Plex Mono`), `lime`/`green` terminal text

#### ArchiveSpread.tsx
- **Purpose**: Collection detail pages (e.g., `#/collections/poetry`)
- **Content**: Renders `CollectionItem` data — title, description, body text, and optional images/PDFs
- **Key Accessibility Fix**: Content images use `alt={item.title}`, not `alt=""` (this was a real bug)

---

## 6. Data Architecture

### 6.1 Content Ingestion Pattern
All content is ingested at **build time** via `import.meta.glob` in `src/lib/content.ts`:

```typescript
const portraitImages = import.meta.glob(
  ['../content/portrait/*.{jpg,jpeg,png,webp,avif}',
   '../content/portrait/**/*.{jpg,jpeg,png,webp,avif}'],
  { eager: true, import: 'default', query: '?url' }
) as Record<string, string>;
```

**CRITICAL ISSUE FOUND**: The original code used `'./content/...'` (relative to `src/lib/`), which resolved to the non-existent `src/lib/content/` directory. The correct path is `'../content/...'` pointing to `src/content/`.

### 6.2 Content Directory Structure
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

### 6.3 Adding New Content
To add a new portfolio project or collection item:
1. Create a `.md` text file in the correct subfolder (e.g., `src/content/portfolio/code/my-project.md`)
2. Add an image with the **same base filename** in the same folder for a preview thumbnail
3. The `import.meta.glob` in `src/lib/content.ts` will pick it up automatically on the next build

---

## 7. Custom Hooks (Deep Dive)

### 7.1 useWeightedScroll.ts
Maps scroll velocity to a `font-weight` range (200–950) for kinetic typography.

**Key Implementation**: Uses `requestAnimationFrame` throttling to prevent 60fps re-renders. The `fontWeight` is applied via inline `style` on the heading to avoid React Virtual DOM overhead for class changes.

**Reduced Motion**: If `prefers-reduced-motion` is detected, the hook returns a static `fontWeight` of 950 (maximum weight), effectively disabling the kinetic effect while maintaining the bold aesthetic.

### 7.2 useRouteHash.ts
Custom hash-based routing without any router library.

**How it works**:
- Listens for `hashchange` events on `window`
- Returns the current `window.location.hash`
- Used by `App.tsx` to conditionally render different "pages" (Home vs Archive Spread)

**Why no react-router**: The site is a single-page application where "sub-pages" are displayed inline based on hash. Installing a router library would be unnecessary overhead.

### 7.3 useReducedMotion.ts
Checks `window.matchMedia('(prefers-reduced-motion: reduce)')`.

**Usage**: Gate ALL motion behind this hook. If true:
- Skip `animate-*` classes entirely (don't render them)
- Return heavy static values (e.g., `fontWeight: 950`)
- CSS media query `@media (prefers-reduced-motion: reduce)` also globally disables transitions

---

## 8. Accessibility (WCAG AAA)

### 8.1 Mandatory Checks for Any Agent
- [ ] All images have meaningful `alt` text. **Never use `alt=""` for content images.**
- [ ] All animations check `useReducedMotion()` and skip or simplify
- [ ] Global CSS `@media (prefers-reduced-motion: reduce)` disables ALL transitions and animations
- [ ] All motion-affected elements are targeted in the CSS media query (e.g., `.light-sheet`, `.hero-stage`, `#mobile-navigation`)

### 8.2 Known Accessibility Bug (Now Fixed)
**Issue**: Archive images in `ArchiveSpread.tsx` used empty `alt=""` attributes, violating WCAG AAA for content images.
**Fix**: Changed `alt=""` to `alt={activeItem.title}` and `alt={item.title}`.

---

## 9. Anti-Patterns & Common Bugs (With Fixes)

### Bug 1: Inconsistent Border Radii (The "Rounding Leak")
**Symptom**: Components contain a mix of `rounded-none`, `rounded-full`, `rounded-md`, and `rounded-lg`, violating the brutalist aesthetic.
**Root Cause**: Adding interactive elements (buttons, badges) and using default Tailwind utilities.
**Fix**: Use `sed` or `grep` to find and replace all rounded classes with `rounded-none`.
```bash
sed -i 's/rounded-full/rounded-none/g; s/rounded-md/rounded-none/g; s/rounded-lg/rounded-none/g' src/components/*.tsx
```
**Verification**: `grep -r "rounded-full\|rounded-md\|rounded-lg" src/` must return empty.

### Bug 2: Incorrect `import.meta.glob` Paths
**Symptom**: All content images fail to load, falling back to `/nicholas-portrait.jpg` (which doesn't exist). Browser shows "NY" placeholder text instead of images.
**Root Cause**: Paths in `src/lib/content.ts` were `./content/...` (relative to `src/lib/`, pointing to non-existent `src/lib/content/`). Correct path is `../content/...` pointing to `src/content/`.
**Fix**: Update all glob paths in `content.ts`:
```typescript
// WRONG
'./content/portrait/*.{jpg,jpeg,png,webp,avif}'
// CORRECT
'../content/portrait/*.{jpg,jpeg,png,webp,avif}'
```
**Verification**: Run `pnpm build` and check the output for your files:
```
dist/assets/nicholas-0--W2dqedH.webp    329.89 kB
```
If your file isn't listed in the build output, the glob path is wrong.

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

## 10. Build & Verification Commands

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

## 11. Pre-Ship Checklist (Before Any Deployment)

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

## 12. Meticulous Approach (Mandatory Workflow)

This project follows a strict six-phase workflow for all changes:

1. **ANALYZE**: Deep requirement mining. Never assume.
2. **PLAN**: Create a structured roadmap. Present for confirmation.
3. **VALIDATE**: Get explicit user approval before writing code.
4. **IMPLEMENT**: Build modular, tested, and documented components.
5. **VERIFY**: Rigorous QA (aesthetics, accessibility, performance, edge cases).
6. **DELIVER**: Complete handoff with knowledge transfer.

**No phase can be skipped. No code is written without user confirmation.**

---

## 13. Summary: The Non-Negotiables

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

Built from the ground up to be a digital installation, not a generic portfolio. Every line of code serves the "Engineered Soul" thesis.
