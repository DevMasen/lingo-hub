import { NavLink } from 'react-router';
//---

function NavItem({ children, to = '', extraClasses = '', onClick = () => {}, onCloseModal }) {
  function handleClick(event) {
    if (onCloseModal) {
      event.preventDefault();
      event.stopPropagation();
      onCloseModal(event);
      return;
    }

    onClick(event);
  }

  //! JSX
  return (
    <li>
      <NavLink
        className={`flex items-center gap-3 p-2 font-semibold text-[var(--color-slate-300)] transition-all duration-300 ${extraClasses}`}
        onClick={handleClick}
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
}

export default NavItem;
