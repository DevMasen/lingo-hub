import { BiSolidPencil, BiUserCircle } from 'react-icons/bi';

import { useProfile } from '../setting/useProfile';

import Skeleton from '../../ui/Skeleton';
import SettingButton from '../../ui/SettingButton';
import Avatar from '../../ui/Avatar';
import UserName from '../../ui/UserName';
//---

function UserInfoHeader() {
  //! React Query
  const { profile, isLoading, error } = useProfile();

  //! JSX
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))] px-5 py-2">
      <div className="flex items-center gap-5">
        <Avatar>
          <BiUserCircle className="h-24 w-24 text-[var(--color-indigo-600)]" />
        </Avatar>
        {!error && (
          <UserName>
            {isLoading ? (
              <Skeleton className="h-11 w-60" />
            ) : (
              <span>
                {profile.firstName} {profile.lastName}
              </span>
            )}
          </UserName>
        )}
      </div>
      {/* TODO: implement onClick */}
      <SettingButton>
        <BiSolidPencil className="h-6 w-6" />
      </SettingButton>
    </div>
  );
}

export default UserInfoHeader;
