import { HiOutlineBookOpen } from 'react-icons/hi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiExit, BiWallet } from 'react-icons/bi';
import { useSidebar } from './SidebarContext';
import NavItem from './NavItem';
import ExitNavItem from './ExitNavItem';
import Modal from '../../ui/Modal';
import ConfirmExit from '../../ui/ConfirmExit';
//---

//! Global Const Variables
const navItemStyles =
  'flex items-center gap-3 p-2 font-semibold text-[var(--color-slate-300)] transition-all duration-300';

function NavList() {
  //! Context
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  //! Handlers
  function handleToggleSidebar(isOpen) {
    if (isOpen) toggleSidebar();
  }

  //! Main JSX
  return (
    <ul className="my-3 flex w-full flex-col justify-between gap-3">
      <section className="space-y-3 px-3">
        <NavItem
          className={`nav-link ${navItemStyles}`}
          to={'dashboard'}
          onClick={() => handleToggleSidebar(isSidebarOpen)}
        >
          <AiOutlineDashboard />
          {isSidebarOpen && <span> داشبورد </span>}
        </NavItem>
        <NavItem
          className={`nav-link ${navItemStyles}`}
          to={'reserve'}
          onClick={() => handleToggleSidebar(isSidebarOpen)}
        >
          <HiOutlineBookOpen />
          {isSidebarOpen && <span> رزرو اتاق </span>}
        </NavItem>
        <NavItem
          className={`nav-link ${navItemStyles}`}
          to={'wallet'}
          onClick={() => handleToggleSidebar(isSidebarOpen)}
        >
          <BiWallet />
          {isSidebarOpen && <span> افزایش وجه </span>}
        </NavItem>
      </section>

      <section className="space-y-3 px-3">
        <NavItem
          className={`nav-link ${navItemStyles}`}
          to={'setting'}
          onClick={() => handleToggleSidebar(isSidebarOpen)}
        >
          <AiOutlineSetting />
          {isSidebarOpen && <span> تنظیمات </span>}
        </NavItem>
        <Modal>
          <Modal.Open opens="exit">
            <ExitNavItem
              className={`exit ${navItemStyles} w-full hover:rounded-xl hover:bg-[var(--color-slate-800)] hover:text-[var(--color-slate-200)]`}
            >
              <BiExit />
              {isSidebarOpen && <span> خروج </span>}
            </ExitNavItem>
          </Modal.Open>
          <Modal.Window name="exit">
            <ConfirmExit />
          </Modal.Window>
        </Modal>
      </section>
    </ul>
  );
}

export default NavList;
