import type { Collection, CollectionItem } from '@/lib/types';
import { ContentBody } from './ContentBody';

interface ArchiveSpreadProps {
  collection: Collection;
  items: CollectionItem[];
  activeItem: CollectionItem | null;
}

export function ArchiveSpread({ collection, items, activeItem }: ArchiveSpreadProps) {
  const hasItems = items.length > 0;

  return (
    <section
      className="min-h-screen pt-34 border-b-0"
      style={{ '--archive-accent': collection.accent } as React.CSSProperties}
    >
      <div className="max-w-[1120px] mx-auto">
        <div className="mb-11">
          <a
            className="inline-flex w-fit border-b-2 font-extrabold text-white mb-7 [.theme-day_&]:text-[#15151b]"
            href={activeItem ? `#/collections/${collection.slug}` : '#projects'}
            style={{ borderColor: 'var(--archive-accent)' }}
          >
            {activeItem ? `Back to ${collection.title}` : 'Back to Collections'}
          </a>
          <p className="type-mono-util mb-3 text-[#bffcf0] [.theme-day_&]:text-[#c25b3d]">{collection.category}</p>
          <h1 className="type-kinetic-hero max-w-[900px] mb-4 text-white [.theme-day_&]:text-[#15151b]">
            {activeItem ? activeItem.title : collection.title}
          </h1>
          <p className="max-w-[760px] text-white/68 text-[clamp(1rem,1.5vw,1.25rem)] [.theme-day_&]:text-[rgba(21,21,27,0.66)]">
            {activeItem ? activeItem.description : collection.description}
          </p>
        </div>

        {activeItem ? (
          <article className="grid gap-7 p-[clamp(24px,5vw,54px)] border border-white/13 rounded-none bg-white/[0.055] [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[linear-gradient(145deg,color-mix(in_srgb,var(--archive-accent)_16%,transparent),transparent_42%),rgba(255,255,255,0.54)]">
            {activeItem.image ? (
              <div className="overflow-hidden max-h-[620px] rounded-none">
                <img alt={activeItem.title} className="block w-full h-full object-cover" src={activeItem.image} />
              </div>
            ) : null}
            {activeItem.link ? (
              <a
                className="inline-flex w-fit border-b-2 font-extrabold text-white [.theme-day_&]:text-[#15151b]"
                href={activeItem.link}
                style={{ borderColor: 'var(--archive-accent)' }}
              >
                {activeItem.linkLabel}
              </a>
            ) : null}
            <ContentBody item={activeItem} />
          </article>
        ) : (
          <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[620px]:grid-cols-1 gap-4">
            {hasItems ? (
              items.map((item) => (
                <a
                  className="flex min-h-[260px] flex-col gap-3.5 p-5.5 border border-white/13 rounded-none bg-[linear-gradient(145deg,color-mix(in_srgb,var(--archive-accent)_18%,transparent),transparent_42%),rgba(255,255,255,0.055)] text-white hover:-translate-y-0.5 transition-transform duration-200
                    [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[linear-gradient(145deg,color-mix(in_srgb,var(--archive-accent)_16%,transparent),transparent_42%),rgba(255,255,255,0.54)]
                  "
                  href={`#/collections/${collection.slug}/${item.slug}`}
                  key={item.slug}
                >
                  {item.image ? (
                    <span className="block overflow-hidden -m-5.5 mb-2 aspect-video border-b border-white/12 [.theme-day_&]:border-[rgba(21,21,27,0.08)]">
                      <img alt={item.title} className="block w-full h-full object-cover" src={item.image} />
                    </span>
                  ) : null}
                  <span className="text-xs font-extrabold uppercase text-[color-mix(in_srgb,var(--archive-accent)_72%,white)] [.theme-day_&]:text-[color-mix(in_srgb,var(--archive-accent)_65%,#15151b)]">
                    {item.medium}
                  </span>
                  <strong className="text-[1.35rem] leading-tight text-white [.theme-day_&]:text-[#15151b]">{item.title}</strong>
                  <span className="text-white/66 [.theme-day_&]:text-[rgba(21,21,27,0.66)]">{item.description}</span>
                </a>
              ))
            ) : (
              <div className="col-span-full p-7 border border-white/13 rounded-none bg-white/[0.055] [.theme-day_&]:border-[rgba(21,21,27,0.1)] [.theme-day_&]:bg-[rgba(255,255,255,0.54)]">
                <h2 className="text-white [.theme-day_&]:text-[#15151b]">No items yet.</h2>
                <p className="text-white/68 [.theme-day_&]:text-[rgba(21,21,27,0.66)]">This growing collection is waiting for its first piece.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
