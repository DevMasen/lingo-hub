import { useEffect, useState } from 'react';
//---

export function useImageLoaded(src) {
  //! Local States
  const [loaded, setLoaded] = useState(false);

  //! Effects
  useEffect(() => {
    setLoaded(false); // reset if src changes
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return loaded;
}
