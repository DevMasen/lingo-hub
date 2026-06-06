import SearchBar from '../components/SearchBar';
import HeaderOverlay from '../components/HeaderOverlay';
import LeftHeader from '../components/LeftHeader';

import { useHeader } from '../context/HeaderContext';

function Header() {
  //! Context Data
  const { isNotificationOpen, isProfileOpen } = useHeader();

  //! JSX
  return (
    <header className="flex items-center justify-between border-b border-slate-500 px-8 py-4">
      {(isNotificationOpen || isProfileOpen) && <HeaderOverlay />}
      <SearchBar />
      <LeftHeader />
    </header>
  );
}

export default Header;
