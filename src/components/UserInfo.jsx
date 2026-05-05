import { useEffect, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router';
//////////////////////////////////////////
import { BiPencil, BiUserCircle } from 'react-icons/bi';
import { PiEmpty } from 'react-icons/pi';
////////////////////////////////////////////////////////
import PanelButton from './PanelButton';
import ReserveRecord from './ReserveRecord';
////////////////////////////////////////////
import { getUser } from '../services/apiUsers';
///////////////////////////////////////////////
import mapToPersian from '../utils/mapToPersian';
/////////////////////////////////////////////////
function UserInfo() {
  //! React Router
  const user = useLoaderData();
  const [query] = useSearchParams();
  const [focusReserveId, setFocusReserveId] = useState(null);

  const reserveRemainCount =
    user.reservedRooms.length === 0
      ? user.maxReserveCount
      : user.maxReserveCount -
        user.reservedRooms.reduce((acc, reserve) => {
          if (reserve.status !== 'canceled') return acc + 1;
          return acc;
        }, 0);

  useEffect(
    function () {
      const currentFocusReserve = user.reservedRooms.find(
        (reserve) =>
          reserve.roomName === query.get('roomName') &&
          String(reserve.timePart) === query.get('timePart') &&
          reserve.status === query.get('status')
      );
      if (currentFocusReserve === undefined) {
        setFocusReserveId(null);
        return;
      }
      setFocusReserveId(currentFocusReserve.id);
    },
    [query, user.reservedRooms]
  );

  useEffect(
    function () {
      if (focusReserveId === null) return;
      const reserveListElement = document.getElementById('reserve-list');
      const scrollPosition = reserveListElement.getBoundingClientRect().top;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    },
    [focusReserveId]
  );
  //! JSX
  return (
    <div className="space-y-5 border-b border-slate-500 p-3">
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
        <button className="h-fit w-fit cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700">
          <BiPencil className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-7 rounded-2xl bg-[linear-gradient(45deg,var(--color-indigo-900),var(--color-slate-800))] px-5 py-2">
        <ul className="mt-5 space-y-7 text-lg">
          <li>
            <span>شماره تلفن : </span>
            <span className="rounded-xl bg-slate-800 px-4 py-2">۰{user.phoneNumber}</span>
          </li>
          <li>
            <span>ایمیل : </span>
            <span className="rounded-xl bg-slate-800 px-4 py-2">{user.email}</span>
          </li>
          <li className="flex items-center gap-2">
            <span>زبان تدریس : </span>
            <span className="rounded-xl bg-slate-800 px-4 py-2">{user.language}</span>
            <div className="h-fit w-fit cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700">
              <BiPencil className="h-4 w-4" />
            </div>
          </li>
          <li className="flex items-center gap-2">
            <span>سطح تدریس : </span>
            <span className="rounded-xl bg-slate-800 px-4 py-2">{user.level}</span>
            <div className="h-fit w-fit cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-slate-800 hover:text-indigo-700">
              <BiPencil className="h-4 w-4" />
            </div>
          </li>
          <li>
            <span>وضعیت ثبت نام : </span>
            <span
              className={`rounded-xl px-4 py-2 ${user.signupStatus === 'waiting' ? 'bg-yellow-500/65' : user.signupStatus === 'confirmed' ? 'bg-green-500/65' : user.signupStatus === 'rejected' ? 'bg-red-500/65' : ''}`}
            >
              {user.signupStatus === 'waiting' && 'در حال بررسی...'}
              {user.signupStatus === 'confirmed' && 'تأیید شده'}
              {user.signupStatus === 'rejected' && 'مسدود شده'}
            </span>
          </li>
          <li>
            <span> تعداد رزرو باقی مانده : </span>
            <span className="rounded-xl bg-slate-800 px-4 py-2">
              {mapToPersian(String(reserveRemainCount))}
            </span>
          </li>
        </ul>
        <ul id="reserve-list" className="space-y-3">
          <h3 className="text-lg">اتاق های رزرو شده : </h3>
          {user.reservedRooms.length > 0 ? (
            user.reservedRooms.map((record) => (
              <li className="flex gap-3" key={record.id}>
                <ReserveRecord
                  focusReserveId={focusReserveId}
                  number={record.id}
                  roomName={record.roomName}
                  date={record.date}
                  timePart={record.timePart}
                  status={record.status}
                  extraClasses="w-[525px]"
                />
                {record.status === 'waiting' && (
                  <>
                    <PanelButton extraClasses="text-sm px-5"> پرداخت </PanelButton>

                    <PanelButton extraClasses="text-sm bg-red-800 border-red-300 hover:bg-red-700 px-5">
                      لغو
                    </PanelButton>
                  </>
                )}
              </li>
            ))
          ) : (
            <p className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 py-8 text-xl text-slate-400">
              <span>رزروی وجود ندارد</span>
              <PiEmpty />
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const user = await getUser(params.userId);
  return user;
}

export default UserInfo;
