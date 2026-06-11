# Nicholas Yun Portfolio

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](package.json)
[![Tech Stack](https://img.shields.io/badge/stack-React%2019%20%2B%20Vite-61dafb.svg)](https://react.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Deploy](https://github.com/nicholasyunzy/personal-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/nicholasyunzy/personal-portfolio/actions/workflows/deploy.yml)

> **Ideas, made tangible.** A "living shelf" for a Creative Technologist.

Nicholas Yun's personal portfolio is a high-performance, minimalist single-page application built to showcase a multidisciplinary body of work. It treats the portfolio not as a static list, but as an evolving collection of experiments across code, design, writing, art, photography, and storytelling.

## 🚀 Quick Start

Get the project running locally in under 60 seconds.

### Prerequisites
- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0

### Setup
```bash
# 1. Clone the repository
git clone https://github.com/nicholasyunzy/personal-portfolio.git
cd personal-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

**Verify Setup**: Open [http://localhost:5173](http://localhost:5173). You should see the interactive Hero section with the "Creative Technologist" rotation active.

## 🏗️ Architecture

The project follows a **content-driven SPA architecture**, leveraging modern build tools to automate portfolio updates without manual route configuration.

### Tech Stack
| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend** | [React](https://react.dev/) | 19.0 | UI Library & State Management |
| **Build Tool** | [Vite](https://vitejs.dev/) | 7.0 | Development Server & Bundler |
| **Styling** | Plain CSS | - | Bespoke UI & Design Tokens |
| **Content** | Markdown + YAML | - | Project Metadata & Narrative |
| **Deployment**| GitHub Actions | v4 | Automated CI/CD to GitHub Pages |

### Core Principles
1. **Anti-Generic Design**: Rejection of safe grid templates in favor of a distinctive typographical hierarchy and editorial whitespace.
2. **Calm Motion**: Transitions follow a 900ms fade-out/fade-in cycle to ensure information density never feels overwhelming.
3. **Automated Ingestion**: Uses `import.meta.glob` to scan `src/content/` at build time, generating the portfolio grid dynamically.

## 📂 File Hierarchy

```text
📂 src/
├── 📂 content/          # The source of truth for all portfolio data
│   ├── 📂 portrait/    # Hero portraits mapped to slides
│   ├── 📂 collections/ # Narrative archives (Poetry, Art, Stories, etc.)
│   └── 📂 portfolio/   # Gateway project cards
├── 📄 App.jsx          # Central application logic & Dynamic Ingestion
├── 📄 App.css          # Global design system & layout tokens
└── 📄 main.jsx         # React entry point
📂 public/              # Static assets (brand marks, etc.)
📂 outputs/             # Design specs, PRD, and Execution Plans
```

## 📝 Content Management

Adding new work is as simple as dropping files into `src/content/`.

1. **Markdown**: Use YAML frontmatter for metadata:
   ```yaml
   ---
   title: Project Alpha
   category: Code
   accent: "#2457ff"
   description: A brief summary for the card.
   ---
   Full narrative content goes here.
   ```
2. **Media Pairing**: Place a `.jpg` or `.png` with the **same filename** as your `.md` file in the same folder to automatically set it as the preview image.
3. **PDF Support**: Place a `.pdf` with the same filename to automatically provide a "View Document" link.

## 🎨 Design System

The UI is built on a custom design system defined in `src/App.css`.

- **Accents**: 
  - 🟠 Design: `#ff5c35`
  - 🔵 Code: `#2457ff`
  - 🟢 Art: `#00a77f`
  - 🟡 Photography: `#f2b705`
  - 🟣 Poetry: `#8f55ff`
- **Grid System**: 28px linear gradient background grid used for structural alignment.
- **Typography**: Optimized for legibility using `ui-sans-serif` and high-contrast `text-rendering`.

## 🚢 Deployment

The site is configured for zero-config deployment via **GitHub Actions**.

- **Branch**: `main`
- **Environment**: GitHub Pages
- **Trigger**: Automatic on push to `main`
- **Workflow**: `.github/workflows/deploy.yml`

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with precision by Nicholas Yun.*
