import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { format, addDays } from 'date-fns';

import { useUserReservations } from './useUserReservations';

import ReserveRecord from '../../features/reserve/ReserveRecord';
import ReserveNotFound from '../reserve/ReserveNotFound';
import Skeleton from '../../ui/Skeleton';
import Error from '../../ui/Error';
import ReserveSubmit from './ReserveSubmit';
import { useRooms } from '../reserve/useRooms';
//---

//TODO#2: render reservations per user and ability to pay/cancel
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
    <ul ref={reserveListRef} className="space-y-3">
      {isLoading ? (
        <Skeleton className="h-28 w-full rounded-xl" />
      ) : error ? (
        <Error error={error?.message} />
      ) : userTomorrowReservations?.length === 0 ? (
        <ReserveNotFound>رزروی برای فردا وجود ندارد</ReserveNotFound>
      ) : (
        userTomorrowReservations?.map((reservation, i) => (
          <li className="flex flex-col gap-3 md:flex-row" key={reservation.id}>
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
