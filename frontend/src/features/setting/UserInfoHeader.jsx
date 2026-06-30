import { useState } from 'react';
import { Link, useNavigate, useResolvedPath } from 'react-router';

import { BiPencil, BiRefresh, BiUserCircle } from 'react-icons/bi';

import PanelButton from '../../ui/PanelButton';

//---

function UserInfoHeader({ user }) {
  //! React Router
  const { pathname } = useResolvedPath();
  const navigate = useNavigate();

  //! Local State
  const [isEditMode, setIsEditMode] = useState(() => pathname.split('/').at(-1) === 'change-name');

  //! Controlled Elements
  const [firtnameInput, setFirstnameInput] = useState('');
  const [lastnameInput, setLastnameInput] = useState('');

  //! JSX
  return (
    <form
      method="PATCH"
      onSubmit={() => {
        setIsEditMode(false);
        setFirstnameInput('');
        setLastnameInput('');
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
                value={firtnameInput}
                onChange={(e) => setFirstnameInput(e.target.value)}
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
                value={lastnameInput}
                onChange={(e) => setLastnameInput(e.target.value)}
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
              disabled={firtnameInput.length === 0 || lastnameInput.length === 0}
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
            <span>
              {user.firstName} {user.lastName}
            </span>
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
      {!isEditMode && (
        <Link
          to={'/setting/user'}
          className="h-fit w-fit cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-[var(--color-slate-800)] hover:text-[var(--color-indigo-700)]"
        >
          <BiRefresh className="h-6 w-6" />
        </Link>
      )}
    </form>
  );
}

export default UserInfoHeader;
