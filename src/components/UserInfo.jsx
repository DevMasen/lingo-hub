import { BiPencil, BiUserCircle } from 'react-icons/bi';
import { useAuth } from '../context/AuthContext';
import ReserveRecord from './ReserveRecord';
function UserInfo() {
  const { currentUser } = useAuth();
  return (
    <div className="border-b border-slate-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-fit w-fit rounded-full bg-slate-800">
            <BiUserCircle />
          </div>
          <div>
            <span>
              {currentUser.firstName} {currentUser.lastName}
            </span>
          </div>
        </div>
        <div className="h-fit w-fit">
          <BiPencil />
        </div>
      </div>
      <div>
        <ul>
          <li>
            <span>شماره تلفن : </span>
            <span>۰{currentUser.phoneNumber}</span>
          </li>
          <li>
            <span>ایمیل : </span>
            <span>{currentUser.email}</span>
          </li>
          <li>
            <span>زبان تدریس : </span>
            <span>{currentUser.language}</span>
          </li>
          <li>
            <span>سطح تدریس : </span>
            <span>{currentUser.level}</span>
          </li>
          <li>
            <span>وضعیت ثبت نام : </span>
            <span>{currentUser.signupStatus === 'waiting' && 'در حال بررسی...'}</span>
          </li>
        </ul>
        <h3>اتاق های رزرو شده : </h3>
        <ul>
          <ReserveRecord number={1} roomName="100" timePart={0} status="waiting" />
          <ReserveRecord number={2} roomName="101" timePart={0} status="waiting" />
        </ul>
      </div>
    </div>
  );
}

export default UserInfo;
