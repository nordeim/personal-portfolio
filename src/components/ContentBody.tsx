import type { CollectionItem } from '@/lib/types';

interface ContentBodyProps {
  item: CollectionItem;
}

export function ContentBody({ item }: ContentBodyProps) {
  if (!item.body) return null;

  if (item.collectionSlug === 'poetry') {
    return (
      <pre className="max-w-[780px] m-0 text-white/78 font-inherit text-[clamp(1.1rem,2vw,1.45rem)] leading-[1.85] whitespace-pre-wrap [.theme-day_&]:text-[rgba(21,21,27,0.66)]">
        {item.body}
      </pre>
    );
  }

  return (
    <div className="max-w-[780px]">
      {item.body.split(/\n\s*\n/).map((paragraph, index) => (
        <p key={`para-${index}`} className="m-0 mb-4.5 text-white/78 text-[clamp(1rem,1.5vw,1.22rem)] leading-[1.76] [.theme-day_&]:text-[rgba(21,21,27,0.66)]">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
