import type {
  HeroSlide,
  AboutPillar,
  Collection,
  SocialLink,
  Project,
  CollectionItem,
} from './types';
import {
  portfolioTextFiles,
  portfolioImageFiles,
  collectionTextFiles,
  collectionImageFiles,
  collectionDocumentFiles,
  toTitleCase,
  getFilenameSlug,
  getFolderName,
  parseFrontmatter,
  getExcerpt,
  getCollectionSlug,
  isCollectionGuideFile,
} from './content';

const categoryAccents: Record<string, string> = {
  Art: '#00a77f',
  Code: '#2457ff',
  Design: '#ff5c35',
  Experiments: '#16a3b8',
  Photography: '#f2b705',
  Poetry: '#8f55ff',
  Storytelling: '#e5488b',
  Writing: '#8f55ff',
};

const collectionDefinitions: Record<string, Collection> = {
  artworks: {
    accent: '#00a77f',
    category: 'Art',
    description:
      'Visual studies, artwork, sketches, and image-led experiments gathered into a growing collection.',
    status: 'Growing collection',
    title: 'Artworks',
    slug: 'artworks',
  },
  design: {
    accent: '#ff5c35',
    category: 'Design',
    description:
      'Personal design pieces, birthday cards, visual systems, and small artifacts made for specific moments.',
    status: 'Growing collection',
    title: 'Personal Design',
    slug: 'design',
  },
  photography: {
    accent: '#f2b705',
    category: 'Photography',
    description:
      'A growing visual collection of photographs, places, textures, light, and small observations.',
    status: 'Growing collection',
    title: 'Photography',
    slug: 'photography',
  },
  poetry: {
    accent: '#8f55ff',
    category: 'Poetry',
    description:
      'Poems and fragments arranged as short readings, with snippets you can browse before opening the full piece.',
    status: 'Growing collection',
    title: 'Poetry',
    slug: 'poetry',
  },
  stories: {
    accent: '#e5488b',
    category: 'Storytelling',
    description:
      'Story sketches, narrative fragments, character ideas, and worlds in progress.',
    status: 'Growing collection',
    title: 'Stories',
    slug: 'stories',
  },
  'web-experiments': {
    accent: '#2457ff',
    category: 'Creative Tech',
    description:
      'Websites, small apps, interface concepts, tools, and experiments gathered into one growing space.',
    status: 'Growing collection',
    title: 'Websites & Experiments',
    slug: 'web-experiments',
  },
};

const collectionByCategory: Record<string, string> = {
  Art: 'artworks',
  Code: 'web-experiments',
  Design: 'design',
  Experiments: 'web-experiments',
  Photography: 'photography',
  Poetry: 'poetry',
  Storytelling: 'stories',
};

const portfolioGatewayOrder = [
  'web-experiments',
  'design',
  'poetry',
  'photography',
  'artworks',
  'stories',
];

const heroSlides: HeroSlide[] = [
  {
    label: 'Creative Technologist',
    portraitKey: 'nicholas-yun',
    headline: 'Ideas, made tangible.',
    subtitle: 'Code. Design. Words. Images. Experiments.',
    artifactTitle: 'Idea → Interface → Feeling',
    artifactMeta: 'Code / Design / Words',
    signature: 'MAKE IT REAL',
    accent: '#6bf2d5',
    secondaryAccent: '#ff6b6b',
    tags: ['Code', 'Design', 'Writing'],
  },
  {
    label: 'Growing Collections',
    portraitKey: 'project-archive',
    headline: 'A living shelf of work.',
    subtitle: 'Tools, cards, poems, photos, stories, and odd sparks.',
    artifactTitle: 'Many Mediums, One Point Of View',
    artifactMeta: 'Collections / Experiments / Selected work',
    signature: 'COLLECT THE SPARKS',
    accent: '#ffd166',
    secondaryAccent: '#7c5cff',
    tags: ['Cards', 'Photos', 'Stories'],
  },
  {
    label: 'Open To Collaborate',
    portraitKey: 'open-to-collaborate',
    headline: 'Useful, human ideas welcome.',
    subtitle: 'Hiring, collaborations, and creative tech projects.',
    artifactTitle: 'Hire / Collaborate / Build',
    artifactMeta: 'Best first step: email',
    signature: 'START THE THREAD',
    accent: '#58a6ff',
    secondaryAccent: '#31d158',
    tags: ['Web', 'Systems', 'Creative Tech'],
  },
];

