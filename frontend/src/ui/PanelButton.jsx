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
  const hasTextStyle = extraClasses?.includes('text-');

  if (to.length === 0)
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${extraClasses} ${!hasBackground && 'bg-indigo-700/90 hover:bg-[var(--color-indigo-500)] disabled:hover:bg-indigo-700/90'} ${!hasTextStyle && 'text-lg text-slate-200'} flex cursor-pointer items-center justify-center rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45`}
      >
        {children}
      </button>
    );

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${extraClasses} ${!hasBackground && 'bg-indigo-700/90 hover:bg-[var(--color-indigo-500)] '} ${!hasTextStyle && 'text-lg text-slate-200'} flex items-center justify-center rounded-xl transition-all duration-300`}
    >
      {children}
    </Link>
  );
}

export default PanelButton;
