import NavItem from './NavItem';
import { AiOutlineDashboard } from 'react-icons/ai';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiExit } from 'react-icons/bi';
import ExitModal from './ExitModal';
import { useSidebar } from '../context/SidebarContext';
import { useExit } from '../context/ExitContex';

function NavList() {
  const { isSidebarOpen } = useSidebar();
  const { toggleExitWindow } = useExit();
  return (
    <ul className="my-3 flex w-full flex-col justify-between">
      <ExitModal />
      <section className="space-y-3 px-3">
        <NavItem extraClasses="nav-link" to={'dashboard'}>
          <AiOutlineDashboard />
          {isSidebarOpen && <span> داشبورد </span>}
        </NavItem>
        <NavItem extraClasses="nav-link" to={'rooms'}>
          <HiOutlineBookOpen />
          {isSidebarOpen && <span> رزرو اتاق </span>}
        </NavItem>
      </section>

      <section className="space-y-3 px-3">
        <NavItem extraClasses="nav-link" to={'setting'}>
          <AiOutlineSetting />
          {isSidebarOpen && <span> تنظیمات </span>}
        </NavItem>
        <NavItem
          extraClasses="exit hover:text-slate-200 hover:bg-slate-800 hover:rounded-xl"
          to="dashboard"
          onClick={toggleExitWindow}
        >
          <BiExit />
          {isSidebarOpen && <span> خروج </span>}
        </NavItem>
      </section>
    </ul>
  );
}

export default NavList;
