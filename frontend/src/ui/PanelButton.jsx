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
  if (to.length === 0)
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${extraClasses} flex cursor-pointer items-center justify-center rounded-xl bg-indigo-700/90 text-lg font-medium text-slate-200 transition-all duration-200 hover:bg-[var(--color-indigo-500)] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-indigo-700/90`}
      >
        {children}
      </button>
    );

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${extraClasses} flex items-center justify-center rounded-xl bg-indigo-700/90 text-lg font-medium text-slate-200 transition-all duration-300 hover:bg-[var(--color-indigo-500)]`}
    >
      {children}
    </Link>
  );
}

export default PanelButton;
