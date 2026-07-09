import { useEffect, useState } from 'react';
import { useResolvedPath, Link, Outlet } from 'react-router';
//---

function Setting() {
  //! React Router
  const { pathname } = useResolvedPath();

  //! Local States
  const [activeTab, setActiveTab] = useState(0);

  //! Derived States
  const path = pathname.split('/').at(-1);

  //! Effects
  useEffect(
    function () {
      if (path === 'user') setActiveTab(0);
      if (path === 'change-password') setActiveTab(1);
    },
    [path]
  );

  //! JSX
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr]">
      <nav className="flex items-center justify-between border-b border-[var(--color-slate-500)] bg-[var(--color-gray-900)] px-4 py-5">
        <ul className="relative flex gap-4 font-semibold text-[var(--color-slate-300)]">
          <div
            className={`absolute right-0 h-10 w-28 rounded-lg border-b-2 border-[var(--color-indigo-500)] bg-indigo-400/5 transition-all duration-300 ${activeTab === 0 && 'mr-0'} ${activeTab === 1 && 'mr-[8rem]'} ${activeTab === 2 && 'mr-[16rem]'}`}
          ></div>
          <li className="w-28 py-2 text-center transition-all duration-300 hover:text-[var(--color-indigo-600)]">
            <Link className="w-full" to="/setting/user" onClick={() => setActiveTab(0)}>
              پروفایل
            </Link>
          </li>
          <li className="w-28 py-2 text-center transition-all duration-300 hover:text-[var(--color-indigo-600)]">
            <Link className="w-full" to="/setting/change-password" onClick={() => setActiveTab(1)}>
              تغییر رمز عبور
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Setting;
