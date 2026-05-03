import { BiPencil, BiUserCircle } from 'react-icons/bi';
import PanelButton from './PanelButton';
import ReserveRecord from './ReserveRecord';
function UserInfo() {
  return (
    <div className="space-y-5 border-b border-slate-500 p-3">
      <div className="flex items-center gap-5 rounded-2xl bg-[linear-gradient(45deg,var(--color-indigo-900),var(--color-slate-800))] px-5 py-2">
        <div className="flex items-center gap-5">
          <div className="h-fit w-fit rounded-full bg-slate-800">
            <BiUserCircle className="h-24 w-24 text-indigo-600" />
          </div>
          <div className="text-2xl font-semibold text-slate-400">
            <span>{/* {currentUser.firstName} {currentUser.lastName} */}</span>
          </div>
        </div>
        <div className="h-fit w-fit cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700">
          <BiPencil className="h-6 w-6" />
        </div>
      </div>
      <div className="space-y-7 rounded-2xl bg-[linear-gradient(45deg,var(--color-indigo-900),var(--color-slate-800))] px-5 py-2">
        <ul className="mt-5 space-y-7 text-lg">
          <li>
            <span>شماره تلفن : </span>
            {/* <span className="rounded-xl bg-slate-800 px-4 py-2">۰{currentUser.phoneNumber}</span> */}
          </li>
          <li>
            <span>ایمیل : </span>
            {/* <span className="rounded-xl bg-slate-800 px-4 py-2">{currentUser.email}</span> */}
          </li>
          <li className="flex items-center gap-2">
            <span>زبان تدریس : </span>
            {/* <span className="rounded-xl bg-slate-800 px-4 py-2">{currentUser.language}</span> */}
            <div className="h-fit w-fit cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700">
              <BiPencil className="h-4 w-4" />
            </div>
          </li>
          <li className="flex items-center gap-2">
            <span>سطح تدریس : </span>
            {/* <span className="rounded-xl bg-slate-800 px-4 py-2">{currentUser.level}</span> */}
            <div className="h-fit w-fit cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700">
              <BiPencil className="h-4 w-4" />
            </div>
          </li>
          <li>
            <span>وضعیت ثبت نام : </span>
            {/* <span
              className={`rounded-xl px-4 py-2 ${currentUser.signupStatus === 'waiting' ? 'bg-yellow-500/65' : currentUser.signupStatus === 'comfirmed' ? 'bg-green-500/65' : currentUser.signupStatus === 'rejected' ? 'bg-red-500/65' : ''}`}
            >
              {currentUser.signupStatus === 'waiting' && 'در حال بررسی...'}
              {currentUser.signupStatus === 'comfirmed' && 'تأیید شده'}
              {currentUser.signupStatus === 'rejected' && 'رد شده'}
            </span> */}
          </li>
        </ul>
        <ul className="space-y-3">
          <h3 className="text-lg">اتاق های رزرو شده : </h3>
          <li className="flex gap-3">
            <ReserveRecord
              number={1}
              roomName="100"
              timePart={0}
              status="waiting"
              extraClasses="w-[525px]"
            />
            <PanelButton extraClasses="text-sm px-5"> پرداخت </PanelButton>
            <PanelButton extraClasses="text-sm bg-red-800 border-red-300 hover:bg-red-700 px-5">
              لغو
            </PanelButton>
          </li>
          <li className="flex gap-3">
            <ReserveRecord
              number={2}
              roomName="101"
              timePart={0}
              status="waiting"
              extraClasses="w-[525px]"
            />
            <PanelButton extraClasses="text-sm px-5 "> پرداخت </PanelButton>
            <PanelButton extraClasses="text-sm bg-red-800 border-red-300 hover:bg-red-700 px-5">
              لغو
            </PanelButton>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserInfo;
