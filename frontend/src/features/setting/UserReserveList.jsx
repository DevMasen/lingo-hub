import { useEffect, useRef, useState } from 'react';

import ReserveRecord from '../../features/reserve/ReserveRecord';
import ReserveNotFound from '../reserve/ReserveNotFound';
import { useSearchParams } from 'react-router';
//---

//TODO#2: render reservations per user and ability to pay/cancel
function UserReserveList() {
  const [query] = useSearchParams();

  //! Local States
  const [focusReserveId, setFocusReserveId] = useState(null);

  //! Local Element Refs
  const reserveListRef = useRef(null);

  //! Effects
  useEffect(
    function () {
      // filter reservation in supabase with [userId, date, query]
      const currentFocusReserve = undefined; //reservationId
      if (currentFocusReserve === undefined) {
        setFocusReserveId(null);
        return;
      }
      setFocusReserveId(currentFocusReserve);
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
      <h3 className="text-lg"> اتاق های رزرو شده :</h3>
      {[]?.length > 0 ? (
        // filter in by [userId,date]
        []?.map((reservation, i) => (
          <li className="flex gap-3" key={reservation.id}>
            <ReserveRecord
              focusReserveId={focusReserveId}
              number={i + 1}
              reservationId={reservation.id}
              roomId={reservation.roomId}
              date={reservation.date}
              timePart={reservation.timePart}
              status={reservation.status}
              extraClasses="w-[525px]"
            />
          </li>
        ))
      ) : (
        <ReserveNotFound>رزروی وجود ندارد</ReserveNotFound>
      )}
      {/* filter by  [userId,date] */}
      {[].length > 0 && <ReserveNotFound>رزروی برای فردا وجود ندارد</ReserveNotFound>}
    </ul>
  );
}

export default UserReserveList;
