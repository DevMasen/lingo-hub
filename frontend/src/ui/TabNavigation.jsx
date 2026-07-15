import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
//---

function TabNavigation({ tabs = [] }) {
  //! React Router
  const [searchParams] = useSearchParams();

  //! Local States
  const [activeTab, setActiveTab] = useState(0);

  // //! Effects
  useEffect(
    function () {
      if (searchParams.get('activeTab')) setActiveTab(+searchParams.get('activeTab'));
      document.documentElement.style.setProperty('--tab-overlay-right', `${activeTab * 8}rem`);
    },
    [activeTab, searchParams]
  );
  return (
    <nav className="flex items-center justify-between border-b border-[var(--color-slate-500)] bg-[var(--color-gray-900)] px-4 py-3">
      <ul className="relative flex gap-4 font-semibold text-[var(--color-slate-300)]">
        <div
          className={`absolute right-[var(--tab-overlay-right)] h-10 w-28 rounded-lg border-b-2 border-[var(--color-indigo-500)] bg-indigo-400/5 transition-all duration-300`}
        ></div>
        {tabs.map((tab, i) => (
          <li
            key={i}
            className="w-28 py-2 text-center transition-all duration-300 hover:text-[var(--color-indigo-600)]"
          >
            <Link
              className="w-full"
              to={`${tab.route}?activeTab=${i}`}
              onClick={() => setActiveTab(i)}
            >
              {tab.routeName}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TabNavigation;
