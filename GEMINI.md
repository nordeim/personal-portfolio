# GEMINI.md: Nicholas Yun Portfolio — The Engineered Soul (v2.0)

## Project Overview
This project is an avant-garde "Digital Installation" portfolio for Nicholas Yun. It balances **Tactile Brutalism** (visible grids, sharp borders, mono utility) with **High-End Editorial** (serif typography, extreme whitespace, cinematic motion). The goal is to create a unique, production-grade web experience that rejects generic "AI slop" aesthetics in favor of "Post-AI Authenticity."

### Key Technologies
- **Framework**: React 19 (Strict Mode)
- **Language**: TypeScript 6
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 (with CSS-first configuration)
- **Architecture**: Data-driven component model with hash-based routing.

## Building and Running
The following commands are available for development and deployment:

- **Development**: `npm run dev` (Starts the Vite development server)
- **Build**: `npm run build` (Compiles TypeScript and builds the production assets)
- **Typecheck**: `npm run typecheck` (Runs `tsc` with no emission to verify types)
- **Preview**: `npm run preview` (Previews the production build locally)

## Design & Development Conventions

### Aesthetic Pillars
- **The 28px Grid**: A visible background grid (`.theme-night::before`, `.theme-day::before`) that dictates the rhythm of the site.
- **Brutalist Borders**: Use `1px` solid borders and `0px` border-radius (`radius-brutal`) for structural elements.
- **Kinetic Typography**: Headlines use viewport-scaled `Cormorant Garamond` (or serif fallback) with weighted scroll interactions.
- **Mono Utility**: Metadata and system labels use `IBM Plex Mono` for a technical feel.

### Component Guidelines
- **`HeroKinetic`**: Viewport-scaled typographic installation reactive to scroll and state.
- **`AboutFlow`**: Asymmetric editorial layout for the narrative section.
- **`BentoGrid`**: Non-linear project display using "textures" (e.g., Serif for Poetry, Mono for Code).
- **`MachineOverlay`**: A technical debug/MX layer showing build info and raw state data.
- **`GrainOverlay`**: A subtle CSS noise layer for "human fingerprint" texture.

### Development Standards
- **Data-First**: Most content is defined in `src/lib/data.ts` using types from `src/lib/types.ts`.
- **Routing**: Uses a custom hash-based routing system via `useRouteHash.ts` to manage sub-pages (Archive Spreads) without a complex router library.
- **Accessibility**: High-contrast ratios (WCAG AAA targets) and full support for `prefers-reduced-motion`.
- **Imports**: Use `@/` alias for absolute paths from the `src` directory.

## Project Structure
- `src/components`: UI primitives and composite installations.
- `src/hooks`: Custom React hooks for motion logic and system state.
- `src/lib`: Core data structures, types, and utility functions.
- `src/styles`: Tailwind v4 configuration and global design system logic (`index.css`).
- `src/content`: (Optional) Markdown and asset sources for the portfolio.

---

*This document serves as the foundational instruction set for Gemini CLI interactions within this workspace.*
