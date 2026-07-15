import { useRooms } from './useRooms';
import { useProfile } from '../setting/useProfile';
import { en2fa } from 'num2persian';
import { addDays } from 'date-fns';

import ReserveTableRow from './ReserveTableRow';
import Spinner from '../../ui/Spinner';
import Error from '../../ui/Error';
import Modal from '../../ui/Modal';

import mapTime from '../../utils/mapTime';
import { toPersianDate } from '../../utils/toPersianDate';
import { timeParts } from '../../utils/timeParts';
import ConfirmReserve from './ConfirmReserve';
//---

function ReserveRoom() {
  const { rooms, isLoading: isLoadingRooms, error: roomsError } = useRooms();
  const { profile, isLoading: isLoadingProfile, error: profileError } = useProfile();

  const tomorrow = addDays(new Date(), 1);
  const persianTomorrow = toPersianDate(tomorrow);

  if (roomsError || profileError)
    return (
      <div className="flex items-center justify-center">
        <Error
          className="h-[40%] w-[60%]"
          error={(roomsError?.message || profileError?.message) ?? ''}
        />
      </div>
    );

  //!JSX
  return (
    <div className="overflow-x-auto overflow-y-hidden p-5">
      <div className="text-xl">
        <span className="font-semibold text-[var(--color-slate-300)]">رزرو اتاق برای تاریخ : </span>
        <span className="rounded-lg bg-[var(--color-slate-800)] px-3 py-1">
          {persianTomorrow.replaceAll('-', '/')}
        </span>
      </div>
      {isLoadingRooms || isLoadingProfile ? (
        <div className="flex h-full items-center justify-center">
          <Spinner />
        </div>
      ) : profile?.signupStatus === 'confirmed' ? (
        <Modal>
          <table className="mt-6 bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))] text-center shadow-lg shadow-[var(--shadow-color)]">
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
                    {en2fa(mapTime(i).startTime)}
                    <span> تا </span>
                    {en2fa(mapTime(i).stopTime)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms?.map((room) => (
                <ReserveTableRow key={room.id} userId={profile?.id} room={room} />
              ))}
            </tbody>
          </table>
          <Modal.Window name={'reservation'}>
            <ConfirmReserve />
          </Modal.Window>
        </Modal>
      ) : (
        <p className="flex h-full items-center justify-center text-xl font-semibold text-[var(--color-slate-300)]">
          <span> امکان دسترسی به این بخش وجود ندارد⛔ </span>
        </p>
      )}
    </div>
  );
}

export default ReserveRoom;
