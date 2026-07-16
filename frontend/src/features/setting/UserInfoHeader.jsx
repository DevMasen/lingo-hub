import { BiSolidPencil, BiUserCircle } from 'react-icons/bi';
import { useProfile } from '../setting/useProfile';
import UpdateAvatarForm from './UpdateAvatarForm';
import Avatar from './Avatar';
import UserName from './UserName';
import SettingButton from './SettingButton';
import Skeleton from '../../ui/Skeleton';
import Modal from '../../ui/Modal';
import Image from '../../ui/Image';
//---

function UserInfoHeader() {
  //! React Query
  const { profile, isLoading, error } = useProfile();

  //! Main JSX
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))] px-5 py-2">
      <div className="flex items-center gap-5">
        <Avatar>
          {profile?.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              placeholderSrc={`${profile.avatarUrl}?width=24&quality=20`}
              alt={'پروفایل کاربر'}
              className="h-14 w-14 sm:h-20 sm:w-20"
            />
          ) : (
            <BiUserCircle className="h-14 w-14 text-[var(--color-indigo-600)] sm:h-20 sm:w-20" />
          )}
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
            <BiSolidPencil className="h-4 w-4 sm:h-6 sm:w-6" />
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
