import { createContext, useContext, useState } from 'react';
import { useLockScroll } from '../../hooks/useLockScroll';
//---

const SidebarContext = createContext();

function SidebarProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useLockScroll(isSidebarOpen, 'sidebar');

  function toggleSidebar() {
    setIsSidebarOpen((open) => !open);
  }

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) throw new Error('Sidebar Context used outside of SidebarProvider');
  return context;
}

export { SidebarProvider, useSidebar };
