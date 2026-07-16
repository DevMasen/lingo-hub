import { useEffect } from 'react';
//---
export function useLockScroll(isOpen, type) {
  //! Derived States
  const className = type === 'sidebar' ? 'body-scroll-lock' : 'overflow-hidden';

  //! Effects
  useEffect(() => {
    document.body.classList.toggle(className, isOpen);

    return () => {
      document.body.classList.remove(className);
    };
  }, [isOpen, className]);
}
