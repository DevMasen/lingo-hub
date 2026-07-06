import { Link } from 'react-router';
//---

function LinkItem({ children, to, onClick, onOpenModal, extraClasses }) {
  function handleClick(event) {
    if (onOpenModal) {
      event.preventDefault();
      event.stopPropagation();
      onOpenModal(event);
    }

    onClick?.(event);
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`flex items-center gap-2 rounded-lg p-3 transition-all duration-300 hover:bg-[var(--color-slate-800)] ${extraClasses}`}
    >
      {children}
    </Link>
  );
}

export default LinkItem;
