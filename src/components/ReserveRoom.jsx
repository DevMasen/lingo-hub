import { useLoaderData } from 'react-router';
/////////////////////////////////////////////
import ReserveTableData from './ReserveTableDate';
//////////////////////////////////////////////////
import { refreshTableData } from '../services/apiRefresh';
import { getRooms } from '../services/apiRooms';
import { getDate } from '../services/apiDate';
/////////////////////////////////////////////
import makePersianNumberString from '../utils/makePersianNumbersString';
import mapTime from '../utils/mapTime';
///////////////////////////////////////
//TODO BREAK INTO SMALLER COMPS
function ReserveRoom() {
  const { date, rooms } = useLoaderData();
  return (
    <div className="border-b border-slate-500 p-3">
      <div className="text-xl">
        <span className="font-semibold text-slate-300"> رزرو اتاق برای تاریخ : </span>{' '}
        <span className="rounded-lg bg-slate-800 px-3 py-1">
          {date[0].reserveDate.slice(0, 4) +
            '/' +
            date[0].reserveDate.slice(4, 6) +
            '/' +
            date[0].reserveDate.slice(6, 8)}
        </span>
      </div>
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
          <tr>
            <th className="bg-slate-800 py-5">{rooms[0].roomName}</th>
            {rooms[0].timeLines.map((timePartStatus, i) => (
              <ReserveTableData
                key={i}
                reserveDate={date[0].reserveDate}
                timePartStatus={timePartStatus}
                roomData={rooms[0]}
              />
            ))}
          </tr>
          <tr>
            <th className="bg-slate-800 py-5">{rooms[1].roomName}</th>
            {rooms[1].timeLines.map((timePartStatus, i) => (
              <ReserveTableData
                key={i}
                reserveDate={date[0].reserveDate}
                timePartStatus={timePartStatus}
                roomData={rooms[1]}
              />
            ))}
          </tr>
          <tr>
            <th className="bg-slate-800 py-5">{rooms[2].roomName}</th>
            {rooms[2].timeLines.map((timePartStatus, i) => (
              <ReserveTableData
                key={i}
                reserveDate={date[0].reserveDate}
                timePartStatus={timePartStatus}
                roomData={rooms[2]}
              />
            ))}
          </tr>
          <tr>
            <th className="bg-slate-800 py-5">{rooms[3].roomName}</th>
            {rooms[3].timeLines.map((timePartStatus, i) => (
              <ReserveTableData
                key={i}
                reserveDate={date[0].reserveDate}
                timePartStatus={timePartStatus}
                roomData={rooms[3]}
              />
            ))}
          </tr>
          <tr>
            <th className="rounded-es-xl bg-slate-800 py-5">{rooms[4].roomName}</th>
            {rooms[4].timeLines.map((timePartStatus, i) => (
              <ReserveTableData
                key={i}
                reserveDate={date[0].reserveDate}
                timePartStatus={timePartStatus}
                roomData={rooms[4]}
              />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export async function loader() {
  await refreshTableData();
  const date = await getDate();
  const rooms = await getRooms();
  return { date, rooms };
}

export default ReserveRoom;
