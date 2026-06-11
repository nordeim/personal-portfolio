import { useEffect, useRef, useState } from 'react';
import './App.css';

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
);

const portfolioTextFiles = import.meta.glob(
  './content/portfolio/**/*.{md,txt}',
  {
    eager: true,
    import: 'default',
    query: '?raw',
  },
);

const portfolioImageFiles = import.meta.glob(
  './content/portfolio/**/*.{jpg,jpeg,png,webp,avif}',
  {
    eager: true,
    import: 'default',
    query: '?url',
  },
);

const collectionTextFiles = import.meta.glob(
  './content/collections/**/*.{md,txt}',
  {
    eager: true,
    import: 'default',
    query: '?raw',
  },
);

const collectionImageFiles = import.meta.glob(
  './content/collections/**/*.{jpg,jpeg,png,webp,avif}',
  {
    eager: true,
    import: 'default',
    query: '?url',
  },
);

const collectionDocumentFiles = import.meta.glob(
  './content/collections/**/*.pdf',
  {
    eager: true,
    import: 'default',
    query: '?url',
  },
);

const fallbackProjects = [
  {
    title: 'News Aggregator',
    category: 'Code',
    accent: '#2457ff',
    medium: 'Web app',
    status: 'Prototype',
    description:
      'A project space for gathering, organizing, or reframing information into a more useful reading experience.',
    linkLabel: 'View Project',
  },
  {
    title: 'Birthday Card Experiments',
    category: 'Design',
    accent: '#ff5c35',
    medium: 'Personal design',
    status: 'Ongoing',
    description:
      'A flexible space for playful, personal, and highly specific cards made for people, moments, and small celebrations.',
    linkLabel: 'View Collection',
  },
  {
    title: 'Poetry Fragments',
    category: 'Writing',
    accent: '#8f55ff',
    medium: 'Poetry',
    status: 'Drafts',
    description:
      'Short written pieces, fragments, and language experiments that explore tone, memory, rhythm, and observation.',
    linkLabel: 'Read More',
  },
  {
    title: 'Visual Studies',
    category: 'Art',
    accent: '#00a77f',
    medium: 'Artwork',
    status: 'Selected work',
    description:
      'A space for sketches, compositions, visual ideas, and experiments that do not need to fit neatly into a product.',
    linkLabel: 'View Work',
  },
  {
    title: 'Photo Notes',
    category: 'Photography',
    accent: '#f2b705',
    medium: 'Photography',
    status: 'Growing collection',
    description:
      'A collection space for images, places, textures, moods, and small visual observations from everyday life.',
    linkLabel: 'Open Gallery',
  },
  {
    title: 'Storytelling Sketches',
    category: 'Storytelling',
    accent: '#e5488b',
    medium: 'Narrative',
    status: 'Exploration',
    description:
      'Narrative concepts, short story ideas, worldbuilding notes, and experiments in shaping emotion through structure.',
    linkLabel: 'Explore',
  },
  {
    title: 'Website Concepts',
    category: 'Design',
    accent: '#ff5c35',
    medium: 'Interface design',
    status: 'Concepts',
    description:
      'A home for website designs, interface explorations, layouts, and visual systems.',
    linkLabel: 'View Concepts',
  },
  {
    title: 'Curious Experiments',
    category: 'Experiments',
    accent: '#16a3b8',
    medium: 'Mixed media',
    status: 'Always changing',
    description:
      'Small tests, odd ideas, unfinished sparks, and other things made to learn what happens when an idea gets built.',
    linkLabel: 'See Experiments',
  },
];

const categoryAccents = {
  Art: '#00a77f',
  Code: '#2457ff',
  Design: '#ff5c35',
  Experiments: '#16a3b8',
  Photography: '#f2b705',
  Poetry: '#8f55ff',
  Storytelling: '#e5488b',
  Writing: '#8f55ff',
};

