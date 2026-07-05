import { HiOutlineBookOpen } from 'react-icons/hi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiExit, BiWallet } from 'react-icons/bi';

import NavItem from './NavItem';
import ExitModal from '../../ui/ExitModal';

import { useSidebar } from './SidebarContext';
import { useExit } from '../../context/ExitContext';
//---

function NavList() {
  //! Context Data
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { toggleExitWindow } = useExit();

  function handleToggleSidebar(isOpen) {
    if (isOpen) toggleSidebar();
  }

  //!JSX
  return (
    <ul className="my-3 flex w-full flex-col justify-between">
      <ExitModal />
      <section className="space-y-3 px-3">
        <NavItem
          extraClasses="nav-link"
          tooltipContent={'داشبورد'}
          to={'dashboard'}
          onClick={() => handleToggleSidebar(isSidebarOpen)}
        >
          <AiOutlineDashboard />
          {isSidebarOpen && <span> داشبورد </span>}
        </NavItem>
        <NavItem
          extraClasses="nav-link"
          tooltipContent={'رزرو اتاق'}
          to={'reserve'}
          onClick={() => handleToggleSidebar(isSidebarOpen)}
        >
          <HiOutlineBookOpen />
          {isSidebarOpen && <span> رزرو اتاق </span>}
        </NavItem>
        <NavItem
          extraClasses="nav-link"
          tooltipContent={'افزایش وجه'}
          to={'wallet'}
          onClick={() => handleToggleSidebar(isSidebarOpen)}
        >
          <BiWallet />
          {isSidebarOpen && <span> افزایش وجه </span>}
        </NavItem>
      </section>

      <section className="space-y-3 px-3">
        <NavItem
          extraClasses="nav-link"
          tooltipContent={'تنظیمات'}
          to={'setting'}
          onClick={() => handleToggleSidebar(isSidebarOpen)}
        >
          <AiOutlineSetting />
          {isSidebarOpen && <span> تنظیمات </span>}
        </NavItem>
        <NavItem
          extraClasses="exit hover:text-[var(--color-slate-200)] hover:bg-[var(--color-slate-700)] hover:rounded-xl"
          tooltipContent={'خروج'}
          to="dashboard"
          onClick={() => {
            toggleExitWindow();
            handleToggleSidebar(isSidebarOpen);
          }}
        >
          <BiExit />
          {isSidebarOpen && <span> خروج </span>}
        </NavItem>
      </section>
    </ul>
  );
}

export default NavList;
