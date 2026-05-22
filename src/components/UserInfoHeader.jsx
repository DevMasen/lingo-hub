import { useState } from 'react';
import { Form, Link, useNavigate, useResolvedPath } from 'react-router';
/////////////////////////////////
import { BiPencil, BiUserCircle } from 'react-icons/bi';
////////////////////////////////////////////////////////
import PanelButton from '../components/PanelButton';
////////////////////////////////////////////////////
import { updateName } from '../services/apiUsers';
///////////////////////////////////////////////////
function UserInfoHeader({ user }) {
  //! React Router
  const { pathname } = useResolvedPath();
  const navigate = useNavigate();

  //! Local State
  const [isEditMode, setIsEditMode] = useState(() => pathname.split('/').at(-1) === 'changename');

  //! Controlled Elements
  const [firtnameInput, setFirstnameInput] = useState('');
  const [lastnameInput, setLastnameInput] = useState('');

  //! JSX
  return (
    <Form
      method="PATCH"
      onSubmit={() => {
        setIsEditMode(false);
        setFirstnameInput('');
        setLastnameInput('');
        navigate(-1);
      }}
      className="flex items-center gap-5 rounded-2xl bg-[linear-gradient(45deg,var(--color-indigo-900),var(--color-slate-800))] px-5 py-2"
    >
      <div className="flex items-center gap-5">
        <div className="h-fit w-fit rounded-full bg-slate-800">
          <BiUserCircle className="h-24 w-24 text-indigo-600" />
        </div>
        {isEditMode ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center justify-between rounded-lg border border-slate-500 px-3 py-1 transition-colors duration-300 focus-within:border-indigo-700">
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
            <div className="flex items-center justify-between rounded-lg border border-slate-500 px-3 py-1 transition-colors duration-300 focus-within:border-indigo-700">
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
              to={`/app/${user.id}/setting/user`}
              extraClasses="px-3 py-2 text-sm bg-red-700 hover:bg-red-600"
            >
              لغو
            </PanelButton>
          </div>
        ) : (
          <div className="text-2xl font-semibold text-slate-400">
            <span>
              {user.firstName} {user.lastName}
            </span>
          </div>
        )}
      </div>
      {!isEditMode && (
        <Link
          to={`/app/${user.id}/setting/user/changename`}
          onClick={() => setIsEditMode(true)}
          className="h-fit w-fit cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700"
        >
          <BiPencil className="h-6 w-6" />
        </Link>
      )}
    </Form>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await updateName(params.userId, data);
  return null;
}

export default UserInfoHeader;
