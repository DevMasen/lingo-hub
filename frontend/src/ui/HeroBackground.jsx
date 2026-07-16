import { useImageLoaded } from '../hooks/useImageLoaded';
//---

function HeroBackground({ src, placeholderSrc, children }) {
  //! Custom Hooks
  const loaded = useImageLoaded(src);

  //! Main JSX
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }} className="h-dvh">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(36, 42, 46, 0.8), rgba(36, 42, 46, 0.8)), url(${placeholderSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
          transform: 'scale(1.1)',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.4s ease-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: loaded
            ? `linear-gradient(rgba(36, 42, 46, 0.8), rgba(36, 42, 46, 0.8)), url(${src})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease-out',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

export default HeroBackground;
