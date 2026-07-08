import { BiSolidPencil, BiUserCircle } from 'react-icons/bi';

import { useProfile } from '../setting/useProfile';

import UpdateAvatarForm from './UpdateAvatarForm';
import Avatar from './Avatar';
import UserName from './UserName';
import SettingButton from './SettingButton';

import Skeleton from '../../ui/Skeleton';
import Modal from '../../ui/Modal';
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
                {profile?.firstName} {profile?.lastName}
              </span>
            )}
          </UserName>
        )}
      </div>
      <Modal>
        <Modal.Open opens={'update-avatar'}>
          <SettingButton>
            <BiSolidPencil className="h-6 w-6" />
          </SettingButton>
        </Modal.Open>
        <Modal.Window name={'update-avatar'}>
          <UpdateAvatarForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default UserInfoHeader;
