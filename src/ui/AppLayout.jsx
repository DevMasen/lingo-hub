import { Outlet } from 'react-router';
import MainContent from './MainContent';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useState } from 'react';

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  function handleSidebarStatus() {
    setIsSidebarOpen((cur) => !cur);
  }
  return (
    <div
      className={`grid h-full min-h-dvh ${isSidebarOpen ? 'grid-cols-[16rem_1fr]' : 'grid-cols-[4rem_1fr]'} bg-gray-900 text-slate-200 transition-all duration-300`}
    >
      <Sidebar isSidebarOpen={isSidebarOpen} onSidebarStatus={handleSidebarStatus} />
      <MainContent>
        <Header />
        <Outlet />
        <Footer />
      </MainContent>
    </div>
  );
}

export default AppLayout;
