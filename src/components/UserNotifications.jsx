import { Tooltip } from 'react-tooltip';
////////////////////////////////////////
import { HiOutlineBell } from 'react-icons/hi';
///////////////////////////////////////////////
import HeaderButton from './HeaderButton';
//////////////////////////////////////////////
function UserNotifications({ isNotifOpen, onNotifOpen }) {
  return (
    <div className="relative flex items-center border-r-2 border-slate-600 pr-4">
      <HeaderButton onClick={onNotifOpen} tooltipId="notification-tooltip" tooltipContent="اعلانات">
        <HiOutlineBell className="h-8 w-8 rounded-xl p-1 text-slate-200 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700" />
      </HeaderButton>
      <Tooltip id="notification-tooltip" />
      <div
        className={`absolute left-0 top-9 z-40 w-64 rounded-lg border-slate-500 bg-gray-900 transition-all duration-100 ${isNotifOpen ? 'h-auto border p-3' : 'h-0 border-0 p-0'}`}
      >
        {isNotifOpen && <p className="text-slate-300"> پیام خوانده نشده ندارید. </p>}
      </div>
    </div>
  );
}

export default UserNotifications;
