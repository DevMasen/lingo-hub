import { BiPencil, BiUserCircle } from 'react-icons/bi';
////////////////////////////////////////////////////////
function UserInfoHeader({ user }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl bg-[linear-gradient(45deg,var(--color-indigo-900),var(--color-slate-800))] px-5 py-2">
      <div className="flex items-center gap-5">
        <div className="h-fit w-fit rounded-full bg-slate-800">
          <BiUserCircle className="h-24 w-24 text-indigo-600" />
        </div>
        <div className="text-2xl font-semibold text-slate-400">
          <span>
            {user.firstName} {user.lastName}
          </span>
        </div>
      </div>
      {/* TODO add action to this */}
      <button className="h-fit w-fit cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700">
        <BiPencil className="h-6 w-6" />
      </button>
    </div>
  );
}

export default UserInfoHeader;
