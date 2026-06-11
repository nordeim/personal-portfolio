import { useState, useRef, useEffect } from 'react';
import type { AboutPillar } from '@/lib/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ABOUT_FADE_DURATION = 900;

interface AboutFlowProps {
  pillars: AboutPillar[];
}

export function AboutFlow({ pillars }: AboutFlowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) {
        window.clearTimeout(fadeTimerRef.current);
      }
    };
  }, []);

  const showPillar = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;

    if (prefersReduced) {
      setActiveIndex(nextIndex);
      setIsVisible(true);
      return;
    }

    if (fadeTimerRef.current !== null) {
      window.clearTimeout(fadeTimerRef.current);
    }
    setIsVisible(false);

    fadeTimerRef.current = window.setTimeout(() => {
      setActiveIndex(nextIndex);
      setIsVisible(true);
    }, ABOUT_FADE_DURATION);
  };

  const activePillar = pillars[activeIndex]!;

  return (
    <section id="about" className="relative overflow-hidden pt-26 pb-[72px] max-[760px]:pt-14 max-[760px]:pb-11 px-12 max-[760px]:px-5 border-b border-white/10 [.theme-day_&]:border-[rgba(21,21,27,0.08)] bg-transparent [.theme-day_&]:bg-transparent">
      <div className="relative z-1 max-w-[1320px] mx-auto">
        {/* Header + Summary */}
        <div className="grid grid-cols-[minmax(280px,0.55fr)_minmax(0,0.95fr)] max-[900px]:grid-cols-1 gap-x-[clamp(32px,6vw,88px)] gap-y-4 mb-14 max-[900px]:mb-8">
          <div className="max-w-[940px]">
            <p className="type-mono-util mb-3 text-[#bffcf0] [.theme-day_&]:text-[#c25b3d]">About</p>
            <h2 className="type-editorial-h2 text-white [.theme-day_&]:text-[#15151b]">
              Curious by nature. Intentional by practice.
            </h2>
          </div>
          <div className="self-end">
            <p className="text-white font-bold text-[clamp(1.2rem,1.7vw,1.55rem)] leading-relaxed [.theme-day_&]:text-[#15151b]">
              Creative technologist.
            </p>
            <p className="text-white/68 text-[clamp(1rem,1.28vw,1.2rem)] leading-relaxed [.theme-day_&]:text-[rgba(21,21,27,0.64)]">
              Ideas into tools, visuals, stories, and small digital products.
            </p>
          </div>
        </div>

        {/* Pillar Flow */}
        <div className="grid grid-cols-[minmax(190px,0.26fr)_minmax(0,0.74fr)] max-[900px]:grid-cols-1 gap-x-[clamp(24px,5vw,72px)] items-start">
          {/* Rail */}
          <div className="grid gap-2.5 max-[760px]:grid-cols-3 max-[760px]:gap-2">
            {pillars.map((pillar, index) => (
              <button
                aria-controls="about-panel"
                aria-pressed={index === activeIndex}
                className={`px-4 py-3.5 border rounded text-left transition-all duration-200 max-[760px]:text-center max-[760px]:py-2 max-[760px]:px-2
                  ${index === activeIndex
                    ? 'border-white/72 bg-white/10 text-white [.theme-day_&]:border-[rgba(21,21,27,0.74)] [.theme-day_&]:bg-[#15151b] [.theme-day_&]:text-[#fff8e8]'
                    : 'border-white/14 bg-transparent text-white/58 [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[rgba(255,255,255,0.44)] [.theme-day_&]:text-[rgba(21,21,27,0.58)] hover:border-white/40 hover:text-white/80 [.theme-day_&]:hover:text-[#15151b]'
                  }
                `}
                key={pillar.title}
                onClick={() => showPillar(index)}
                type="button"
              >
                <span className="text-sm font-extrabold max-[760px]:text-[clamp(0.74rem,3.4vw,0.88rem)] max-[760px]:leading-tight">{pillar.title}</span>
              </button>
            ))}
          </div>

          {/* Panel */}
          <div id="about-panel" className="relative min-h-0 border-l border-white/16 max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:pt-7 max-[900px]:border-white/16 pl-[clamp(28px,5vw,72px)] max-[900px]:pl-0 [.theme-day_&]:border-[rgba(21,21,27,0.14)]" aria-live="off">
            {/* Sizer for stable height */}
            <div className="grid visibility-hidden pointer-events-none" aria-hidden="true">
              {pillars.map((pillar) => (
                <article className="grid-area-[1/1]" key={pillar.title}>
                  <h3 className="type-editorial-h3 mb-5 text-white [.theme-day_&]:text-[#15151b] max-[760px]:hidden">{pillar.title}</h3>
                  {pillar.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="max-w-[820px] mb-3.5 text-white/68 type-body [.theme-day_&]:text-[rgba(21,21,27,0.64)] max-[760px]:max-w-[30ch] max-[760px]:text-base max-[760px]:leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
            </div>

            {/* Active content */}
            <article className={`transition-opacity duration-900 ease ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <h3 className="type-editorial-h3 mb-5 text-white [.theme-day_&]:text-[#15151b] max-[760px]:hidden">{activePillar.title}</h3>
              {activePillar.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-[820px] mb-3.5 text-white/68 type-body [.theme-day_&]:text-[rgba(21,21,27,0.64)] max-[760px]:max-w-[30ch] max-[760px]:text-base max-[760px]:leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
