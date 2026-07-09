import { useRooms } from '../features/reserve/useRooms';
import { useProfile } from '../features/setting/useProfile';

import ReserveTableData from '../features/reserve/ReserveTableData';
import Spinner from '../ui/Spinner';
import Error from '../ui/Error';

import makePersianNumberString from '../utils/makePersianNumbersString';
import mapTime from '../utils/mapTime';
//---

//!Const Variables
const timeParts = Array.from({ length: 10 }, (_, i) => i);

//TODO#3: Implement reservation action
function ReserveRoom() {
  const { rooms, isLoading: isLoadingRooms, error: roomsError } = useRooms();
  const { profile, isLoading: isLoadingProfile, error: profileError } = useProfile();

  //! Fake Data
  const date = {};

  //! Derived States
  const formatDate =
    (date?.reserveDate?.slice(0, 4) ?? '۰۱') +
    '/' +
    (date?.reserveDate?.slice(4, 6) ?? '۰۱') +
    '/' +
    (date?.reserveDate?.slice(6, 8) ?? '۰۱');

  if (roomsError || profileError)
    return (
      <div className="flex items-center justify-center">
        <Error
          extraClasses="w-[60%] h-[40%] "
          error={(roomsError?.message || profileError?.message) ?? ''}
        />
      </div>
    );

  //!JSX
  return (
    <div className="overflow-x-auto overflow-y-hidden border-b border-[var(--color-slate-500)] p-5">
      <div className="text-xl">
        <span className="font-semibold text-[var(--color-slate-300)]">رزرو اتاق برای تاریخ :</span>
        <span className="rounded-lg bg-[var(--color-slate-800)] px-3 py-1">{formatDate}</span>
      </div>
      {isLoadingRooms || isLoadingProfile ? (
        <div className="flex h-full items-center justify-center">
          <Spinner />
        </div>
      ) : rooms?.length > 0 && profile?.signupStatus === 'confirmed' ? (
        <table className="mt-6 rounded-xl bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))] text-center shadow-lg shadow-[var(--shadow-color)]">
          <thead>
            <tr>
              <th className="w-24 whitespace-nowrap rounded-ss-xl bg-[var(--color-slate-800)] px-3 py-4">
                نام اتاق
              </th>
              {timeParts.map((i) => (
                <th
                  key={i}
                  className="w-24 whitespace-nowrap border-b border-[var(--color-slate-700)] px-3"
                >
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
                {timeParts.map((partIndex) => (
                  <ReserveTableData
                    key={partIndex}
                    timePartIndex={partIndex}
                    reserveDate={date.reserveDate}
                    timePartStatus={null}
                    roomData={room}
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
