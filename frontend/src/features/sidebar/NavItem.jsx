import { NavLink } from 'react-router';
import { useHeader } from '../header/HeaderContext';
//---

function NavItem({ children, className, to = '', onClick = () => {} }) {
  //! JSX
  return (
    <li>
      <NavLink className={className} onClick={onClick} to={to}>
        {children}
      </NavLink>
    </li>
  );
}

export default NavItem;