const aboutPillars: AboutPillar[] = [
  {
    title: 'How I Think',
    paragraphs: [
      'I follow curiosity until the shape becomes clear.',
      'Research. Structure. Test. Refine.',
    ],
  },
  {
    title: 'What I Make',
    paragraphs: [
      'Websites, tools, writing, photography, visuals, and stories.',
      'Useful when possible. Personal always.',
    ],
  },
  {
    title: 'How I Work',
    paragraphs: [
      'Clarity first. Craft in the details.',
      'Thoughtful, approachable, finished enough to share.',
    ],
  },
];

const creativeModes = ['Code', 'Design', 'Words', 'Images', 'Stories', 'Experiments'];

const contactLinks = {
  email: 'mailto:nicholasyunzy@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nicholasyunzy/',
  instagram: 'https://www.instagram.com/nyterwyter/',
  github: 'https://github.com/nicholasyunzy',
  wix: 'https://yummyun.wixsite.com/nyterwyter',
};

const socialLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    icon: 'linkedin',
    href: contactLinks.linkedin,
    description: 'Professional profile, work updates, and collaboration.',
  },
  {
    label: 'Instagram',
    icon: 'instagram',
    href: contactLinks.instagram,
    description: 'Photography, visual experiments, and personal work.',
  },
  {
    label: 'GitHub',
    icon: 'github',
    href: contactLinks.github,
    description: 'Code projects, prototypes, and technical experiments.',
  },
  {
    label: 'Wix Site',
    icon: 'wix',
    href: contactLinks.wix,
    description: 'An external portfolio space for additional creative work.',
  },
];

const buildPortfolioProjects = (): Project[] => {
  const imageEntries = Object.entries(portfolioImageFiles);

  return Object.entries(portfolioTextFiles)
    .map(([path, rawContent]) => {
      const folder = getFolderName(path);
      const category = toTitleCase(folder);
      const filename = getFilenameSlug(path);
      const { body, data } = parseFrontmatter(rawContent);
      const projectCategory = data.category ?? category;
      const collectionSlug = collectionByCategory[projectCategory];
      const collectionDefinition = collectionSlug
        ? collectionDefinitions[collectionSlug]
        : undefined;
      const firstParagraph = getExcerpt(body);
      const siblingImage = imageEntries.find(([imagePath]) => {
        const imageFolder = getFolderName(imagePath);
        const imageName = getFilenameSlug(imagePath);
        return imageFolder === folder && imageName === filename;
      });

      return {
        accent:
          data.accent ??
          collectionDefinition?.accent ??
          categoryAccents[projectCategory] ??
          categoryAccents[category] ??
          '#16a3b8',
        body,
        category: projectCategory,
        description: data.description || firstParagraph,
        image: data.image || siblingImage?.[1],
        link: collectionSlug ? `#/collections/${collectionSlug}` : data.link,
        linkLabel: collectionSlug
          ? `Open ${collectionDefinition?.title ?? ''}`
          : (data.linkLabel || 'Open'),
        medium: data.medium || category,
        slug: filename,
        status: data.status || 'Selected work',
        title: data.title || toTitleCase(filename),
      } satisfies Project;
    })
    .sort((first, second) => first.title.localeCompare(second.title));
};

