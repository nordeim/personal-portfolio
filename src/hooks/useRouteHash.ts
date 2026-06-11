import { useState, useEffect } from 'react';

export function useRouteHash(): string {
  const [hash, setHash] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash : '',
  );

  useEffect(() => {
    const syncRoute = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  return hash;
}
