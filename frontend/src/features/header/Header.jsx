import { useHeader } from './HeaderContext';

import SearchBar from './SearchBar';
import HeaderOverlay from './HeaderOverlay';
import LeftHeader from './LeftHeader';
//---

function Header() {
  //! Context Data
  const { isNotificationOpen, isProfileOpen } = useHeader();

  //! JSX
  return (
    <header className="flex items-center justify-between border-b border-[var(--color-slate-500)] px-8 py-4">
      {(isNotificationOpen || isProfileOpen) && <HeaderOverlay />}
      <SearchBar />
      <LeftHeader />
    </header>
  );
}

export default Header;
