import { useLoaderData } from 'react-router';
/////////////////////////////////////////////
import ReserveTableData from './ReserveTableDate';
//////////////////////////////////////////////////
import { refreshTableData } from '../services/apiRefresh';
import { getRooms } from '../services/apiRooms';
import { getDate } from '../services/apiDate';
import { getUser } from '../services/apiUsers';
/////////////////////////////////////////////
import makePersianNumberString from '../utils/makePersianNumbersString';
import mapTime from '../utils/mapTime';
import ConfirmReserveModal from './ConfirmReserveModal';
///////////////////////////////////////
function ReserveRoom() {
  const { date, rooms, user } = useLoaderData();
  const formatDate =
    date[0].reserveDate.slice(0, 4) +
    '/' +
    date[0].reserveDate.slice(4, 6) +
    '/' +
    date[0].reserveDate.slice(6, 8);
  return (
    <div className="border-b border-slate-500 p-3">
      <ConfirmReserveModal date={formatDate} />
      <div className="text-xl">
        <span className="font-semibold text-slate-300"> رزرو اتاق برای تاریخ : </span>{' '}
        <span className="rounded-lg bg-slate-800 px-3 py-1">{formatDate}</span>
      </div>
      {rooms.length > 0 && user.signupStatus === 'confirmed' ? (
        <table className="mt-6 rounded-xl bg-[linear-gradient(45deg,var(--color-slate-800),var(--color-indigo-900))] text-center">
          <thead>
            <tr>
              <th className="w-24 rounded-ss-xl bg-slate-800 py-4"> نام اتاق </th>
              {Array.from({ length: 10 }, (_, i) => (
                <th key={i} className="w-24 border-b border-slate-700">
                  {makePersianNumberString(mapTime(i).startTime)}
                  <span> تا </span>
                  {makePersianNumberString(mapTime(i).stopTime)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <th className="bg-slate-800 py-5">{room.roomName}</th>
                {room.timeLines.map((timePartStatus, i) => (
                  <ReserveTableData
                    key={i}
                    timePartIndex={i}
                    reserveDate={date[0].reserveDate}
                    timePartStatus={timePartStatus}
                    roomData={room}
                    userId={user.id}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="flex h-full items-center justify-center text-xl font-semibold text-slate-300">
          <span> امکان رزرو وجود ندارد⛔ </span>
        </p>
      )}
    </div>
  );
}

export async function loader({ params }) {
  await refreshTableData();
  const date = await getDate();
  const rooms = await getRooms();
  const user = await getUser(params.userId);
  return { date, rooms, user };
}

export default ReserveRoom;
