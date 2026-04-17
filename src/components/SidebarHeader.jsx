import { Link } from 'react-router';
import SidebarLogo from './SidebarLogo';
import { BsLayoutSidebarInsetReverse } from 'react-icons/bs';

function SidebarHeader({ isSidebarOpen, onSidebarStatus }) {
  return (
    <div
      className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} border-b-[1px] border-slate-500 px-3 py-1`}
    >
      {isSidebarOpen && (
        <Link to="dashboard" className="flex items-center gap-3">
          <SidebarLogo />
          <h2 className="text-2xl font-semibold"> لینگوهاب </h2>
        </Link>
      )}
      <button className="sidebar-btn" onClick={onSidebarStatus}>
        <BsLayoutSidebarInsetReverse className="h-[20px] w-[20px] text-slate-500 transition-all duration-300 hover:text-indigo-700" />
      </button>
    </div>
  );
}

export default SidebarHeader;
