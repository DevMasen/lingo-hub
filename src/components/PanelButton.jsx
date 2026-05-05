import { Link } from 'react-router';
////////////////////////////////////

function PanelButton({
  children,
  to = '',
  onClick = () => {},
  extraClasses = '',
  disabled = false,
}) {
  if (to.length === 0)
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${extraClasses} flex cursor-pointer items-center justify-center rounded-xl bg-indigo-700/90 text-lg font-medium transition-all duration-300 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:hover:bg-indigo-700/90`}
      >
        {children}
      </button>
    );

  return (
    <Link
      to={to}
      className={`${extraClasses} flex items-center justify-center rounded-xl bg-indigo-700/90 text-lg font-medium transition-all duration-300 hover:bg-indigo-500`}
    >
      {children}
    </Link>
  );
}

export default PanelButton;
