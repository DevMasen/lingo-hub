import { HiOutlineUserCircle } from 'react-icons/hi';
import { CgPassword } from 'react-icons/cg';
import { BiExit } from 'react-icons/bi';
//////////////////////////////////////////
import { useExit } from '../context/ExitContex';
/////////////////////////////////////////////////
import LinkItem from './LinkItem';
//////////////////////////////////
function ProfileBox({ fetcher, onProfileOpen }) {
  //! Context Data
  const { toggleExitWindow } = useExit();

  //!JSX
  return (
    <>
      <div className="space-y-2 border-b border-slate-500 pb-3 text-start">
        <p> {fetcher.data?.user.firstName} </p>
        <p className="text-slate-400"> {fetcher.data?.user.email} </p>
      </div>
      <ul className="mt-3 space-y-3 text-start">
        <li>
          <LinkItem to={'setting'} onClick={onProfileOpen}>
            <HiOutlineUserCircle className="h-[1.25rem] w-[1.25rem] text-slate-500" />
            <span> پروفایل </span>
          </LinkItem>
        </li>
        <li>
          <LinkItem to={'setting/password'} onClick={onProfileOpen}>
            <CgPassword className="h-[1.25rem] w-[1.25rem] text-slate-500" />
            <span> تغییر رمز عبور </span>
          </LinkItem>
        </li>
        <li>
          <LinkItem
            extraClasses={'text-red-600'}
            onClick={() => {
              toggleExitWindow();
              onProfileOpen();
            }}
          >
            <BiExit className="h-[1.25rem] w-[1.25rem]" />
            <span> خروج </span>
          </LinkItem>
        </li>
      </ul>
    </>
  );
}

export default ProfileBox;
