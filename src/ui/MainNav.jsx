import NavItem from '../components/NavItem';
import NavList from '../components/NavList';

function MainNav({ isSidebarOpen }) {
  return (
    <nav className="flex border-b-[1px] border-slate-500 transition-all duration-300">
      <NavList isSidebarOpen={isSidebarOpen} />
    </nav>
  );
}

export default MainNav;
