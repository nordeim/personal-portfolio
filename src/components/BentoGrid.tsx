import type { Project } from '@/lib/types';
import { BentoTile } from './BentoTile';

interface BentoGridProps {
  projects: Project[];
  onCloseMenu: () => void;
}

export function BentoGrid({ projects, onCloseMenu }: BentoGridProps) {
  return (
    <section id="projects" className="relative overflow-hidden pt-26 pb-26 px-12 max-[760px]:px-5 max-[760px]:pt-14 max-[760px]:pb-14 border-b border-white/10 [.theme-day_&]:border-[rgba(21,21,27,0.08)]">
      <div className="relative z-1 max-w-[1320px] mx-auto">
        <div className="grid grid-cols-[minmax(0,0.95fr)_minmax(280px,0.45fr)] items-end gap-x-[clamp(36px,5vw,72px)] mb-8 max-[900px]:grid-cols-1 max-[900px]:gap-0 max-[900px]:mb-6">
          <div>
            <p className="type-mono-util mb-3 text-[#bffcf0] [.theme-day_&]:text-[#c25b3d]">Portfolio</p>
            <h2 className="type-editorial-h2 text-white [.theme-day_&]:text-[#15151b]">
              Growing Collections
            </h2>
            <p className="text-white/68 max-w-[760px] [.theme-day_&]:text-[rgba(21,21,27,0.64)] max-[760px]:hidden">
              Six entrances into the things I make and keep making.
            </p>
          </div>
          <p className="text-white/68 type-body self-end max-[760px]:hidden [.theme-day_&]:text-[rgba(21,21,27,0.64)]">
            Open a collection. Follow the thread.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[760px]:gap-2.5 max-[360px]:grid-cols-1">
          {projects.map((project) => (
            <BentoTile key={project.slug} project={project} onCloseMenu={onCloseMenu} />
          ))}
        </div>
      </div>
    </section>
  );
}
