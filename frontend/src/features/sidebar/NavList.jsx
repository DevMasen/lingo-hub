import { HiOutlineBookOpen } from 'react-icons/hi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiExit, BiWallet } from 'react-icons/bi';

import { useSidebar } from './SidebarContext';

import NavItem from './NavItem';

import Modal from '../../ui/Modal';
import ConfirmExit from '../../ui/ConfirmExit';
//---

function NavList() {
  //! Context Data
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  function handleToggleSidebar(isOpen) {
    if (isOpen) toggleSidebar();
  }

  //!JSX
  return (
    <ul className="my-3 flex w-full flex-col justify-between gap-3">
      <section className="space-y-3 px-3">
        <NavItem
          extraClasses="nav-link"
          to={'dashboard'}
          onClick={() => handleToggleSidebar(isSidebarOpen)}
        >
          <AiOutlineDashboard />
          {isSidebarOpen && <span> داشبورد </span>}
        </NavItem>
        <NavItem
          extraClasses="nav-link"
          to={'reserve'}
          onClick={() => handleToggleSidebar(isSidebarOpen)}
        >
          <HiOutlineBookOpen />
          {isSidebarOpen && <span> رزرو اتاق </span>}
        </NavItem>
        <NavItem
          extraClasses="nav-link"
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
          to={'setting'}
          onClick={() => handleToggleSidebar(isSidebarOpen)}
        >
          <AiOutlineSetting />
          {isSidebarOpen && <span> تنظیمات </span>}
        </NavItem>
        <Modal>
          <Modal.Open opens="exit">
            <NavItem
              extraClasses="exit hover:text-[var(--color-slate-200)] hover:bg-[var(--color-slate-800)] hover:rounded-xl"
              to="dashboard"
            >
              <BiExit />
              {isSidebarOpen && <span> خروج </span>}
            </NavItem>
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
