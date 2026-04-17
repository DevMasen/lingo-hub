import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { HiOutlineBell, HiOutlineUser } from 'react-icons/hi';
import { Link } from 'react-router';

function Header() {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  return (
    <header className="flex items-center justify-between border-b border-slate-500 p-4">
      <SearchBar />
      <div>
        <button className="relative">
          <HiOutlineBell />
          <div
            className={`absolute left-0 top-8 rounded-lg border-slate-500 bg-gray-900 p-3 ${isNotifOpen ? 'h-auto w-64 border' : 'h-0 w-0 border-0'}`}
          >
            {isNotifOpen && <p className="text-slate-300"> پیام خوانده نشده ندارید. </p>}
          </div>
        </button>

        <button className="relative">
          <HiOutlineUser />
          <div
            className={`$ absolute left-0 top-8 rounded-lg border-slate-500 bg-gray-900 p-3 ${isProfileOpen ? 'h-auto w-64 border' : 'h-0 w-0 border-0'}`}
          >
            {isProfileOpen && (
              <>
                <div className="space-y-2 border-b border-slate-500 pb-3 text-start">
                  <p> محمد حسین </p>
                  <p className="text-slate-400"> mohammadwh400@gmail.com </p>
                </div>
                <ul className="mt-3 space-y-4 text-start">
                  <li>
                    <Link>
                      <span> پروفایل </span>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <span> تغییر رمز عبور </span>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <span> خروج </span>
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;
