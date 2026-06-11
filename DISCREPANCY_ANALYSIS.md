# Discrepancy Analysis: Audit Re-Validation Report

## Executive Summary

This document contains the root-cause analysis for every discrepancy identified during the re-validation of the Project_Brief.md and the CODE_REVIEW_AUDIT_PLAN.md against the current codebase. It serves as the evidence-based foundation for the REMEDIATION_PLAN.md.

---

## Discrepancy 1: "Rounded-none" Enforcement is Incomplete

### Claim in Brief
> "I enforced rounded-none across all structural components (BentoTile, ArchiveSpread, ContactSection, and the portrait showcase)."

### Current State (Verified via grep)
```
$ grep -r "rounded-full" src/components/
ContactSection.tsx: ... rounded-full ...
ThemeToggle.tsx: ... rounded-full ...
Navigation.tsx: (multiple instances)

$ grep -r "rounded-md" src/components/
HeroKinetic.tsx: ... rounded-md ...

$ grep -r "rounded-lg" src/
App.tsx: ... rounded-lg ...
```

### Root Cause
The remediation patch in code_changes_to_review_and_validate_against_PRD_v2.md correctly applied rounded-none to the structural containers (BentoTile, ArchiveSpread, Hero portraits). However, it missed the interactive elements (buttons, badges, links) in ContactSection, ThemeToggle, and Navigation.

The PRD's claim was absolute, which is why it reads as a false statement. The code shows a mixed state: containers are brutalist (0px), but interactive elements still use rounded (pill-shaped) styling.

### Optimal Fix
Two possible strategies:

**Strategy A (Strict Brutalism)**: Replace all rounded-full/rounded-md with rounded-none.
- Pros: Absolute aesthetic consistency.
- Cons: Pill buttons may look worse as sharp rectangles. Loss of affordance for interactive elements.

**Strategy B (Documented Exception)**: Keep rounded-full for pill-shaped interactive elements (buttons, badges) and rounded-none for containers, explicitly documenting this in AGENTS.md.
- Pros: Better UX. Buttons as pills is an intentional, common pattern.
- Cons: Slight deviation from the absolute PRD claim.

**Recommendation**: Strategy B. The design is better with pill buttons. Update Project_Brief.md and AGENTS.md to reflect this intentional hybrid.

---

## Discrepancy 2: useWeightedScroll Scroll Event Handling

### Claim in Brief
> Kinetic Typography: "Scroll velocity dynamically influences typography weight."

### Current State
The hook uses requestAnimationFrame inside a scroll listener, which is an efficient throttling pattern. The fontWeight is applied via inline style on the H1, which is efficient as it avoids React Virtual DOM overhead.

### Root Cause
The implementation is already optimal. The claim that this is a performance discrepancy is false.

### Optimal Fix
No code change needed. Update the audit to reflect this is an aligned finding.

---

## Discrepancy 3: Empty alt Attributes in ArchiveSpread

### Claim in Brief
WCAG AAA requires meaningful alt text for all images.

### Current State
```tsx
<img alt="" src={activeItem.image} />
```

### Root Cause
The alt="" is a valid pattern for decorative images, but for a portfolio, these images are likely content, not decoration.

### Optimal Fix
Update the img tag to use the item's title as alt text:
```tsx
<img alt={activeItem.title} src={activeItem.image} />
```

---

## Discrepancy 4: The key Prop in ContentBody.tsx

### Claim in Brief
React requires stable, unique key props for elements in a list.

### Current State
```tsx
{item.body.split(/\\n\\s*\\n/).map((paragraph) => (
  <p key={paragraph}>...</p>
))}
```

### Root Cause
Using the paragraph string as a key is risky. If two paragraphs have the same text, React will throw a warning.

### Optimal Fix
Use the index as a fallback:
```tsx
{item.body.split(/\\n\\s*\\n/).map((paragraph, index) => (
  <p key={index}>...</p>
))}
```

---

## Discrepancy 5: prefers-reduced-motion in HeroKinetic.tsx

### Claim in Brief
"All animations must check the useReducedMotion hook."

### Current State
```tsx
{!prefersReduced && (
  <>
    <div className="... animate-[sheet-drift_...]" />
  </>
)}
```

### Root Cause
The light sheet animation is correctly gated by !prefersReduced. This is already handled correctly.

### Optimal Fix
No fix needed. Update the audit to reflect this is an aligned finding.

---

## Discrepancy 6: Hardcoded Strings

### Claim in Brief
Components should be fully data-driven.

### Current State
Multiple components contain hardcoded strings.

### Root Cause
The static copy (section titles, hero headline, contact CTA) was left as hardcoded strings in the components.

### Optimal Fix
Move static copy to src/lib/data.ts or a new src/lib/copy.ts file.

---

## Summary Table

| Discrepancy | Severity | Status | Action |
| :--- | :--- | :--- | :--- |
| rounded-full still present | High | True | Document intentional hybrid OR force rounded-none |
| useWeightedScroll performance | Medium | False | Already optimal. Update audit. |
| Empty alt on archive images | High | True | Use activeItem.title as alt |
| Unstable key in ContentBody | Medium | True | Use index as fallback |
| Reduced motion in HeroKinetic | N/A | False | Correctly implemented. Update audit. |
| Hardcoded strings | Low | True | Extract to data.ts |
