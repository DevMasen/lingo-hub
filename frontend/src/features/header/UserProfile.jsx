import { Tooltip } from 'react-tooltip';

import { HiOutlineUser } from 'react-icons/hi';

import { useHeader } from './HeaderContext';

import HeaderButton from './HeaderButton';
import ProfileBox from './ProfileBox';
//---

function UserProfile() {
  //! Context Data
  const { isProfileOpen, toggleProfile } = useHeader();

  //! JSX
  return (
    <div className="relative flex items-center">
      <HeaderButton onClick={toggleProfile} tooltipId="setting-tooltip" tooltipContent="تنظیمات">
        <HiOutlineUser className="h-8 w-8 rounded-xl p-1 text-slate-200 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700" />
      </HeaderButton>
      <Tooltip id="setting-tooltip" />
      <div
        className={`absolute left-0 top-9 z-40 w-64 rounded-lg border-slate-500 bg-gray-900 transition-all duration-100 ${isProfileOpen ? 'h-auto border p-3' : 'h-0 border-0 p-0'}`}
      >
        {isProfileOpen && <ProfileBox />}
      </div>
    </div>
  );
}

export default UserProfile;
