import { createContext, useContext, useState } from 'react';
//---

const HeaderContext = createContext();

function HeaderProvider({ children }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  function toggleNotification() {
    setIsNotificationOpen((open) => !open);
  }

  function toggleProfile() {
    setIsProfileOpen((open) => !open);
  }

  return (
    <HeaderContext.Provider
      value={{ isNotificationOpen, isProfileOpen, toggleNotification, toggleProfile }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) throw new Error('HeaderContext used outside of HeaderProvider');
  return context;
}

export { HeaderProvider, useHeader };
