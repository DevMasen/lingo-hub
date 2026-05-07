import { useEffect, useState } from 'react';
import { Link, useFetcher } from 'react-router';
/////////////////////////////////
import { HiOutlineBell, HiOutlineUser } from 'react-icons/hi';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { BiExit, BiWallet } from 'react-icons/bi';
import { GrAddCircle } from 'react-icons/gr';
import { CgPassword } from 'react-icons/cg';
import { Tooltip } from 'react-tooltip';
////////////////////////////////////////////
import SearchBar from '../components/SearchBar';
import LinkItem from '../components/LinkItem';
///////////////////////////////////////////////
import { useExit } from '../context/ExitContex';
/////////////////////////////////////////////////
//TODO Break into smaller Components
function Header() {
  //! React Router
  const fetcher = useFetcher();

  //! Context Data
  const { toggleExitWindow } = useExit();

  //! Local States
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  //! Effects
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('setting/user');
    },
    [fetcher]
  );

  //! JSX
  return (
    <header className="flex items-center justify-between border-b border-slate-500 px-8 py-4">
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
        <div className="ml-3 flex items-center gap-2 rounded-lg border border-slate-500 p-2">
          <BiWallet className="h-6 w-6 text-slate-200" />
          <div>
            <span> {new Intl.NumberFormat('fa-IR').format(fetcher.data?.user.creditBalance)} </span>
            <span> تومان </span>
          </div>
          <Link
            to={'wallet'}
            data-tooltip-id="increase-balance"
            data-tooltip-content="افزایش وجه"
            data-tooltip-place="bottom"
            data-tooltip-variant="dark"
            data-tooltip-offset={10}
            data-tooltip-delay-show={800}
            data-tooltip-auto-close={3000}
          >
            <GrAddCircle className="h-[1.75rem] w-[1.75rem] p-1 text-slate-200 transition-all duration-200 hover:text-indigo-700" />
          </Link>
          <Tooltip id="increase-balance" />
        </div>
        <div className="relative flex items-center border-r-2 border-slate-600 pr-4">
          <button
            data-tooltip-id="notification-tooltip"
            data-tooltip-content="اعلانات"
            data-tooltip-place="bottom"
            data-tooltip-variant="dark"
            data-tooltip-offset={10}
            data-tooltip-delay-show={800}
            data-tooltip-auto-close={3000}
            className="z-40"
            onClick={() => setIsNotifOpen((cur) => !cur)}
          >
            <HiOutlineBell className="h-8 w-8 rounded-xl p-1 text-slate-200 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700" />
          </button>
          <Tooltip id="notification-tooltip" />
          <div
            className={`absolute left-0 top-9 z-40 w-64 rounded-lg border-slate-500 bg-gray-900 transition-all duration-100 ${isNotifOpen ? 'h-auto border p-3' : 'h-0 border-0 p-0'}`}
          >
            {isNotifOpen && <p className="text-slate-300"> پیام خوانده نشده ندارید. </p>}
          </div>
        </div>

        <div className="relative flex items-center">
          <button
            data-tooltip-id="setting-tooltip"
            data-tooltip-content="تنظیمات"
            data-tooltip-place="bottom"
            data-tooltip-variant="dark"
            data-tooltip-offset={10}
            data-tooltip-delay-show={800}
            data-tooltip-auto-close={3000}
            className="z-40"
            onClick={() => setIsProfileOpen((cur) => !cur)}
          >
            <HiOutlineUser className="h-8 w-8 rounded-xl p-1 text-slate-200 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700" />
          </button>
          <Tooltip id="setting-tooltip" />
          <div
            className={`absolute left-0 top-9 z-40 w-64 rounded-lg border-slate-500 bg-gray-900 transition-all duration-100 ${isProfileOpen ? 'h-auto border p-3' : 'h-0 border-0 p-0'}`}
          >
            {isProfileOpen && (
              <>
                <div className="space-y-2 border-b border-slate-500 pb-3 text-start">
                  <p> {fetcher.data?.user.firstName} </p>
                  <p className="text-slate-400"> {fetcher.data?.user.email} </p>
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
