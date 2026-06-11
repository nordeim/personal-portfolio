import { useState, useEffect, useRef } from 'react';
import type { HeroSlide } from '@/lib/types';
import { creativeModes, contactLinks } from '@/lib/data';
import { portraitImages, toFolderKey } from '@/lib/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useWeightedScroll } from '@/hooks/useWeightedScroll';

interface HeroKineticProps {
  slide: HeroSlide;
  activeIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

const getPortraitForKey = (key: string): string => {
  const preferredImage = Object.entries(portraitImages).find(([path]) =>
    path.includes(`/portrait/${key}/`),
  );
  const fallbackImage = Object.entries(portraitImages).find(
    ([path]) => !path.replace('./content/portrait/', '').includes('/'),
  );

  return preferredImage?.[1] || fallbackImage?.[1] || '/nicholas-portrait.jpg';
};

export function HeroKinetic({
  slide,
  activeIndex,
  totalSlides,
  onPrev,
  onNext,
  onDotClick,
}: HeroKineticProps) {
  const [hasPortraitError, setHasPortraitError] = useState(false);
  const [pointerVars, setPointerVars] = useState({
    mx: '50%',
    my: '50%',
    dx: '0px',
    dy: '0px',
    tiltX: '0deg',
    tiltY: '0deg',
  });
  const prefersReduced = useReducedMotion();
  const { fontWeight } = useWeightedScroll();
  const sectionRef = useRef<HTMLElement>(null);

  const currentPortraitImage = getPortraitForKey(
    slide.portraitKey || toFolderKey(slide.label),
  );

  useEffect(() => {
    setHasPortraitError(false);
  }, [currentPortraitImage]);

  const handlePointerMove = (event: React.PointerEvent) => {
    if (prefersReduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const dx = ((x - 50) / 50) * 18;
    const dy = ((y - 50) / 50) * 18;

    setPointerVars({
      mx: `${x}%`,
      my: `${y}%`,
      dx: `${dx}px`,
      dy: `${dy}px`,
      tiltX: `${(50 - y) * 0.05}deg`,
      tiltY: `${(x - 50) * 0.05}deg`,
    });
  };

  const handlePointerLeave = () => {
    setPointerVars({
      mx: '50%',
      my: '50%',
      dx: '0px',
      dy: '0px',
      tiltX: '0deg',
      tiltY: '0deg',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] pt-32 pb-[72px] max-[760px]:pt-20 max-[760px]:pb-10 px-12 max-[760px]:px-5 border-b-0 isolation-isolate"
      style={{
        '--slide-accent': slide.accent,
        '--slide-alt': slide.secondaryAccent,
        ...pointerVars,
      } as React.CSSProperties}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Dark hero background */}
      <div className="absolute inset-0 bg-[linear-gradient(112deg,#07080d_0%,#121322_44%,#25131e_72%,#101b18_100%)] z-0
        [.theme-day_&]:bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(255,214,102,0.34),transparent_34%),linear-gradient(116deg,#fff8e8_0%,#ffe7d6_42%,#e4fbf1_72%,#f6ecff_100%)]
      " />

      {/* Light sheets */}
      {!prefersReduced && (
        <>
          <div
            className="absolute w-[72vw] h-[18vh] opacity-50 animate-[sheet-drift_15s_ease-in-out_infinite]"
            style={{
              top: '18%',
              left: '-18%',
              background: `linear-gradient(90deg, transparent, color-mix(in srgb, var(--slide-accent) 74%, transparent), color-mix(in srgb, var(--slide-alt) 68%, transparent), transparent)`,
              transform: `translate3d(${pointerVars.dx}, calc(${pointerVars.dy} * 0.35), 0) rotate(-18deg)`,
            }}
          />
          <div
            className="absolute right-[-20%] bottom-[22%] h-[13vh] w-[72vw] opacity-38 animate-[sheet-drift_15s_ease-in-out_-5s_infinite]"
            style={{
              background: `linear-gradient(90deg, transparent, color-mix(in srgb, var(--slide-accent) 74%, transparent), color-mix(in srgb, var(--slide-alt) 68%, transparent), transparent)`,
              transform: `translate3d(calc(${pointerVars.dx} * -0.7), ${pointerVars.dy}, 0) rotate(21deg)`,
            }}
          />
        </>
      )}

      {/* NY ghost */}
      <div className="absolute right-[-3vw] bottom-[-12vh] text-white/[0.035] text-[clamp(16rem,42vw,42rem)] font-black leading-none select-none pointer-events-none [.theme-day_&]:text-[rgba(21,21,27,0.045)]">
        NY
      </div>

      {/* Main layout */}
      <div className="relative z-1 grid grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] max-[900px]:grid-cols-1 gap-x-[clamp(36px,6vw,84px)] gap-y-9 max-w-[1320px] mx-auto items-center max-[900px]:items-start min-h-[calc(100svh-210px)] max-[900px]:min-h-0">
        <div className="max-w-[760px] max-[900px]:max-w-full">
          <p className="type-mono-util mb-3" style={{ color: 'var(--slide-accent)' }}>
            {slide.label}
          </p>
          <h1 className="type-kinetic-hero mb-4 text-white [.theme-day_&]:text-[#15151b] max-[760px]:text-[clamp(2.65rem,14vw,4rem)] max-[760px]:leading-[0.88]" style={{ fontWeight: prefersReduced ? 950 : fontWeight }}>
            Nicholas Yun
          </h1>
          <p className="font-[family-name:var(--font-editorial)] text-[clamp(1.9rem,4vw,4.5rem)] font-extrabold leading-[0.98] text-wrap-balance text-white mb-5 [.theme-day_&]:text-[#15151b] max-[760px]:text-[clamp(1.5rem,9vw,2.35rem)] max-[760px]:leading-[1.02] max-[760px]:max-w-[11ch]">
            {slide.headline}
          </p>
          <p className="max-w-[620px] mb-7 text-[1.08rem] text-white/76 [.theme-day_&]:text-[rgba(21,21,27,0.68)] max-[760px]:hidden">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 max-[430px]:flex-col">
            <a
              className="inline-flex items-center justify-center gap-2.5 min-h-12 px-5 border border-transparent rounded-none font-extrabold transition-all duration-200 hover:-translate-y-px"
              style={{
                background: 'var(--slide-accent)',
                color: '#05060a',
                boxShadow: '0 18px 38px rgba(0,0,0,0.26)',
              }}
              href={contactLinks.email}
            >
              Contact Me
            </a>
            <a
              className="inline-flex items-center justify-center gap-2.5 min-h-12 px-5 border border-white/24 rounded-none bg-white/8 text-white font-extrabold transition-all duration-200 hover:-translate-y-px [.theme-day_&]:border-[rgba(21,21,27,0.16)] [.theme-day_&]:bg-[rgba(255,255,255,0.58)] [.theme-day_&]:text-[#15151b] max-[760px]:hidden"
              href={contactLinks.linkedin}
            >
              Connect on LinkedIn
            </a>
          </div>

          <p className="mt-7 w-fit pb-2.5 border-b-2 text-white/70 text-[0.96rem] font-extrabold [.theme-day_&]:text-[rgba(21,21,27,0.68)]" style={{ borderColor: 'var(--slide-accent)' }}>
            {slide.artifactTitle}
          </p>
        </div>

        {/* Portrait Showcase */}
        <aside className="relative grid align-content-center justify-items-center" aria-label="Interactive portfolio introduction">
          <button
            aria-label="Previous hero panel"
            className="absolute top-[46%] left-[-12px] max-[900px]:left-0 z-2 grid place-items-center w-12 h-12 border border-white/28 rounded-none bg-white/8 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/24 max-[760px]:w-[38px] max-[760px]:h-[38px]"
            onClick={onPrev}
            type="button"
          >
            ‹
          </button>

          <div className="relative w-full px-14 max-[900px]:px-12 max-[760px]:px-9 max-[620px]:px-0 pb-11" key={slide.label} aria-live="polite">
            <div className="grid gap-5 justify-items-center max-w-[560px] mx-auto">
              <div className="relative grid overflow-hidden place-items-center w-full max-w-[420px] max-[760px]:max-w-[290px] aspect-[4/5] border border-white/22 rounded-none bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02)),#11131d] shadow-[0_34px_90px_rgba(0,0,0,0.38)]
                [.theme-day_&]:border-[rgba(21,21,27,0.12)] [.theme-day_&]:bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,255,255,0.32)),#ffe6cf] [.theme-day_&]:shadow-[0_34px_90px_rgba(168,98,70,0.18)]
              ">
                <div className="absolute inset-3.5 border border-white/12 rounded-none z-1" />
                <img
                  alt="Nicholas Yun"
                  className="absolute inset-0 z-0 w-full h-full object-cover object-top"
                  onError={() => setHasPortraitError(true)}
                  src={currentPortraitImage}
                />
                {hasPortraitError && (
                  <div className="grid gap-2 place-items-center text-white/72 z-2" aria-hidden="true">
                    <span className="text-[clamp(6rem,15vw,10.5rem)] font-black leading-[0.78] [.theme-day_&]:text-[#15151b]">NY</span>
                    <small className="text-xs font-extrabold uppercase [.theme-day_&]:text-[rgba(21,21,27,0.56)]">Portrait</small>
                  </div>
                )}
              </div>

              <div className="max-w-[440px] text-center max-[760px]:max-w-[310px]">
                <p className="mb-2 text-xs font-extrabold uppercase" style={{ color: 'var(--slide-accent)' }}>
                  {slide.label}
                </p>
                <h2 className="m-0 text-white text-[clamp(1.35rem,2.3vw,2.15rem)] leading-[1.05] text-wrap-balance [.theme-day_&]:text-[#15151b] max-[760px]:text-[clamp(1.1rem,6vw,1.55rem)]">
                  {slide.headline}
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-2 max-w-[620px]" aria-label="Creative mediums">
                {creativeModes.map((mode) => (
                  <span key={mode} className="inline-flex items-center min-h-[31px] px-2.5 py-1 border border-white/14 rounded-none bg-white/[0.055] text-white/62 text-xs font-extrabold [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[rgba(255,255,255,0.54)] [.theme-day_&]:text-[rgba(21,21,27,0.58)]">
                    {mode}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            aria-label="Next hero panel"
            className="absolute top-[46%] right-[-12px] max-[900px]:right-0 z-2 grid place-items-center w-12 h-12 border border-white/28 rounded-none bg-white/8 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/24 max-[760px]:w-[38px] max-[760px]:h-[38px]"
            onClick={onNext}
            type="button"
          >
            ›
          </button>

          <div className="flex gap-2.5 justify-center mt-5" aria-label="Hero panels">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                aria-label={`Show panel ${index + 1}`}
                aria-pressed={index === activeIndex}
                className={`w-2.5 h-2.5 p-0 border rounded-none transition-all duration-200 ${
                  index === activeIndex
                    ? 'w-7 bg-white border-white'
                    : 'bg-transparent border-white/58 hover:border-white'
                }`}
                key={index}
                onClick={() => onDotClick(index)}
                style={index === activeIndex ? { background: 'var(--slide-accent)', borderColor: 'var(--slide-accent)' } : undefined}
                type="button"
              />
            ))}
          </div>
        </aside>
      </div>

      {/* Scroll cue */}
      <a className="absolute left-1/2 bottom-6 inline-flex items-center gap-2.5 text-white/66 text-xs font-extrabold uppercase -translate-x-1/2 max-[760px]:hidden [.theme-day_&]:text-[rgba(21,21,27,0.58)]" href="#about">
        <span>Explore</span>
        <span className="grid place-items-center w-[30px] h-[30px] border border-white/18 rounded-none [.theme-day_&]:border-[rgba(21,21,27,0.16)]" aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
