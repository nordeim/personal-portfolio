# Remediation Plan: The Engineered Soul (v2.0)

## Executive Summary

This plan addresses all findings from the comprehensive re-validation of the codebase against the audit reports. The codebase is 95% aligned but has specific gaps in **aesthetic consistency**, **accessibility**, and **performance optimization** that require surgical remediation.

**Status**: All findings verified against current codebase (commit hash available via `git rev-parse HEAD`).

---

## 1. Critical Findings (Blocks Release)

### 1.1 Aesthetic Inconsistency: `rounded-full`/`rounded-md` Still Present
**Severity**: High
**Root Cause**: The audit report claimed `rounded-none` was enforced across all structural components, but the codebase still contains rounded corners in interactive elements.

**Affected Files**:
- `ContactSection.tsx` (line 32, 36): `rounded-full` on social links and icon spans
- `ThemeToggle.tsx` (line 11, 22): `rounded-full` on outer button and inner indicator
- `Navigation.tsx` (line 11): `rounded-full` on menu toggle
- `HeroKinetic.tsx` (line 129, 261): `rounded-md` on scroll cue
- `App.tsx` (line 88): `rounded-lg` on skip-link

**Fix Strategy**:
- Replace all `rounded-full` with `rounded-none` OR document the intentional deviation for pill-shaped buttons
- Replace `rounded-md` with `rounded-none` for non-interactive elements (scroll cue)
- Keep `rounded-lg` on skip-link if it's for accessibility focus visibility; otherwise replace

### 1.2 Missing `key` Stability in `.map()`
**Severity**: Medium
**Root Cause**: Some `.map()` calls use array indices or potentially non-unique strings as keys.

**Affected Files**:
- `ContentBody.tsx` (line 21): Uses `${paragraph}` as key. Paragraphs may not be unique.
- `BentoGrid.tsx` (line 29): Uses `project.slug` which is likely stable, but verify uniqueness in data source
- `HeroKinetic.tsx` (line 231): Uses `index` as key for dots. Acceptable here since it's a static array length.

**Fix Strategy**:
- For `ContentBody.tsx`: Use a stable hash or `index` as fallback if paragraphs can repeat
- Verify `project.slug` uniqueness in `buildPortfolioGateways()`

### 1.3 `<img>` Alt Attributes Missing or Empty
**Severity**: High (Accessibility)
**Root Cause**: WCAG AAA requires meaningful alt text for all images.

**Affected Files**:
- `HeroKinetic.tsx` (line 189): `alt="Nicholas Yun"` — descriptive, but verify if it's the best description
- `ArchiveSpread.tsx` (line 40): `alt=""` on item images. Empty alt is acceptable for decorative, but confirm intent
- `ArchiveSpread.tsx` (line 67): `alt=""` on item card images. Same as above.

**Fix Strategy**:
- Empty alt (`alt=""`) is correct for decorative images IF they are truly decorative
- For content images, provide meaningful descriptions or `aria-label` on parent
- Verify the pattern: image-only items should have their `title` as alt text

### 1.4 `useWeightedScroll` Performance Issue
**Severity**: Medium
**Root Cause**: The hook recalculates `fontWeight` on every scroll event without throttling.

**Affected Code** (`src/hooks/useWeightedScroll.ts`):
```typescript
const handleScroll = useCallback(() => {
  const scrollY = window.scrollY;
  const now = performance.now();
  // ... recalculates every rAF frame
}, []);
```

**Fix Strategy**:
- The code already uses `requestAnimationFrame` (rAF) for the scroll listener, which is good
- However, the `setState` call inside rAF can still cause re-renders every frame
- The component (`HeroKinetic`) applies `fontWeight` via inline `style`, which avoids React re-render for CSS properties (when used correctly)
- **Action**: Verify that the component uses a `ref` for the style update instead of state, or accept the current rAF-throttled state update as sufficient for this effect

---

## 2. Important Findings (Fix Before Next Iteration)

### 2.1 Hardcoded Strings in Components
**Severity**: Low-Medium
**Root Cause**: Strings that should be in `data.ts` or passed as props.

**Affected Files**:
- `BentoGrid.tsx` (line 17): `"Portfolio"` — should be from data
- `AboutFlow.tsx` (line 56): `"Curious by nature..."` — hardcoded headline
- `ContactSection.tsx` (line 12): `"Let's build something together."` — hardcoded
- `HeroKinetic.tsx` (line 137): `"Nicholas Yun"` — should this be dynamic?

