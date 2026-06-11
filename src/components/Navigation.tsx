import { BrandMark } from './BrandMark';
import { ThemeToggle } from './ThemeToggle';
import type { SocialLink } from '@/lib/types';
import { contactLinks, socialLinks } from '@/lib/data';
import { SocialIcon } from './SocialIcon';

interface NavigationProps {
  isNightMode: boolean;
  onThemeToggle: () => void;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  onNavigate: () => void;
  onMachineToggle: () => void;
}

export function Navigation({
  isNightMode,
  onThemeToggle,
  onMenuToggle,
  isMenuOpen,
  onNavigate,
  onMachineToggle,
}: NavigationProps) {
  return (
    <>
      <header className="fixed top-0 w-full z-30 border-b border-white/12 bg-[rgba(7,8,13,0.72)] backdrop-blur-[22px] [.theme-day_&]:border-[rgba(21,21,27,0.08)] [.theme-day_&]:bg-[rgba(255,251,242,0.78)]">
        <div className="flex items-center justify-between gap-6 max-w-[1320px] mx-auto px-12 py-[18px] max-[760px]:px-4 max-[760px]:py-[10px]">
          <a
            className="inline-flex items-center gap-3.5 font-bold text-white/78 hover:text-white [.theme-day_&]:text-[rgba(21,21,27,0.72)] [.theme-day_&]:hover:text-[#15151b] transition-colors"
            href="#top"
            aria-label="Nicholas Yun home"
            onClick={onNavigate}
          >
            <span aria-hidden="true">
              <BrandMark />
            </span>
            <span className="whitespace-nowrap max-[760px]:max-w-[120px] max-[760px]:text-[0.95rem] max-[760px]:truncate">Nicholas Yun</span>
          </a>

          <nav aria-label="Main navigation" className="hidden max-[760px]:hidden">
            <div className="flex items-center gap-6">
              <a
                className="inline-flex items-center min-h-[40px] text-white/78 font-semibold hover:text-white transition-colors [.theme-day_&]:text-[rgba(21,21,27,0.72)] [.theme-day_&]:hover:text-[#15151b]"
                href="#about"
                onClick={onNavigate}
              >
                About
              </a>
              <a
                className="inline-flex items-center min-h-[40px] text-white/78 font-semibold hover:text-white transition-colors [.theme-day_&]:text-[rgba(21,21,27,0.72)] [.theme-day_&]:hover:text-[#15151b]"
                href="#projects"
                onClick={onNavigate}
              >
                Projects
              </a>
              <a
                className="inline-flex items-center min-h-[40px] text-white/78 font-semibold hover:text-white transition-colors [.theme-day_&]:text-[rgba(21,21,27,0.72)] [.theme-day_&]:hover:text-[#15151b]"
                href="#contact"
                onClick={onNavigate}
              >
                Contact
              </a>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center gap-2 min-h-[38px] px-3 border border-white/18 rounded-none bg-white/8 text-white/78 font-extrabold text-sm hover:border-white/40 hover:text-white transition-colors [.theme-day_&]:border-[rgba(21,21,27,0.14)] [.theme-day_&]:bg-[rgba(255,255,255,0.62)] [.theme-day_&]:text-[rgba(21,21,27,0.72)] [.theme-day_&]:hover:text-[#15151b] font-[family-name:var(--font-utility)]"
              onClick={onMachineToggle}
              type="button"
              aria-label="Toggle Machine Experience"
            >
              MX
            </button>
            <div className="hidden max-[760px]:hidden">
              <ThemeToggle isNightMode={isNightMode} onToggle={onThemeToggle} />
            </div>
            <button
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
              className="hidden max-[760px]:inline-flex items-center justify-center flex-col gap-1 w-10 h-10 border border-white/18 rounded-none bg-white/8"
              onClick={onMenuToggle}
              type="button"
            >
              <span className="block w-4 h-0.5 rounded-none bg-current" />
              <span className="block w-4 h-0.5 rounded-none bg-current" />
              <span className="block w-4 h-0.5 rounded-none bg-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <button
        aria-label="Close navigation"
        className={`fixed inset-0 z-35 border-0 bg-[rgba(7,8,13,0.36)] transition-opacity duration-200 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} [.theme-day_&]:bg-[rgba(21,21,27,0.24)]`}
        onClick={onMenuToggle}
        tabIndex={isMenuOpen ? 0 : -1}
        type="button"
      />

      <aside
        aria-hidden={!isMenuOpen}
        className={`fixed top-0 right-0 z-40 flex w-[min(86vw,360px)] h-[100svh] flex-col gap-5 p-[max(22px,env(safe-area-inset-top))]_18px p-5 border-l border-white/16 bg-[linear-gradient(160deg,rgba(255,255,255,0.12),transparent_36%),rgba(7,8,13,0.92)] backdrop-blur-[24px] shadow-[-28px_0_70px_rgba(0,0,0,0.34)] text-white overflow-y-auto transition-transform duration-[260ms] ease
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-[105%]'}
          [.theme-day_&]:border-[rgba(21,21,27,0.12)] [.theme-day_&]:bg-[linear-gradient(160deg,rgba(255,255,255,0.78),transparent_38%),rgba(255,248,232,0.94)] [.theme-day_&]:shadow-[-28px_0_70px_rgba(168,98,70,0.18)] [.theme-day_&]:text-[#15151b]
        `}
        id="mobile-navigation"
      >
        <div className="flex items-center justify-between gap-3.5 pb-4 border-b border-white/12 [.theme-day_&]:border-[rgba(21,21,27,0.1)]">
          <a className="flex items-center gap-2.5 text-white font-extrabold [.theme-day_&]:text-[#15151b]" href="#top" onClick={onMenuToggle}>
            <BrandMark />
            <span>Nicholas Yun</span>
          </a>
          <button
            aria-label="Close navigation"
            className="grid place-items-center w-10 h-10 border border-white/18 rounded-none bg-white/8 text-white text-[1.55rem] leading-none [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[rgba(255,255,255,0.58)] [.theme-day_&]:text-[#15151b]"
            onClick={onMenuToggle}
            type="button"
          >
            ×
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="grid gap-2.5">
          {[
            { num: '01', label: 'About', desc: 'Curiosity, craft, and how I think', href: '#about' },
            { num: '02', label: 'Projects', desc: 'Tools, writing, images, and experiments', href: '#projects' },
            { num: '03', label: 'Contact', desc: 'Hiring, collaboration, and conversations', href: '#contact' },
          ].map((item) => (
            <a
              key={item.num}
              aria-label={item.label}
              href={item.href}
              onClick={onMenuToggle}
              className="grid grid-cols-[auto_1fr] gap-1 gap-x-3.5 min-h-[96px] p-4 border border-white/14 rounded bg-white/6 text-white hover:border-white/34 hover:bg-white/10 transition-colors [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[rgba(255,255,255,0.58)] [.theme-day_&]:text-[#15151b] [.theme-day_&]:hover:bg-[rgba(255,255,255,0.78)]"
            >
              <span className="row-span-2 text-[var(--slide-accent,#6bf2d5)] text-xs font-black leading-tight">{item.num}</span>
              <strong className="text-[1.28rem] leading-tight">{item.label}</strong>
              <small className="text-white/58 text-[0.82rem] font-semibold leading-snug [.theme-day_&]:text-[rgba(21,21,27,0.58)]">{item.desc}</small>
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5 mt-auto pt-4 border-t border-white/12 [.theme-day_&]:border-[rgba(21,21,27,0.1)]">
          <a
            className="inline-flex items-center justify-center min-h-[46px] px-3.5 rounded-none bg-white text-[#07080d] font-extrabold [.theme-day_&]:bg-[#15151b] [.theme-day_&]:text-[#fff8e8]"
            href={contactLinks.email}
            onClick={onMenuToggle}
          >
            Email Nicholas
          </a>
          <button
            aria-label={isNightMode ? 'Switch to day mode' : 'Switch to night mode'}
            className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-3.5 border border-white/16 rounded-none bg-white/8 text-white font-extrabold [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[rgba(255,255,255,0.58)] [.theme-day_&]:text-[#15151b]"
            onClick={() => { onThemeToggle(); }}
            type="button"
          >
            <span className="block w-[18px] h-[18px] border-2 rounded-none bg-current shadow-[inset_-6px_0_0_rgba(7,8,13,0.72)] [.theme-day_&]:shadow-[inset_0_0_0_5px_#fff8e8]" aria-hidden="true" />
            {isNightMode ? 'Night mode' : 'Light mode'}
          </button>
        </div>

        <div className="flex justify-center gap-2.5" aria-label="Social links">
          {socialLinks.slice(0, 3).map((link: SocialLink) => (
            <a
              aria-label={link.label}
              href={link.href}
              key={link.label}
              onClick={onMenuToggle}
              className="grid place-items-center w-[42px] h-[42px] border border-white/14 rounded-none bg-white/8 text-white [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[rgba(255,255,255,0.58)] [.theme-day_&]:text-[#15151b]"
            >
              <SocialIcon icon={link.icon} />
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
