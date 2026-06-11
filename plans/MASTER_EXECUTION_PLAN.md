# MASTER EXECUTION PLAN: The Engineered Soul (v2.0)

## Objective
To re-imagine the Nicholas Yun portfolio as a high-contrast, "Digital Installation" that balances **Technical Brutalism** (structure, visible logic, mono utility) with **High-End Editorial** (serif typography, extreme whitespace, cinematic motion).

## Aesthetic Manifesto
- **Brutalist Foundation**: Visible 28px background grid, 1px solid borders, 0px border-radius, `IBM Plex Mono` for metadata.
- **Editorial Soul**: Viewport-scaled `Cormorant Garamond` (or similar high-contrast Serif), asymmetric content clusters, scrollytelling "unfolds."

---

## Phase 1: The Design System (Tactile Canvas)
*Objective: Establish the "math" of the site before building the components.*

### 📂 Files to Create/Update:
1.  **`src/App.css` (Refactor)**
    - **Purpose**: Global layout engine. Defines the 28px grid background and basic container types.
    - **Key Interface**: CSS Variables for `--u` (unit), `--brutalist-border`, `--editorial-type`.
2.  **`src/styles/typography.css` (New)**
    - **Purpose**: Dedicated font orchestration. Loads Variable Fonts and sets kinetic type scales.
    - **Key Interface**: Classes like `.type-kinetic-hero`, `.type-mono-util`.

---

## Phase 2: The Navigation & Shell (Machine Interface)
*Objective: Build the persistent "Terminal" that hosts the editorial content.*

### 📂 Files to Create/Update:
1.  **`src/components/LayoutShell.jsx` (New)**
    - **Purpose**: Wraps the SPA. Handles the 1px perimeter borders and global "Machine Mode" state.
2.  **`src/components/Navigation.jsx` (New)**
    - **Purpose**: High-contrast, thin sticky nav. 
    - **Feature**: Includes the "MX Toggle" (Machine Experience) to reveal raw site data.
3.  **`src/components/MachineOverlay.jsx` (New)**
    - **Purpose**: A technical layer that displays system status, build version, and raw JSON data when toggled.

---

## Phase 3: The Hero Installation (Kinetic Typography)
*Objective: A strong first impression that feels like a physical-to-digital sculpture.*

### 📂 Files to Create/Update:
1.  **`src/components/HeroKinetic.jsx` (New)**
    - **Purpose**: Viewport-scaled text that fluctuates in weight based on scroll.
    - **Interfaces**: Reacts to `useWeightedScroll` hook.
2.  **`src/hooks/useWeightedScroll.js` (New)**
    - **Purpose**: Logic to calculate scroll velocity and friction for "Weighted Motion."

---

## Phase 4: The About Flow (Asymmetric Editorial)
*Objective: Narrating the multidisciplinary story with "calm friction."*

### 📂 Files to Create/Update:
1.  **`src/components/AboutFlow.jsx` (New)**
    - **Purpose**: Replaces the current About section with an asymmetric "Editorial Spread."
    - **Interaction**: Paragraphs glide and "breathe" into position.
2.  **`src/components/GrainOverlay.jsx` (New)**
    - **Purpose**: A subtle CSS noise/grain layer to add "Human Fingerprint" texture.

---

## Phase 5: The Living Shelf (Non-Linear Bento)
*Objective: Presenting mixed-media work as a curated collection.*

### 📂 Files to Create/Update:
1.  **`src/components/BentoGrid.jsx` (New)**
    - **Purpose**: Replaces the standard grid with an asymmetric Bento layout.
    - **Texture Mapping**: Injects "Mono" style for Code and "Serif" for Poetry items.
2.  **`src/components/BentoTile.jsx` (New)**
    - **Purpose**: Individual project portals with 1px border frames and high-fidelity previews.

---

## Phase 6: The Archive (Editorial Spreads)
*Objective: Converting simple detail pages into immersive case studies.*

### 📂 Files to Create/Update:
1.  **`src/components/ArchiveSpread.jsx` (New)**
    - **Purpose**: Renders Markdown content as a full-screen magazine spread.
    - **Design**: Large-scale imagery on one side, precise metadata on the other.

---

## Phase 7: Polish & Performance (Verification)
*Objective: Ensuring the "Avant-Garde" vision remains hyper-functional.*

### 📂 TODO Checklist:
- [ ] Implement `prefers-reduced-motion` global toggle.
- [ ] Optimize `import.meta.glob` paths for zero-latency asset loading.
- [ ] Conduct "Design Audit" against the Anti-Generic Manifesto.
- [ ] Final Lighthouse check (Target: 95+).
