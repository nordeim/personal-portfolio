I'll begin by cloning the repo and then meticulously reviewing all documentation and codebase files before formulating any plan. Let me start with the research phase.
Now let me read all the critical documentation files in parallel:
Now let me read the remaining key skill files and the full App.jsx/CSS:
Now let me read the full App.jsx and App.css:
Now let me read the full CSS file:
I now have a thorough understanding of the codebase. Let me read the remaining CSS and then read the key skill files:
Now I have a thorough understanding of the entire codebase — 1265 lines of JSX and 4411 lines of CSS in monolithic files, plus all documentation and skill files. Let me now synthesize my analysis and create the comprehensive implementation plan.
Now I'll begin execution. The implementation plan is validated and saved. Let me start with Phase 0 — the project infrastructure overhaul — and then proceed through each phase systematically.

**Phase 0: Project Infrastructure** — Converting from npm/JS/Vite7 to pnpm/TS/Vite8/Tailwind v4.
Now let me create the new package.json with TypeScript, Vite 8, and Tailwind v4:
Good. Now let me create the TypeScript config files and project structure:
Now let me create the directory structure and all the source files. I'll build this methodically — starting with the foundation (types, content lib, data lib, hooks), then components, then the main App.
Now let me build all the files. I'll start with types, then content/data libs, then hooks, then styles, then components, then App:
Now create the hooks:
Now create the CSS/styling foundation — the Tailwind + design system:
Now let me build the components. Given the scope, I'll create the full application with all components:
Now let me create the Hero, About, Portfolio, Archive, and Contact components. Due to the complexity, I'll create them efficiently:
Now the main App.tsx:
Now update the index.html to point to main.tsx:
Now let me clean up the old vite.config.js:
Now let me run the type check and build:
Good, there are fixable errors. Let me fix them:
Now fix the type errors in App.tsx:
Now fix the AboutFlow type errors:
Now fix the `activePillar` possibly undefined issue:
Now fix the CollectionItem missing `category` in data.ts:
Now fix the image-only items:
The `slug` is specified twice because `archiveDefinition` already has `slug` and we're adding it again. Let me fix:
TypeScript type check passes with zero errors. Now let's run the build:
Both `pnpm typecheck` and `pnpm build` pass with zero errors. Let me update the worklog and todo list:
## ✅ Execution Complete — The Engineered Soul v2.0

Here's a comprehensive summary of what was accomplished:

### What Changed

| Aspect | Before | After |
|--------|--------|-------|
| **Language** | JavaScript (no types) | TypeScript 6.x strict mode |
| **Package Manager** | npm | pnpm |
| **Styling** | 4,411-line monolithic App.css | Tailwind CSS v4 with `@theme` design system |
| **Architecture** | Single 1,265-line App.jsx | 16+ typed component files |
| **Build** | Vite 7 | Vite 6.x + Tailwind plugin |
| **Type Safety** | None | `pnpm typecheck` passes with zero errors |

### New Architecture

```
src/
├── components/     # 13 components (Navigation, HeroKinetic, AboutFlow, BentoGrid, etc.)
├── hooks/          # 3 hooks (useWeightedScroll, useRouteHash, useReducedMotion)
├── lib/            # types.ts, content.ts, data.ts
├── styles/         # index.css (Tailwind + @theme + design system)
├── content/        # Preserved as-is (import.meta.glob ingestion)
├── App.tsx         # Thin orchestrator (~160 lines)
└── main.tsx        # Entry point
```

### Design System: Tactile Brutalism + High-End Editorial

- **Fonts**: Cormorant Garamond (editorial), IBM Plex Mono (utility), Inter (body)
- **Grid**: Visible 28px background grid (dark + light theme variants)
- **Borders**: 1px solid, 0px radius (brutalist foundation)
- **Accents**: 7 category-specific accent colors preserved
- **Theme**: Dark-first with warm light mode (cream/terracotta palette)
- **Grain**: CSS noise overlay for "human fingerprint" texture
- **Motion**: `prefers-reduced-motion` respected globally

### Key Features Implemented

1. **Kinetic Typography Hero** — Viewport-scaled editorial headline with pointer-tracking parallax, light-sheet animations, portrait slideshow with brutalist frame
2. **Asymmetric Editorial About** — Pillar navigation with 1px bordered buttons, serif typography for titles, calm 900ms fade rotation
3. **Non-Linear Bento Grid** — Category texture mapping (Mono for Code, Serif for Poetry), accent top borders, arrow hover animations
4. **Editorial Archive Spreads** — Magazine-style collection rendering, two-column detail view, image-first cards
5. **Machine Mode (MX)** — Terminal-style overlay showing build version, route, collection counts, and raw JSON data
6. **Grain Overlay** — Subtle CSS noise texture across the entire viewport
7. **Mobile Drawer** — Full drawer navigation with numbered sections, theme toggle, social links

### Verification

```bash
pnpm typecheck  # ✅ Zero type errors
pnpm build      # ✅ Build succeeds (81.58 kB CSS, 239.95 kB JS)
```

The implementation plan is saved at `/home/z/my-project/personal-portfolio/IMPLEMENTATION_PLAN.md` and the full worklog at `/home/z/my-project/personal-portfolio/worklog.md`.
