import { Link } from 'react-router';

function LinkItem({ children, to, onClick, extraClasses }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg p-3 transition-all duration-300 hover:bg-slate-800 ${extraClasses}`}
    >
      {children}
    </Link>
  );
}

export default LinkItem;
