### Phase 1: ANALYZE — Audit Report Deep Dive & Requirement Mining

I have meticulously reviewed the `audit_report_SKILL-MASTER.md`. The audit is absolutely correct and highlights a critical flaw in my previous iteration: **I optimized for strategic brevity at the expense of tactical generative reliability.** 

While the previous `SKILL-MASTER.md` perfectly codified the "Ground Truth" non-negotiables (absolute `rounded-none`, `../content/...` paths, meaningful `alt` text), it stripped away the exact implementation patterns, hex codes, and debugging logic an AI agent needs to *build* or *extend* the codebase without hallucinating. 

**The Trade-off:** A purely strategic document prevents architectural drift but causes generative failure. A purely tactical document causes bloat. 
**The Solution:** A unified, hierarchically structured `SKILL-MASTER.md` (v3.0.0) that serves as *both* the strategic constitution and the tactical playbook.

---

### Phase 2: PLAN — Structured Execution Roadmap for v3.0.0

To create the definitive, production-grade master skill file, I propose a comprehensive 12-section architecture. This merges the bulletproof non-negotiables of the previous draft with the missing tactical depth identified in the audit.

#### Proposed 12-Section Architecture for `SKILL-MASTER.md`

1. **Project Identity & Non-Negotiables**: The "Post-AI Authenticity" thesis, the "AI Slop" rejection list, and the mandatory 6-phase workflow.
2. **Tech Stack & Environment**: Exact versions, `pnpm` exclusivity, and the critical `tsconfig.json` flags (`erasableSyntaxOnly`, `noUncheckedIndexedAccess`).
3. **The Design System (Complete)**: 
   - The full Tailwind v4 `@theme` block (all hex codes, OKLCH accents, typography scales).
   - The 28px grid math.
   - **Added:** The definitive Z-Index Layer Map (0 to 9999) to prevent modal/overlay collisions.
4. **Component Architecture & Logic Patterns**: 
   - File structure.
   - The "Thin Orchestrator" (`App.tsx`) pattern.
   - **Added:** Specific logic patterns: `AboutFlow` (Stable Height Swap), `BentoGrid` (Category Texture mapping), `ArchiveSpread` (Dual-View router), `HeroKinetic` (CSS custom property injection).
5. **Data & Content Architecture**: 
   - The definitive `../content/...` `import.meta.glob` pattern (with explicit WRONG vs CORRECT examples).
   - Directory structure, frontmatter parsing, and sibling image resolution.
6. **Custom Hooks (Implementation Patterns)**: 
   - **Added:** SSR guards (`typeof window !== 'undefined'`).
   - **Added:** `useWeightedScroll` throttling mechanics and state-hack explanation.
   - **Added:** `useReducedMotion` double-layer defense (React hook + CSS media query).
7. **Accessibility (WCAG AAA)**: Meaningful `alt` text rules (never empty for content), skip-to-content, focus-visible standards, and ARIA patterns.
8. **Complete TypeScript Interface Reference**: 
   - **Added:** Full export of `types.ts` (`HeroSlide`, `AboutPillar`, `Project`, `CollectionItem`, `Collection`, `ArchiveRoute`, `SocialLink`, `MachineOverlayData`) to strictly prevent `any` or inference errors.
9. **Anti-Patterns & Common Bugs**: 
   - The core 3 bugs (Rounding Leak, Glob Paths, Unstable Keys).
   - **Added:** Light Theme Override Specificity (`[.theme-day_&]`), Body Scroll Lock cleanup.
10. **Debugging Guide**: 
    - **Added:** Step-by-step troubleshooting for Broken Images, TypeScript Errors, Build Failures, Content Not Appearing, Theme Toggle failures, and Mobile Menu lockups.
11. **Pre-Ship Checklist & Verification**: Actionable, copy-pasteable `grep`, `pnpm typecheck`, and `pnpm build` commands.
12. **Summary: The Non-Negotiables**: A quick-reference table for rapid agent validation.

---

### Phase 3: VALIDATE — Explicit Confirmation Checkpoint

Before I write a single line of this comprehensive, unified file, I require your explicit validation of this plan.

**Please confirm:**
1. Do you agree that this 12-section structure successfully resolves the audit's critique by providing *both* strategic enforcement and tactical generative depth?
2. Are you comfortable with the resulting file being longer (estimated ~600-800 lines) to ensure the AI agent has all necessary hex codes, interfaces, and debugging steps to operate autonomously without hallucination?

