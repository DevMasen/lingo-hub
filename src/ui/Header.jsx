import { useState } from 'react';
/////////////////////////////////
import SearchBar from '../components/SearchBar';
import HeaderOverlay from '../components/HeaderOverlay';
import LeftHeader from '../components/LeftHeader';
/////////////////////////////////////////////////
function Header() {
  //! Local States
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  //! Handlers
  function handleNotifOpen() {
    setIsNotifOpen((cur) => !cur);
  }
  function handleProfileOpen() {
    setIsProfileOpen((cur) => !cur);
  }

  //! JSX
  return (
    <header className="flex items-center justify-between border-b border-slate-500 px-8 py-4">
      {(isNotifOpen || isProfileOpen) && (
        <HeaderOverlay onNotifOpen={handleNotifOpen} onProfileOpen={handleProfileOpen} />
      )}
      <SearchBar />
      <LeftHeader
        isNotifOpen={isNotifOpen}
        isProfileOpen={isProfileOpen}
        onNotifOpen={handleNotifOpen}
        onProfileOpen={handleProfileOpen}
      />
    </header>
  );
}

export default Header;
