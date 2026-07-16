import { HiOutlineMenu } from 'react-icons/hi';
import { useHeader } from './HeaderContext';
import { useSidebar } from '../sidebar/SidebarContext';
import SearchBar from './SearchBar';
import HeaderOverlay from './HeaderOverlay';
import LeftHeader from './LeftHeader';
//---

function Header() {
  //! Context
  const { isNotificationOpen, isProfileOpen } = useHeader();
  const { toggleSidebar } = useSidebar();

  //! Main JSX
  return (
    <header className="flex items-center justify-between border-b border-[var(--color-slate-500)] px-4 py-4 sm:px-8">
      {(isNotificationOpen || isProfileOpen) && <HeaderOverlay />}
      <div className="flex items-center justify-between gap-3 pl-3">
        <button className="block sm:hidden" onClick={toggleSidebar}>
          <HiOutlineMenu className="text-2xl text-[var(--color-slate-500)] transition-colors duration-300 hover:text-[var(--color-slate-200)]" />
        </button>
        <SearchBar />
      </div>
      <LeftHeader />
    </header>
  );
}

export default Header;