---

### Executive Summary

I have meticulously analyzed the audit report and the full corpus of source documents (`SKILL.md`, `SKILL-1.md`, `SKILL-2.md`, `AGENTS.md`, `CLAUDE.md`). The audit is unequivocally correct: the previous `SKILL-MASTER.md` was a flawless *strategic* document but dangerously thin for *tactical generation*. An AI agent attempting to build new components or debug complex layout issues using only the condensed version would inevitably hallucinate design tokens, introduce z-index regressions, or mishandle state.

Per your explicit instruction, I will **not** constrain the length or compact useful details. The new `SKILL-MASTER.md` will be a comprehensive, unapologetically detailed master reference. It will serve as both the strategic constitution (enforcing Ground Truth) and the tactical playbook (providing exact hex codes, full interfaces, hook mechanics, and debugging guides). 

I will now present the detailed 12-section execution plan. **I will not write the file until you explicitly validate this plan.**

---

### Phase 1 & 2: ANALYZE & PLAN — The 12-Section Architecture

To resolve the audit's critique, the enhanced `SKILL-MASTER.md` will be structured to provide maximum generative reliability. Every section from the source files that adds tactical value will be preserved, deduplicated, and organized for rapid AI retrieval.

#### **Section 1: Project Identity & Non-Negotiables**
- **The Dual-Thesis**: Tactile Brutalism (the machine) + High-End Editorial (the soul).
- **The "AI Slop" Rejection List**: Explicitly forbidden patterns (purple gradients, safe fonts, predictable grids, template aesthetics).
- **Mandatory Six-Phase Workflow**: ANALYZE → PLAN → VALIDATE → IMPLEMENT → VERIFY → DELIVER.

#### **Section 2: Tech Stack & Environment**
- **Exact Versions**: React 19, TypeScript 6, Vite 6, Tailwind CSS 4, pnpm.
- **Critical `tsconfig.json` Flags**: `strict: true`, `erasableSyntaxOnly: true` (no enums/namespaces), `noUncheckedIndexedAccess: true` (mandating `T | undefined` handling).
- **Vite Configuration**: `base: './'` for GitHub Pages, `@tailwindcss/vite` plugin, `@/*` path alias.

#### **Section 3: The Design System (Complete Code-First)**
- **Full Tailwind v4 `@theme` Block**: *All* hex codes, OKLCH accents, typography scales, and spacing variables. No truncation.
- **The 28px Grid**: Mathematical backbone and visible background implementation.
- **Brutalist Borders**: Absolute `rounded-none` mandate with `grep` verification commands.
- **Light Theme Override Specificity**: The exact `[.theme-day_&]:` arbitrary variant pattern (and common mistakes to avoid).
- **Z-Index Layer Map**: Explicit 0 to 9999 mapping (Grid: 0, Hero: 1, Skip Link: 20, Nav: 30, Mobile Drawer: 40, Machine Overlay: 50, Grain: 9999) to prevent modal/overlay collisions.

#### **Section 4: Component Architecture & Logic Patterns**
- **File Organization**: Complete directory tree.
- **The "Thin Orchestrator"**: `App.tsx` state-lifting pattern (max 2 levels of prop drilling).
- **Detailed Component Logic**:
  - `HeroKinetic`: Pointer parallax, CSS custom property injection (`--slide-accent`), 10s auto-rotation.
  - `AboutFlow`: "Stable Height Swap" sizer pattern with 900ms calm fade transitions.
  - `BentoGrid`/`BentoTile`: Category texture mapping (mono for tech, serif for art/poetry) and accent color injection.
  - `ArchiveSpread`: Dual-view router (collection grid vs. item detail) with shared header.
  - `ContentBody`: Category-aware rendering (`<pre>` for poetry, `<p>` splits for prose).

#### **Section 5: Data & Content Architecture**
- **The Definitive `import.meta.glob` Pattern**: Explicit WRONG (`./content/...`) vs. CORRECT (`../content/...`) examples relative to `src/lib/content.ts`.
- **Directory Structure**: Exact folder layout for `portrait`, `portfolio`, and `collections`.
- **Frontmatter Parsing**: The lightweight YAML-like parser logic.
- **Sibling Image Resolution**: How `.md` and `.jpg` files with matching base names are automatically paired.
- **Guide File Filtering**: Logic to exclude `PUT_*_HERE.md` files from production data.

