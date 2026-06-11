diff --git a/src/components/ArchiveSpread.tsx b/src/components/ArchiveSpread.tsx
index dec8e6a..600fb63 100644
--- a/src/components/ArchiveSpread.tsx
+++ b/src/components/ArchiveSpread.tsx
@@ -34,9 +34,9 @@ export function ArchiveSpread({ collection, items, activeItem }: ArchiveSpreadPr
         </div>
 
         {activeItem ? (
-          <article className="grid gap-7 p-[clamp(24px,5vw,54px)] border border-white/13 rounded-lg bg-white/[0.055] [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[linear-gradient(145deg,color-mix(in_srgb,var(--archive-accent)_16%,transparent),transparent_42%),rgba(255,255,255,0.54)]">
+          <article className="grid gap-7 p-[clamp(24px,5vw,54px)] border border-white/13 rounded-none bg-white/[0.055] [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[linear-gradient(145deg,color-mix(in_srgb,var(--archive-accent)_16%,transparent),transparent_42%),rgba(255,255,255,0.54)]">
             {activeItem.image ? (
-              <div className="overflow-hidden max-h-[620px] rounded-lg">
+              <div className="overflow-hidden max-h-[620px] rounded-none">
                 <img alt="" className="block w-full h-full object-cover" src={activeItem.image} />
               </div>
             ) : null}
@@ -56,7 +56,7 @@ export function ArchiveSpread({ collection, items, activeItem }: ArchiveSpreadPr
             {hasItems ? (
               items.map((item) => (
                 <a
-                  className="flex min-h-[260px] flex-col gap-3.5 p-5.5 border border-white/13 rounded-lg bg-[linear-gradient(145deg,color-mix(in_srgb,var(--archive-accent)_18%,transparent),transparent_42%),rgba(255,255,255,0.055)] text-white hover:-translate-y-0.5 transition-transform duration-200
+                  className="flex min-h-[260px] flex-col gap-3.5 p-5.5 border border-white/13 rounded-none bg-[linear-gradient(145deg,color-mix(in_srgb,var(--archive-accent)_18%,transparent),transparent_42%),rgba(255,255,255,0.055)] text-white hover:-translate-y-0.5 transition-transform duration-200
                     [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[linear-gradient(145deg,color-mix(in_srgb,var(--archive-accent)_16%,transparent),transparent_42%),rgba(255,255,255,0.54)]
                   "
                   href={`#/collections/${collection.slug}/${item.slug}`}
@@ -75,7 +75,7 @@ export function ArchiveSpread({ collection, items, activeItem }: ArchiveSpreadPr
                 </a>
               ))
             ) : (
-              <div className="col-span-full p-7 border border-white/13 rounded-lg bg-white/[0.055] [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[rgba(255,255,255,0.54)]">
+              <div className="col-span-full p-7 border border-white/13 rounded-none bg-white/[0.055] [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[rgba(255,255,255,0.54)]">
                 <h2 className="text-white [.theme-day_&]:text-[#15151b]">No items yet.</h2>
                 <p className="text-white/68 [.theme-day_&]:text-[rgba(21,21,27,0.66)]">This growing collection is waiting for its first piece.</p>
               </div>
diff --git a/src/components/BentoTile.tsx b/src/components/BentoTile.tsx
index c8aa09d..f4d9d00 100644
--- a/src/components/BentoTile.tsx
+++ b/src/components/BentoTile.tsx
@@ -22,7 +22,7 @@ export function BentoTile({ project, onCloseMenu }: BentoTileProps) {
 
   return (
     <a
-      className="project-gateway group relative flex flex-col min-h-[360px] overflow-hidden rounded-lg border border-white/13 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--project-accent)_16%,transparent),transparent_44%),rgba(255,255,255,0.052)] hover:shadow-[0_22px_70px_rgba(0,0,0,0.26)] transition-all duration-200 hover:-translate-y-0.5
+      className="project-gateway group relative flex flex-col min-h-[360px] overflow-hidden rounded-none border border-white/13 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--project-accent)_16%,transparent),transparent_44%),rgba(255,255,255,0.052)] hover:shadow-[0_22px_70px_rgba(0,0,0,0.26)] transition-all duration-200 hover:-translate-y-0.5
         [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--project-accent)_14%,transparent),transparent_44%),rgba(255,255,255,0.62)] [.theme-day_&]:hover:shadow-[0_22px_70px_rgba(168,98,70,0.16)]
       "
       href={project.link || '#projects'}
diff --git a/src/components/ContactSection.tsx b/src/components/ContactSection.tsx
index 2bc4259..52bec81 100644
--- a/src/components/ContactSection.tsx
+++ b/src/components/ContactSection.tsx
@@ -16,7 +16,7 @@ export function ContactSection() {
 
           <div className="flex justify-center gap-4 mb-6">
             <a
-              className="inline-flex items-center justify-center gap-2.5 min-h-12 px-5 border border-white rounded-lg bg-white text-[#07080d] font-extrabold transition-all duration-200 hover:-translate-y-px [.theme-day_&]:border-[#15151b] [.theme-day_&]:bg-[#15151b] [.theme-day_&]:text-[#fff8e8]"
+              className="inline-flex items-center justify-center gap-2.5 min-h-12 px-5 border border-white rounded-none bg-white text-[#07080d] font-extrabold transition-all duration-200 hover:-translate-y-px [.theme-day_&]:border-[#15151b] [.theme-day_&]:bg-[#15151b] [.theme-day_&]:text-[#fff8e8]"
               href={contactLinks.email}
             >
               <SocialIcon icon="mail" />
diff --git a/src/components/HeroKinetic.tsx b/src/components/HeroKinetic.tsx
index ac3ac8e..95621c0 100644
--- a/src/components/HeroKinetic.tsx
+++ b/src/components/HeroKinetic.tsx
@@ -3,6 +3,7 @@ import type { HeroSlide } from '@/lib/types';
 import { creativeModes, contactLinks } from '@/lib/data';
 import { portraitImages, toFolderKey } from '@/lib/content';
 import { useReducedMotion } from '@/hooks/useReducedMotion';
+import { useWeightedScroll } from '@/hooks/useWeightedScroll';
 
 interface HeroKineticProps {
   slide: HeroSlide;
@@ -42,6 +43,7 @@ export function HeroKinetic({
     tiltY: '0deg',
   });
   const prefersReduced = useReducedMotion();
+  const { fontWeight } = useWeightedScroll();
   const sectionRef = useRef<HTMLElement>(null);
 
   const currentPortraitImage = getPortraitForKey(
@@ -131,7 +133,7 @@ export function HeroKinetic({
           <p className="type-mono-util mb-3" style={{ color: 'var(--slide-accent)' }}>
             {slide.label}
           </p>
-          <h1 className="type-kinetic-hero mb-4 text-white [.theme-day_&]:text-[#15151b] max-[760px]:text-[clamp(2.65rem,14vw,4rem)] max-[760px]:leading-[0.88]">
+          <h1 className="type-kinetic-hero mb-4 text-white [.theme-day_&]:text-[#15151b] max-[760px]:text-[clamp(2.65rem,14vw,4rem)] max-[760px]:leading-[0.88]" style={{ fontWeight: prefersReduced ? 950 : fontWeight }}>
             Nicholas Yun
           </h1>
           <p className="font-[family-name:var(--font-editorial)] text-[clamp(1.9rem,4vw,4.5rem)] font-extrabold leading-[0.98] text-wrap-balance text-white mb-5 [.theme-day_&]:text-[#15151b] max-[760px]:text-[clamp(1.5rem,9vw,2.35rem)] max-[760px]:leading-[1.02] max-[760px]:max-w-[11ch]">
@@ -143,7 +145,7 @@ export function HeroKinetic({
 
           <div className="flex flex-wrap gap-4 max-[430px]:flex-col">
             <a
-              className="inline-flex items-center justify-center gap-2.5 min-h-12 px-5 border border-transparent rounded-lg font-extrabold transition-all duration-200 hover:-translate-y-px"
+              className="inline-flex items-center justify-center gap-2.5 min-h-12 px-5 border border-transparent rounded-none font-extrabold transition-all duration-200 hover:-translate-y-px"
               style={{
                 background: 'var(--slide-accent)',
                 color: '#05060a',
@@ -154,7 +156,7 @@ export function HeroKinetic({
               Contact Me
             </a>
             <a
-              className="inline-flex items-center justify-center gap-2.5 min-h-12 px-5 border border-white/24 rounded-lg bg-white/8 text-white font-extrabold transition-all duration-200 hover:-translate-y-px [.theme-day_&]:border-[rgba(21,21,27,0.16)] [.theme-day_&]:bg-[rgba(255,255,255,0.58)] [.theme-day_&]:text-[#15151b] max-[760px]:hidden"
+              className="inline-flex items-center justify-center gap-2.5 min-h-12 px-5 border border-white/24 rounded-none bg-white/8 text-white font-extrabold transition-all duration-200 hover:-translate-y-px [.theme-day_&]:border-[rgba(21,21,27,0.16)] [.theme-day_&]:bg-[rgba(255,255,255,0.58)] [.theme-day_&]:text-[#15151b] max-[760px]:hidden"
               href={contactLinks.linkedin}
             >
               Connect on LinkedIn
@@ -170,7 +172,7 @@ export function HeroKinetic({
         <aside className="relative grid align-content-center justify-items-center" aria-label="Interactive portfolio introduction">
           <button
             aria-label="Previous hero panel"
-            className="absolute top-[46%] left-[-12px] max-[900px]:left-0 z-2 grid place-items-center w-12 h-12 border border-white/28 rounded-lg bg-white/8 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/24 max-[760px]:w-[38px] max-[760px]:h-[38px]"
+            className="absolute top-[46%] left-[-12px] max-[900px]:left-0 z-2 grid place-items-center w-12 h-12 border border-white/28 rounded-none bg-white/8 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/24 max-[760px]:w-[38px] max-[760px]:h-[38px]"
             onClick={onPrev}
             type="button"
           >
@@ -179,10 +181,10 @@ export function HeroKinetic({
 
           <div className="relative w-full px-14 max-[900px]:px-12 max-[760px]:px-9 max-[620px]:px-0 pb-11" key={slide.label} aria-live="polite">
             <div className="grid gap-5 justify-items-center max-w-[560px] mx-auto">
-              <div className="relative grid overflow-hidden place-items-center w-full max-w-[420px] max-[760px]:max-w-[290px] aspect-[4/5] border border-white/22 rounded-[28px] max-[760px]:rounded-[22px] bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02)),#11131d] shadow-[0_34px_90px_rgba(0,0,0,0.38)]
+              <div className="relative grid overflow-hidden place-items-center w-full max-w-[420px] max-[760px]:max-w-[290px] aspect-[4/5] border border-white/22 rounded-none bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02)),#11131d] shadow-[0_34px_90px_rgba(0,0,0,0.38)]
                 [.theme-day_&]:border-[rgba(21,21,27,0.12)] [.theme-day_&]:bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,255,255,0.32)),#ffe6cf] [.theme-day_&]:shadow-[0_34px_90px_rgba(168,98,70,0.18)]
               ">
-                <div className="absolute inset-3.5 border border-white/12 rounded-[20px] max-[760px]:rounded-[16px] z-1" />
+                <div className="absolute inset-3.5 border border-white/12 rounded-none z-1" />
                 <img
                   alt="Nicholas Yun"
                   className="absolute inset-0 z-0 w-full h-full object-cover object-top"
@@ -208,7 +210,7 @@ export function HeroKinetic({
 
               <div className="flex flex-wrap justify-center gap-2 max-w-[620px]" aria-label="Creative mediums">
                 {creativeModes.map((mode) => (
-                  <span key={mode} className="inline-flex items-center min-h-[31px] px-2.5 py-1 border border-white/14 rounded-full bg-white/[0.055] text-white/62 text-xs font-extrabold [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[rgba(255,255,255,0.54)] [.theme-day_&]:text-[rgba(21,21,27,0.58)]">
+                  <span key={mode} className="inline-flex items-center min-h-[31px] px-2.5 py-1 border border-white/14 rounded-none bg-white/[0.055] text-white/62 text-xs font-extrabold [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[rgba(255,255,255,0.54)] [.theme-day_&]:text-[rgba(21,21,27,0.58)]">
                     {mode}
                   </span>
                 ))}
@@ -218,7 +220,7 @@ export function HeroKinetic({
 
           <button
             aria-label="Next hero panel"
-            className="absolute top-[46%] right-[-12px] max-[900px]:right-0 z-2 grid place-items-center w-12 h-12 border border-white/28 rounded-lg bg-white/8 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/24 max-[760px]:w-[38px] max-[760px]:h-[38px]"
+            className="absolute top-[46%] right-[-12px] max-[900px]:right-0 z-2 grid place-items-center w-12 h-12 border border-white/28 rounded-none bg-white/8 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/24 max-[760px]:w-[38px] max-[760px]:h-[38px]"
             onClick={onNext}
             type="button"
           >
diff --git a/src/styles/index.css b/src/styles/index.css
index ae867ed..3f44215 100644
--- a/src/styles/index.css
+++ b/src/styles/index.css
@@ -258,7 +258,9 @@ a:focus-visible {
   .floating-card,
   .about-panel-content,
   .about-flow-step,
-  .about-flow-step::before {
+  .about-flow-step::before,
+  #mobile-navigation,
+  button[aria-label="Close navigation"] {
     animation: none !important;
     transition: none !important;
   }
