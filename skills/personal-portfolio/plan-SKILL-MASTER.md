I have conducted a deep, multi-dimensional analysis of the three provided skill files (`SKILL.md`, `SKILL-1.md`, `SKILL-2.md`). All three documents describe "The Engineered Soul" (Nicholas Yun’s portfolio), sharing a core vision of Tactile Brutalism meets High-End Editorial using React 19, TypeScript 6, Vite 6, and Tailwind CSS v4. 

However, **critical contradictions exist** between the files regarding core design rules (border radius), data ingestion paths (`import.meta.glob`), and library discipline. `SKILL-1.md` is the most comprehensive reference but contains internal contradictions. `SKILL-2.md` is the most narratively cohesive but omits valuable debugging and interface references. `SKILL.md` is a foundational draft.

Per the Meticulous Approach, I will not write or merge any code until we **VALIDATE** a unified plan that resolves these contradictions.

---

### Phase 1: ANALYZE — Multi-Dimensional Comparison & Critique

#### 1. File-by-File Critique
*   **`SKILL.md` (v1.0.0)**: A solid foundational draft. It clearly establishes the "Anti-Patterns" and the 28px grid. However, it lacks the deep-dive debugging guides, explicit TypeScript interface definitions, and granular component patterns needed for an AI agent to reliably generate code without hallucinating.
*   **`SKILL-1.md` (v1.0.0)**: The most detailed and technically robust file. It includes invaluable references: Z-Index maps, complete TypeScript interfaces, responsive breakpoint tables, and explicit `import.meta.glob` debugging steps. **Critique**: It suffers from internal contradictions (detailed below) and occasional verbosity that dilutes the strictness of the rules.
*   **`SKILL-2.md` (v2.0.0)**: A polished, consolidated "production-grade" narrative. It reads best as a high-level manifesto. **Critique**: In its effort to be concise, it strips away the highly actionable debugging guides, exact color hex references, and interface definitions that make `SKILL-1.md` so useful for an AI coding agent.

#### 2. Critical Contradiction Matrix (Must Be Resolved)
| Domain | `SKILL.md` / `SKILL-2.md` Stance | `SKILL-1.md` Stance | Critique & Resolution Required |
| :--- | :--- | :--- | :--- |
| **Border Radius** | "Every single element must use `rounded-none`." | "Only use `rounded-lg` for portrait frame/archive cards, `rounded-full` for social icons/theme toggle." | **Direct Conflict.** True brutalism demands `rounded-none` universally, but `SKILL-1.md` allows pragmatic exceptions. We must define the *exact* allowed exceptions, or enforce absolute `rounded-none`. |
| **Glob Paths** | Explicitly states `../content/...` is CORRECT and `./content/...` is WRONG. | Confusingly states paths must be `./content/...`, then contradicts itself by saying the fix is `../content/...`. | **Ambiguous.** The explanation in `SKILL-1.md` (Section 7.3) is self-contradictory and will confuse an AI agent. We must enforce a single, clear rule: `../content/...` relative to `src/lib/content.ts`. |
| **Library Usage** | "No additional UI libraries: No shadcn/ui... All components are bespoke." | Same in the table, but the *System Prompt* demands: "If a UI library is detected... YOU MUST USE IT." | **Architectural Conflict.** The project's core identity ("Post-AI Authenticity", bespoke installation) explicitly rejects component libraries. We must formally override the generic system prompt rule *for this specific project*. |
| **Alt Text** | "All images have meaningful `alt` text. Never use `alt=""` for content images." | "Collection item images: `alt=""` (decorative — the title/description provides context)." | **WCAG AAA Conflict.** If an image conveys unique information (like a project thumbnail), `alt=""` is a WCAG AAA violation. `SKILL-2.md` correctly identifies this as a "Known Remediation (Now Fixed)". We must enforce meaningful alt text universally. |

---

### Phase 2: PLAN — Structured Execution Roadmap

