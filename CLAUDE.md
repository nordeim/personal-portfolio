---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
---

# Nicholas Yun Portfolio

A personal portfolio website for Nicholas Yun, a Creative Technologist. Designed as a "living shelf" of work across code, design, writing, art, photography, and storytelling.

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
