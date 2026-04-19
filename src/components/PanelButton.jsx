import { Link } from 'react-router';

function PanelButton({ children, to, extraClasses = '' }) {
  return (
    <Link
      to={to}
      className={`flex items-center justify-center rounded-xl border border-indigo-300 bg-indigo-700 text-lg font-medium transition-all duration-300 hover:bg-indigo-500 ${extraClasses}`}
    >
      {children}
    </Link>
  );
}

export default PanelButton;
