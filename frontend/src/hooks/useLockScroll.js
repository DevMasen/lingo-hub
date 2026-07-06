import { useEffect } from 'react';
//---
export function useLockScroll(isOpen) {
  useEffect(() => {
    document.body.classList.toggle('body-scroll-lock', isOpen);

    return () => {
      document.body.classList.remove('body-scroll-lock');
    };
  }, [isOpen]);
}
