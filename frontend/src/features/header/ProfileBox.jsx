import { HiOutlineUserCircle } from 'react-icons/hi';
import { CgPassword } from 'react-icons/cg';
import { BiExit } from 'react-icons/bi';

import { useHeader } from './HeaderContext';

import Modal from '../../ui/Modal';
import ConfirmExit from '../../ui/ConfirmExit';
import LinkItem from '../../ui/LinkItem';
import { useLogout } from '../authentication/useLogout';
import { useNavigate } from 'react-router';
//---

function ProfileBox() {
  const navigate = useNavigate();

  //! Context Data
  const { toggleProfile } = useHeader();

  const { logout, isLoggingOut } = useLogout();

  //!JSX
  return (
    <>
      <div className="space-y-2 border-b border-[var(--color-slate-500)] pb-3 text-start">
        <p> {'<User First Name>'} </p>
        <p className="text-[var(--color-slate-400)]"> {'<User Email>'} </p>
      </div>
      <ul className="mt-3 space-y-3 text-start">
        <li>
          <LinkItem to={'/setting'} onClick={toggleProfile}>
            <HiOutlineUserCircle className="h-[1.25rem] w-[1.25rem] text-[var(--color-slate-500)]" />
            <span> پروفایل </span>
          </LinkItem>
        </li>
        <li>
          <LinkItem to={'/setting/change-password'} onClick={toggleProfile}>
            <CgPassword className="h-[1.25rem] w-[1.25rem] text-[var(--color-slate-500)]" />
            <span> تغییر رمز عبور </span>
          </LinkItem>
        </li>
        <li>
          <Modal>
            <Modal.Open opens="exit">
              <LinkItem extraClasses={'text-[var(--color-red-600)]'}>
                <BiExit className="h-[1.25rem] w-[1.25rem]" />
                <span> خروج </span>
              </LinkItem>
            </Modal.Open>
            <Modal.Window name="exit">
              <ConfirmExit
                disabled={isLoggingOut}
                onConfirmExit={() => {
                  toggleProfile();
                  logout({ onSettled: navigate('/home') });
                }}
              />
            </Modal.Window>
          </Modal>
        </li>
      </ul>
    </>
  );
}

export default ProfileBox;
