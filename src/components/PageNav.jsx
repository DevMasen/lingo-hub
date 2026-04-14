import { NavLink } from 'react-router';
import Logo from './Logo';

function PageNav() {
  return (
    <nav className="m-3 flex items-center justify-between rounded-lg bg-slate-300 px-5 py-3">
      <Logo />
      <ul className="flex items-center gap-6 font-medium">
        <li>
          <NavLink to="/">خانه</NavLink>
        </li>
        <li>
          <NavLink to="/aboutus">درباره ما</NavLink>
        </li>
        <li>
          <NavLink to="/login" className="rounded-md bg-slate-800 px-4 py-2 text-slate-100">
            ورود
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