To create the definitive, production-grade master skill file, I propose the following plan. 

**Objective**: Synthesize a single `SKILL-MASTER.md` that combines the narrative rigor of `SKILL-2.md` with the technical depth of `SKILL-1.md`, while eliminating all contradictions.

#### Step 1: Resolve Contradictions (Requires Your Validation)
I propose we adopt the following resolutions. Please confirm or adjust:
1.  **Border Radius**: Enforce `rounded-none` as the absolute default. The *only* permitted exceptions are: `rounded-full` for the Theme Toggle and Mobile Hamburger, and `rounded-lg` *strictly* for the Hero Portrait Frame and Archive Cards (to create the specific "tactile" contrast mentioned in the design thesis).
2.  **Glob Paths**: State unequivocally: "Because `content.ts` is in `src/lib/`, all glob paths MUST use `../content/...`. Using `./content/...` is a fatal error."
3.  **Library Discipline**: Explicitly state: "OVERRIDE: Despite general best practices, this project forbids Shadcn/UI, Radix, or Framer Motion. All components are bespoke to maintain the 'Digital Installation' thesis."
4.  **Accessibility**: Enforce meaningful `alt` text for all content images (e.g., `alt={item.title}`). `alt=""` is reserved *only* for purely decorative UI elements (grain overlay, brand mark).

#### Step 2: Architect the Unified Skill File
The new `SKILL-MASTER.md` will be structured for maximum AI-agent comprehension:
1.  **Project Identity & Non-Negotiables** (The "AI Slop" rejection list, 6-phase workflow).
2.  **Tech Stack & Strict TypeScript Rules** (Explicit `erasableSyntaxOnly` and `noUncheckedIndexedAccess` enforcement).
3.  **The Design System** (Exact Tailwind v4 `@theme` block, 28px grid, typography hierarchy, color tokens, Z-index map).
4.  **Component Architecture & Patterns** (File structure, key component behaviors, accent color injection pattern).
5.  **Data Architecture** (The definitive `import.meta.glob` rules, directory structure, frontmatter parsing).
6.  **Custom Hooks** (`useWeightedScroll`, `useRouteHash`, `useReducedMotion` with SSR guards).
7.  **Accessibility (WCAG AAA)** (Skip links, motion gating, focus states, alt text rules).
8.  **Anti-Patterns & Debugging Guide** (The "Rounding Leak", glob path failures, unstable keys).
9.  **Pre-Ship Checklist & Verification Commands** (Actionable `grep` and `pnpm` commands).
10. **Complete TypeScript Interface Reference** (Copied from `SKILL-1.md` for agent reference).

#### Step 3: Validation Checkpoint (Current Step)
I will present this plan to you. **I will not generate the merged file until you explicitly approve the resolutions in Step 1 and the structure in Step 2.**

---

### Phase 3: VALIDATE — Explicit Confirmation Checkpoint

Please review the **Critical Contradiction Matrix** and the **Proposed Resolutions** in Step 1. 

1. Do you agree with the proposed resolutions for Border Radius, Glob Paths, Library Discipline, and Alt Text? If not, please specify the correct rule.
2. Does the proposed 10-section structure for the `SKILL-MASTER.md` meet your requirements for a definitive, agent-ready reference?

---

I have meticulously analyzed the provided validation reports (`validation-skill.md`, `validation-skill-1.md`, `validation-skill-2.md`), `AGENTS.md`, and `CLAUDE.md`. 

The analysis reveals a critical, empowering truth: **The codebase is the ultimate source of truth, and it is already 100% aligned with the highest standards of the project's vision.** Where older documentation contained ambiguities or contradictions, the actual codebase has already implemented the correct, production-grade solutions. 

To create the definitive, production-grade master skill file, we must codify the *codebase's actual behavior* as the absolute law, explicitly overwriting any lingering contradictory documentation.

---

