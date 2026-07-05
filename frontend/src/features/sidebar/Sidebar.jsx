import SidebarHeader from './SidebarHeader';
import MainNav from './MainNav';
import { useSidebar } from './SidebarContext';
//---

function Sidebar() {
  const { isSidebarOpen } = useSidebar();
  return (
    <aside
      className={`fixed ${isSidebarOpen ? 'right-0' : 'right-[-4rem]'} top-0 z-[80] grid h-full grid-cols-1 grid-rows-[5rem_1fr] border-l border-[var(--color-slate-500)] bg-[var(--color-slate-900)] backdrop-opacity-80 transition-all duration-300 sm:static`}
    >
      <SidebarHeader />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
