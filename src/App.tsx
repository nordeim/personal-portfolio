import { useEffect, useState } from 'react';
import '@/styles/index.css';
import { heroSlides, aboutPillars, projects, collectionItems, collectionDefinitions, contactLinks, socialLinks, parseArchiveRoute } from '@/lib/data';
import type { Collection, CollectionItem } from '@/lib/types';
import { Navigation } from '@/components/Navigation';
import { HeroKinetic } from '@/components/HeroKinetic';
import { AboutFlow } from '@/components/AboutFlow';
import { BentoGrid } from '@/components/BentoGrid';
import { ArchiveSpread } from '@/components/ArchiveSpread';
import { ContactSection } from '@/components/ContactSection';
import { GrainOverlay } from '@/components/GrainOverlay';
import { MachineOverlay } from '@/components/MachineOverlay';
import { SocialIcon } from '@/components/SocialIcon';
import { useRouteHash } from '@/hooks/useRouteHash';

function App() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMachineOpen, setIsMachineOpen] = useState(false);
  const routeHash = useRouteHash();

  const heroSlide = heroSlides[activeHeroIndex]!;
  const archiveRoute = parseArchiveRoute(routeHash);
  const archiveDefinition = archiveRoute
    ? collectionDefinitions[archiveRoute.collectionSlug]
    : undefined;
  const activeCollection: Collection | null = archiveDefinition && archiveRoute
    ? { ...archiveDefinition, slug: archiveRoute.collectionSlug }
    : null;
  const activeCollectionSlug = archiveRoute?.collectionSlug ?? '';
  const activeCollectionItems: CollectionItem[] = activeCollection
    ? collectionItems.filter(
        (item) => item.collectionSlug === activeCollectionSlug,
      )
    : [];
  const activeCollectionItem = archiveRoute?.itemSlug
    ? activeCollectionItems.find((item) => item.slug === archiveRoute.itemSlug) ?? null
    : null;

  // Hero auto-rotation
  useEffect(() => {
    const rotation = window.setInterval(() => {
      setActiveHeroIndex((currentIndex) =>
        currentIndex === heroSlides.length - 1 ? 0 : currentIndex + 1,
      );
    }, 10000);

    return () => window.clearInterval(rotation);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const showHeroSlide = (direction: 'previous' | 'next') => {
    setActiveHeroIndex((currentIndex) => {
      if (direction === 'previous') {
        return currentIndex === 0 ? heroSlides.length - 1 : currentIndex - 1;
      }
      return currentIndex === heroSlides.length - 1 ? 0 : currentIndex + 1;
    });
  };

  // Machine overlay data
  const machineData = {
    buildVersion: '2.0.0',
    route: routeHash || '#/',
    collections: Object.fromEntries(
      Object.keys(collectionDefinitions).map((slug) => [
        slug,
        collectionItems.filter((item) => item.collectionSlug === slug).length,
      ]),
    ),
    activeData: activeCollection
      ? { collection: activeCollection, item: activeCollectionItem }
      : null,
  };

  return (
    <div className={`relative min-h-screen ${isNightMode ? 'theme-night' : 'theme-day'}`}>
      <a className="fixed top-3 left-3 z-20 -translate-y-[160%] p-2.5 border border-white/13 rounded-lg bg-white shadow-[0_10px_30px_rgba(19,27,43,0.08)] focus:translate-y-0" href="#main-content">
        Skip to main content
      </a>

      <Navigation
        isNightMode={isNightMode}
        onThemeToggle={() => setIsNightMode((current) => !current)}
        onMenuToggle={() => setIsMenuOpen((current) => !current)}
        isMenuOpen={isMenuOpen}
        onNavigate={closeMenu}
        onMachineToggle={() => setIsMachineOpen((current) => !current)}
      />

      <main id="main-content">
        {activeCollection ? (
          <ArchiveSpread
            activeItem={activeCollectionItem}
            collection={activeCollection}
            items={activeCollectionItems}
          />
        ) : (
          <>
            <div id="top" aria-hidden="true" />

            <HeroKinetic
              slide={heroSlide}
              activeIndex={activeHeroIndex}
              totalSlides={heroSlides.length}
              onPrev={() => showHeroSlide('previous')}
              onNext={() => showHeroSlide('next')}
              onDotClick={(index) => setActiveHeroIndex(index)}
            />

            <AboutFlow pillars={aboutPillars} />

            <BentoGrid projects={projects} onCloseMenu={closeMenu} />

            <ContactSection />
          </>
        )}
      </main>

      <footer className="flex items-center justify-between gap-6 px-12 py-8 border-t border-white/10 bg-[#07080d] text-white [.theme-day_&]:border-[rgba(21,21,27,0.08)] [.theme-day_&]:bg-[#fff8e8] [.theme-day_&]:text-[#15151b] max-[760px]:flex-col max-[760px]:px-6 max-[760px]:py-8">
        <p className="text-white/72 [.theme-day_&]:text-[rgba(21,21,27,0.72)]">© 2026 Nicholas Yun</p>
        <div className="flex flex-wrap items-center gap-4">
          <a className="inline-flex items-center gap-2 text-white font-bold [.theme-day_&]:text-[rgba(21,21,27,0.72)]" href={contactLinks.email}>
            <SocialIcon icon="mail" />
            Email
          </a>
          <div className="flex flex-wrap gap-2" aria-label="Footer social links">
            {socialLinks.map((link) => (
              <a
                aria-label={link.label}
                className="grid place-items-center w-[34px] h-[34px] border border-white/24 rounded-full text-white hover:border-white hover:bg-white hover:text-[#07080d] transition-colors [.theme-day_&]:border-[rgba(21,21,27,0.14)] [.theme-day_&]:text-[rgba(21,21,27,0.72)] [.theme-day_&]:hover:border-[#15151b] [.theme-day_&]:hover:bg-[#15151b] [.theme-day_&]:hover:text-[#fff8e8]"
                href={link.href}
                key={link.label}
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <GrainOverlay />
      <MachineOverlay
        isOpen={isMachineOpen}
        onClose={() => setIsMachineOpen(false)}
        data={machineData}
      />
    </div>
  );
}

export default App;