const collectionDefinitions = {
  artworks: {
    accent: '#00a77f',
    category: 'Art',
    description:
      'Visual studies, artwork, sketches, and image-led experiments gathered into a growing collection.',
    status: 'Growing collection',
    title: 'Artworks',
  },
  design: {
    accent: '#ff5c35',
    category: 'Design',
    description:
      'Personal design pieces, birthday cards, visual systems, and small artifacts made for specific moments.',
    status: 'Growing collection',
    title: 'Personal Design',
  },
  photography: {
    accent: '#f2b705',
    category: 'Photography',
    description:
      'A growing visual collection of photographs, places, textures, light, and small observations.',
    status: 'Growing collection',
    title: 'Photography',
  },
  poetry: {
    accent: '#8f55ff',
    category: 'Poetry',
    description:
      'Poems and fragments arranged as short readings, with snippets you can browse before opening the full piece.',
    status: 'Growing collection',
    title: 'Poetry',
  },
  stories: {
    accent: '#e5488b',
    category: 'Storytelling',
    description:
      'Story sketches, narrative fragments, character ideas, and worlds in progress.',
    status: 'Growing collection',
    title: 'Stories',
  },
  'web-experiments': {
    accent: '#2457ff',
    category: 'Creative Tech',
    description:
      'Websites, small apps, interface concepts, tools, and experiments gathered into one growing space.',
    status: 'Growing collection',
    title: 'Websites & Experiments',
  },
};

const collectionByCategory = {
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

const toTitleCase = (value) =>
  value
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const stripExtension = (value) => value.replace(/\.[^.]+$/, '');

const toFolderKey = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const parseFrontmatter = (rawContent) => {
  const match = rawContent.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { body: rawContent.trim(), data: {} };
  }

  const data = match[1].split('\n').reduce((fields, line) => {
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
  }, {});

  return { body: match[2].trim(), data };
};

const getFolderName = (path) => {
  const parts = path.split('/');
  return parts[parts.length - 2] || 'experiments';
};

const getCollectionSlug = (path) =>
  path.split('/content/collections/')[1]?.split('/')[0] || 'poetry';

const getFilenameSlug = (path) => stripExtension(path.split('/').pop());

const isCollectionGuideFile = (path) => {
  const filename = getFilenameSlug(path).toLowerCase();

  return filename === 'readme' || filename.startsWith('put_') || filename.startsWith('put-');
};

const getExcerpt = (body) =>
  body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/^#+\s*/gm, '').trim())
    .find(Boolean) || '';

const buildPortfolioProjects = () => {
  const imageEntries = Object.entries(portfolioImageFiles);

  return Object.entries(portfolioTextFiles)
    .map(([path, rawContent]) => {
      const folder = getFolderName(path);
      const category = toTitleCase(folder);
      const filename = getFilenameSlug(path);
      const { body, data } = parseFrontmatter(rawContent);
      const projectCategory = data.category || category;
      const collectionSlug = collectionByCategory[projectCategory];
      const collectionDefinition = collectionDefinitions[collectionSlug];
      const firstParagraph = getExcerpt(body);
      const siblingImage = imageEntries.find(([imagePath]) => {
        const imageFolder = getFolderName(imagePath);
        const imageName = getFilenameSlug(imagePath);
        return imageFolder === folder && imageName === filename;
      });

      return {
        accent:
          data.accent ||
          collectionDefinition?.accent ||
          categoryAccents[projectCategory] ||
          categoryAccents[category] ||
          '#16a3b8',
        body,
        category: projectCategory,
        description: data.description || firstParagraph,
        image: data.image || siblingImage?.[1],
        link: collectionSlug ? `#/collections/${collectionSlug}` : data.link,
        linkLabel: collectionSlug
          ? `Open ${collectionDefinition.title}`
          : data.linkLabel || 'Open',
        medium: data.medium || category,
        slug: filename,
        status: data.status || 'Selected work',
        title: data.title || toTitleCase(filename),
      };
    })
    .sort((first, second) => first.title.localeCompare(second.title));
};

