import { HiOutlineUserCircle } from 'react-icons/hi';
import { CgPassword } from 'react-icons/cg';
import { BiExit } from 'react-icons/bi';
import { useSession } from '../authentication/useSession';
import { useProfile } from '../setting/useProfile';
import { useHeader } from './HeaderContext';
import ExitButton from './ExitButton';
import Modal from '../../ui/Modal';
import ConfirmExit from '../../ui/ConfirmExit';
import LinkItem from '../../ui/LinkItem';
import Skeleton from '../../ui/Skeleton';
import Image from '../../ui/Image';
//---

//! Global Const Variables
const linkItemStyles =
  'flex items-center gap-2 rounded-lg p-3 transition-all duration-300 hover:bg-[var(--color-slate-800)]';

function ProfileBox() {
  //! React Query
  const { email, isLoading: isLoadingSession, error: sessionError } = useSession();
  const { profile, isLoading: isLoadingProfile, error: profileError } = useProfile();

  //! Context
  const { toggleProfile } = useHeader();

  //! Main JSX
  return (
    <>
      {!sessionError && !profileError && (
        <div className="flex items-center gap-3 border-b border-[var(--color-slate-500)] pb-3 text-start">
          <div>
            {isLoadingProfile ? (
              <Skeleton className="h-12 w-12 rounded-3xl" />
            ) : (
              profile?.avatarUrl && (
                <Image
                  src={profile.avatarUrl}
                  placeholderSrc={`${profile.avatarUrl}?width=24&quality=20`}
                  alt={'پروفایل کاربر'}
                  className="h-12 w-12 rounded-full"
                />
              )
            )}
          </div>
          <div className="space-y-2">
            {isLoadingProfile ? (
              <Skeleton className="h-7 w-full" />
            ) : (
              <p>
                {profile?.firstName} {profile?.lastName}
              </p>
            )}
            {isLoadingSession ? (
              <Skeleton className="h-7 w-full" />
            ) : (
              <p className="text-[var(--color-slate-400)]"> {email} </p>
            )}
          </div>
        </div>
      )}
      <ul className="mt-3 space-y-3 text-start">
        <li>
          <LinkItem
            to={'/setting/user?activeTab=0'}
            onClick={toggleProfile}
            className={linkItemStyles}
          >
            <HiOutlineUserCircle className="h-[1.25rem] w-[1.25rem] text-[var(--color-slate-500)]" />
            <span> پروفایل </span>
          </LinkItem>
        </li>
        <li>
          <LinkItem
            to={'/setting/change-password?activeTab=1'}
            onClick={toggleProfile}
            className={linkItemStyles}
          >
            <CgPassword className="h-[1.25rem] w-[1.25rem] text-[var(--color-slate-500)]" />
            <span> تغییر رمز عبور </span>
          </LinkItem>
        </li>
        <li>
          <Modal>
            <Modal.Open opens="exit">
              <ExitButton className={`${linkItemStyles} w-full text-[var(--color-red-600)]`}>
                <BiExit className="h-[1.25rem] w-[1.25rem]" />
                <span> خروج </span>
              </ExitButton>
            </Modal.Open>
            <Modal.Window name="exit">
              <ConfirmExit />
            </Modal.Window>
          </Modal>
        </li>
      </ul>
    </>
  );
}

export default ProfileBox;
