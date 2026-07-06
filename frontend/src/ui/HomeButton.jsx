import { Link } from 'react-router';
//---

function HomeButton({
  children,
  to,
  onClick = () => {},
  extraClasses,
  type = 'button',
  disabled,
  ref,
}) {
  const hasBackground = extraClasses?.includes('bg-');
  const hasHoverTranslate = extraClasses?.includes('hover:translate-');
  const hasShadow = extraClasses?.includes('shadow-');

  //! JSX
  if (type === 'submit')
    return (
      <button
        type="submit"
        onClick={onClick}
        ref={ref}
        className={`${extraClasses} ${!hasBackground && 'bg-slate-900/80'} ${!hasHoverTranslate && 'hover:translate-y-[-0.25rem]'} ${!hasShadow && 'shadow-md shadow-gray-900 hover:shadow-lg hover:shadow-gray-900'} flex items-center justify-center gap-2 text-slate-200 transition-all duration-200 disabled:cursor-not-allowed`}
        disabled={disabled}
      >
        {children}
      </button>
    );

  return (
    <Link
      onClick={onClick}
      to={to}
      ref={ref}
      className={`${extraClasses} ${!hasBackground && 'bg-slate-900/80'} ${!hasHoverTranslate && 'hover:translate-y-[-0.25rem]'} ${!hasShadow && 'shadow-md shadow-gray-900 hover:shadow-lg hover:shadow-gray-900'} flex items-center justify-center gap-2 text-slate-200 transition-all duration-200`}
    >
      {children}
    </Link>
  );
}

export default HomeButton;
