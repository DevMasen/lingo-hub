import { Link } from 'react-router';

import { BsLayoutSidebarInsetReverse } from 'react-icons/bs';

import { useSidebar } from './SidebarContext';

import Image from '../../ui/Image';
//---

function SidebarHeader() {
  //! Context Data
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  //! JSX
  return (
    <div
      className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} border-b-[1px] border-[var(--color-slate-500)] px-3 py-1`}
    >
      {isSidebarOpen && (
        <Link to="dashboard" className="flex items-center gap-3">
          <Image
            src={
              'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/icon2.png'
            }
            placeholderSrc={
              'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/icon2.png?width=20&quality=20'
            }
            alt={'logo'}
            className="w-12 rounded-md"
          />
          {/* <img
            src="https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/icon2.png"
            alt="logo"
          /> */}
          <h2 className="text-2xl font-semibold"> لینگوهاب </h2>
        </Link>
      )}
      <button className="sidebar-btn" onClick={toggleSidebar}>
        <BsLayoutSidebarInsetReverse className="h-[20px] w-[20px] text-[var(--color-slate-500)] transition-all duration-300 hover:text-[var(--color-indigo-700)]" />
      </button>
    </div>
  );
}

export default SidebarHeader;
