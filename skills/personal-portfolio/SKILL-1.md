---
name: personal-portfolio
description: >
  Build a Tactile Brutalist + High-End Editorial personal portfolio SPA using
  React 19, TypeScript 6 strict, Vite 6, and Tailwind CSS v4. Covers the complete
  lifecycle from project scaffold to shipping a type-safe, WCAG AAA-compliant,
  component-driven digital installation with kinetic typography, hash-based routing,
  import.meta.glob content ingestion, and dual-theme (night/day) design system.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
license: MIT
version: 1.0.0
---

# Personal Portfolio — Tactile Brutalist + High-End Editorial Skill

Build a Tactile Brutalist + High-End Editorial personal portfolio SPA using React 19, TypeScript 6 strict, Vite 6, and Tailwind CSS v4. Covers the complete lifecycle from project scaffold to shipping a type-safe, WCAG AAA-compliant, component-driven digital installation with kinetic typography, hash-based routing, import.meta.glob content ingestion, and dual-theme (night/day) design system.

> **One-Shot Prevention:** Every section in this skill was extracted from a real build cycle that migrated a 1265-line JSX + 4411-line CSS monolith into a clean, component-driven TypeScript + Tailwind v4 codebase. Skipping any section creates rework. Follow the full checklist in section 11 before claiming completion.

---

## Skill Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | React | ^19.0 | Concurrent features, StrictMode |
| Language | TypeScript | ^6.0 | Strict, `erasableSyntaxOnly`, no `any` |
| Build Tool | Vite | ^6.3 | HMR, production bundling, `import.meta.glob` |
| Styling | Tailwind CSS | ^4.1 | CSS-first `@theme`, no config file, `@tailwindcss/vite` plugin |
| Routing | Hash-based | Custom | `useRouteHash` hook, no library dependency |
| Fonts | Google Fonts | N/A | Cormorant Garamond, IBM Plex Mono, Inter |
| Package Manager | pnpm | Latest | Workspace support, strict resolution |
| Content | Markdown + Images | `import.meta.glob` | File-system-based content ingestion |
| State | React useState | Built-in | Lifted to App.tsx, no external state library |

---

## 1. Project Identity & Design Philosophy

### The Dual-Thesis: Tactile Brutalism + High-End Editorial

This portfolio sits at the intersection of two design philosophies that create deliberate visual tension:

**Tactile Brutalism** — Structure is visible, honest, and unapologetic:
- 1px borders on every interactive element
- `border-radius: 0px` as the default (`--radius-brutal: 0px`)
- A visible 28px grid as the background pattern
- Mono-spaced utility typography for metadata and labels
- No decoration without function

**High-End Editorial** — The soul beneath the structure:
- Cormorant Garamond serif for headlines (cinematic, editorial)
- Extreme whitespace (`--spacing-section: 104px`)
- `text-wrap: balance` on all headlines
- Cinematic motion: calm 900ms fades, subtle light-sheet animations
- Accent colors assigned per creative category

The synthesis: **Engineered Soul** — the cold precision of brutalism carrying the warmth of editorial craft.

### Mandatory Six-Phase Workflow

Every change to this codebase MUST follow:

1. **ANALYZE** — Read existing code, understand the data flow, trace the component tree
2. **PLAN** — Write down every file change before touching code
3. **VALIDATE** — Present the plan for review before implementing
4. **IMPLEMENT** — Write code following the patterns in this document
5. **VERIFY** — Run `pnpm typecheck && pnpm build` after every change
6. **DELIVER** — Confirm zero errors, zero warnings, and visual QA

### Design Rules That Must Never Be Broken

| Rule | Rationale |
|---|---|
| `border-radius: 0px` default | Brutalist identity; only `.radius-soft` (8px) and `.radius-pill` (999px) for specific elements |
| 1px borders on all interactive elements | Tactile feel; users sense clickable boundaries |
| No template aesthetics | Every visual decision must be intentional, not copied from component libraries |
| Serif for emotion, mono for data, sans for body | Three-tier typography hierarchy is non-negotiable |
| Visible 28px grid background | The grid IS the design; it shows the mathematical backbone |
| `prefers-reduced-motion: reduce` must kill ALL animation | WCAG AAA compliance; no exceptions |
| No `any` in TypeScript | `strict: true` + `noUncheckedIndexedAccess` enforced |

---

## 2. Tech Stack & Environment

### Exact Versions

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.4.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^6.0.0",
    "vite": "^6.3.0"
  }
}
```

### Critical: `erasableSyntaxOnly`

TypeScript 6.x introduces `erasableSyntaxOnly: true` which rejects:
- `enum` declarations (use union types: `'mail' | 'linkedin' | 'github'`)
- `namespace` declarations (use ES modules)
- Parameter properties in constructors

This flag is **non-negotiable** in this project. Every type must be erasable at build time. If you need a union of string values, define it as a type alias or use `as const` objects.

### Critical: `noUncheckedIndexedAccess`

This compiler option makes array/object index access return `T | undefined`. Every time you write `array[index]` or `obj[key]`, you MUST handle the `undefined` case. This is why you see patterns like:

```typescript
const heroSlide = heroSlides[activeHeroIndex]!;  // Non-null assertion after logical guarantee
const activePillar = pillars[activeIndex]!;       // Same pattern
```

Only use `!` when you have a logical guarantee the index is valid (e.g., `activeIndex` is bounded by `array.length`).

---

## 3. Bootstrapping & Configuration

### Step 1: Scaffold

```bash
npm create vite@latest personal-portfolio -- --template react-ts
cd personal-portfolio
```

### Step 2: Convert to pnpm

```bash
npm install -g pnpm
pnpm import              # Converts package-lock.json → pnpm-lock.yaml
rm package-lock.json     # Remove npm artifact
```

Create `pnpm-workspace.yaml`:
```yaml
packages:
  - '.'
```

### Step 3: Install dependencies

```bash
pnpm add react@^19.0.0 react-dom@^19.0.0
pnpm add -D typescript@^6.0.0 vite@^6.3.0 @vitejs/plugin-react@^4.4.0 \
  tailwindcss@^4.1.0 @tailwindcss/vite@^4.1.0 \
  @types/react@^19.0.0 @types/react-dom@^19.0.0
```

### Step 4: Configure TypeScript

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "erasableSyntaxOnly": true,
    "ignoreDeprecations": "6.0",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

Key notes:
- `ignoreDeprecations: "6.0"` — Required because TypeScript 6 deprecates `baseUrl` but the path alias still needs it
- `erasableSyntaxOnly: true` — Rejects `enum`, `namespace`, parameter properties
- `noUncheckedIndexedAccess: true` — Array/object index returns `T | undefined`

### Step 5: Configure Vite

Create `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
```

Critical: `base: './'` is required for GitHub Pages deployment (relative asset paths).

### Step 6: Configure package.json scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "typecheck": "tsc -b --noEmit"
  }
}
```

### Step 7: Update index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/ny-mark.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nicholas Yun</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  </body>
</html>
```

The Google Fonts link loads three families with specific weight ranges:
- **Cormorant Garamond**: 400, 600, 700 (editorial serif)
- **IBM Plex Mono**: 400, 500, 600 (utility monospace)
- **Inter**: 400, 500, 600, 700, 800, 900 (body sans-serif)

### Step 8: Verify

```bash
pnpm install
pnpm dev          # Must start without errors
pnpm typecheck    # Must pass with zero errors
pnpm build        # Must produce dist/ output
```

---

## 4. The Design System (Code-First)

### 4.1 Tailwind v4 @theme Block

The entire design system lives in `src/styles/index.css` as a Tailwind v4 `@theme` block. There is NO `tailwind.config.js` — Tailwind v4 uses CSS-first configuration.

```css
@import "tailwindcss";

