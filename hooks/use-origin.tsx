import { useState, useEffect } from 'react';

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);

  const origin =
    typeof window && window !== undefined && window.location.origin
      ? window.location.origin
      : '';

  useEffect(() => {
    setMounted(true);
  }, []);

  return origin;
};