#### **Section 6: Custom Hooks (Implementation Patterns)**
- **SSR Guards**: Mandatory `typeof window !== 'undefined'` checks.
- **`useWeightedScroll`**: `requestAnimationFrame` throttling mechanics and the `_timestamp`/`_scrollY` state-hack explanation for delta calculation.
- **`useRouteHash`**: Hashchange listener and cleanup function.
- **`useReducedMotion`**: Double-layer defense (React hook gating + global CSS `@media (prefers-reduced-motion: reduce)` overrides).

#### **Section 7: Accessibility (WCAG AAA)**
- **Meaningful Alt Text**: Strict rules (e.g., `alt={item.title}`, `alt="Nicholas Yun"`). `alt=""` reserved *only* for decorative elements (GrainOverlay, BrandMark).
- **Skip-to-Content**: The exact off-screen `translate` to `focus:translate-y-0` pattern.
- **Focus Visible**: `3px solid rgba(36, 87, 255, 0.35)` with `3px` offset.
- **ARIA Patterns**: Explicit mapping for mobile drawer (`aria-expanded`, `aria-controls`), hero dots (`aria-pressed`), and machine overlay (`role="dialog"`).

#### **Section 8: Complete TypeScript Interface Reference**
- Full, untruncated export of `types.ts`: `HeroSlide`, `AboutPillar`, `Project`, `CollectionItem`, `Collection`, `ArchiveRoute`, `SocialLink` (union type, no enum), and `MachineOverlayData` (`unknown` for activeData).

#### **Section 9: Anti-Patterns & Common Bugs**
- **Bug 1**: The "Rounding Leak" (with `sed` fix and `grep` verification).
- **Bug 2**: Incorrect `import.meta.glob` Paths (empty content arrays).
- **Bug 3**: Unstable React Keys (using paragraph strings).
- **Bug 4**: Light Theme Override Specificity failures (missing `&` or using spaces instead of underscores).
- **Bug 5**: Body Scroll Lock cleanup failures (missing `return () => { document.body.style.overflow = ''; }`).
- **Bug 6**: `erasableSyntaxOnly` rejecting `enum` declarations.

#### **Section 10: Debugging Guide**
- Step-by-step troubleshooting for:
  1. Broken Images (Network tab + `console.log(Object.keys(portraitImages))`).
  2. TypeScript Errors (Table of common errors like "Object is possibly 'undefined'" and their fixes).
  3. Build Failures (Checking `base: './'`, plugin order).
  4. Content Not Appearing (Verifying glob paths and guide file filtering).
  5. Theme Toggle Not Working (Checking root class and `[.theme-day_&]` overrides).
  6. Mobile Menu Not Closing (Verifying `translate-x-[105%]` and scroll lock cleanup).

#### **Section 11: Pre-Ship Checklist & Verification**
- **Build Verification**: `pnpm typecheck`, `pnpm build`, `ls -la dist/assets/`.
- **Responsive Breakpoint Table**: Expected layout behavior at 360px, 430px, 620px, 760px (major mobile breakpoint), 900px, 1200px, 1536px.
- **Functional & Accessibility Checklists**: Copy-pasteable validation steps.

#### **Section 12: Summary: The Non-Negotiables**
- A rapid-reference table summarizing the absolute rules for Aesthetic, Grid, Accessibility, TypeScript, Content, Typography, and Installation.

---

### Phase 3: VALIDATE — Explicit Confirmation Checkpoint

This plan guarantees that **zero tactical depth is sacrificed**. The resulting file will be substantial (estimated 800–1000+ lines), but every line will serve a direct purpose in preventing AI hallucination, enforcing the "Engineered Soul" thesis, and providing exact, copy-pasteable solutions for edge cases.

**Please explicitly confirm:**
1. Do you approve this 12-section architecture as the definitive structure for the enhanced `SKILL-MASTER.md`?
2. Do you agree with the mandate to preserve all tactical details (full hex codes, complete interfaces, detailed hook mechanics, and the 6-part debugging guide) without condensing or truncating them for the sake of brevity?
3. Shall I proceed to **Phase 4: IMPLEMENT** and generate the complete, augmented `SKILL-MASTER.md` file based on this exact blueprint?
