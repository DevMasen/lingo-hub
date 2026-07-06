import { Link } from 'react-router';
//---

function PanelButton({
  children,
  to = '',
  onClick = () => {},
  extraClasses = '',
  disabled = false,
  type = 'button',
}) {
  const hasBackground = extraClasses?.includes('bg-');

  if (to.length === 0)
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${extraClasses} ${!hasBackground && 'bg-indigo-700/90 hover:bg-[var(--color-indigo-500)] disabled:hover:bg-indigo-700/90'} flex cursor-pointer items-center justify-center rounded-xl text-lg font-medium text-slate-200 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45`}
      >
        {children}
      </button>
    );

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${extraClasses} ${!hasBackground && 'bg-indigo-700/90 hover:bg-[var(--color-indigo-500)] '} flex items-center justify-center rounded-xl text-lg font-medium text-slate-200 transition-all duration-300`}
    >
      {children}
    </Link>
  );
}

export default PanelButton;
