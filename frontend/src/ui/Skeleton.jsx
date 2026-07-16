//! Global Const Variables
const baseClasses = 'relative overflow-hidden bg-gray-200 dark:bg-gray-700';

//! Main JSX
const shimmerOverlay = (
  <div
    className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10"
    aria-hidden="true"
  />
);

function SkeletonBox({ className = '' }) {
  //! Main JSX
  return <div className={`${baseClasses} rounded-md ${className}`}>{shimmerOverlay}</div>;
}

function SkeletonCircle({ className = '' }) {
  //! Main JSX
  return <div className={`${baseClasses} rounded-full ${className}`}>{shimmerOverlay}</div>;
}

function SkeletonText({ lines = 1, className = '' }) {
  //! Main JSX
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`${baseClasses} h-4 rounded ${
            // last line is shorter, feels more natural
            i === lines - 1 && lines > 1 ? 'w-2/3' : 'w-full'
          }`}
        >
          {shimmerOverlay}
        </div>
      ))}
    </div>
  );
}

/**
 * @param {"box" | "circle" | "text"} variant
 * @param {number} lines - only used when variant="text"
 * @param {string} className - sizing/spacing overrides (e.g. "h-6 w-40")
 */
export default function Skeleton({ variant = 'box', lines = 1, className = '' }) {
  //! Conditional JSX
  if (variant === 'circle') return <SkeletonCircle className={className} />;
  if (variant === 'text') return <SkeletonText lines={lines} className={className} />;

  //! Main JSX
  return <SkeletonBox className={className} />;
}
