import { useImageLoaded } from '../hooks/useImageLoaded';
//---

function HeroBackground({ src, placeholderSrc, children }) {
  const loaded = useImageLoaded(src);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }} className="h-dvh">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${placeholderSrc})`,
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
          backgroundImage: loaded ? `url(${src})` : 'none',
          backgroundSize: 'cover',
          filter: 'blur(3px) brightness(0.8)',
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