const buildCollectionItems = () => {
  const imageEntries = Object.entries(collectionImageFiles);
  const documentEntries = Object.entries(collectionDocumentFiles);
  const textEntries = Object.entries(collectionTextFiles).filter(
    ([path]) => !isCollectionGuideFile(path),
  );
  const textKeys = new Set(
    textEntries.map(([path]) => `${getCollectionSlug(path)}/${getFilenameSlug(path)}`),
  );

  const textItems = textEntries.map(([path, rawContent]) => {
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
      collectionSlug,
      description: data.description || getExcerpt(body),
      document: siblingDocument?.[1],
      image: data.image || siblingImage?.[1],
      link: data.link || siblingDocument?.[1],
      linkLabel: data.linkLabel || (siblingDocument ? 'Open PDF' : 'Open Live Project'),
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
        !textKeys.has(`${getCollectionSlug(path)}/${getFilenameSlug(path)}`),
    )
    .map(([path, image]) => {
      const collectionSlug = getCollectionSlug(path);
      const collection = collectionDefinitions[collectionSlug];
      const filename = getFilenameSlug(path);

      return {
        accent: collection?.accent || '#16a3b8',
        body: '',
        collectionSlug,
        description: `A ${collection?.title.toLowerCase() || 'collection'} item from Nicholas Yun's growing collection.`,
        image,
        link: null,
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

const buildPortfolioGateways = () =>
  portfolioGatewayOrder.map((slug) => {
    const collection = collectionDefinitions[slug];

    return {
      accent: collection.accent,
      category: collection.category,
      description: collection.description,
      image: null,
      link: `#/collections/${slug}`,
      linkLabel: `Open ${collection.title}`,
      medium: null,
      slug,
      status: collection.status || 'Growing collection',
      title: collection.title,
    };
  });

const parseArchiveRoute = (hash) => {
  const match = hash.match(/^#\/(?:archive|collections)\/([^/]+)(?:\/([^/]+))?/);

  if (!match) {
    return null;
  }

  return {
    collectionSlug: match[1],
    itemSlug: match[2] || null,
  };
};

const getPortraitForKey = (key) => {
  const preferredImage = Object.entries(portraitImages).find(([path]) =>
    path.includes(`/portrait/${key}/`),
  );
  const fallbackImage = Object.entries(portraitImages).find(
    ([path]) => !path.replace('./content/portrait/', '').includes('/'),
  );

  return preferredImage?.[1] || fallbackImage?.[1] || '/nicholas-portrait.jpg';
};

const projects = buildPortfolioGateways();
const collectionItems = buildCollectionItems();

const creativeModes = ['Code', 'Design', 'Words', 'Images', 'Stories', 'Experiments'];

const heroSlides = [
  {
    label: 'Creative Technologist',
    portraitKey: 'creative-technologist',
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

const aboutPillars = [
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

const contactLinks = {
  email: 'mailto:nicholasyunzy@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nicholasyunzy/',
  instagram: 'https://www.instagram.com/nyterwyter/',
  github: 'https://github.com/nicholasyunzy',
  wix: 'https://yummyun.wixsite.com/nyterwyter',
};

const socialLinks = [
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

const ABOUT_FADE_DURATION = 900;

function BrandMark() {
  return (
    <svg
      aria-hidden="true"
      className="brand-mark"
      viewBox="0 0 96 96"
    >
      <path
        className="brand-mark-form"
        d="M12 78V18h15l27 35V18h15v24l16-24h15L74 55v23H59V58L27 18v60H12Z"
      />
      <path
        className="brand-mark-slash"
        d="M10 71C35 59 58 41 87 12C75 43 51 66 18 84L10 71Z"
      />
    </svg>
  );
}

function SocialIcon({ icon }) {
  if (icon === 'mail') {
    return (
      <svg aria-hidden="true" className="social-logo mail-logo" viewBox="0 0 24 24">
        <rect
          className="social-logo-stroke"
          height="14"
          rx="2.5"
          width="18"
          x="3"
          y="5"
        />
        <path className="social-logo-stroke" d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (icon === 'linkedin') {
    return (
      <svg aria-hidden="true" className="social-logo" viewBox="0 0 24 24">
        <path d="M5.2 8.9H1.8V22h3.4V8.9ZM3.5 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm7.3 6.9H7.5V22h3.4v-6.7c0-1.8.3-3.5 2.5-3.5 2.2 0 2.2 2 2.2 3.6V22H19v-7.5c0-3.7-.8-6.5-5.1-6.5-2 0-3.4 1.1-4 2.2h-.1V8.9Z" />
      </svg>
    );
  }

  if (icon === 'instagram') {
    return (
      <svg aria-hidden="true" className="social-logo" viewBox="0 0 24 24">
        <rect
          className="social-logo-stroke"
          height="17"
          rx="5"
          width="17"
          x="3.5"
          y="3.5"
        />
        <circle className="social-logo-stroke" cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.2" />
      </svg>
    );
  }

  if (icon === 'github') {
    return (
      <svg aria-hidden="true" className="social-logo" viewBox="0 0 24 24">
        <path d="M12 .8C5.8.8.8 5.8.8 12c0 5 3.2 9.2 7.7 10.7.6.1.8-.2.8-.6v-2.1c-3.1.7-3.8-1.5-3.8-1.5-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3.1 1.1.9-.2 1.8-.4 2.8-.4s1.9.1 2.8.4c2.1-1.4 3.1-1.1 3.1-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2.1v3.2c0 .3.2.7.8.6A11.2 11.2 0 0 0 23.2 12C23.2 5.8 18.2.8 12 .8Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="social-logo wix-logo" viewBox="0 0 32 24">
      <path d="M2 6.5h3.1l2.1 8.1 2.4-8.1h2.6l2.4 8.1 2.1-8.1h3.1L16 19h-2.7L11 11.5 8.7 19H6L2 6.5Z" />
      <path d="M21.1 6.5h2.8V19h-2.8V6.5Z" />
      <path d="M29.8 6.5 27.2 11l2.8 8h-3l-1.5-4.6L22.9 19h-3l4.2-6.9-2-5.6h3l1.1 3.3 1.8-3.3h1.8Z" />
    </svg>
  );
}

function ContentBody({ item }) {
  if (!item.body) {
    return null;
  }

  if (item.collectionSlug === 'poetry') {
    return <pre className="archive-poem">{item.body}</pre>;
  }

  return (
    <div className="archive-prose">
      {item.body.split(/\n\s*\n/).map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

function ArchivePage({ activeItem, collection, items }) {
  const hasItems = items.length > 0;

  return (
    <section
      className="archive-page page-section"
      style={{ '--archive-accent': collection.accent }}
    >
      <div className="archive-header">
        <a className="archive-back" href={activeItem ? `#/collections/${collection.slug}` : '#projects'}>
          {activeItem ? `Back to ${collection.title}` : 'Back to Collections'}
        </a>
        <p className="eyebrow">{collection.category}</p>
        <h1>{activeItem ? activeItem.title : collection.title}</h1>
        <p>{activeItem ? activeItem.description : collection.description}</p>
      </div>

      {activeItem ? (
        <article className="archive-detail">
          {activeItem.image ? (
            <div className="archive-detail-image">
              <img alt="" src={activeItem.image} />
            </div>
          ) : null}
          {activeItem.link ? (
            <a className="archive-live-link" href={activeItem.link}>
              {activeItem.linkLabel}
            </a>
          ) : null}
          <ContentBody item={activeItem} />
        </article>
      ) : (
        <div className="archive-list">
          {hasItems ? (
            items.map((item) => (
              <a
                className="archive-item-card"
                href={`#/collections/${collection.slug}/${item.slug}`}
                key={item.slug}
              >
                {item.image ? (
                  <span className="archive-item-image">
                    <img alt="" src={item.image} />
                  </span>
                ) : null}
                <span className="archive-item-meta">{item.medium}</span>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </a>
            ))
          ) : (
            <div className="archive-empty">
              <h2>No items yet.</h2>
              <p>This growing collection is waiting for its first piece.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function App() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeAboutIndex, setActiveAboutIndex] = useState(0);
  const [isAboutVisible, setIsAboutVisible] = useState(true);
  const [hasPortraitError, setHasPortraitError] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [routeHash, setRouteHash] = useState(() => window.location.hash);
  const aboutFadeTimerRef = useRef(null);
  const heroSlide = heroSlides[activeHeroIndex];
  const currentPortraitImage = getPortraitForKey(
    heroSlide.portraitKey || toFolderKey(heroSlide.label),
  );
  const activeAboutPillar = aboutPillars[activeAboutIndex];
  const archiveRoute = parseArchiveRoute(routeHash);
  const archiveDefinition = archiveRoute
    ? collectionDefinitions[archiveRoute.collectionSlug]
    : null;
  const activeCollection = archiveDefinition
    ? {
        slug: archiveRoute.collectionSlug,
        ...archiveDefinition,
      }
    : null;
  const activeCollectionItems = activeCollection
    ? collectionItems.filter(
        (item) => item.collectionSlug === archiveRoute.collectionSlug,
      )
    : [];
  const activeCollectionItem = archiveRoute?.itemSlug
    ? activeCollectionItems.find((item) => item.slug === archiveRoute.itemSlug)
    : null;
  const handleHeroPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const dx = ((x - 50) / 50) * 18;
    const dy = ((y - 50) / 50) * 18;

    event.currentTarget.style.setProperty('--mx', `${x}%`);
    event.currentTarget.style.setProperty('--my', `${y}%`);
    event.currentTarget.style.setProperty('--dx', `${dx}px`);
    event.currentTarget.style.setProperty('--dy', `${dy}px`);
    event.currentTarget.style.setProperty('--tilt-x', `${(50 - y) * 0.05}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${(x - 50) * 0.05}deg`);
  };

  const handleHeroPointerLeave = (event) => {
    event.currentTarget.style.setProperty('--mx', '50%');
    event.currentTarget.style.setProperty('--my', '50%');
    event.currentTarget.style.setProperty('--dx', '0px');
    event.currentTarget.style.setProperty('--dy', '0px');
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  const showAboutPillar = (nextIndex) => {
    if (nextIndex === activeAboutIndex) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    window.clearTimeout(aboutFadeTimerRef.current);

    if (prefersReducedMotion) {
      setActiveAboutIndex(nextIndex);
      setIsAboutVisible(true);
      return;
    }

    setIsAboutVisible(false);
    aboutFadeTimerRef.current = window.setTimeout(() => {
      setActiveAboutIndex(nextIndex);
      setIsAboutVisible(true);
    }, ABOUT_FADE_DURATION);
  };

  const showHeroSlide = (direction) => {
    setActiveHeroIndex((currentIndex) => {
      if (direction === 'previous') {
        return currentIndex === 0 ? heroSlides.length - 1 : currentIndex - 1;
      }

      return currentIndex === heroSlides.length - 1 ? 0 : currentIndex + 1;
    });
  };

  useEffect(() => {
    const rotation = window.setInterval(() => {
      setActiveHeroIndex((currentIndex) =>
        currentIndex === heroSlides.length - 1 ? 0 : currentIndex + 1,
      );
    }, 10000);

    return () => window.clearInterval(rotation);
  }, []);

  useEffect(() => {
    setHasPortraitError(false);
  }, [currentPortraitImage]);

  useEffect(() => {
    const syncRoute = () => {
      setRouteHash(window.location.hash);
      setIsMenuOpen(false);
    };

    window.addEventListener('hashchange', syncRoute);

    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    return () => window.clearTimeout(aboutFadeTimerRef.current);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const renderProjectCard = (project) => (
    <a
      className="project-card project-gateway"
      href={project.link || '#projects'}
      key={project.title}
      onClick={closeMenu}
      style={{ '--project-accent': project.accent }}
    >
      <div className="project-card-content">
        <div className="project-card-meta">
          <p>{project.category}</p>
          <p>{project.status}</p>
        </div>

        <h3>{project.title}</h3>
        {project.medium ? <p className="project-medium">{project.medium}</p> : null}
        <p>{project.description}</p>
        <span className="project-card-link">{project.linkLabel}</span>
      </div>
    </a>
  );

  return (
    <div className={`site-shell ${isNightMode ? 'theme-night' : 'theme-day'}`}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <div className="site-header-inner">
          <a
            className="brand-link"
            href="#top"
            aria-label="Nicholas Yun home"
            onClick={closeMenu}
          >
            <span className="brand-mark-wrap" aria-hidden="true">
              <BrandMark />
            </span>
            <span className="brand-name">Nicholas Yun</span>
          </a>

          <nav
            aria-label="Main navigation"
            className="site-nav"
            id="site-navigation"
          >
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>

          <button
            aria-label={isNightMode ? 'Switch to day mode' : 'Switch to night mode'}
            aria-pressed={isNightMode}
            className="theme-toggle"
            onClick={() => setIsNightMode((current) => !current)}
            type="button"
          >
            <span aria-hidden="true" />
            {isNightMode ? 'Night' : 'Light'}
          </button>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            className="menu-toggle"
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <button
        aria-label="Close navigation"
        className={`menu-backdrop ${isMenuOpen ? 'is-open' : ''}`}
        onClick={closeMenu}
        tabIndex={isMenuOpen ? 0 : -1}
        type="button"
      />

      <aside
        aria-hidden={!isMenuOpen}
        className={`mobile-drawer ${isMenuOpen ? 'is-open' : ''}`}
        id="mobile-navigation"
      >
        <div className="drawer-top">
          <a className="drawer-brand" href="#top" onClick={closeMenu}>
            <span className="brand-mark-wrap" aria-hidden="true">
              <BrandMark />
            </span>
            <span>Nicholas Yun</span>
          </a>

          <button
            aria-label="Close navigation"
            className="drawer-close"
            onClick={closeMenu}
            type="button"
          >
            X
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="drawer-nav">
          <a aria-label="About" href="#about" onClick={closeMenu}>
            <span>01</span>
            <strong>About</strong>
            <small>Curiosity, craft, and how I think</small>
          </a>
          <a aria-label="Projects" href="#projects" onClick={closeMenu}>
            <span>02</span>
            <strong>Projects</strong>
            <small>Tools, writing, images, and experiments</small>
          </a>
          <a aria-label="Contact" href="#contact" onClick={closeMenu}>
            <span>03</span>
            <strong>Contact</strong>
            <small>Hiring, collaboration, and conversations</small>
          </a>
        </nav>

        <div className="drawer-actions">
          <a className="drawer-contact" href={contactLinks.email} onClick={closeMenu}>
            Email Nicholas
          </a>
          <button
            aria-label={isNightMode ? 'Switch to day mode' : 'Switch to night mode'}
            aria-pressed={isNightMode}
            className="drawer-theme-toggle"
            onClick={() => setIsNightMode((current) => !current)}
            type="button"
          >
            <span aria-hidden="true" />
            {isNightMode ? 'Night mode' : 'Light mode'}
          </button>
        </div>

        <div className="drawer-socials" aria-label="Social links">
          {socialLinks.slice(0, 3).map((link) => (
            <a
              aria-label={link.label}
              href={link.href}
              key={link.label}
              onClick={closeMenu}
            >
              <SocialIcon icon={link.icon} />
            </a>
          ))}
        </div>
      </aside>

      <main id="main-content">
        {activeCollection ? (
          <ArchivePage
            activeItem={activeCollectionItem}
            collection={activeCollection}
            items={activeCollectionItems}
          />
        ) : (
          <>
            <div id="top" aria-hidden="true" />

            <section
              className="hero-section"
              aria-labelledby="hero-title"
              onPointerLeave={handleHeroPointerLeave}
              onPointerMove={handleHeroPointerMove}
              style={{
                '--slide-accent': heroSlide.accent,
                '--slide-alt': heroSlide.secondaryAccent,
              }}
            >
          <div className="hero-backdrop" aria-hidden="true">
            <div className="light-sheet light-sheet-one" />
            <div className="light-sheet light-sheet-two" />
            <div className="light-sheet light-sheet-three" />
            <div className="ny-ghost">NY</div>
          </div>

          <div className="hero-layout">
            <div className="hero-content">
              <p className="eyebrow">{heroSlide.label}</p>
              <h1 id="hero-title">Nicholas Yun</h1>
              <p className="hero-kicker">{heroSlide.headline}</p>
              <p className="hero-copy">{heroSlide.subtitle}</p>

              <div className="hero-actions" aria-label="Primary actions">
                <a
                  className="button primary"
                  href={contactLinks.email}
                >
                  Contact Me
                </a>
                <a className="button secondary" href={contactLinks.linkedin}>
                  Connect on LinkedIn
                </a>
              </div>

              <p className="hero-slide-note">{heroSlide.artifactTitle}</p>
            </div>

            <aside
              className="hero-showcase"
              aria-label="Interactive portfolio introduction"
            >
              <button
                aria-label="Previous hero panel"
                className="hero-arrow hero-arrow-left"
                onClick={() => showHeroSlide('previous')}
                type="button"
              >
                ‹
              </button>

              <div className="hero-stage" aria-live="polite" key={heroSlide.label}>
                <div className="portrait-shell">
                  <div className="portrait-frame">
                    <img
                      alt="Nicholas Yun"
                      onError={() => setHasPortraitError(true)}
                      src={currentPortraitImage}
                    />
                    {hasPortraitError && (
                      <div className="portrait-fallback" aria-hidden="true">
                        <span>NY</span>
                        <small>Portrait</small>
                      </div>
                    )}
                  </div>

                  <div className="portrait-caption">
                    <p>{heroSlide.label}</p>
                    <h2>{heroSlide.headline}</h2>
                  </div>

                  <div className="portrait-orbit-tags" aria-label="Creative mediums">
                    {creativeModes.map((mode) => (
                      <span key={mode}>{mode}</span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                aria-label="Next hero panel"
                className="hero-arrow hero-arrow-right"
                onClick={() => showHeroSlide('next')}
                type="button"
              >
                ›
              </button>

              <div className="hero-dots" aria-label="Hero panels">
                {heroSlides.map((slide, index) => (
                  <button
                    aria-label={`Show ${slide.label}`}
                    aria-pressed={index === activeHeroIndex}
                    className={index === activeHeroIndex ? 'is-active' : ''}
                    key={slide.label}
                    onClick={() => setActiveHeroIndex(index)}
                    type="button"
                  />
                ))}
              </div>
            </aside>
          </div>

          <a className="scroll-cue" href="#about">
            <span>Explore</span>
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section id="about" className="page-section about-section">
          <div className="about-layout">
            <div className="section-header">
              <p className="eyebrow">About</p>
              <h2>Curious by nature. Intentional by practice.</h2>
            </div>

            <div className="about-summary">
              <p className="about-lede">
                Creative technologist.
              </p>
              <p>
                Ideas into tools, visuals, stories, and small digital products.
              </p>
            </div>
          </div>

          <div className="about-flow" aria-label="About focus">
            <div className="about-flow-rail" aria-label="About focus controls">
              {aboutPillars.map((pillar, index) => (
                <button
                  aria-controls="about-panel"
                  aria-pressed={index === activeAboutIndex}
                  className={`about-flow-step ${
                    index === activeAboutIndex ? 'is-active' : ''
                  }`}
                  key={pillar.title}
                  onClick={() => showAboutPillar(index)}
                  type="button"
                >
                  <span>{pillar.title}</span>
                </button>
              ))}
            </div>

            <div
              aria-live="off"
              className="about-panel"
              id="about-panel"
            >
              <div className="about-panel-sizer" aria-hidden="true">
                {aboutPillars.map((pillar) => (
                  <article className="about-panel-sizer-content" key={pillar.title}>
                    <h3>{pillar.title}</h3>
                    {pillar.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </article>
                ))}
              </div>
              <article
                className={`about-panel-content ${
                  isAboutVisible ? 'is-visible' : ''
                }`}
              >
                <h3>{activeAboutPillar.title}</h3>
                {activeAboutPillar.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            </div>
          </div>
        </section>

        <section id="projects" className="page-section projects-section">
          <div className="projects-layout">
            <div className="section-header">
              <p className="eyebrow">Portfolio</p>
              <h2>Growing Collections</h2>
              <p>
                Six entrances into the things I make and keep making.
              </p>
            </div>

            <p className="projects-note">
              Open a collection. Follow the thread.
            </p>
          </div>

          <div className="project-grid">
            {projects.map(renderProjectCard)}
          </div>
        </section>

            <section id="contact" className="page-section contact-section">
          <div className="contact-compact">
            <p className="eyebrow">Contact</p>
            <h2>Let's build something together.</h2>
            <p>
              Email is best. The rest of the trail is below.
            </p>

            <div className="contact-actions">
              <a className="button primary" href={contactLinks.email}>
                <SocialIcon icon="mail" />
                Email Nicholas
              </a>
            </div>

            <p className="elsewhere-label">Elsewhere online</p>
            <div className="social-icon-row" aria-label="Social links">
              {socialLinks.map((link) => (
                <a
                  aria-label={link.label}
                  className="social-icon-link"
                  href={link.href}
                  key={link.label}
                >
                  <span className="social-mark" aria-hidden="true">
                    <SocialIcon icon={link.icon} />
                  </span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
            </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        <p>© 2026 Nicholas Yun</p>
        <div className="footer-contact">
          <a className="footer-email" href={contactLinks.email}>
            <SocialIcon icon="mail" />
            Email
          </a>
          <div className="footer-icon-row" aria-label="Footer social links">
            {socialLinks.map((link) => (
              <a
                aria-label={link.label}
                className="footer-icon-link"
                href={link.href}
                key={link.label}
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
