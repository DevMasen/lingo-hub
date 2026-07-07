import { useEffect, useRef, useState } from 'react';

import ReserveRecord from '../../features/reserve/ReserveRecord';
import ControlWaitingReserve from '../../features/setting/ControlWaitingReserve';
import ReserveNotFound from '../reserve/ReserveNotFound';
//---

function UserReserveList({ date, query }) {
  //! Local States
  const [focusReserveId, setFocusReserveId] = useState(null);

  //! Local Element Refs
  const reserveListRef = useRef(null);

  //TODO: change strategy
  const reservedRooms = [];

  //! Effects
  useEffect(
    function () {
      const currentFocusReserve = reservedRooms
        .filter((record) => record.date === date.reserveDate)
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
    [query, reservedRooms, date]
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
      {reservedRooms.length > 0 ? (
        reservedRooms
          .filter((rec) => rec.date === date.reserveDate)
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
              {record.status === 'waiting' && <ControlWaitingReserve record={record} />}
            </li>
          ))
      ) : (
        <ReserveNotFound>رزروی وجود ندارد</ReserveNotFound>
      )}
      {reservedRooms.length > 0 &&
        !reservedRooms.some((record) => record.date === date.reserveDate) && (
          <ReserveNotFound>رزروی برای فردا وجود ندارد</ReserveNotFound>
        )}
    </ul>
  );
}

export default UserReserveList;
