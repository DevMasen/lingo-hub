import SidebarHeader from './SidebarHeader';
import MainNav from './MainNav';
//---

function Sidebar() {
  return (
    <aside className="grid grid-cols-1 grid-rows-[5rem_1fr] border-l border-[var(--color-slate-500)]">
      <SidebarHeader />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
