import MainNav from './MainNav';
import SidebarHeader from '../components/SidebarHeader';

function Sidebar() {
  return (
    <aside className="grid grid-cols-1 grid-rows-[5rem_1fr_4rem] border-l border-slate-500">
      <SidebarHeader />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
