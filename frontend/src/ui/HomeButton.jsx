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

  //! JSX
  if (type === 'submit')
    return (
      <button
        type="submit"
        onClick={onClick}
        ref={ref}
        className={`${extraClasses} ${!hasBackground && 'bg-slate-900/80'} flex items-center justify-center gap-2 text-slate-200 shadow-md shadow-gray-900 transition-all duration-200 hover:translate-y-[-0.25rem] hover:shadow-lg hover:shadow-gray-900 disabled:cursor-not-allowed`}
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
      className={`${extraClasses} ${!hasBackground && 'bg-slate-900/80'} flex items-center justify-center gap-2 text-slate-200 shadow-md shadow-gray-900 transition-all duration-200 hover:translate-y-[-0.25rem] hover:shadow-lg hover:shadow-gray-900`}
    >
      {children}
    </Link>
  );
}

export default HomeButton;
