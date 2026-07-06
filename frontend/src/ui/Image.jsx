import { useState } from 'react';
//---

function Image({ src, placeholderSrc, alt, ...props }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', zIndex: '40' }}
      className={props.className}
    >
      <img
        src={placeholderSrc}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(20px)',
          transform: 'scale(1.1)',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.4s ease-out',
        }}
      />

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease-out',
        }}
        {...props}
      />
    </div>
  );
}

export default Image;
