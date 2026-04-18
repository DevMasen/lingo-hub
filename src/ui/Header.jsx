import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { HiOutlineBell, HiOutlineUser } from 'react-icons/hi';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { CgPassword } from 'react-icons/cg';
import { BiExit } from 'react-icons/bi';
import LinkItem from '../components/LinkItem';
import { useExit } from '../context/ExitContex';

function Header() {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { toggleExitWindow } = useExit();
  return (
    <header className="flex items-center justify-between border-b border-slate-500 p-4">
      {/* overlay */}
      {(isNotifOpen || isProfileOpen) && (
        <div
          onClick={() => {
            setIsNotifOpen(false);
            setIsProfileOpen(false);
          }}
          className="fixed left-0 top-0 z-30 h-full w-full bg-slate-800/20 backdrop-blur-sm"
        ></div>
      )}
      <SearchBar />
      <div className="flex items-center gap-2">
        <div className="relative flex items-center">
          <button className="z-40" onClick={() => setIsNotifOpen((cur) => !cur)}>
            <HiOutlineBell className="h-8 w-8 rounded-xl p-1 text-slate-200 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700" />
          </button>
          <div
            className={`absolute left-0 top-9 z-40 w-64 rounded-lg border-slate-500 bg-gray-900 transition-all duration-100 ${isNotifOpen ? 'h-auto border p-3' : 'h-0 border-0 p-0'}`}
          >
            {isNotifOpen && <p className="text-slate-300"> پیام خوانده نشده ندارید. </p>}
          </div>
        </div>

        <div className="relative flex items-center">
          <button className="z-40" onClick={() => setIsProfileOpen((cur) => !cur)}>
            <HiOutlineUser className="h-8 w-8 rounded-xl p-1 text-slate-200 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700" />
          </button>
          <div
            className={`$ absolute left-0 top-9 z-40 w-64 rounded-lg border-slate-500 bg-gray-900 transition-all duration-100 ${isProfileOpen ? 'h-auto border p-3' : 'h-0 border-0 p-0'}`}
          >
            {isProfileOpen && (
              <>
                <div className="space-y-2 border-b border-slate-500 pb-3 text-start">
                  <p> محمد حسین </p>
                  <p className="text-slate-400"> mohammadwh400@gmail.com </p>
                </div>
                <ul className="mt-3 space-y-3 text-start">
                  <li>
                    <LinkItem to={'setting'} onClick={() => setIsProfileOpen(false)}>
                      <HiOutlineUserCircle className="h-[1.25rem] w-[1.25rem] text-slate-500" />
                      <span> پروفایل </span>
                    </LinkItem>
                  </li>
                  <li>
                    <LinkItem to={'setting/password'} onClick={() => setIsProfileOpen(false)}>
                      <CgPassword className="h-[1.25rem] w-[1.25rem] text-slate-500" />
                      <span> تغییر رمز عبور </span>
                    </LinkItem>
                  </li>
                  <li>
                    <LinkItem
                      extraClasses={'text-red-600'}
                      onClick={() => {
                        toggleExitWindow();
                        setIsProfileOpen(false);
                      }}
                    >
                      <BiExit className="h-[1.25rem] w-[1.25rem]" />
                      <span> خروج </span>
                    </LinkItem>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
