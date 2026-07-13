import { useEffect } from 'react';
//---
export function useLockScroll(isOpen, type) {
  const className = type === 'sidebar' ? 'body-scroll-lock' : 'overflow-hidden';
  useEffect(() => {
    document.body.classList.toggle(className, isOpen);

    return () => {
      document.body.classList.remove(className);
    };
  }, [isOpen, className]);
}
