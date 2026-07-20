import { Link, useNavigate } from 'react-router';
import { HiHome, HiOutlineInformationCircle } from 'react-icons/hi2';
import Logo from './Logo';
import HomeButton from './HomeButton';
import Menus from './Menus';
//---

//! Global Const Variables
const iconStyles = 'w-[1.6rem] h-[1.6rem] text-indigo-700 transition-all duration-[0.3s]';
const linkStyles =
  'transition-all text-slate-300 duration-300 hover:translate-y-[-3px] hover:scale-110 hover:text-slate-100';

function PageNav() {
  //! React Router
  const navigate = useNavigate();

  //! Main JSX
  return (
    <nav className="m-3 flex items-center justify-between rounded-lg bg-slate-600/65 px-5 py-3 text-slate-200">
      <Logo />
      <div className="flex gap-5">
        <ul className="hidden items-center gap-6 font-medium sm:flex">
          <li className={linkStyles}>
            <Link to="/home" className="group relative">
              خانه
              <div className="absolute bottom-0 right-0 h-[2px] w-0 rounded-full bg-slate-200 transition-all duration-300 group-hover:w-full"></div>
            </Link>
          </li>
          <li className={linkStyles}>
            <Link to="/about-us" className="group relative">
              درباره ما
              <div className="absolute bottom-0 right-0 h-[2px] w-0 rounded-full bg-slate-200 transition-all duration-300 group-hover:w-full"></div>
            </Link>
          </li>
        </ul>
        <HomeButton to={'/login'} className={'rounded-lg px-3 py-2'}>
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
