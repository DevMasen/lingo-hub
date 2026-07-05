import { Outlet } from 'react-router';

import { useSidebar } from '../features/sidebar/SidebarContext';

import MainContent from './MainContent';
import Header from '../features/header/Header';
import Sidebar from '../features/sidebar/Sidebar';
import Footer from './Footer';
//---

function AppLayout() {
  //! Context Data
  const { isSidebarOpen } = useSidebar();

  //! JSX
  return (
    <div
      className={`grid h-full min-h-dvh grid-cols-1 ${isSidebarOpen ? 'sm:grid-cols-[14rem_1fr]' : 'sm:grid-cols-[4rem_1fr]'} bg-[var(--color-gray-900)] text-[var(--color-slate-200)] transition-all duration-300`}
    >
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
