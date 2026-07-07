import { useState } from 'react';
import { Link, useNavigate, useResolvedPath } from 'react-router';

import { BiPencil, BiUserCircle } from 'react-icons/bi';

import { useProfile } from '../setting/useProfile';

import PanelButton from '../../ui/PanelButton';
import Skeleton from '../../ui/Skeleton';

//---

function UserInfoHeader({ userId }) {
  //! React Query
  const { profile, isLoadingProfile } = useProfile(userId);

  //! React Router
  const { pathname } = useResolvedPath();
  const navigate = useNavigate();

  //! Local State
  const [isEditMode, setIsEditMode] = useState(() => pathname.split('/').at(-1) === 'change-name');

  //! Controlled Elements
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');

  //! JSX
  return (
    //TODO: add action to this form
    <form
      method="PATCH"
      onSubmit={() => {
        setIsEditMode(false);
        setFirstNameInput('');
        setLastNameInput('');
        navigate('/setting/user');
      }}
      className="flex items-center justify-between gap-5 rounded-2xl bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))] px-5 py-2"
    >
      <div className="flex items-center gap-5">
        <div className="h-fit w-fit rounded-full bg-[var(--color-slate-800)]">
          <BiUserCircle className="h-24 w-24 text-[var(--color-indigo-600)]" />
        </div>
        {isEditMode ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center justify-between rounded-lg border border-[var(--color-slate-500)] px-3 py-1 transition-colors duration-300 focus-within:border-[var(--color-indigo-700)]">
              <input
                value={firstNameInput}
                onChange={(e) => setFirstNameInput(e.target.value)}
                type="text"
                name="firstName"
                placeholder="نام"
                required
                aria-required="true"
                className="w-36 bg-transparent outline-none"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[var(--color-slate-500)] px-3 py-1 transition-colors duration-300 focus-within:border-[var(--color-indigo-700)]">
              <input
                value={lastNameInput}
                onChange={(e) => setLastNameInput(e.target.value)}
                type="text"
                name="lastName"
                placeholder="نام خانوادگی"
                required
                aria-required="true"
                className="w-36 bg-transparent outline-none"
              />
            </div>
            <PanelButton
              type="submit"
              disabled={firstNameInput.length === 0 || lastNameInput.length === 0}
              extraClasses="px-3 py-2 text-sm"
            >
              تأیید
            </PanelButton>
            <PanelButton
              onClick={() => setIsEditMode(false)}
              to={'/setting/user'}
              extraClasses="px-3 py-2 text-sm bg-[var(--color-red-700)] hover:bg-[var(--color-red-600)]"
            >
              لغو
            </PanelButton>
          </div>
        ) : (
          <div className="text-2xl font-semibold text-[var(--color-slate-400)]">
            {isLoadingProfile ? (
              <Skeleton className="h-11 w-60" />
            ) : (
              <span>
                {profile.firstName} {profile.lastName}
              </span>
            )}
          </div>
        )}
        {!isEditMode && (
          <Link
            to={'/setting/user/change-name'}
            onClick={() => setIsEditMode(true)}
            className="h-fit w-fit cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-[var(--color-slate-800)] hover:text-[var(--color-indigo-700)]"
          >
            <BiPencil className="h-6 w-6" />
          </Link>
        )}
      </div>
    </form>
  );
}

export default UserInfoHeader;
