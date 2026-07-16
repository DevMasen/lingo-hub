import { Link } from 'react-router';
import { BsLayoutSidebarInsetReverse } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { useSidebar } from './SidebarContext';
import Image from '../../ui/Image';
//---

function SidebarHeader() {
  //! Context
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  //! Main JSX
  return (
    <div
      className={`flex items-center gap-5 ${isSidebarOpen ? 'justify-between' : 'justify-center'} border-b-[1px] border-[var(--color-slate-500)] px-3 py-1`}
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
          <h2 className="text-xl font-semibold sm:hidden sm:text-2xl md:block"> لینگوهاب </h2>
        </Link>
      )}
      <button className="hidden sm:block" onClick={toggleSidebar}>
        <BsLayoutSidebarInsetReverse className="h-[20px] w-[20px] text-[var(--color-slate-500)] transition-all duration-300 hover:text-[var(--color-indigo-700)]" />
      </button>
      <button
        className="flex items-center justify-center rounded-md p-1 text-center text-2xl text-[var(--color-red-700)] transition-all duration-200 hover:translate-y-[-2px] hover:bg-[var(--color-slate-700)] sm:hidden"
        onClick={toggleSidebar}
      >
        <CgClose />
      </button>
    </div>
  );
}

export default SidebarHeader;
