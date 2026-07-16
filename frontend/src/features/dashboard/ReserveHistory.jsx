import { useUserReservations } from '../reserve/useUserReservations';

import ReserveRecord from '../reserve/ReserveRecord';

import Skeleton from '../../ui/Skeleton';
import Error from '../../ui/Error';
import { useRooms } from '../reserve/useRooms';
//---

function ReserveHistory({ className }) {
  const {
    userReservations,
    isLoading: isLoadingReservations,
    error: reservationsError,
  } = useUserReservations();
  const { rooms, isLoading: isLoadingRooms, error: roomsError } = useRooms();

  const isLoading = isLoadingReservations || isLoadingRooms;
  const error = reservationsError || roomsError;

  return (
    <div className={className}>
      <h3 className="flex border-b border-[var(--color-slate-500)] pb-3 text-lg font-semibold text-[var(--color-slate-400)]">
        تاریخچه رزرو ها
      </h3>
      {isLoading ? (
        <Skeleton />
      ) : error ? (
        <Error error={error?.message} />
      ) : userReservations?.length === 0 ? (
        <p className="flex items-center justify-center p-2 text-xl text-[var(--color-slate-500)]">
          تاریخچه ای وجود ندارد
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {userReservations?.map((record, i) => (
            <li key={record.id}>
              <ReserveRecord
                number={i + 1}
                reservationId={record.id}
                rooms={rooms}
                roomId={record.roomId}
                date={new Date(record.reservationDate)}
                timePart={record.timePart}
                status={record.status}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReserveHistory;
