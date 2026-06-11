import type { Project } from '@/lib/types';

interface BentoTileProps {
  project: Project;
  onCloseMenu: () => void;
}

const categoryTexture: Record<string, string> = {
  'Creative Tech': 'font-[family-name:var(--font-utility)]',
  'Design': '',
  'Poetry': 'font-[family-name:var(--font-editorial)]',
  'Photography': '',
  'Art': 'font-[family-name:var(--font-utility)]',
  'Storytelling': 'font-[family-name:var(--font-editorial)]',
  'Code': 'font-[family-name:var(--font-utility)]',
  'Writing': 'font-[family-name:var(--font-editorial)]',
  'Experiments': 'font-[family-name:var(--font-utility)]',
};

export function BentoTile({ project, onCloseMenu }: BentoTileProps) {
  const textureClass = categoryTexture[project.category] ?? '';

  return (
    <a
      className="project-gateway group relative flex flex-col min-h-[360px] overflow-hidden rounded-none border border-white/13 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--project-accent)_16%,transparent),transparent_44%),rgba(255,255,255,0.052)] hover:shadow-[0_22px_70px_rgba(0,0,0,0.26)] transition-all duration-200 hover:-translate-y-0.5
        [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--project-accent)_14%,transparent),transparent_44%),rgba(255,255,255,0.62)] [.theme-day_&]:hover:shadow-[0_22px_70px_rgba(168,98,70,0.16)]
      "
      href={project.link || '#projects'}
      onClick={onCloseMenu}
      style={{ '--project-accent': project.accent } as React.CSSProperties}
    >
      {/* Accent top bar */}
      <div className="absolute top-0 right-0 left-0 h-1 bg-[linear-gradient(90deg,var(--project-accent),transparent_78%)]" />

      <div className={`flex flex-1 flex-col justify-between gap-3 p-[clamp(24px,2.8vw,34px)] ${textureClass}`}>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-extrabold uppercase tracking-wider text-[color-mix(in_srgb,var(--project-accent)_72%,white)] [.theme-day_&]:text-[color-mix(in_srgb,var(--project-accent)_70%,#15151b)]">
              {project.category}
            </p>
            <p className="text-xs font-extrabold uppercase tracking-wider text-white/66 [.theme-day_&]:text-[rgba(21,21,27,0.66)]">
              {project.status}
            </p>
          </div>

          <h3 className="type-editorial-h3 mt-4 mb-1 text-white max-w-[11ch] [.theme-day_&]:text-[#15151b] max-[760px]:max-w-none max-[760px]:text-[clamp(1.05rem,5vw,1.38rem)]">
            {project.title}
          </h3>

          {project.medium ? (
            <p className="text-white/66 text-sm [.theme-day_&]:text-[rgba(21,21,27,0.66)] max-[760px]:hidden">{project.medium}</p>
          ) : null}

          <p className="text-white/66 text-sm mt-2 max-[760px]:hidden [.theme-day_&]:text-[rgba(21,21,27,0.66)]">{project.description}</p>
        </div>

        <span className="inline-flex items-center gap-2 mt-5 w-fit border-b-2 font-extrabold text-white transition-colors duration-200 group-hover:text-[var(--project-accent)] [.theme-day_&]:text-[#15151b]" style={{ borderColor: 'var(--project-accent)' }}>
          {project.linkLabel}
          <span className="text-[1.05em] transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </a>
  );
}
