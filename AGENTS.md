# AGENTS.md: Nicholas Yun Portfolio (v2.0)

This document provides high-signal context for AI agents working in this repository to avoid common mistakes and architectural regressions.

## Critical Commands
| Command | Purpose |
| :--- | :--- |
| `pnpm dev` | Starts Vite 6 dev server. |
| `pnpm typecheck` | **Mandatory** before any code changes. Uses TS 6 strict mode. |
| `pnpm build` | Production build. Verify after styling changes. |

## Environment & Toolchain
- **Package Manager**: Use `pnpm` exclusively.
- **TypeScript 6**: `erasableSyntaxOnly: true` is enabled in `tsconfig.json`. Do not use legacy TS features (like `enum` or `namespace`) that require a runtime transform beyond simple erasure.
- **Tailwind v4**: There is **no** `tailwind.config.js`. Configuration is CSS-first via `@theme` in `src/styles/index.css`.
- **Vite 6**: Uses `@tailwindcss/vite` plugin. Path aliases are configured for `@/*` -> `src/*`.

## Architectural Gotchas
- **Hash Routing**: The app uses a custom hash-based routing system (`src/hooks/useRouteHash.ts`) to manage sub-pages (Archive Spreads). **Do not** attempt to install `react-router-dom` or similar libraries.
- **Kinetic Typography**: Headlines in `HeroKinetic.tsx` use the `useWeightedScroll.ts` hook to dynamically adjust `font-weight` based on scroll velocity. Preserve this interaction.
- **Content Ingestion**: Portfolio items and portrait images are ingested via `import.meta.glob` in `src/lib/content.ts`. To add new content, place files in the `content/` directory and ensure they match the types in `src/lib/types.ts`.
- **Accessibility**: All animations **must** check the `useReducedMotion.ts` hook. High-contrast (WCAG AAA) is the baseline for all themes.

## Design System Guardrails
- **The 28px Grid**: Layouts must align with the visible 28px background grid rhythm.
- **Brutalist Borders**: Use `1px solid` borders and `0px` border-radius (`radius-brutal`).
- **Reject "AI Slop"**: Avoid generic UI patterns like purple gradients, Inter-only typography, and rounded card grids.
- **Typography**:
  - Kinetic/High-contrast: `Cormorant Garamond` (Editorial).
  - Technical/Labels: `IBM Plex Mono` (Utility).

## Lessons Learned & Fixed Issues

### Issue 1: Aesthetic Inconsistency (Fixed)
**Problem**: The codebase contained a mix of `rounded-none`, `rounded-full`, `rounded-md`, and `rounded-lg`, violating the strict brutalist aesthetic.
**Root Cause**: An initial remediation patch fixed structural containers (BentoTile, ArchiveSpread) but missed interactive elements (buttons, badges, links).
**Current State**: All rounded classes have been replaced with `rounded-none` across ALL components. `grep -r "rounded-full\|rounded-md\|rounded-lg" src/` returns zero matches.
**Action for Agents**: Do not introduce any new rounded classes without explicit user consent. The brutalist aesthetic is absolute.

### Issue 2: Accessibility (WCAG AAA) (Fixed)
**Problem**: Archive images in `ArchiveSpread.tsx` used empty `alt=""` attributes.
**Root Cause**: Misuse of the decorative image pattern (`alt=""`) for content images.
**Current State**: All content images now use meaningful `alt` text derived from `item.title`.
**Action for Agents**: Always use meaningful `alt` text for content images. `alt=""` is only for decorative images.

### Issue 3: React Key Stability (Fixed)
**Problem**: `ContentBody.tsx` used paragraph strings (e.g., `key={paragraph}`) which are unstable when paragraphs contain identical text.
**Root Cause**: Using dynamic content as a React key can lead to rendering bugs.
**Current State**: Keys are now stable, using `key={\`para-${index}\``}.
**Action for Agents**: Always use stable, unique keys. If the data source doesn't provide a unique ID, use a stable hash or the array index as a last resort.

## Recommendations
- **Before making changes**: Run `pnpm typecheck`. It is fast and catches most issues.
- **When adding components**: Respect the `0px` border-radius (`rounded-none`) mandate.
- **When touching images**: Ensure `alt` text is meaningful.
- **When mapping arrays**: Verify `key` props are stable and unique.

Refer to [CLAUDE.md](./CLAUDE.md) for the "Meticulous Approach" workflow requirements.
