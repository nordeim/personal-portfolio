const portraitImages = import.meta.glob(
  [
    './content/portrait/*.{jpg,jpeg,png,webp,avif}',
    './content/portrait/**/*.{jpg,jpeg,png,webp,avif}',
  ],
  {
    eager: true,
    import: 'default',
    query: '?url',
  },
) as Record<string, string>;

const portfolioTextFiles = import.meta.glob(
  './content/portfolio/**/*.{md,txt}',
  {
    eager: true,
    import: 'default',
    query: '?raw',
  },
) as Record<string, string>;

const portfolioImageFiles = import.meta.glob(
  './content/portfolio/**/*.{jpg,jpeg,png,webp,avif}',
  {
    eager: true,
    import: 'default',
    query: '?url',
  },
) as Record<string, string>;

const collectionTextFiles = import.meta.glob(
  './content/collections/**/*.{md,txt}',
  {
    eager: true,
    import: 'default',
    query: '?raw',
  },
) as Record<string, string>;

const collectionImageFiles = import.meta.glob(
  './content/collections/**/*.{jpg,jpeg,png,webp,avif}',
  {
    eager: true,
    import: 'default',
    query: '?url',
  },
) as Record<string, string>;

const collectionDocumentFiles = import.meta.glob(
  './content/collections/**/*.pdf',
  {
    eager: true,
    import: 'default',
    query: '?url',
  },
) as Record<string, string>;

const toTitleCase = (value: string): string =>
  value
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const stripExtension = (value: string): string =>
  value.replace(/\.[^.]+$/, '');

const toFolderKey = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

interface FrontmatterResult {
  body: string;
  data: Record<string, string>;
}

const parseFrontmatter = (rawContent: string): FrontmatterResult => {
  const match = rawContent.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match?.[1]) {
    return { body: rawContent.trim(), data: {} };
  }

  const data = match[1].split('\n').reduce<Record<string, string>>(
    (fields, line) => {
      const separatorIndex = line.indexOf(':');

      if (separatorIndex === -1) {
        return fields;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();

      if (key) {
        fields[key] = value;
      }

      return fields;
    },
    {},
  );

  return { body: match[2]?.trim() ?? '', data };
};

const getFolderName = (path: string): string => {
  const parts = path.split('/');
  return parts[parts.length - 2] ?? 'experiments';
};

const getCollectionSlug = (path: string): string =>
  path.split('/content/collections/')[1]?.split('/')[0] ?? 'poetry';

const getFilenameSlug = (path: string): string =>
  stripExtension(path.split('/').pop() ?? '');

const isCollectionGuideFile = (path: string): boolean => {
  const filename = getFilenameSlug(path).toLowerCase();
  return filename === 'readme' || filename.startsWith('put_') || filename.startsWith('put-');
};

const getExcerpt = (body: string): string =>
  body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/^#+\s*/gm, '').trim())
    .find(Boolean) ?? '';

export {
  portraitImages,
  portfolioTextFiles,
  portfolioImageFiles,
  collectionTextFiles,
  collectionImageFiles,
  collectionDocumentFiles,
  toTitleCase,
  stripExtension,
  toFolderKey,
  parseFrontmatter,
  getFolderName,
  getCollectionSlug,
  getFilenameSlug,
  isCollectionGuideFile,
  getExcerpt,
};