@theme {
  /* Grid Unit — the mathematical backbone of the design */
  --unit: 28px;

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
  --spacing-grid: 28px;
  --spacing-section: 104px;

  /* Border Radius — Brutalist defaults */
  --radius-brutal: 0px;
  --radius-soft: 8px;
  --radius-pill: 999px;
}
```

### 4.2 Theme Switching Mechanism

Themes are applied via a CSS class on the root `<div>`:

```tsx
<div className={`relative min-h-screen ${isNightMode ? 'theme-night' : 'theme-day'}`}>
```

The `.theme-night` and `.theme-day` classes in `index.css` define:
- Background gradient (multi-stop linear gradient)
- Grid overlay (fixed `::before` pseudo-element with 28px grid lines)
- Default text color

**Dark theme grid**: Blue-tinted lines at `rgba(36, 87, 255, 0.04)` on a deep ink gradient
**Light theme grid**: Dark-tinted lines at `rgba(21, 21, 27, 0.05)` on a warm cream gradient

### 4.3 Light Theme Overrides in Tailwind

The light theme is applied using Tailwind's arbitrary variant syntax:

```tsx
[.theme-day_&]:text-[#15151b]
[.theme-day_&]:bg-[#fff8e8]
[.theme-day_&]:border-[rgba(21,21,27,0.1)]
```

This is the **only reliable pattern** for dual-theme support with Tailwind utility classes. The `[.theme-day_&]` selector means "when an ancestor has the `.theme-day` class, apply this style to the current element."

**Anti-Pattern**: Do NOT use CSS custom properties for light/dark switching with Tailwind. The `[.theme-day_&]` pattern is more explicit and avoids the complexity of CSS variable cascading through utility classes.

### 4.4 Typography Scale

| Class | Size | Weight | Font | Line Height | Use Case |
|---|---|---|---|---|---|
| `.type-kinetic-hero` | `clamp(4rem, 9vw, 9rem)` | 950 | Editorial | 0.82 | Hero headline only |
| `.type-editorial-h2` | `clamp(2.2rem, 4.2vw, 4.5rem)` | 700 | Editorial | 0.95 | Section headings |
| `.type-editorial-h3` | `clamp(1.35rem, 2.8vw, 2.55rem)` | 700 | Editorial | 0.98 | Sub-section heads |
| `.type-mono-util` | `0.78rem` | 500 | Utility | Default | Labels, metadata, tags |
| `.type-body` | `clamp(1rem, 1.35vw, 1.22rem)` | 400 | Body | 1.72 | Paragraphs |

### 4.5 Animations

Five keyframe animations defined in `index.css`:

| Name | Duration | Purpose |
|---|---|---|
| `sheet-drift` | 15s ease-in-out infinite | Light-sheet parallax in hero |
| `hero-stage-in` | One-shot | Hero content entrance |
| `fade-in` | One-shot | General opacity transition |
| `lattice-breathe` | Slow oscillation | Signal lattice opacity pulse |
| `float-card` | Gentle bob | Card floating effect |

All animations respect `prefers-reduced-motion: reduce` — see section 8.

### 4.6 Grain Overlay

A fixed SVG noise texture overlay at `z-index: 9999` with `pointer-events: none` and `opacity: 0.03`. The noise is an inline SVG data URI using `<feTurbulence>` filter, tiled at 256x256px. This is the "human fingerprint" — it makes digital feel analog.

### 4.7 Selection Color

```css
::selection {
  background: var(--color-accent-photo);  /* #f2b705 — warm yellow */
  color: var(--color-ink);                /* #07080d — deep dark */
}
```

---

## 5. Component Architecture & Patterns

### 5.1 Directory Structure

```
src/
├── App.tsx                    # Thin orchestrator, state lifted here
├── main.tsx                   # React entry point with StrictMode
├── vite-env.d.ts              # Vite type declarations
├── components/
│   ├── Navigation.tsx         # Sticky nav + mobile drawer + MX toggle
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
│   ├── useReducedMotion.ts    # WCAG motion preference detection
│   ├── useRouteHash.ts        # Hash-based SPA routing
│   └── useWeightedScroll.ts   # Scroll velocity → font-weight mapping
├── lib/
│   ├── types.ts               # All TypeScript interfaces
│   ├── content.ts             # import.meta.glob ingestion + parsing
│   └── data.ts                # Static data, builders, and parsers
├── styles/
│   └── index.css              # Tailwind + @theme + base + animations + grain + reduced-motion
└── content/                   # File-system content (not in src/ build)
    ├── portrait/              # Hero portrait images
    ├── portfolio/             # Portfolio project markdown + images
    └── collections/           # Collection markdown + images + PDFs
```

### 5.2 App.tsx: The Thin Orchestrator Pattern

App.tsx is the single source of truth for all application state. It lifts state up and passes it down via props. No context providers, no state management libraries.

**State owned by App.tsx:**

| State | Type | Purpose |
|---|---|---|
| `activeHeroIndex` | `number` | Which hero slide is showing |
| `isNightMode` | `boolean` | Dark/light theme toggle |
| `isMenuOpen` | `boolean` | Mobile navigation drawer |
| `isMachineOpen` | `boolean` | Machine Experience overlay |
| `routeHash` | `string` | Current URL hash (from `useRouteHash`) |

**Derived state computed in App.tsx:**

| Variable | Derivation | Purpose |
|---|---|---|
| `heroSlide` | `heroSlides[activeHeroIndex]!` | Current hero data |
| `archiveRoute` | `parseArchiveRoute(routeHash)` | Parsed hash route |
| `activeCollection` | `collectionDefinitions[archiveRoute.collectionSlug]` | Current collection |
| `activeCollectionItems` | `collectionItems.filter(...)` | Items in current collection |
| `activeCollectionItem` | `activeCollectionItems.find(...)` | Single item detail |

**Conditional rendering pattern:**

```tsx
<main id="main-content">
  {activeCollection ? (
    <ArchiveSpread collection={activeCollection} items={activeCollectionItems} activeItem={activeCollectionItem} />
  ) : (
    <>
      <HeroKinetic ... />
      <AboutFlow ... />
      <BentoGrid ... />
      <ContactSection />
    </>
  )}
</main>
```

This is a simple two-state router: either the user is viewing a collection/archive page, or they are on the home page.

### 5.3 HeroKinetic: The Signature Moment

This is the most complex component. It implements:

1. **Pointer-tracking parallax** — CSS custom properties `--mx`, `--my`, `--dx`, `--dy`, `--tiltX`, `--tiltY` are set on `onPointerMove` and applied via inline styles
2. **Light-sheet animations** — Two gradient-colored divs that float and drift behind the content
3. **Portrait slideshow** — Rotates through three hero slides with 10s auto-rotation
4. **Brutalist portrait frame** — Outer container with border + inner stroke border
5. **Fallback for broken images** — "NY" monogram shown when portrait fails to load
6. **Navigation dots** — Active dot stretches wide and takes accent color

**Key pattern: Portrait image resolution**

```typescript
const getPortraitForKey = (key: string): string => {
  const preferredImage = Object.entries(portraitImages).find(([path]) =>
    path.includes(`/portrait/${key}/`),
  );
  const fallbackImage = Object.entries(portraitImages).find(
    ([path]) => !path.replace('./content/portrait/', '').includes('/'),
  );
  return preferredImage?.[1] || fallbackImage?.[1] || '/nicholas-portrait.jpg';
};
```

This searches `portraitImages` (from `import.meta.glob`) for an image in a subfolder matching the slide's `portraitKey`. Falls back to a root-level portrait, then to a static path.

**Key pattern: CSS custom properties for dynamic theming**

```tsx
style={{
  '--slide-accent': slide.accent,
  '--slide-alt': slide.secondaryAccent,
  ...pointerVars,
} as React.CSSProperties}
```

Each hero slide injects its own accent colors as CSS variables. These are then used in `color-mix()` expressions in the light-sheet gradients.

**Key pattern: `color-mix()` for dynamic gradients**

```css
background: linear-gradient(90deg, transparent,
  color-mix(in srgb, var(--slide-accent) 74%, transparent),
  color-mix(in srgb, var(--slide-alt) 68%, transparent), transparent);
```

The `color-mix()` CSS function creates tinted versions of the accent colors without needing to pre-compute opacity variants.

### 5.4 BentoGrid + BentoTile: Category Texture

The Bento grid uses a 3-column layout (2 on tablet, 1 on mobile) where each tile gets a **category-specific typographic texture**:

```typescript
const categoryTexture: Record<string, string> = {
  'Creative Tech': 'font-[family-name:var(--font-utility)]',
  'Design': '',
  'Poetry': 'font-[family-name:var(--font-editorial)]',
  'Photography': '',
  'Art': 'font-[family-name:var(--font-utility)]',
  'Storytelling': 'font-[family-name:var(--font-editorial)]',
  'Code': 'font-[family-name:var(--font-utility)]',
  'Writing': 'font-[family-name:var(--font-editorial)]',
  'Experiments': 'font-[family-name:var(--font-utility)]',
};
```

This maps creative categories to font families, giving each tile a distinct typographic identity. Code and tech use mono, poetry and writing use serif, design and photography use default sans.

**Accent color injection via CSS variable:**

```tsx
style={{ '--project-accent': project.accent } as React.CSSProperties}
```

Each tile injects its project's accent color, used for:
- The top accent bar (`bg-[linear-gradient(90deg,var(--project-accent),transparent_78%)]`)
- Category label color (`text-[color-mix(in_srgb,var(--project-accent)_72%,white)]`)
- Link underline color (`borderColor: 'var(--project-accent)'`)
- Hover state link color (`group-hover:text-[var(--project-accent)]`)

### 5.5 AboutFlow: The Stable Height Swap

The about section uses a "sizer pattern" to maintain stable height during pillar transitions:

1. A hidden sizer `<div>` with `visibility-hidden pointer-events-none` renders ALL pillar content stacked in `grid-area-[1/1]` (same grid cell)
2. The visible content fades opacity to 0, swaps the pillar data, then fades back to 1
3. The sizer ensures the container never collapses during the transition

**Fade transition flow:**
```
User clicks pillar button
  → If prefersReduced: instant swap (no animation)
  → Else:
    1. Clear any existing timer
    2. Set isVisible = false (opacity transitions to 0 over 900ms)
    3. After 900ms timeout:
       a. Set activeIndex to new pillar
       b. Set isVisible = true (opacity transitions to 1)
```

The `ABOUT_FADE_DURATION = 900` constant controls the calm pace. This is intentional "slow UX" — the delay creates editorial gravity.

### 5.6 ArchiveSpread: Dual-View Router

This component renders two distinct views based on whether an individual item is selected:

- **Collection view**: 3-column grid of item cards with image-first layout
- **Item detail view**: Single article with image, content body, and link

Both views share the collection header with back navigation.

**Key pattern: Accent color for collection**

```tsx
style={{ '--archive-accent': collection.accent } as React.CSSProperties}
```

Like BentoTile, each collection injects its accent color for consistent theming.

### 5.7 ContentBody: Category-Aware Rendering

The ContentBody component renders item body text differently based on collection type:

- **Poetry**: Uses `<pre>` with `whitespace-pre-wrap` to preserve line breaks and spacing
- **Everything else**: Splits on double-newlines into `<p>` paragraphs

```typescript
if (item.collectionSlug === 'poetry') {
  return <pre className="...whitespace-pre-wrap">{item.body}</pre>;
}
return (
  <div>
    {item.body.split(/\n\s*\n/).map((paragraph) => (
      <p key={paragraph} className="...">{paragraph}</p>
    ))}
  </div>
);
```

### 5.8 Navigation: Sticky Header + Mobile Drawer

The navigation is a fixed header with two states:

**Desktop (760px+):** Horizontal nav links, theme toggle, MX button
**Mobile (<760px):** Hamburger button → slide-in drawer from right

The mobile drawer uses:
- `aria-hidden` toggled based on `isMenuOpen`
- `aria-controls="mobile-navigation"` on the hamburger button
- `aria-expanded={isMenuOpen}` for screen reader state
- Body scroll lock via `document.body.style.overflow = 'hidden'`
- `translate-x-[105%]` for off-screen positioning
- Backdrop overlay with `pointer-events-none` when closed

### 5.9 MachineOverlay: Terminal Aesthetic

The Machine Experience (MX) overlay is a diagnostic panel with:
- Fixed position, full viewport coverage, `z-50`
- `role="dialog"` with `aria-label`
- Green-on-black terminal aesthetic (`#4dff4d` text on `rgba(0,20,0,0.92)` background)
- `font-[family-name:var(--font-utility)]` for mono spacing
- JSON.stringify for raw data display

The MX button in the nav is labeled "MX" and styled as a mono-font pill button.

---

## 6. Custom Hooks Deep Dive

### 6.1 useRouteHash: Hash-Based SPA Routing

```typescript
export function useRouteHash(): string {
  const [hash, setHash] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash : '',
  );

  useEffect(() => {
    const syncRoute = () => { setHash(window.location.hash); };
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  return hash;
}
```

**Why custom hook instead of a router library?**
- The project only needs hash-based navigation (no server-side routing)
- No nested routes, no route params beyond `#/collections/:slug/:item`
- Keeping it minimal avoids dependency bloat

**Critical: SSR guard** — The `typeof window !== 'undefined'` check prevents crashes during server-side rendering scenarios.

**How it connects:** The hash is parsed by `parseArchiveRoute()` in `data.ts`:

```typescript
const parseArchiveRoute = (hash: string) => {
  const match = hash.match(/^#\/(?:archive|collections)\/([^/]+)(?:\/([^/]+))?/);
  if (!match?.[1]) return null;
  return { collectionSlug: match[1], itemSlug: match[2] ?? null };
};
```

This supports two route patterns:
- `#/collections/poetry` — Collection list view
- `#/collections/poetry/anger` — Individual item detail view
- `#/archive/poetry` — Legacy alias (same as collections)

### 6.2 useWeightedScroll: Scroll Velocity → Font Weight

```typescript
export function useWeightedScroll(): WeightedScrollState {
  // Returns: { velocity, direction, fontWeight }
  // fontWeight maps: fast scroll = thin (200), slow = heavy (950)
  // Formula: fontWeight = 950 - min(velocity, 3) * 250
}
```

**How it works:**
1. On each scroll event (throttled via `requestAnimationFrame`), compute velocity as `|deltaY / elapsed|` pixels per millisecond
2. Clamp velocity to max 3.0
3. Map velocity to font-weight: `Math.round(950 - clampedVelocity * 250)` → range [200, 950]
4. Store `_timestamp` and `_scrollY` as hidden state properties for delta calculation

**Why `requestAnimationFrame` throttling?** Scroll events fire at 60-120Hz. Without throttling, `setState` would be called on every event, causing excessive re-renders. The `ticking` flag ensures only one `requestAnimationFrame` callback is pending at a time.

**Why store `_timestamp` and `_scrollY` in state?** They need to persist between scroll events for delta calculation. Using `useRef` would not trigger re-renders; using separate `useState` would cause double-renders. The current approach bundles them into a single `setState` call.

**TypeScript hack:** The state includes `_timestamp` and `_scrollY` as hidden properties, cast through `as WeightedScrollState & { _timestamp: number }`. These are stripped from the public return value.

### 6.3 useReducedMotion: WCAG AAA Motion Gate

```typescript
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
```

**Usage pattern:** Every component with animations checks this hook:

```tsx
const prefersReduced = useReducedMotion();

// Conditional rendering of animated elements
{!prefersReduced && <div className="animate-[sheet-drift_...]">...</div>}

// Conditional animation behavior
if (prefersReduced) {
  setActiveIndex(nextIndex);  // Instant swap, no fade
  setIsVisible(true);
  return;
}
```

---

## 7. Content Management: import.meta.glob

### 7.1 The File Structure Convention

```
src/content/
├── portrait/
│   ├── PUT_YOUR_PROFILE_PHOTO_HERE.md    # Guide file (filtered out)
│   ├── creative-technologist/
│   │   └── creative-technologist.jpg
│   ├── project-archive/
│   │   └── project-archive.jpg
│   └── open-to-collaborate/
│       └── open-to-collaborate.jpg
├── portfolio/
│   ├── code/
│   │   └── news-aggregator.md
│   ├── design/
│   │   └── website-concepts.md
│   ├── art/
│   │   └── visual-studies.md
│   ├── poetry/
│   │   └── poetry-fragments.md
│   ├── experiments/
│   │   └── curious-experiments.md
│   ├── storytelling/
│   │   └── storytelling-sketches.md
│   └── photography/
│       └── photo-notes.md
└── collections/
    ├── artworks/
    │   ├── PUT_ARTWORKS_HERE.md          # Guide file (filtered out)
    │   └── visual-study.md
    ├── design/
    │   ├── PUT_DESIGN_WORK_HERE.md
    │   └── birthday-card-experiments.md
    ├── poetry/
    │   ├── PUT_POEMS_HERE.md
    │   ├── anger.md
    │   ├── depression.md
    │   └── a-storm-of-fire-and-ice.md
    ├── stories/
    │   ├── PUT_STORIES_HERE.md
    │   ├── maudie-house-on-fire.md
    │   └── maudie-house-on-fire.pdf
    ├── photography/
    │   └── photo-note.md
    └── web-experiments/
        ├── PUT_WEBSITES_AND_EXPERIMENTS_HERE.md
        ├── onestopnews.md
        └── website-concepts.md
```

### 7.2 The Six import.meta.glob Calls

All content ingestion is in `src/lib/content.ts`:

```typescript
// Portrait images for hero slideshow
const portraitImages = import.meta.glob(
  [
    './content/portrait/*.{jpg,jpeg,png,webp,avif}',
    './content/portrait/**/*.{jpg,jpeg,png,webp,avif}',
  ],
  { eager: true, import: 'default', query: '?url' },
) as Record<string, string>;

// Portfolio markdown files
const portfolioTextFiles = import.meta.glob(
  './content/portfolio/**/*.{md,txt}',
  { eager: true, import: 'default', query: '?raw' },
) as Record<string, string>;

// Portfolio images (sibling to markdown)
const portfolioImageFiles = import.meta.glob(
  './content/portfolio/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, import: 'default', query: '?url' },
) as Record<string, string>;

// Collection markdown files
const collectionTextFiles = import.meta.glob(
  './content/collections/**/*.{md,txt}',
  { eager: true, import: 'default', query: '?raw' },
) as Record<string, string>;

// Collection images
const collectionImageFiles = import.meta.glob(
  './content/collections/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, import: 'default', query: '?url' },
) as Record<string, string>;

// Collection documents (PDFs)
const collectionDocumentFiles = import.meta.glob(
  './content/collections/**/*.pdf',
  { eager: true, import: 'default', query: '?url' },
) as Record<string, string>;
```

### 7.3 The CRITICAL import.meta.glob Path Bug

**Problem:** `import.meta.glob` paths are relative to the **source file that calls it**, NOT relative to the project root. If `content.ts` lives in `src/lib/`, then paths must start with `./content/` (relative to `src/lib/`), NOT `./src/content/`.

**Root cause:** Vite resolves glob patterns relative to the importing module's directory. Since `src/lib/content.ts` is in `src/lib/`, `./content/` resolves to `src/lib/content/`, which does NOT exist. The correct path from `src/lib/` to `src/content/` is `../content/`.

**However**, in the actual working codebase, the glob paths use `./content/` because of the `@/` alias and Vite's module resolution. The key insight: **test the glob after writing it by logging `Object.keys(portraitImages)` to the console.** If the object is empty, the path is wrong.

**Symptoms of wrong glob paths:**
- No portraits render in the hero (fallback "NY" monogram shows)
- No portfolio items appear in BentoGrid
- No collection items appear in ArchiveSpread
- All content-derived data arrays are empty

**The fix pattern:**
```typescript
// If content.ts is in src/lib/ and content is in src/content/:
const files = import.meta.glob('../content/**/*.md', { eager: true, ... });
// OR, using the @/ alias:
// This depends on Vite alias resolution — test empirically
```

**Debugging command:**
```typescript
console.log('Portrait images:', Object.keys(portraitImages));
console.log('Portfolio texts:', Object.keys(portfolioTextFiles));
// Expected: arrays of paths, NOT empty arrays
```

### 7.4 Guide File Filtering

Files named `PUT_*_HERE.md` or `readme.md` are "guide files" — placeholder instructions for content authors. They must be filtered out of display data:

```typescript
const isCollectionGuideFile = (path: string): boolean => {
  const filename = getFilenameSlug(path).toLowerCase();
  return filename === 'readme' || filename.startsWith('put_') || filename.startsWith('put-');
};
```

Usage in `buildCollectionItems`:
```typescript
const textEntries = Object.entries(collectionTextFiles).filter(
  ([path]) => !isCollectionGuideFile(path),
);
```

### 7.5 Frontmatter Parsing

A lightweight YAML-like frontmatter parser:

```typescript
const parseFrontmatter = (rawContent: string): FrontmatterResult => {
  const match = rawContent.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match?.[1]) return { body: rawContent.trim(), data: {} };

  const data = match[1].split('\n').reduce<Record<string, string>>(
    (fields, line) => {
      const separatorIndex = line.indexOf(':');
      if (separatorIndex === -1) return fields;
      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();
      if (key) fields[key] = value;
      return fields;
    },
    {},
  );

  return { body: match[2]?.trim() ?? '', data };
};
```

Supported frontmatter fields: `title`, `category`, `accent`, `description`, `status`, `medium`, `image`, `link`, `linkLabel`. All values are strings (no nested objects).

### 7.6 Sibling Image Resolution

When a markdown file and an image share the same folder and filename, they are "siblings" — the image becomes the project's or item's visual:

```typescript
const siblingImage = imageEntries.find(([imagePath]) => {
  const imageFolder = getFolderName(imagePath);
  const imageName = getFilenameSlug(imagePath);
  return imageFolder === folder && imageName === filename;
});
```

This means if you have `poetry/anger.md` and `poetry/anger.jpg`, the image is automatically associated with the poem.

### 7.7 How to Add New Content

**Adding a new portfolio project:**
1. Create `src/content/portfolio/<category>/<project-slug>.md`
2. Optionally add `src/content/portfolio/<category>/<project-slug>.jpg`
3. Frontmatter example:
   ```markdown
   ---
   title: My New Project
   category: Code
   accent: "#2457ff"
   status: Selected work
   ---
   Description of the project...
   ```

**Adding a new collection item:**
1. Create `src/content/collections/<collection-slug>/<item-slug>.md`
2. Optionally add `<item-slug>.jpg` or `<item-slug>.pdf` as siblings
3. The collection slug must match a key in `collectionDefinitions` in `data.ts`

**Adding a new collection:**
1. Add a new entry to `collectionDefinitions` in `data.ts`
2. Add a mapping in `collectionByCategory` if needed
3. Add the slug to `portfolioGatewayOrder` for BentoGrid display
4. Create `src/content/collections/<new-slug>/PUT_<NAME>_HERE.md`

---

## 8. Accessibility (WCAG AAA) Implementation

### 8.1 Skip-to-Content Link

```tsx
<a className="fixed top-3 left-3 z-20 -translate-y-[160%] p-2.5 border ...
  focus:translate-y-0"
  href="#main-content">
  Skip to main content
</a>
```

The link is positioned off-screen via `translate` and becomes visible only on focus (`focus:translate-y-0`). This is the WCAG AAA-compliant skip navigation pattern.

### 8.2 Reduced Motion: Double-Layer Defense

**Layer 1: React hook** — `useReducedMotion()` returns `true` when the user prefers reduced motion. Components use this to:
- Skip animations (instant state transitions in AboutFlow)
- Conditionally render animated elements (light sheets in HeroKinetic)

**Layer 2: CSS media query** — Global overrides in `index.css`:
```css
@media (prefers-reduced-motion: reduce) {
  .light-sheet,
  .signal-lattice span,
  .hero-stage,
  .floating-card,
  .about-panel-content,
  .about-flow-step,
  .about-flow-step::before {
    animation: none !important;
    transition: none !important;
  }

  .hero-stage,
  .hero-monogram,
  .artifact-panel,
  .studio-labels,
  .artifact-stack,
  .signal-lattice,
  .portrait-shell {
    transform: none !important;
  }
}
```

The CSS layer catches any animation that slips through the React layer.

### 8.3 Focus Visible

```css
button:focus-visible,
a:focus-visible {
  outline: 3px solid rgba(36, 87, 255, 0.35);
  outline-offset: 3px;
}
```

All interactive elements get a visible focus indicator. The 3px blue outline with 3px offset meets WCAG AAA contrast requirements.

### 8.4 Alt Text Rules

- Portraits: Always `alt="Nicholas Yun"` (never empty for meaningful images)
- Collection item images: `alt=""` (decorative — the title/description provides context)
- Social icons: `aria-hidden="true"` (decorative — label is on the parent link)
- Brand mark: `aria-hidden="true"` (decorative — label is on the parent link)

**Anti-pattern:** Never use empty `alt` on images that convey unique information not available in surrounding text.

### 8.5 ARIA Patterns

| Element | ARIA | Purpose |
|---|---|---|
| Mobile nav drawer | `aria-hidden`, `aria-controls`, `aria-expanded` | Screen reader state management |
| Hero dot navigation | `aria-pressed={index === activeIndex}`, `aria-label="Show panel N"` | Toggle button pattern |
| About pillar buttons | `aria-pressed`, `aria-controls="about-panel"` | Tab-like control |
| About content panel | `aria-live="off"` (deliberate — content changes are not announced during fade) | Prevents chatty screen reader |
| Hero slideshow content | `aria-live="polite"` | Announces slide changes after they complete |
| Machine overlay | `role="dialog"`, `aria-label` | Modal dialog pattern |
| Grain overlay | `aria-hidden="true"` | Decorative, non-interactive |
| Social link container | `aria-label="Social links"` | Groups links with label |
| Creative modes container | `aria-label="Creative mediums"` | Groups tag pills |

---

## 9. Anti-Patterns & Common Bugs

### 9.1 Rounded Corners Leaking In

**Bug:** Using Tailwind utility classes like `rounded-lg` or `rounded-full` on elements that should have `border-radius: 0px` per the brutalist design.

**Root cause:** Tailwind's `rounded-*` classes are easy to reach for by habit.

**Fix:** Only use `rounded-*` for these specific elements:
- `rounded-lg` for portrait frame, archive cards, contact email button
- `rounded-full` for social icon circles, theme toggle, footer social pills, mobile hamburger
- Everything else gets NO border-radius class (defaults to `--radius-brutal: 0px`)

**Verification:** Search for `rounded` in your codebase and validate each instance against the design system.

### 9.2 Empty Alt Text on Meaningful Images

**Bug:** Using `alt=""` on portrait images in the hero.

**Root cause:** Copying the `alt=""` pattern from collection item images.

**Fix:** Hero portraits MUST have `alt="Nicholas Yun"`. Collection item images use `alt=""` because their title/description provides context.

### 9.3 Key Stability in Map Iterations

**Bug:** Using array index as `key` in `.map()`.

**Root cause:** Habit from tutorials.

**Fix:** Always use a stable, unique identifier:
- `key={project.slug}` for BentoTile
- `key={link.label}` for social links
- `key={pillar.title}` for about pillars
- `key={item.slug}` for collection items
- `key={mode}` for creative mode tags
- `key={index}` is ONLY acceptable for hero dot navigation (fixed-length array)

### 9.4 import.meta.glob Path Resolution

**Bug:** All content arrays return empty objects.

**Root cause:** Glob paths are resolved relative to the calling module's directory, not the project root. A path like `'./src/content/**/*.md'` from `src/lib/content.ts` resolves to `src/lib/src/content/` which doesn't exist.

**Fix:** See section 7.3 for the detailed fix. Always verify by logging `Object.keys()` of each glob result.

### 9.5 TypeScript `noUncheckedIndexedAccess` Errors

**Bug:** Array index access like `heroSlides[activeIndex]` returns `HeroSlide | undefined`, causing type errors.

**Root cause:** `noUncheckedIndexedAccess: true` in tsconfig.json makes all indexed access return `T | undefined`.

**Fix:** Use non-null assertion `!` when you have a logical guarantee:
```typescript
const heroSlide = heroSlides[activeHeroIndex]!;  // Guaranteed by bounds check
const activePillar = pillars[activeIndex]!;       // Same
```

Or use conditional rendering:
```typescript
const activeItem = items.find(item => item.slug === slug) ?? null;
```

### 9.6 `erasableSyntaxOnly` Rejecting Enums

**Bug:** TypeScript build fails with `This syntax is not allowed when 'erasableSyntaxOnly' is enabled`.

**Root cause:** Using `enum` declarations, which emit runtime JavaScript code.

**Fix:** Use union types instead:
```typescript
// WRONG:
enum SocialIcon { mail, linkedin, instagram, github, wix }

// CORRECT:
icon: 'mail' | 'linkedin' | 'instagram' | 'github' | 'wix'
```

### 9.7 Light Theme Override Specificity

**Bug:** Light theme styles don't apply, or they apply incorrectly.

**Root cause:** Using incorrect selector syntax in the Tailwind arbitrary variant.

**Fix:** The correct pattern is `[.theme-day_&]:` (the `_` is Tailwind's space replacement, `&` is the current element selector). Common mistakes:
- `[.theme-day]:` — Missing the `&` (applies to .theme-day itself, not descendants)
- `[.theme-day &]:` — Space instead of underscore (Tailwind parses the space differently)
- `[data-theme=day]:` — Wrong selector entirely

### 9.8 Body Scroll Lock Not Cleaning Up

**Bug:** After closing the mobile menu, the page remains unscrollable.

**Root cause:** The `useEffect` cleanup for `document.body.style.overflow` is not returning properly.

**Fix:** The correct pattern:
```typescript
useEffect(() => {
  document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  return () => {
    document.body.style.overflow = '';  // Always clean up on unmount
  };
}, [isMenuOpen]);
```

### 9.9 Color Values Not Matching Design Tokens

**Bug:** Inline color values like `text-white/72` or `text-[rgba(21,21,27,0.72)]` that don't match any design token.

**Root cause:** Tailwind v4's opacity modifiers (`/72`) use percentage opacity, while design tokens use explicit `rgba()` values.

**Fix:** This is actually correct — the light theme needs different opacity values than the dark theme, so inline overrides are necessary. The pattern `[.theme-day_&]:text-[rgba(21,21,27,0.72)]` is the standard way to override text color for light mode.

---

## 10. Debugging Guide

### 10.1 Broken Images (Portraits, Collection Items)

**Symptom:** Fallback "NY" monogram shows instead of portrait images.

**Debug steps:**
1. Open browser DevTools → Network tab → filter by image
2. Check if the image URL is valid (should be a Vite-processed path like `/src/content/portrait/creative-technologist/creative-technologist.jpg`)
3. In `content.ts`, add: `console.log('Portrait images:', Object.keys(portraitImages));`
4. If the object is empty, the glob path is wrong (see section 7.3)
5. If the URL is wrong, check the `getPortraitForKey()` function logic
6. Check the `onError` handler on the `<img>` element — it should set `hasPortraitError`

### 10.2 TypeScript Errors

**Symptom:** `pnpm typecheck` fails with errors.

**Common error patterns and fixes:**

| Error | Fix |
|---|---|
| `Object is possibly 'undefined'` | Add `!` non-null assertion or null check |
| `This syntax is not allowed when 'erasableSyntaxOnly'` | Replace `enum` with union type |
| `Parameter 'x' implicitly has an 'any' type` | Add explicit type annotation |
| `Cannot find module '@/lib/types'` | Verify `@/` path alias in tsconfig.json and vite.config.ts |
| `Type 'string' is not assignable to type ...` | Use `as const` or explicit type assertion |

### 10.3 Build Failures

**Symptom:** `pnpm build` fails.

**Debug steps:**
1. Run `pnpm typecheck` first — most build failures are type errors
2. Check `vite.config.ts` for correct `base: './'` (GitHub Pages requirement)
3. Verify `@tailwindcss/vite` plugin is in the plugins array
4. Check that `src/styles/index.css` starts with `@import "tailwindcss";`
5. Verify `tsconfig.json` has `noEmit: true` (Vite handles emit)

### 10.4 Content Not Appearing

**Symptom:** BentoGrid or ArchiveSpread shows no items.

**Debug steps:**
1. Log `Object.keys(portfolioTextFiles)` and `Object.keys(collectionTextFiles)` in `content.ts`
2. If empty, check glob path patterns (see section 7.3)
3. If paths are correct but content is still empty, verify markdown files exist in the correct directories
4. Check `isCollectionGuideFile()` — it might be filtering out your content file
5. Verify the `collectionDefinitions` keys match the actual folder names in `src/content/collections/`

### 10.5 Theme Toggle Not Working

**Symptom:** Clicking the day/night toggle has no visual effect.

**Debug steps:**
1. Check that the root `<div>` has `theme-night` or `theme-day` class
2. Verify `[.theme-day_&]` overrides are present on child elements
3. Check that `isNightMode` state is being toggled in App.tsx
4. Verify the `onThemeToggle` prop is passed correctly through Navigation → ThemeToggle

### 10.6 Mobile Menu Not Closing

**Symptom:** Mobile drawer opens but won't close, or backdrop stays visible.

**Debug steps:**
1. Check that `onMenuToggle` is called on both the backdrop click and close button
2. Verify `isMenuOpen` state is being set to `false`
3. Check the `translate-x-[105%]` class is applied when `isMenuOpen` is false
4. Verify `pointer-events-none` is applied to backdrop when menu is closed
5. Check `document.body.style.overflow` is being cleaned up (section 9.8)

---

## 11. Pre-Ship Checklist

Run EVERY item before claiming completion. No exceptions.

### Build Verification

```bash
# Must pass with ZERO errors
pnpm typecheck

# Must produce dist/ output with ZERO errors
pnpm build

# Verify build output sizes are reasonable
# Expected: ~82 kB CSS, ~240 kB JS (gzipped: ~15 kB + ~73 kB)
ls -la dist/assets/
```

### Type Safety

- [ ] `pnpm typecheck` passes with zero errors
- [ ] No `any` types anywhere in the codebase
- [ ] No `enum` declarations (union types only)
- [ ] All array index access handled for `undefined`
- [ ] All `import type` used for type-only imports
- [ ] `erasableSyntaxOnly: true` in tsconfig.json

### Accessibility

- [ ] Skip-to-content link present and functional
- [ ] All images have appropriate alt text (not empty for meaningful images)
- [ ] All interactive elements have focus-visible styles
- [ ] `prefers-reduced-motion: reduce` disables ALL animations
- [ ] ARIA attributes present on mobile drawer, hero dots, about buttons, machine overlay
- [ ] Color contrast meets WCAG AAA (4.5:1 for normal text, 3:1 for large text)
- [ ] No auto-playing media without user control

### Responsive Design

Verify at these breakpoints:

| Width | Expected Layout |
|---|---|
| 360px | Single column, compact spacing, mobile drawer |
| 430px | Single column, slightly more spacing |
| 620px | Single/two-column hybrid |
| 760px | Mobile breakpoint — drawer nav appears, grid adjusts |
| 900px | Two-column layouts begin, desktop nav visible |
| 1200px | Full desktop layout with max-width containers |
| 1536px | Content centered with max-w-[1320px] |

### Content Integrity

- [ ] All three hero slides render with correct portraits
- [ ] About section shows all three pillars with correct fade transitions
- [ ] BentoGrid shows all six collection gateways
- [ ] Collection pages show all items from `src/content/collections/`
- [ ] Individual item detail pages render body text and images
- [ ] Poetry items preserve line breaks (whitespace-pre-wrap)
- [ ] Empty collections show graceful empty state

### Functional Verification

- [ ] Hash navigation works: `#/collections/poetry`, `#/collections/poetry/anger`
- [ ] Back navigation in ArchiveSpread returns to correct parent
- [ ] Theme toggle switches all visual elements between night/day
- [ ] Mobile menu opens/closes properly with body scroll lock
- [ ] Machine overlay (MX) shows real data and closes on button click
- [ ] Hero auto-rotation cycles every 10 seconds
- [ ] Hero navigation dots and arrows work
- [ ] All social links have valid hrefs
- [ ] Grain overlay is visible (opacity 0.03 — look for subtle noise)

---

## 12. Lessons Learnt & How to Avoid Them

### 12.1 The Monolith Trap

**Lesson:** Starting with a single-file approach (1265-line JSX + 4411-line CSS) creates unmaintainable code. The CSS had multiple override layers — each new feature was styled by overriding previous styles rather than building from a system.

**Avoidance:** Always start with a component architecture and a design system. Define your tokens first, then build components that consume those tokens. Never style by override.

### 12.2 CSS-First Design System vs. Config File

**Lesson:** Tailwind v4's CSS-first `@theme` approach is superior to the old `tailwind.config.js` pattern for this project because:
- The design system lives in CSS where designers can read it
- Changes to tokens are immediately reflected in utility classes
- No JavaScript configuration file to maintain
- The `@theme` block IS the documentation

**Avoidance:** Never create a `tailwind.config.js` for Tailwind v4 projects. Use `@theme` in your main CSS file.

### 12.3 Eager vs. Lazy import.meta.glob

**Lesson:** Using `eager: true` for all content ingestion means all markdown and images are bundled at build time. This is appropriate for a portfolio with limited content (~20 files, ~4MB of images). For a site with hundreds of content items, consider lazy loading with `import.meta.glob('./content/**/*.md', { eager: false })` and loading on demand.

**Avoidance:** For this project size, eager is correct. For larger content sites, switch to lazy and add loading states.

### 12.4 State Lifting vs. Context vs. State Library

**Lesson:** The portfolio has only 5 pieces of state, all lifted to App.tsx. No context, no Redux, no Zustand. This is the right call — adding a state management library for 5 booleans/numbers would be over-engineering.

**Avoidance:** Only introduce context or state libraries when prop drilling becomes genuinely painful (typically 3+ levels of drilling for 5+ props). This project's max drilling depth is 2 levels (App → Navigation → ThemeToggle).

### 12.5 The `satisfies` Operator

**Lesson:** Using `satisfies Project` on object literals catches typos and missing fields at compile time without widening the type:

```typescript
return {
  accent: '...',
  title: '...',
  // ...
} satisfies Project;  // Catches missing/extra fields
```

**Avoidance:** Always use `satisfies` when constructing typed objects, especially in builder functions like `buildPortfolioProjects`.

### 12.6 Frontmatter Parser Limitations

**Lesson:** The custom frontmatter parser only supports flat `key: value` pairs. No nested objects, no arrays, no quoted strings. This is sufficient for this project but would fail for complex data structures.

**Avoidance:** If you need complex frontmatter, use a proper YAML parser (e.g., `js-yaml`). For this project, keep it simple.

---

## 13. Pitfalls to Avoid

### 13.1 Don't Add a Router Library

The project uses hash-based routing with a 30-line custom hook. Adding React Router or TanStack Router would:
- Add 30KB+ to the bundle
- Require route configuration files
- Over-engineer a simple two-state navigation (home vs. archive)

### 13.2 Don't Use CSS Modules

CSS Modules would conflict with the Tailwind utility-first approach. The `[.theme-day_&]` pattern for theme switching requires global class names, not scoped module references.

### 13.3 Don't Break the Grid

The 28px grid is not decorative — it IS the design. Every spacing decision should align to the 28px unit or a multiple thereof. Using arbitrary pixel values like `padding: 13px` breaks the mathematical backbone.

### 13.4 Don't Use `!important` in Components

The only `!important` usage should be in the global `@media (prefers-reduced-motion: reduce)` block. If you find yourself needing `!important` in a component, you have a specificity problem — fix the root cause.

### 13.5 Don't Pre-Optimize Images

The current approach uses `import.meta.glob` with `query: '?url'` which lets Vite handle image optimization at build time. Don't add manual image optimization libraries — Vite's built-in asset handling is sufficient.

### 13.6 Don't Mix Font Family References

Always use `var(--font-editorial)`, `var(--font-utility)`, `var(--font-body)` through Tailwind's `font-[family-name:var(--font-*)]` syntax. Never hard-code `'Cormorant Garamond'` directly in a component — if the font ever changes, you'd need to update every component instead of one CSS variable.

### 13.7 Don't Forget the SSR Guard

Always check `typeof window !== 'undefined'` before accessing browser APIs:
- `window.location.hash`
- `window.matchMedia()`
- `window.scrollY`
- `document.body.style`

This prevents crashes in SSR or build-time rendering scenarios.

---

## 14. Best Practices

### 14.1 Component Naming Convention

- PascalCase for components: `HeroKinetic`, `BentoTile`, `ArchiveSpread`
- camelCase for hooks: `useRouteHash`, `useReducedMotion`, `useWeightedScroll`
- camelCase for utility functions: `parseFrontmatter`, `getFilenameSlug`, `toTitleCase`
- kebab-case for content files: `birthday-card-experiments.md`, `a-storm-of-fire-and-ice.md`

### 14.2 File Organization

- One component per file
- File name matches the exported component name
- Hooks live in `src/hooks/`
- Shared types live in `src/lib/types.ts`
- Content parsing logic lives in `src/lib/content.ts`
- Static data and builders live in `src/lib/data.ts`
- Styles live in `src/styles/index.css` (single file for this project scale)

### 14.3 Prop Interface Pattern

Every component defines its props as an interface at the top of the file:

```typescript
interface HeroKineticProps {
  slide: HeroSlide;
  activeIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}
```

Exported components use destructured props:

```typescript
export function HeroKinetic({ slide, activeIndex, totalSlides, onPrev, onNext, onDotClick }: HeroKineticProps) {
```

### 14.4 Conditional Rendering Pattern

Prefer ternary for two-state rendering:

```tsx
{activeCollection ? <ArchiveSpread ... /> : <HomePageSections />}
```

Prefer `&&` for optional rendering:

```tsx
{project.medium ? <p>{project.medium}</p> : null}
{hasPortraitError && <FallbackMonogram />}
```

Never render `undefined` or `null` from a conditional — always be explicit with `: null`.

### 14.5 Style Composition Pattern

Combine Tailwind utilities with CSS custom properties for dynamic theming:

```tsx
className="text-white/78 [.theme-day_&]:text-[rgba(21,21,27,0.72)]"
style={{ '--project-accent': project.accent } as React.CSSProperties}
```

The `className` handles static and theme-switching styles. The `style` prop injects per-instance dynamic values via CSS variables.

### 14.6 Accessibility-First Component Construction

Build accessibility in from the start, not as an afterthought:
1. Every interactive element needs `type="button"` (prevents form submission)
2. Every navigation control needs `aria-label`
3. Every state toggle needs `aria-pressed` or `aria-expanded`
4. Every decorative element needs `aria-hidden="true"`
5. Every region needs a label (`aria-label` or visible heading)

### 14.7 The `as React.CSSProperties` Cast

When setting CSS custom properties via the `style` prop, TypeScript doesn't know about your custom properties. The cast is required:

```tsx
style={{ '--slide-accent': slide.accent } as React.CSSProperties}
```

Without the cast, TypeScript will error: `Object literal may only specify known properties`.

---

## 15. Coding Patterns

### 15.1 Builder Function Pattern

Complex data structures are built via functions that compose `import.meta.glob` results:

```typescript
const buildPortfolioProjects = (): Project[] => {
  const imageEntries = Object.entries(portfolioImageFiles);
  return Object.entries(portfolioTextFiles)
    .map(([path, rawContent]) => {
      // Parse, match siblings, construct Project
      return { ... } satisfies Project;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
};
```

This pattern:
- Separates data construction from component rendering
- Makes the data pipeline testable
- Ensures consistent sorting

### 15.2 Accent Color Injection Pattern

Each component that needs per-item theming injects the accent color as a CSS variable:

```tsx
// In the parent:
style={{ '--project-accent': project.accent } as React.CSSProperties}

// In the child's className:
bg-[linear-gradient(90deg,var(--project-accent),transparent_78%)]
text-[color-mix(in_srgb,var(--project-accent)_72%,white)]
```

This allows a single component template to render with different accent colors without conditional className logic.

### 15.3 Conditional Texture Class Pattern

```typescript
const categoryTexture: Record<string, string> = { ... };
const textureClass = categoryTexture[project.category] ?? '';
```

This maps categories to typographic textures (font families) using a simple lookup table. The empty string fallback means "use default body font."

### 15.4 Image Error Fallback Pattern

```tsx
const [hasPortraitError, setHasPortraitError] = useState(false);

useEffect(() => { setHasPortraitError(false); }, [currentPortraitImage]);

<img onError={() => setHasPortraitError(true)} src={currentPortraitImage} />
{hasPortraitError && <FallbackContent />}
```

Reset the error state when the image source changes (e.g., hero slide rotation), and show fallback content only when the image fails to load.

---

## 16. Coding Anti-Patterns

### 16.1 Anti-Pattern: CSS-in-JS

Do NOT use styled-components, Emotion, or any CSS-in-JS library. This project uses Tailwind CSS v4 with a CSS-first configuration. Adding CSS-in-JS would:
- Conflict with the `@theme` system
- Break the `[.theme-day_&]` pattern
- Add unnecessary runtime overhead
- Duplicate the styling system

### 16.2 Anti-Pattern: Global CSS Class Overrides

Do NOT write CSS like `.some-class { color: red !important; }`. All styling should go through:
1. Tailwind utility classes
2. The `@theme` design tokens
3. Component-scoped `className` composition

### 16.3 Anti-Pattern: Prop Drilling More Than 2 Levels

If you find yourself passing a prop through 3+ component layers, either:
- Lift the state closer to where it's needed
- Create a React Context for that specific state
- Restructure the component tree

Currently, the maximum prop drilling depth is 2 (App → Navigation → ThemeToggle), which is acceptable.

### 16.4 Anti-Pattern: Conditional className Concatenation Without Template Literals

```typescript
// BAD — string concatenation is error-prone
className={"base-class " + (isActive ? "active" : "inactive")}

// GOOD — template literals are explicit
className={`base-class ${isActive ? 'active' : 'inactive'}`}
```

### 16.5 Anti-Pattern: Ignoring the `satisfies` Operator

When constructing typed objects, always use `satisfies`:

```typescript
// BAD — no compile-time validation
return { accent, title, description, ... };

// GOOD — validates shape at compile time
return { accent, title, description, ... } satisfies Project;
```

### 16.6 Anti-Pattern: Using `useEffect` for Derived State

If a value can be computed from existing state or props, compute it inline — don't put it in a `useEffect`:

```typescript
// BAD — unnecessary state + effect
const [activeSlide, setActiveSlide] = useState(null);
useEffect(() => { setActiveSlide(heroSlides[activeHeroIndex]); }, [activeHeroIndex]);

// GOOD — compute inline
const heroSlide = heroSlides[activeHeroIndex]!;
```

---

## 17. Responsive Breakpoint Reference

The project uses these breakpoints consistently throughout all components:

| Breakpoint | Tailwind Prefix | What Changes |
|---|---|---|
| 360px | `max-[360px]` | Single column grid in BentoGrid |
| 430px | `max-[430px]` | Hero CTA buttons stack vertically |
| 620px | `max-[620px]` | ArchiveSpread goes single column, hero portrait no padding |
| 760px | `max-[760px]` | **Major mobile breakpoint** — mobile drawer appears, reduced spacing, compact type scale |
| 900px | `max-[900px]` | Two-column → single column layouts, hero goes single column |

The 760px breakpoint is the primary mobile/desktop dividing line. Below 760px:
- Desktop navigation hides (`hidden max-[760px]:hidden`)
- Mobile hamburger shows (`hidden max-[760px]:inline-flex`)
- Hero grid goes single column
- About section goes single column with horizontal pillar tabs
- BentoGrid goes 2-column then 1-column
- Padding reduces from `px-12` to `px-5`
- Section padding reduces from `pt-26 pb-26` to `pt-14 pb-14`

---

## 18. Z-Index Layer Map

| Layer | Z-Index | Element |
|---|---|---|
| Grid background | 0 | `::before` pseudo on theme classes |
| Hero content | 1 | `z-1` class on hero main content |
| Hero prev/next buttons | 2 | `z-2` on navigation arrows |
| Skip-to-content link | 20 | `z-20` |
| Sticky navigation | 30 | `z-30` on header |
| Mobile backdrop | 35 | `z-35` |
| Mobile drawer | 40 | `z-40` on aside |
| Machine overlay | 50 | `z-50` on dialog |
| Grain overlay | 9999 | `z-[9999]` on grain div |

Never use z-index values outside this map without updating it. The grain overlay must always be on top (but with `pointer-events: none`).

---

## 19. Color Reference (Complete)

### Dark Theme

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#07080d` | Deepest background |
| `--color-ink-light` | `#15151b` | Lighter ink variant |
| `--color-surface` | `#11131d` | Card backgrounds |
| `--color-surface-elevated` | `#1a1c2e` | Elevated surfaces |
| `--color-text` | `#ffffff` | Primary text |
| `--color-text-secondary` | `rgba(255,255,255,0.68)` | Secondary text |
| `--color-text-muted` | `rgba(255,255,255,0.52)` | Muted text |
| `--color-text-faint` | `rgba(255,255,255,0.38)` | Faint/hint text |
| `--color-border` | `rgba(255,255,255,0.13)` | Default borders |
| `--color-border-strong` | `rgba(255,255,255,0.24)` | Emphasized borders |
| `--color-border-accent` | `rgba(255,255,255,0.18)` | Accent borders |

### Light Theme

| Token | Value | Use |
|---|---|---|
| `--color-day-bg` | `#fff8e8` | Warm cream background |
| `--color-day-surface` | `#ffffff` | White surfaces |
| `--color-day-text` | `#15151b` | Primary text |
| `--color-day-text-secondary` | `rgba(21,21,27,0.64)` | Secondary text |
| `--color-day-border` | `rgba(21,21,27,0.1)` | Default borders |
| `--color-day-border-strong` | `rgba(21,21,27,0.18)` | Emphasized borders |

### Category Accents

| Category | Hex | Tailwind Override in Light Mode |
|---|---|---|
| Code | `#2457ff` | `text-[color-mix(in_srgb,var(--project-accent)_70%,#15151b)]` |
| Design | `#ff5c35` | Same pattern |
| Art | `#00a77f` | Same pattern |
| Photography | `#f2b705` | Same pattern |
| Poetry | `#8f55ff` | Same pattern |
| Storytelling | `#e5488b` | Same pattern |
| Experiments | `#16a3b8` | Same pattern (default fallback) |

### Section Labels

| Section | Dark Mode Color | Light Mode Color |
|---|---|---|
| "About" / "Portfolio" / "Contact" label | `text-[#bffcf0]` | `[.theme-day_&]:text-[#c25b3d]` |

These are the mono-spaced section labels above each heading — mint green in dark mode, warm coral in light mode.

---

## 20. The Complete TypeScript Interface Reference

All interfaces live in `src/lib/types.ts`:

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
  activeData: unknown;
}
```

Key design decisions:
- `Project` and `CollectionItem` share most fields via `extends Project`
- `image`, `link`, `body`, `medium`, `document` are optional (`?`) — not all items have them
- `SocialLink.icon` uses a union type (not enum) because of `erasableSyntaxOnly`
- `MachineOverlayData.activeData` is `unknown` (not `any`) — it could be any shape depending on the current route
- `ArchiveRoute.itemSlug` is `string | null` — null when viewing a collection list, string when viewing an item
