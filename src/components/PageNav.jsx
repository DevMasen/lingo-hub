import { Link } from 'react-router';
import Logo from './Logo';

function PageNav() {
  return (
    <nav className="m-3 flex items-center justify-between rounded-lg bg-slate-600 bg-opacity-65 px-5 py-3 text-slate-200">
      <Logo />
      <ul className="flex items-center gap-6 font-medium">
        <li>
          <Link to="/">خانه</Link>
        </li>
        <li>
          <Link to="/aboutus">درباره ما</Link>
        </li>
        <li>
          <Link to="/login" className="rounded-md bg-slate-800 px-4 py-2">
            ورود / ثبت‌نام
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
