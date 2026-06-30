import { Tooltip } from 'react-tooltip';

import { HiOutlineBell } from 'react-icons/hi';

import { useHeader } from './HeaderContext';

import HeaderButton from './HeaderButton';

//---

function UserNotifications() {
  //! Context Data
  const { isNotificationOpen, toggleNotification } = useHeader();

  //! JSX
  return (
    <div className="relative flex items-center border-r-2 border-[var(--color-slate-600)] pr-4">
      <HeaderButton
        onClick={toggleNotification}
        tooltipId="notification-tooltip"
        tooltipContent="اعلانات"
      >
        <HiOutlineBell className="h-8 w-8 rounded-xl p-1 text-[var(--color-slate-200)] transition-all duration-300 hover:bg-[var(--color-slate-700)] hover:text-[var(--color-indigo-700)]" />
      </HeaderButton>
      <Tooltip id="notification-tooltip" />
      <div
        className={`absolute left-0 top-9 z-40 w-64 rounded-lg border-[var(--color-slate-500)] bg-[var(--color-gray-900)] transition-all duration-100 ${isNotificationOpen ? 'h-auto border p-3' : 'h-0 border-0 p-0'}`}
      >
        {isNotificationOpen && (
          <p className="text-[var(--color-slate-300)]"> پیام خوانده نشده ندارید. </p>
        )}
      </div>
    </div>
  );
}

export default UserNotifications;
