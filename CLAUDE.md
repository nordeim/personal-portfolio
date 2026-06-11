---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
---

# Nicholas Yun Portfolio — The Engineered Soul (v2.0)

## Core Identity & Purpose
An avant-garde "Digital Installation" portfolio for Nicholas Yun. It balances **Tactile Brutalism** (visible grids, sharp borders, mono utility) with **High-End Editorial** (serif typography, extreme whitespace, cinematic motion) to deliver "Post-AI Authenticity."

**Tech Stack**: React 19 (Strict), TypeScript 6, Vite 6, Tailwind CSS 4.

## Foundational Principles

### Meticulous Approach (Six-Phase Workflow)
Follow this workflow for all implementation tasks:
1. **ANALYZE**: Deep requirement mining; never assume surface-level needs.
2. **PLAN**: Create a structured roadmap; present for confirmation.
3. **VALIDATE**: Get explicit user approval before writing code.
4. **IMPLEMENT**: Build modular, tested, and documented components.
5. **VERIFY**: Rigorous QA (accessibility, performance, edge cases).
6. **DELIVER**: Complete handoff with knowledge transfer.

## Implementation Standards

### TypeScript & React
- **Strict Mode**: `strict: true` in `tsconfig.json`.
- **Typing**: Prefer `interface` for structural definitions; `type` for unions/intersections.
- **No `any`**: Use `unknown` or specific types.
- **Patterns**: Use early returns, composition over inheritance, and functional components.
- **States**: Handle loading, error, empty, and success states explicitly.

### Tailwind CSS v4 & Styling
- **CSS-First**: Configuration via `@theme` in `src/styles/index.css`.
- **Grid Unit**: Use the 28px rhythm (`--unit: 28px`).
- **Brutalism**: 1px solid borders, 0px border-radius (`radius-brutal`).
- **Fonts**: 
  - Editorial: `Cormorant Garamond` (headlines, kinetic).
  - Utility: `IBM Plex Mono` (metadata, system labels).
  - Body: `Inter`.

## Development Workflow

### Build Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Compile TS and build production assets |
| `npm run typecheck` | Run `tsc` strict type checking |
| `npm run preview` | Preview production build locally |

### File Organization
- `/src/components`: UI primitives and composite installations.
- `/src/hooks`: Motion logic (`useWeightedScroll`) and system state.
- `/src/lib`: Data structures (`data.ts`), types (`types.ts`), and ingestion (`content.ts`).
- `/src/styles`: Tailwind configuration and global styles.

## Project-Specific Standards

### Kinetic Typography
Headlines in `HeroKinetic` fluctuate in font-weight based on scroll velocity (calculated in `useWeightedScroll`). Ensure all motion respects `prefers-reduced-motion`.

### Routing
Uses custom hash-based routing via `useRouteHash.ts`. Avoid adding standard router libraries unless explicitly requested.

### Data Management
Content is data-driven. Define new entities in `src/lib/types.ts` and populate them in `src/lib/data.ts`. Imagery is ingested via `import.meta.glob` in `src/lib/content.ts`.

## Anti-Patterns to Avoid
- **AI Slop**: Avoid purple gradients, generic card grids, and "safe" system fonts.
- **Monoliths**: Keep components small and focused.
- **Over-Engineering**: Don't add libraries (like Framer Motion) for effects that can be achieved with simple CSS/hooks.
