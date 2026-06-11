import { useState, useEffect, useCallback } from 'react';

interface WeightedScrollState {
  velocity: number;
  direction: 'up' | 'down' | 'idle';
  fontWeight: number;
}

export function useWeightedScroll(): WeightedScrollState {
  const [state, setState] = useState<WeightedScrollState>({
    velocity: 0,
    direction: 'idle',
    fontWeight: 950,
  });

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const now = performance.now();

    setState((previous) => {
      const elapsed = now - (previous as WeightedScrollState & { _timestamp: number })._timestamp;
      if (elapsed === 0) return previous;

      const velocity = Math.abs(scrollY - (previous as WeightedScrollState & { _scrollY: number })._scrollY) / elapsed;
      const direction = scrollY > (previous as WeightedScrollState & { _scrollY: number })._scrollY ? 'down' : scrollY < (previous as WeightedScrollState & { _scrollY: number })._scrollY ? 'up' : 'idle';

      // Map velocity to font-weight: fast = thin (200), slow = heavy (950)
      const clampedVelocity = Math.min(velocity, 3);
      const fontWeight = Math.round(950 - clampedVelocity * 250);

      return {
        velocity,
        direction,
        fontWeight: Math.max(200, fontWeight),
        _timestamp: now,
        _scrollY: scrollY,
      } as WeightedScrollState;
    });
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  return {
    velocity: state.velocity,
    direction: state.direction,
    fontWeight: state.fontWeight,
  };
}
