import { Link, useNavigate } from 'react-router';

import Logo from './Logo';
import HomeButton from './HomeButton';
import Menus from './Menus';
import { HiHome, HiOutlineInformationCircle } from 'react-icons/hi2';
//---

const iconStyles = 'w-[1.6rem] h-[1.6rem] text-indigo-700 transition-all duration-[0.3s]';

function PageNav() {
  const navigate = useNavigate();
  return (
    <nav className="m-3 flex items-center justify-between rounded-lg bg-slate-600/65 px-5 py-3 text-slate-200">
      <Logo />
      <div className="flex gap-5">
        <ul className="hidden items-center gap-6 font-medium sm:flex">
          <li>
            <Link to="/home">خانه</Link>
          </li>
          <li>
            <Link to="/about-us">درباره ما</Link>
          </li>
        </ul>
        <HomeButton to={'/login'} extraClasses={'px-3 py-2 rounded-lg'}>
          ورود / ثبت‌نام
        </HomeButton>
      </div>
      <Menus>
        <Menus.Menu>
          <Menus.Toggle id={'homeMenu'} />
          <Menus.List id={'homeMenu'}>
            <Menus.Button
              onClick={() => navigate('/home')}
              icon={<HiHome className={iconStyles} />}
            >
              خانه
            </Menus.Button>
            <Menus.Button
              onClick={() => navigate('/about-us')}
              icon={<HiOutlineInformationCircle className={iconStyles} />}
            >
              درباره ما
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Menus>
    </nav>
  );
}

export default PageNav;
