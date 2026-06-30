import ReserveTableData from '../features/reserve/ReserveTableData';
import ConfirmReserveModal from '../features/reserve/ConfirmReserveModal';

import makePersianNumberString from '../utils/makePersianNumbersString';
import mapTime from '../utils/mapTime';
//---

function ReserveRoom() {
  //TODO : replace with real data
  //! Fake Data
  const date = {
    reserveDate: '۱۴۰۵۰۳۱۸',
  };
  const rooms = [
    {
      id: 0,
      roomName: '100',
      timeLines: [
        null,
        null,
        [1, 'reserved'],
        null,
        [1, 'reserved'],
        [1, 'canceled'],
        [1, 'waiting'],
        null,
        null,
        null,
      ],
      reservePricePerHalfHour: 80000,
    },
    {
      id: 1,
      roomName: '101',
      timeLines: [null, null, null, null, null, null, null, null, null, null],
      reservePricePerHalfHour: 80000,
    },
    {
      id: 2,
      roomName: '102',
      timeLines: [null, null, null, null, null, null, null, null, null, null],
      reservePricePerHalfHour: 80000,
    },
    {
      id: 3,
      roomName: '103',
      timeLines: [null, null, null, null, null, null, null, null, null, null],
      reservePricePerHalfHour: 80000,
    },
    {
      id: 4,
      roomName: '104',
      timeLines: [null, null, null, null, null, null, null, null, null, null],
      reservePricePerHalfHour: 80000,
    },
  ];
  const user = {
    firstName: 'علی',
    lastName: 'سیدی',
    phoneNumber: '۹۱۶۲۰۸۶۶۱۴',
    language: 'انگلیسی',
    level: 'مبتدی',
    explanation: '',
    email: 'ali@gmail.com',
    signupStatus: 'confirmed',
    reservedRooms: [
      {
        id: 1,
        roomName: '104',
        date: '۱۴۰۵۰۲۲۳',
        timePart: 2,
        status: 'reserved',
      },
      {
        id: 2,
        roomName: '100',
        date: '۱۴۰۵۰۲۲۳',
        timePart: 5,
        status: 'canceled',
      },
      {
        id: 3,
        roomName: '101',
        date: '۱۴۰۵۰۲۲۳',
        timePart: 1,
        status: 'reserved',
      },
      {
        id: 4,
        roomName: '103',
        date: '۱۴۰۵۰۲۲۳',
        timePart: 8,
        status: 'reserved',
      },
      {
        id: 5,
        roomName: '100',
        date: '۱۴۰۵۰۲۲۴',
        timePart: 2,
        status: 'waiting',
      },
      {
        id: 6,
        roomName: '100',
        date: '۱۴۰۵۰۲۲۴',
        timePart: 4,
        status: 'waiting',
      },
    ],
    creditBalance: 0,
    maxReserveCount: 3,
    id: 2,
  };

  //! Derived States
  const formatDate =
    date.reserveDate.slice(0, 4) +
    '/' +
    date.reserveDate.slice(4, 6) +
    '/' +
    date.reserveDate.slice(6, 8);

  //!JSX
  return (
    <div className="border-b border-[var(--color-slate-500)] p-3">
      <ConfirmReserveModal date={formatDate} />
      <div className="text-xl">
        <span className="font-semibold text-[var(--color-slate-300)]">
          {' '}
          رزرو اتاق برای تاریخ :{' '}
        </span>{' '}
        <span className="rounded-lg bg-[var(--color-slate-800)] px-3 py-1">{formatDate}</span>
      </div>
      {rooms.length > 0 && user.signupStatus === 'confirmed' ? (
        <table className="mt-6 rounded-xl bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))] text-center shadow-lg shadow-[var(--shadow-color)]">
          <thead>
            <tr>
              <th className="w-24 rounded-ss-xl bg-[var(--color-slate-800)] py-4"> نام اتاق </th>
              {Array.from({ length: 10 }, (_, i) => (
                <th key={i} className="w-24 border-b border-[var(--color-slate-700)]">
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
                <th className="bg-[var(--color-slate-800)] py-5">{room.roomName}</th>
                {room.timeLines.map((timePartStatus, i) => (
                  <ReserveTableData
                    key={i}
                    timePartIndex={i}
                    reserveDate={date.reserveDate}
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
        <p className="flex h-full items-center justify-center text-xl font-semibold text-[var(--color-slate-300)]">
          <span> امکان رزرو وجود ندارد⛔ </span>
        </p>
      )}
    </div>
  );
}

export default ReserveRoom;
