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
    <div className={`relative flex items-center ${isProfileOpen ? 'z-[800]' : 'z-40'}`}>
      <HeaderButton onClick={toggleProfile}>
        <HiOutlineUser className="h-8 w-8 rounded-xl p-1 text-[var(--color-slate-200)] transition-all duration-300 hover:bg-[var(--color-slate-800)] hover:text-[var(--color-indigo-700)]" />
      </HeaderButton>
      <div
        className={`absolute left-0 top-9 z-[800] w-fit min-w-64 rounded-lg border-[var(--color-slate-500)] bg-[var(--color-gray-900)] transition-all duration-100 ${isProfileOpen ? 'h-auto border p-3' : 'h-0 border-0 p-0'}`}
      >
        {isProfileOpen && <ProfileBox />}
      </div>
    </div>
  );
}

export default UserProfile;
