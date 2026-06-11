Project Overview
The "Nicholas Yun Portfolio" is a modern, React-based web application designed as a "living shelf" for a creative technologist. It uses Vite for building and plain CSS for styling, emphasizing a clean, "Avant-Garde" aesthetic with
calm transitions.

Key Findings
 - Tech Stack: React 19, Vite, Plain CSS.
 - Dynamic Content: The site uses a clever file-based content system (src/content/) where Markdown files and images are automatically ingested at build time using import.meta.glob.
 - Architecture: A single-page application with sections for Hero, About, Portfolio, and Archive views for collections.
 - Deployment: Fully automated via GitHub Actions to GitHub Pages.

# Nicholas Yun Portfolio

This project is a personal portfolio website for Nicholas Yun, a Creative Technologist. It is designed to be a "living shelf" of work across multiple disciplines, including code, design, writing, art, photography, and storytelling.

## Project Overview

- **Tech Stack:** React 19, Vite, Plain CSS.
- **Architecture:** Single-page application (SPA) with a dynamic content loading system. It uses `import.meta.glob` to ingest content from the `src/content/` directory at build time.
- **Core Sections:**
  - **Hero:** Interactive introduction with rotating slides and portrait images.
  - **About:** Personal introduction with a calm, fade-based content rotation.
  - **Portfolio:** A responsive grid of collection gateways (Design, Poetry, Photography, etc.).
  - **Archive/Collections:** Dynamic pages that render content from Markdown files and associated images found in `src/content/`.
  - **Contact:** Links to email, LinkedIn, Instagram, GitHub, and an external Wix site.

## Building and Running

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Commands

- **Development:** `npm run dev` - Starts the Vite development server.
- **Build:** `npm run build` - Builds the project for production into the `dist/` directory.
- **Preview:** `npm run preview` - Previews the production build locally.

## Content Management

The site's content is driven by files in the `src/content/` directory.

- **Portrait Images:** `src/content/portrait/`. Subdirectories like `creative-technologist/` correspond to hero slides.
- **Collections:** `src/content/collections/`. Subdirectories (e.g., `poetry`, `artworks`) hold Markdown files and images for specific archives.
- **Markdown Frontmatter:** Content files can use frontmatter for metadata:
  ```yaml
  ---
  title: Project Title
  category: Design
  accent: "#ff5c35"
  description: Short summary for the card.
  ---
  Full content here.
  ```
- **Images/Documents:** Placing an image or PDF with the same filename as a Markdown file (e.g., `my-poem.md` and `my-poem.jpg`) will automatically associate them in the archive view.

## Development Conventions

- **Styling:** Use plain CSS in `src/App.css`. Avoid adding CSS frameworks unless requested.
- **Components:** Currently, the application logic is centralized in `src/App.jsx`. For smaller updates, keep it there. If the file exceeds ~1000 lines, consider breaking out components into a `src/components/` directory.
- **Animations:** Follow the "calm rotation" philosophy. Avoid aggressive crossfading or distracting progress indicators. Respect `prefers-reduced-motion`.
- **Deployment:** The project is configured for GitHub Pages. Pushing to the `main` branch triggers the GitHub Action in `.github/workflows/deploy.yml`.

## Important Files

- `src/App.jsx`: Main entry point containing application state, routing logic, and content ingestion.
- `src/App.css`: Global styles and layout.
- `vite.config.js`: Vite configuration, including the base path for GitHub Pages.
- `outputs/`: Contains the original design documents (PRD, Tech Stack, Execution Plan).

---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
---

**Tech Stack**: React 19, Vite, Plain CSS, GitHub Pages.

## Core Identity & Purpose
Nicholas Yun needs a site that presents him as a credible creative technologist with a wide-ranging, intentional body of work. The site should feel experimental, creative, professional, and personal.

## Foundational Principles

### Meticulous Approach (Six-Phase Workflow)
Follow this six-phase workflow for all implementation tasks:
1. **ANALYZE**: Deep requirement mining; identify implicit needs and ambiguities.
2. **PLAN**: Structured execution roadmap; present for user confirmation.
3. **VALIDATE**: Obtain explicit user approval before implementation.
4. **IMPLEMENT**: Modular, testable components; document alongside code.
5. **VERIFY**: Rigorous QA against success criteria; check edge cases/accessibility.
6. **DELIVER**: Complete handoff with knowledge transfer.

### Anti-Generic Design Philosophy
- **Rejection of Safety**: No predictable grids or safe defaults. Distinct typographical hierarchy.
- **Intentional Minimalism**: Use whitespace as a structural element.
- **Micro-interactions**: Focus on perfect spacing and "invisible" UX.
- **Calm Rotation**: About section should feel calm; fade out fully before swapping.

## Implementation Standards

### React 19 & JavaScript
- Functional components only.
- Logic is currently centralized in `src/App.jsx`. Break into `src/components/` only if `App.jsx` exceeds 1000 lines.
- Use `import.meta.glob` for dynamic content ingestion from `src/content/`.
- Handle UI states: loading, error, empty, success.

### Styling (Plain CSS)
- Use variables defined in `:root` in `src/App.css`.
- Avoid CSS frameworks (Tailwind/Bootstrap) unless explicitly requested.
- Maintain responsive behavior for desktop, tablet, and mobile.
- Respect `prefers-reduced-motion`.

## Development Workflow

### Build Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

## Content Management
The site is content-driven via `src/content/`:
- **Portraits**: `src/content/portrait/` (subfolders map to hero slides).
- **Collections**: `src/content/collections/` (folders like `poetry`, `artworks`).
- **Markdown**: Use YAML frontmatter for metadata (title, category, accent, description).
- **Association**: Media (JPG/PDF) with the same filename as MD files are automatically linked.

## Testing Strategy
*Currently no automated test suite.*
- **Manual Verification**: Test desktop and mobile layouts after changes.
- **Validation**: Confirm About transition height remains uniform during swaps.

## Git & Version Control
- **Main Branch**: Pushing to `main` triggers GitHub Actions deployment to GitHub Pages.
- **Workflow**: `.github/workflows/deploy.yml`.

## Important Files
- `src/App.jsx`: Main application logic and routing.
- `src/App.css`: Global styles and layout.
- `src/content/`: Source for all dynamic portfolio content.
- `vite.config.js`: Vite configuration with base path for GH Pages.
