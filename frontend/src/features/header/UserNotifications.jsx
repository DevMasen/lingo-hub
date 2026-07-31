import { HiOutlineBell } from 'react-icons/hi';
import { useHeader } from './HeaderContext';
import HeaderButton from './HeaderButton';
import NotificationBox from './NotificationBox';
//---

function UserNotifications() {
  //! Context
  const { isNotificationOpen, toggleNotification } = useHeader();

  //! Main JSX
  return (
    <div
      className={`relative flex items-center border-r-2 border-[var(--color-slate-600)] pr-4 ${isNotificationOpen ? 'z-[800]' : 'z-50'}`}
    >
      <HeaderButton onClick={toggleNotification}>
        <HiOutlineBell className="h-8 w-8 rounded-xl p-1 text-[var(--color-slate-200)] transition-all duration-300 hover:bg-[var(--color-slate-800)] hover:text-[var(--color-indigo-700)]" />
      </HeaderButton>
      <div
        className={`absolute left-0 top-9 z-[800] w-96 rounded-lg border-[var(--color-slate-500)] bg-[var(--color-gray-900)] transition-all duration-100 ${isNotificationOpen ? 'h-auto border p-3' : 'h-0 border-0 p-0'}`}
      >
        {/* TODO#4: Implement this feature using Claud instructions  */}
        {isNotificationOpen && <NotificationBox />}
      </div>
    </div>
  );
}

export default UserNotifications;