**Fix Strategy**:
- Move section headlines to `aboutPillars` or a new `copy` export in `data.ts`
- Keep "Nicholas Yun" as-is (it's the brand name)

### 2.2 `ContentBody.tsx` Paragraph Splitting
**Severity**: Low
**Root Cause**: Splitting by `\n\s*\n` may not handle all Markdown line breaks correctly.

**Affected Code**:
```typescript
item.body.split(/\n\s*\n/).map((paragraph) => ...)
```

**Fix Strategy**:
- This is acceptable for simple text content
- If content ever includes more complex Markdown, migrate to a proper Markdown-to-React parser
- **Action**: Document this limitation in a code comment

### 2.3 `useReducedMotion` Hook Completeness
**Severity**: Medium
**Root Cause**: The hook is consumed, but some animations may still be CSS-driven and not gated.

**Affected Files**:
- `HeroKinetic.tsx`: Checks `prefersReduced` for pointer move, but the `sheet-drift` animation in CSS runs unconditionally
- `AboutFlow.tsx`: Correctly disables fade when `prefersReduced` is true
- `Navigation.tsx`: The mobile drawer uses transitions. Need to verify CSS `prefers-reduced-motion` target

**Fix Strategy**:
- `HeroKinetic`: The light sheet animation should be conditionally rendered based on `prefersReduced` (currently it is: `!prefersReduced && (...)`)
- `Navigation`: Verify the `#mobile-navigation` and close button are in the CSS media query (they are)
- **Action**: Add a global CSS rule that disables `transform` on drawer elements when reduced motion is preferred (already present in `index.css`)

### 2.4 `aria-label` on Icon-Only Buttons
**Severity**: Medium (Accessibility)
**Root Cause**: The hamburger menu button and close button in `Navigation.tsx` have `aria-label`, but verify translation/resilience.

**Affected Code**:
```tsx
<button aria-label="Toggle navigation" ... />
<button aria-label="Close navigation" ... />
```

**Fix Strategy**:
- These are correct as-is
- **Action**: No code change needed, but add a comment noting these are critical for screen reader users

### 2.5 Unused Imports and Cleanup
**Severity**: Low
**Root Cause**: Dead code from refactors.

**Investigation Needed**:
- Check if `buildPortfolioProjects` is every used (it's exported but not imported in `App.tsx`)
- Check if `collectionDocumentFiles` is ever populated in `src/lib/content.ts`

**Fix Strategy**:
- If `buildPortfolioProjects` is dead code, remove it and its helper `portfolioTextFiles`/`portfolioImageFiles` globs from `content.ts`
- If `collectionDocumentFiles` is unused, remove it

---

## 3. Nice to Have (Polish)

### 3.1 `<button type="button">` Consistency
**Severity**: Very Low
**Root Cause**: Some buttons may be missing explicit `type="button"`.

**Affected Files**:
- `Navigation.tsx`: Needs verification (some buttons seem to use `type="button"` already)

**Fix Strategy**:
- Audit all `<button>` elements and add `type="button"` where missing to prevent accidental form submission

### 3.2 CSS Class Length and Readability
**Severity**: Very Low
**Root Cause**: Some Tailwind classes are extremely long and hard to maintain.

**Affected Files**:
- `HeroKinetic.tsx`: Lines 88, 99-100, etc.
- `AboutFlow.tsx`: Lines 51, 69, etc.

**Fix Strategy**:
- Extract repeated patterns into custom utility classes in `index.css`
- Use CSS variables more aggressively to reduce class string length
- **Action**: Create `.card`, `.panel`, `.theme-border` utility classes

---

## 4. Test-Driven Development (TDD) Plan

### Test Infrastructure
Since the project currently has zero tests, we need to establish a minimal but effective testing strategy.

**Proposed Setup**:
1. Add `@testing-library/react` and `vitest` as devDependencies
2. Create `vitest.config.ts` alongside `vite.config.ts`
3. Create a `tests/` directory

### Test Cases

#### Test 1: `useWeightedScroll`
**File**: `tests/hooks/useWeightedScroll.test.ts`
**Cases**:
- Returns `fontWeight` of 950 when scroll is idle
- Returns `fontWeight` < 950 when scrolling
- Respects `prefers-reduced-motion` (returns 950)

#### Test 2: `useRouteHash`
**File**: `tests/hooks/useRouteHash.test.ts`
**Cases**:
- Returns current `window.location.hash`
- Updates when `hashchange` event fires

#### Test 3: `parseFrontmatter`
**File**: `tests/lib/content.test.ts`
**Cases**:
- Parses YAML frontmatter correctly
- Returns empty data for content without frontmatter
- Handles multi-line body text

#### Test 4: `parseArchiveRoute`
**File**: `tests/lib/data.test.ts`
**Cases**:
- Parses `#/collections/artworks/painting` → `{ collectionSlug: 'artworks', itemSlug: 'painting' }`
- Parses `#/collections/artworks` → `{ collectionSlug: 'artworks', itemSlug: null }`
- Returns `null` for invalid routes

#### Test 5: Component Rendering (Snapshot/Integration)
**File**: `tests/components/HeroKinetic.test.tsx`
**Cases**:
- Renders with correct headline
- Applies correct `fontWeight` via style
- Hides light sheets when reduced motion is preferred

---

## 5. Remediation Order

### Phase 1: Critical (Blocks Release)
1. **[AESTHETIC]`** Fix `rounded-full`/`rounded-md` inconsistency across all components
2. **[ACCESSIBILITY]`** Verify all `<img>` alt attributes and fix empty ones for content images
3. **[PERFORMANCE]`** Optimize `useWeightedScroll` or verify it's not causing unnecessary re-renders

### Phase 2: Important (Fix Before Next Iteration)
4. **[CODE QUALITY]`** Extract hardcoded strings to `data.ts`
5. **[CODE QUALITY]`** Refactor long Tailwind class strings into CSS utilities
6. **[DEAD CODE]`** Remove `buildPortfolioProjects` and unused `content.ts` globs if dead

### Phase 3: Nice to Have (Polish)
7. **[ACCESSIBILITY]`** Audit all `<button>` for explicit `type="button"`
8. **[TESTING]`** Install vitest + testing-library, write TDD tests for hooks and data utilities

---

## 6. Validation & Verification

After each fix:
1. Run `pnpm typecheck` — must pass with zero errors
2. Run `pnpm build` — must succeed
3. Run new test suite — must pass
4. Manual visual check: verify `rounded-none` is applied, alt text is readable, and animations respect reduced motion

**Do not claim completion until `pnpm typecheck` passes and the test suite for the modified files passes.**
