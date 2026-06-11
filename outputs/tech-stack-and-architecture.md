# Tech Stack And Architecture

## Recommended Stack

- Framework: React
- Build tool: Vite
- Language: JavaScript / JSX
- Styling: plain CSS
- Hosting: GitHub Pages
- Deployment: GitHub Actions or a simple GitHub Pages deployment script

## Why This Stack

React is a good fit because the portfolio is made from reusable sections: navigation, hero, about, project gallery, and contact. It also gives the project room to grow later with filters, animations, project detail pages, or richer interactions.

Vite keeps the local development setup simple, fast, and beginner-friendly. It is lightweight enough for a static portfolio and works well with GitHub Pages.

Plain CSS is preferred for v1 because the site is small. It avoids extra framework complexity while keeping the visual system easy to understand and adjust.

GitHub Pages is the best hosting fit for this project because it is free, works well for `github.io` personal sites, and does not require a backend, database, login system, or server.

## Current Project Structure

```text
/
  index.html
  package.json
  vite.config.js
  src/
    main.jsx
    App.jsx
    App.css
  outputs/
    lean-prd.md
    tech-stack-and-architecture.md
    master-execution-plan.md
```

## Architecture Overview

The app is a single-page static portfolio. It renders all major sections on one page and uses anchor navigation for movement between sections.

### Main React Entry

- `src/main.jsx` mounts the React app into `#root`.
- `src/App.jsx` contains the current page structure and section data.
- `src/App.css` contains global layout, responsive styling, and interaction styling.

### Data Shape

For v1, small local arrays inside `App.jsx` are enough:

- `projects`: placeholder project gallery data
- `heroHighlights`: short hero positioning points
- `aboutPillars`: rotating About section content

This keeps the site beginner-friendly. If the project list grows later, these arrays can be moved into a separate data file such as `src/data/projects.js`.

### Page Sections

- Header/navigation: sticky top nav with `NY`, `Nicholas Yun`, and anchors for About, Projects, Contact
- Hero: creative technologist positioning, email/LinkedIn CTAs, short highlights, circular portrait/profile intro area
- About: intro copy plus calm rotating focus panel
- Projects: responsive portfolio gallery with placeholder project cards
- Contact: email, LinkedIn, Instagram, GitHub, Wix Site
- Footer: copyright and repeated social links

## Animation Guidance

The About section should feel calm rather than mechanical.

Current direction:

- Automatic rotation interval: `9000ms`
- Fade duration: `900ms`
- Fade-out completes before content swaps
- New content fades in after swap
- Avoid crossfading overlapping text
- Avoid visible progress bars and numeric labels
- Respect `prefers-reduced-motion`

## Deployment Architecture

The final site should build into static files using:

```text
npm run build
```

Vite outputs production files into:

```text
dist/
```

For GitHub Pages, the site now uses Vite's relative base setting:

```js
base: './'
```

This keeps the built assets portable whether the site is published from a user site repository or a project repository. A GitHub Actions workflow is included at `.github/workflows/deploy.yml` to build the `dist/` folder and deploy it to GitHub Pages after pushing to `main`.

## Future Architecture Options

Keep v1 simple. Only add these later if needed:

- Separate `components/` directory when `App.jsx` becomes hard to scan
- Separate `data/` directory for projects and social links
- Project detail pages if selected works need case-study treatment
- Image optimization workflow when real portfolio images are added
- CMS only if manual editing becomes painful
