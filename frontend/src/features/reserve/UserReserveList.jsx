import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { format, addDays } from 'date-fns';

import { useUserReservations } from './useUserReservations';
import { useRooms } from './useRooms';

import ReserveRecord from './ReserveRecord';
import ReserveNotFound from './ReserveNotFound';
import ReserveSubmit from './ReserveSubmit';
import Skeleton from '../../ui/Skeleton';
import Error from '../../ui/Error';
//---

function UserReserveList() {
  //! React Query
  const {
    userReservations,
    isLoading: isLoadingReservations,
    error: reservationsError,
  } = useUserReservations();
  const { rooms, isLoading: isLoadingRooms, error: roomsError } = useRooms();

  const isLoading = isLoadingReservations || isLoadingRooms;
  const error = reservationsError || roomsError;

  const tomorrow = addDays(new Date(), 1);
  const tomorrowFormatted = format(tomorrow, 'yyyy-MM-dd');
  const userTomorrowReservations = userReservations?.filter(
    (reservation) => reservation.reservationDate === tomorrowFormatted
  );

  //! React Router
  const [query] = useSearchParams();

  //! Local States
  const [focusReserveId, setFocusReserveId] = useState(null);

  //! Local Element Refs
  const reserveListRef = useRef(null);

  //! Effects
  useEffect(
    function () {
      setFocusReserveId(query.get('reservationId'));
    },
    [query]
  );
  useEffect(
    function () {
      if (focusReserveId === null) return;
      const scrollPosition = reserveListRef.current.getBoundingClientRect().top;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    },
    [focusReserveId]
  );

  return (
    <ul
      ref={reserveListRef}
      className="space-y-3 rounded-xl bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))] p-3"
    >
      {isLoading ? (
        <Skeleton className="h-28 w-full rounded-xl" />
      ) : error ? (
        <Error error={error?.message} />
      ) : userTomorrowReservations?.length === 0 ? (
        <ReserveNotFound>رزروی برای فردا وجود ندارد</ReserveNotFound>
      ) : (
        userTomorrowReservations?.map((reservation, i) => (
          <li
            className={`flex flex-col gap-3 rounded-xl bg-[var(--color-slate-800)] lg:flex-row lg:bg-transparent ${reservation.status === 'waiting' && 'pb-2 lg:pb-0'}`}
            key={reservation.id}
          >
            <ReserveRecord
              focusReserveId={focusReserveId}
              number={i + 1}
              reservationId={reservation.id}
              rooms={rooms}
              roomId={reservation.roomId}
              timePart={reservation.timePart}
              status={reservation.status}
            />
            {reservation.status === 'waiting' && (
              <ReserveSubmit reservation={reservation} rooms={rooms} roomId={reservation.roomId} />
            )}
          </li>
        ))
      )}
    </ul>
  );
}

export default UserReserveList;
