import { NavLink } from 'react-router';

function NavItem({ children, to = '', extraClasses = '', onClick = () => {} }) {
  return (
    <li>
      <NavLink
        className={`flex items-center gap-3 p-2 font-semibold text-slate-300 transition-all duration-300 ${extraClasses}`}
        onClick={onClick}
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
}

export default NavItem;