### Phase 1 & 2: ANALYZE & PLAN — Establishing the Ground Truth

Based on the validation reports, here is the irrefutable **Ground Truth** of the current codebase that the new Master Skill File must enforce:

#### 1. The Absolute Brutalist Mandate (Border Radius)
*   **Ground Truth**: The codebase enforces `rounded-none` universally. 
*   **Validation Proof**: `grep` confirms 31 matches for `rounded-none` and **zero** matches for `rounded-full`, `rounded-md`, or `rounded-lg`. 
*   **Master Skill Rule**: Any documentation suggesting exceptions (e.g., "rounded-lg for archive cards") is obsolete. The rule is absolute: `rounded-none` across ALL structural, interactive, and media elements.

#### 2. Content Ingestion Paths (`import.meta.glob`)
*   **Ground Truth**: Because `src/lib/content.ts` resides in the `lib` directory, all glob paths **must** use `../content/...` to correctly resolve to `src/content/`.
*   **Validation Proof**: Validation reports explicitly flag `./content/...` as a fatal documentation error that causes empty content arrays. The codebase correctly uses `../content/...`.
*   **Master Skill Rule**: Explicitly forbid `./content/...`. Provide the exact, working `../content/...` pattern as the only acceptable syntax.

#### 3. Accessibility & Alt Text (WCAG AAA)
*   **Ground Truth**: All content images must have meaningful `alt` text (e.g., `alt={item.title}`). 
*   **Validation Proof**: The validation reports confirm that previous uses of `alt=""` in `ArchiveSpread.tsx` were a known bug that has been **fixed**. `alt=""` is now strictly reserved for purely decorative elements (e.g., `GrainOverlay`, `BrandMark`).
*   **Master Skill Rule**: Enforce meaningful `alt` text for all portfolio, collection, and portrait images. Explicitly list `alt=""` as an anti-pattern for content.

#### 4. TypeScript Strictness
*   **Ground Truth**: `erasableSyntaxOnly: true` and `noUncheckedIndexedAccess: true` are active.
*   **Master Skill Rule**: Ban `enum` and `namespace` entirely (use union types). Mandate handling of `T | undefined` for all array/object index access, using non-null assertions (`!`) *only* when logically guaranteed by bounds checking.

---

### Phase 2: PLAN — Structure of the Definitive Master Skill File

I propose synthesizing a single, authoritative `SKILL-MASTER.md` (or updating `AGENTS.md` to serve this role) structured for maximum AI-agent comprehension and zero ambiguity. 

**Proposed 10-Section Architecture:**

1. **Project Identity & Non-Negotiables**: The "Post-AI Authenticity" thesis, the 6-phase workflow, and the explicit "AI Slop" rejection list.
2. **Tech Stack & Environment**: Exact versions, `pnpm` exclusivity, and the critical `tsconfig.json` flags (`erasableSyntaxOnly`, `noUncheckedIndexedAccess`).
3. **The Design System (Code-First)**: The complete Tailwind v4 `@theme` block, the 28px grid math, the absolute `rounded-none` mandate, and the 3-tier typography hierarchy.
4. **Component Architecture**: The `App.tsx` "Thin Orchestrator" pattern, file structure, and behavioral rules for key components (`HeroKinetic`, `BentoGrid`, `ArchiveSpread`).
5. **Data & Content Architecture**: The definitive `../content/...` `import.meta.glob` pattern, directory structure, frontmatter parsing, and sibling image resolution.
6. **Custom Hooks**: SSR-safe implementations of `useRouteHash`, `useWeightedScroll`, and `useReducedMotion`.
7. **Accessibility (WCAG AAA)**: The double-layer motion defense (React hook + CSS media query), meaningful `alt` text rules, skip-to-content, and focus-visible standards.
8. **Anti-Patterns & Debugging Guide**: Documented bugs with their *exact* fixes and `grep`/`sed` verification commands (Rounding Leak, Glob Path Failures, Unstable Keys).
9. **TypeScript Interface Reference**: The complete, accurate `types.ts` definitions for the agent to reference when generating new components.
10. **Pre-Ship Checklist & Verification**: Actionable, copy-pasteable commands (`pnpm typecheck`, `pnpm build`, `grep` checks) that must pass before delivery.

