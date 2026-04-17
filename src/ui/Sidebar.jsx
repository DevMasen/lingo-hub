import MainNav from './MainNav';
import SidebarHeader from '../components/SidebarHeader';

function Sidebar({ isSidebarOpen, onSidebarStatus }) {
  return (
    <aside className="grid grid-cols-1 grid-rows-[5rem_1fr_3rem] border-l-[1px] border-slate-500">
      <SidebarHeader isSidebarOpen={isSidebarOpen} onSidebarStatus={onSidebarStatus} />
      <MainNav isSidebarOpen={isSidebarOpen} />
    </aside>
  );
}

export default Sidebar;
