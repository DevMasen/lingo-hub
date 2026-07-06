import { Outlet } from 'react-router';

import { useSidebar } from '../features/sidebar/SidebarContext';

import MainContent from './MainContent';
import Header from '../features/header/Header';
import Sidebar from '../features/sidebar/Sidebar';
import Footer from './Footer';
import HeaderOverlay from '../features/header/HeaderOverlay';
//---

function AppLayout() {
  //! Context Data
  const { isSidebarOpen } = useSidebar();

  //! JSX
  return (
    <div
      className={`grid h-full min-h-dvh grid-cols-1 overflow-hidden ${isSidebarOpen ? 'sm:grid-cols-[14rem_1fr]' : 'sm:grid-cols-[4rem_1fr]'} bg-[var(--color-gray-900)] text-[var(--color-slate-200)] transition-all duration-300`}
    >
      <div className="fixed right-0 top-0 z-[900] sm:hidden">
        {isSidebarOpen && <HeaderOverlay />}
      </div>
      <Sidebar />
      <MainContent>
        <Header />
        <Outlet />
        <Footer />
      </MainContent>
    </div>
  );
}

export default AppLayout;