const buildCollectionItems = (): CollectionItem[] => {
  const imageEntries = Object.entries(collectionImageFiles);
  const documentEntries = Object.entries(collectionDocumentFiles);
  const textEntries = Object.entries(collectionTextFiles).filter(
    ([path]) => !isCollectionGuideFile(path),
  );
  const textKeys = new Set(
    textEntries.map(
      ([path]) => `${getCollectionSlug(path)}/${getFilenameSlug(path)}`,
    ),
  );

  const textItems = textEntries.map(([path, rawContent]): CollectionItem => {
    const collectionSlug = getCollectionSlug(path);
    const filename = getFilenameSlug(path);
    const collection = collectionDefinitions[collectionSlug];
    const { body, data } = parseFrontmatter(rawContent);
    const siblingImage = imageEntries.find(([imagePath]) => {
      return (
        getCollectionSlug(imagePath) === collectionSlug &&
        getFilenameSlug(imagePath) === filename
      );
    });
    const siblingDocument = documentEntries.find(([documentPath]) => {
      return (
        getCollectionSlug(documentPath) === collectionSlug &&
        getFilenameSlug(documentPath) === filename
      );
    });

    return {
      accent: data.accent || collection?.accent || '#16a3b8',
      body,
      category: data.category || collection?.category || toTitleCase(collectionSlug),
      collectionSlug,
      description: data.description || getExcerpt(body),
      document: siblingDocument?.[1],
      image: data.image || siblingImage?.[1],
      link: data.link || siblingDocument?.[1],
      linkLabel:
        data.linkLabel ||
        (siblingDocument ? 'Open PDF' : 'Open Live Project'),
      medium: data.medium || collection?.title || toTitleCase(collectionSlug),
      slug: filename,
      status: data.status || 'Collection item',
      title: data.title || toTitleCase(filename),
    };
  });

  const imageOnlyItems = imageEntries
    .filter(
      ([path]) =>
        !isCollectionGuideFile(path) &&
        !textKeys.has(
          `${getCollectionSlug(path)}/${getFilenameSlug(path)}`,
        ),
    )
    .map(([path, image]): CollectionItem => {
      const collectionSlug = getCollectionSlug(path);
      const collection = collectionDefinitions[collectionSlug];
      const filename = getFilenameSlug(path);

      return {
        accent: collection?.accent || '#16a3b8',
        body: '',
        category: collection?.category || toTitleCase(collectionSlug),
        collectionSlug,
        description: `A ${collection?.title.toLowerCase() ?? 'collection'} item from Nicholas Yun's growing collection.`,
        image,
        link: undefined,
        linkLabel: 'Open',
        medium: collection?.title || toTitleCase(collectionSlug),
        slug: filename,
        status: 'Collection item',
        title: toTitleCase(filename),
      };
    });

  return [...textItems, ...imageOnlyItems].sort((first, second) =>
    first.title.localeCompare(second.title),
  );
};

const buildPortfolioGateways = (): Project[] =>
  portfolioGatewayOrder.map((slug) => {
    const collection = collectionDefinitions[slug];
    if (!collection) {
      return {
        title: slug,
        category: '',
        accent: '#16a3b8',
        description: '',
        link: `#/collections/${slug}`,
        linkLabel: `Open`,
        slug,
        status: 'Growing collection',
      } satisfies Project;
    }

    return {
      accent: collection.accent,
      category: collection.category,
      description: collection.description,
      link: `#/collections/${slug}`,
      linkLabel: `Open ${collection.title}`,
      slug,
      status: collection.status || 'Growing collection',
      title: collection.title,
    } satisfies Project;
  });

const parseArchiveRoute = (hash: string): { collectionSlug: string; itemSlug: string | null } | null => {
  const match = hash.match(
    /^#\/(?:archive|collections)\/([^/]+)(?:\/([^/]+))?/,
  );

  if (!match?.[1]) {
    return null;
  }

  return {
    collectionSlug: match[1],
    itemSlug: match[2] ?? null,
  };
};

const projects = buildPortfolioGateways();
const collectionItems = buildCollectionItems();

export {
  categoryAccents,
  collectionDefinitions,
  collectionByCategory,
  heroSlides,
  aboutPillars,
  creativeModes,
  contactLinks,
  socialLinks,
  projects,
  collectionItems,
  parseArchiveRoute,
  buildPortfolioProjects,
};
