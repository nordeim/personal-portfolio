# Master Execution Plan

## Chunk 1: Project Setup

Status: Done

- Create the React/Vite project structure
- Add base files: `App.jsx`, `App.css`, `main.jsx`, and `index.html`
- Confirm the browser tab title is `Nicholas Yun`
- Verify the app runs locally

## Chunk 2: Layout Shell And Navigation

Status: Done

- Build the overall page shell
- Add sticky header
- Add the `NY` logo/initials
- Add navigation links for About, Projects, and Contact
- Ensure navigation works on desktop and mobile
- Add skip-to-content support and section scroll offsets

## Chunk 3: Hero Section

Status: Done

- Add landing section
- Include `creative technologist` positioning
- Add placeholder intro copy
- Add primary CTA for email and secondary CTA for LinkedIn
- Add highlight rows
- Replace oversized portrait block with circular portrait/profile intro treatment

## Chunk 4: About Section

Status: Done

- Add short personal introduction area
- Structure the section around multidisciplinary creativity
- Frame breadth as intentional curiosity and execution
- Replace static cards with a calmer rotating content treatment
- Fade content out fully before swapping to the next item
- Fade new content in without overlapping text
- Remove numeric labels and visible progress bar
- Keep spacing compact and professional
- Respect reduced-motion user preference

## Chunk 5: Portfolio Gallery Structure

Status: Done

- Add fuller project data structure
- Build reusable project cards
- Add placeholder projects across categories like Code, Design, Writing, Art, Photography, Storytelling, and Experiments
- Create a responsive grid layout
- Keep cards flexible for optional images and optional links

## Chunk 6: Portfolio Category Filters

Status: Done

- Add category filter buttons
- Make gallery filter projects by category
- Include an `All` view
- Keep the interaction simple and beginner-friendly

## Chunk 7: Contact And Social Links

Status: Done

- Add email as the primary contact path
- Add LinkedIn as the secondary contact path
- Add social links for LinkedIn, Instagram, and GitHub
- Repeat key links in the footer

## Chunk 8: First Visual Design Pass

Status: Done

- Add minimal but bold colorful styling
- Define spacing, layout rhythm, borders, and responsive behavior
- Add first-pass visual identity around `NY`
- Keep the design professional, creative, and personal
- Avoid making the interface feel too busy or agitating

## Chunk 9: Content Replacement Pass

Status: Done

- Replace placeholder name/copy/links/project text
- Add Nicholas's real email, LinkedIn, Instagram, GitHub, and Wix site
- Add polished first-pass project titles and descriptions
- Add content folders for future portfolio updates
- Add portrait folder and wire the hero portrait to the first image uploaded there

## Content Folder System

Status: Done

- Main profile photo folder: `src/content/portrait/`
- Hero slide photo folders: `src/content/portrait/creative-technologist/`, `src/content/portrait/project-archive/`, and `src/content/portrait/open-to-collaborate/`
- Portfolio gateway folders: `src/content/collections/`
- Poetry folder: `src/content/collections/poetry/`
- Photography folder: `src/content/collections/photography/`
- Artworks folder: `src/content/collections/artworks/`
- Stories folder: `src/content/collections/stories/`
- Websites and experiments folder: `src/content/collections/web-experiments/`
- Design folder: `src/content/collections/design/`
- New `.md` or `.txt` files added to collection folders become archive items on the next local refresh/build
- Images placed beside a collection text file with the same filename become that item's preview image
- Files named `PUT_...` are helper notes and are ignored by the live website

## Chunk 10: Responsive QA

Status: Done

- Test desktop, tablet, and mobile layouts
- Check navigation, hero, About rotation, project grid, CTAs, and footer
- Fix spacing, overflow, and readability issues
- Confirm no horizontal overflow at desktop, tablet, and phone widths
- Confirm About transition keeps a uniform height while fading out and back in
- Confirm archive pages render and remain readable on desktop, tablet, and phone widths

## Chunk 11: GitHub Pages Deployment

Status: Configured

- Configure Vite with a relative base for portable GitHub Pages builds
- Add `.github/workflows/deploy.yml` to build and deploy the `dist/` folder
- Build successfully after deployment configuration
- Remaining external step: push the project to GitHub and enable GitHub Pages for GitHub Actions
- Live-site confirmation happens after the repository is pushed and GitHub Pages finishes deploying

## Current Design Notes

- The site should feel experimental and creative, but still professional and personal.
- The About section should feel calm, not clicky or agitating.
- Avoid over-mechanical UI patterns where a softer editorial presentation works better.
- Homepage portfolio cards should act as broad gateways.
- OneStopNews belongs inside the Websites & Experiments archive, not as a standalone homepage card.
