import NavItem from './NavItem';
import { AiOutlineDashboard } from 'react-icons/ai';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiExit } from 'react-icons/bi';
import { useState } from 'react';
import ExitModal from './ExitModal';

function NavList({ isSidebarOpen }) {
  const [exitModalStatus, setExitModalStatus] = useState('close');
  function handleExitModal() {
    setExitModalStatus((cur) => (cur === 'close' ? 'open' : 'close'));
  }
  return (
    <ul className="my-3 flex w-full flex-col justify-between">
      <ExitModal exitModalStatus={exitModalStatus} onExitModal={handleExitModal} />
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
        <NavItem extraClasses="nav-link" to={'setting/user'}>
          <AiOutlineSetting />
          {isSidebarOpen && <span> تنظیمات </span>}
        </NavItem>
        <NavItem
          extraClasses="exit hover:text-slate-200 hover:bg-slate-800 hover:rounded-xl"
          onClick={handleExitModal}
          to="dashboard"
        >
          <BiExit />
          {isSidebarOpen && <span> خروج </span>}
        </NavItem>
      </section>
    </ul>
  );
}

export default NavList;
