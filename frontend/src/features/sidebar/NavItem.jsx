import { NavLink } from 'react-router';
//---

function NavItem({ children, className = '', to = '', onClick = () => {} }) {
  //! Main JSX
  return (
    <li>
      <NavLink className={className} onClick={onClick} to={to}>
        {children}
      </NavLink>
    </li>
  );
}

export default NavItem;
