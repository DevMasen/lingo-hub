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
        className={`flex items-center justify-center gap-2 bg-slate-900/80 text-slate-200 shadow-md shadow-gray-900 transition-all duration-200 hover:translate-y-[-0.25rem] hover:shadow-lg hover:shadow-gray-900 disabled:cursor-not-allowed ${extraClasses}`}
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
      className={`flex items-center justify-center gap-2 bg-slate-900/80 text-slate-200 shadow-md shadow-gray-900 transition-all duration-200 hover:translate-y-[-0.25rem] hover:shadow-lg hover:shadow-gray-900 ${extraClasses}`}
    >
      {children}
    </Link>
  );
}

export default HomeButton;
