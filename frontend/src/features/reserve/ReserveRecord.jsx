import { useEffect, useState } from 'react';

import makePersianNumberString from '../../utils/makePersianNumbersString';
import mapToPersianMonth from '../../utils/mapToPersianMonth';
import mapTime from '../../utils/mapTime';
import { toPersianDate } from '../../utils/toPersianDate';
//---

function ReserveRecord({
  focusReserveId = null,
  number = 0,
  reservationId = null,
  roomId = null,
  date = null,
  timePart = null,
  status = '', // reserved/canceled/waiting
  extraClasses = '',
}) {
  //! Local States
  const [recordBGColor, setRecordBGColor] = useState('bg-[var(--color-slate-700)]');

  //! Derived States
  const { startTime, stopTime } = mapTime(timePart);

  const persianDate = date ? toPersianDate(date) : null;

  const roomName = 'A';

  //! Effects
  useEffect(
    function () {
      if (focusReserveId === null || focusReserveId !== reservationId) return;
      setRecordBGColor('bg-[var(--color-slate-500)]');
      setTimeout(function () {
        setRecordBGColor('bg-[var(--color-slate-700)]');
      }, 700);
    },
    [focusReserveId, reservationId]
  );

  //! JSX
  return (
    <div
      className={`flex justify-between gap-4 rounded-xl text-sm sm:text-base ${recordBGColor} bg-opacity-70 p-3 transition-colors duration-300 ${extraClasses}`}
    >
      <div className="flex gap-6">
        <span>
          <span>{makePersianNumberString(number + '')}</span>
          <span>.</span>
        </span>
        <span className="flex gap-1">
          <span>اتاق</span>
          <span>{roomName}</span>
        </span>
        {persianDate && (
          <span className="flex gap-1">
            <span>{persianDate.slice(8, 10)}</span>
            <span>{mapToPersianMonth(persianDate.slice(5, 7))}</span>
            <span>{persianDate.slice(0, 4)}</span>
          </span>
        )}
        <span className="flex gap-1">
          <span>{makePersianNumberString(startTime)}</span>
          <span>تا</span>
          <span>{makePersianNumberString(stopTime)}</span>
        </span>
      </div>
      <span className="whitespace-nowrap">
        {status === 'waiting' && 'در انتظار پرداخت ⌛'}
        {status === 'reserved' && 'رزرو شد ✅'}
        {status === 'canceled' && 'لغو شد ❌'}
      </span>
    </div>
  );
}

export default ReserveRecord;
