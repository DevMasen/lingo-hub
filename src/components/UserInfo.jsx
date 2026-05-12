import { useEffect, useState } from 'react';
import { useFetcher, useLoaderData, useSearchParams } from 'react-router';
//////////////////////////////////////////
import { BiPencil, BiUserCircle } from 'react-icons/bi';
import { PiEmpty } from 'react-icons/pi';
////////////////////////////////////////////////////////
import PanelButton from './PanelButton';
import ReserveRecord from './ReserveRecord';
////////////////////////////////////////////
import { usePay } from '../context/PayContext';
////////////////////////////////////////////////
import { getUser, updateUserReserveHistory } from '../services/apiUsers';
import { getDate } from '../services/apiDate';
import { getRooms, updateTimeLines } from '../services/apiRooms';
///////////////////////////////////////////////
import mapToPersian from '../utils/mapToPersian';
/////////////////////////////////////////////////
//TODO break into smaller components
function UserInfo() {
  //! React Router
  const fetcher = useFetcher();
  const [query] = useSearchParams();
  const { user, date } = useLoaderData();

  //! Context Data
  const { togglePayWindow } = usePay();

  //! Local States
  const [focusReserveId, setFocusReserveId] = useState(null);
  const [reserveRemainCountBG, setReserveRemainCountBg] = useState('bg-slate-800');

  //! Derived States
  const reserveRemainCount =
    user.reservedRooms.length === 0
      ? user.maxReserveCount
      : user.maxReserveCount -
        user.reservedRooms
          .filter((res) => res.date === date[0].reserveDate)
          .reduce((acc, reserve) => {
            if (reserve.status !== 'canceled') return acc + 1;
            return acc;
          }, 0);

  //! Effects
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load(`/app/${user.id}/reserve`);
    },
    [fetcher, user.id]
  );
  useEffect(
    function () {
      const currentFocusReserve = user.reservedRooms
        .filter((record) => record.date === date[0].reserveDate)
        .find(
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
    [query, user.reservedRooms, date]
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
  useEffect(
    function () {
      if (query.get('reserveCountLimit') === null) return;
      const reserveRemainCounter = document.getElementById('reserve-remain-counter');
      const scrollPosition = reserveRemainCounter.getBoundingClientRect().top;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
      setReserveRemainCountBg('bg-slate-700');
      setTimeout(function () {
        setReserveRemainCountBg('bg-slate-800');
      }, 1000);
    },
    [query]
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
            <span> سطح تدریس : </span>
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
            <span id="reserve-remain-counter"> تعداد رزرو باقی مانده : </span>
            <span
              className={`rounded-xl px-4 py-2 transition-colors duration-200 ${reserveRemainCountBG}`}
            >
              {mapToPersian(String(reserveRemainCount))}
            </span>
          </li>
        </ul>
        <ul id="reserve-list" className="space-y-3">
          <h3 className="text-lg"> اتاق های رزرو شده :</h3>
          {user.reservedRooms.length > 0 ? (
            user.reservedRooms
              .filter((rec) => rec.date === date[0].reserveDate)
              .map((record, i) => (
                <li className="flex gap-3" key={record.id}>
                  <ReserveRecord
                    focusReserveId={focusReserveId}
                    number={i + 1}
                    roomId={record.id}
                    roomName={record.roomName}
                    date={record.date}
                    timePart={record.timePart}
                    status={record.status}
                    extraClasses="w-[525px]"
                  />
                  {record.status === 'waiting' && (
                    <>
                      <div className="flex flex-col items-center justify-center rounded-xl bg-slate-700 px-3 text-sm">
                        <span>
                          {new Intl.NumberFormat('fa-IR').format(
                            fetcher.data?.rooms.find((room) => room.roomName === record.roomName)
                              .reservePricePerHalfHour * 3
                          )}
                        </span>
                        <span>تومان</span>
                      </div>
                      <PanelButton
                        to={`pay?cost=${
                          fetcher.data?.rooms.find((room) => room.roomName === record.roomName)
                            .reservePricePerHalfHour * 3
                        }&recordId=${record.id}&roomName=${record.roomName}&timePartIndex=${record.timePart}`}
                        onClick={togglePayWindow}
                        extraClasses="text-sm px-5"
                      >
                        پرداخت
                      </PanelButton>

                      <fetcher.Form method="PATCH">
                        <PanelButton
                          type="submit"
                          extraClasses="text-sm bg-red-800 border-red-300 hover:bg-red-700 px-5 w-full h-full"
                        >
                          لغو
                        </PanelButton>
                        <input type="hidden" name="recordId" value={record.id} />
                        <input type="hidden" name="roomName" value={record.roomName} />
                        <input type="hidden" name="timePartIndex" value={record.timePart} />
                      </fetcher.Form>
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
          {user.reservedRooms.length > 0 &&
            !user.reservedRooms.some((record) => record.date === date[0].reserveDate) && (
              <p className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 py-8 text-xl text-slate-400">
                <span> رزروی برای فردا وجود ندارد </span>
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
  const date = await getDate();
  return { user, date };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const rooms = await getRooms();
  const user = await getUser(params.userId);

  const currentRoomTimeLines = rooms.find((room) => room.roomName === data.roomName)?.timeLines;
  const roomId = rooms.find((room) => room.roomName === data.roomName)?.id;

  const updatedRoom = {
    timeLines: Array.from({ length: currentRoomTimeLines.length }, (_, k) =>
      k === +data.timePartIndex ? [+params.userId, 'canceled'] : currentRoomTimeLines[k]
    ),
  };

  await updateTimeLines(roomId, updatedRoom);

  const updatedUser = {
    reservedRooms: Array.from({ length: user.reservedRooms.length }, (_, k) =>
      k + 1 === +data.recordId
        ? { ...user.reservedRooms[k], status: 'canceled' }
        : user.reservedRooms[k]
    ),
  };

  await updateUserReserveHistory(params.userId, updatedUser);

  return null;
}

export default UserInfo;