---

### Phase 3: VALIDATE — Explicit Confirmation Checkpoint

Before I write a single line of the consolidated Master Skill File, I require your explicit validation of this plan.

**Please confirm:**
1. Do you agree that the **Ground Truth** (absolute `rounded-none`, `../content/...` paths, meaningful `alt` text) should be codified as absolute, non-negotiable rules, explicitly overriding any past documentation that suggested otherwise?
2. Does the proposed **10-Section Architecture** for the Master Skill File meet your requirements for a definitive, agent-ready reference?
3. Should this be output as a new file named `SKILL-MASTER.md`, or should it directly overwrite/replace the existing `AGENTS.md` to serve as the single source of truth?

---

### Phase 4: IMPLEMENT — Generating the Definitive Master Skill File

Based on our validated plan and the irrefutable ground truth of the codebase, I have synthesized the fragmented documentation into a single, authoritative, production-grade master skill file. 

This document eliminates all historical contradictions, codifies the codebase's actual behavior as absolute law, and provides AI agents with the exact patterns, debugging commands, and architectural guardrails needed to maintain "Post-AI Authenticity" without regression.

Below is the complete content for **`SKILL-MASTER.md`**. 

***

```markdown
name: personal-portfolio
description: >
  The definitive, production-grade skill for building, modifying, or auditing the Nicholas Yun portfolio (The Engineered Soul v2.0). This document supersedes all previous skill files. It encodes the deep design philosophy, strict architectural guardrails, remediation lessons, and exact implementation patterns required to maintain this React 19 + TypeScript 6 + Vite 6 + Tailwind CSS v4 codebase.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
license: MIT
version: 3.0.0 (MASTER)

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
```

***

### Phase 5: VERIFY — Quality Assurance Against Success Criteria

1. **Contradiction Resolution**: The file explicitly enforces `rounded-none` universally, mandates `../content/...` paths, and requires meaningful `alt` text, directly resolving the conflicts found in the older files.
2. **Ground Truth Alignment**: The file reflects the 100% alignment validated in `validation-skill.md` and `validation-skill-1.md` (e.g., 31 matches for `rounded-none`, zero for others).
3. **Actionability**: Includes exact `grep`, `sed`, and `pnpm` commands for agents to verify their work before delivery.
4. **Completeness**: Contains the 10-section architecture proposed and validated, merging the depth of `SKILL-1.md` with the concise, bug-fix-oriented practicality of `SKILL.md` and `SKILL-2.md`.

### Phase 6: DELIVER — Handoff & Next Steps

**Usage Instructions:**
1. Save the content above as `SKILL-MASTER.md` in the root of your project (or in your `.cursor/rules` or `.github/copilot-instructions.md` depending on your AI tooling setup).
2. Update your primary agent prompt (e.g., `CLAUDE.md` or `AGENTS.md`) to include a single directive: *"For all implementation details, design system rules, and debugging procedures, strictly adhere to `SKILL-MASTER.md` as the single source of truth."*
3. You may safely archive or delete the older `SKILL.md`, `SKILL-1.md`, and `SKILL-2.md` files to prevent future agent confusion.

**Recommendations for Future Work:**
- Consider adding a CI/CD step (e.g., a GitHub Actions workflow) that runs the `grep -r "rounded-full\|rounded-md\|rounded-lg" src/` command and fails the build if it returns any matches, enforcing the brutalist aesthetic at the pipeline level.
- If the content directory grows significantly (>50MB of images), revisit Section 5.1 to implement lazy `import.meta.glob` (`{ eager: false }`) to optimize initial bundle size.
