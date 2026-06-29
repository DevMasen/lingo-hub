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
  //! JSX
  if (type === 'submit')
    return (
      <button
        type="submit"
        onClick={onClick}
        ref={ref}
        className={`flex items-center justify-center gap-2 border-2 border-[var(--color-slate-800)] bg-slate-900/80 text-[var(--color-slate-200)] shadow-md shadow-[var(--color-slate-700)] transition-all duration-200 hover:bg-[var(--color-slate-800)] disabled:cursor-not-allowed ${extraClasses}`}
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
      className={`flex items-center justify-center gap-2 border-2 border-[var(--color-slate-800)] bg-slate-900/80 text-[var(--color-slate-200)] shadow-md shadow-[var(--color-slate-700)] transition-all duration-200 hover:bg-[var(--color-slate-800)] focus:outline-none focus:ring-1 focus:ring-[var(--color-slate-900)] focus:ring-offset-1 disabled:cursor-not-allowed ${extraClasses}`}
      disabled={disabled}
    >
      {children}
    </Link>
  );
}

export default HomeButton;
