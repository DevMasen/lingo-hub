import { useEffect, useState } from 'react';

import makePersianNumberString from '../../utils/makePersianNumbersString';
import mapToPersianMonth from '../../utils/mapToPersianMonth';
import mapTime from '../../utils/mapTime';
//---

function ReserveRecord({
  focusReserveId = null,
  number = 0,
  roomId = 0,
  roomName = '',
  date = '',
  timePart = 0,
  status = '', // reserved/canceled/waiting
  extraClasses = '',
}) {
  //! Local States
  const [recordBGColor, setRecordBGColor] = useState('bg-slate-700');

  //! Derived States
  const { startTime, stopTime } = mapTime(timePart);

  //! Effects
  useEffect(
    function () {
      if (focusReserveId === null || focusReserveId !== roomId) return;
      setRecordBGColor('bg-slate-500');
      setTimeout(function () {
        setRecordBGColor('bg-slate-700');
      }, 700);
    },
    [focusReserveId, roomId]
  );

  //! JSX
  return (
    <div
      className={`flex justify-between gap-4 rounded-xl ${recordBGColor} bg-opacity-70 p-3 transition-colors duration-300 ${extraClasses}`}
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
        <span className="flex gap-1">
          <span>{date.slice(6, 8)}</span>
          <span>{mapToPersianMonth(date.slice(4, 6))}</span>
          <span>{date.slice(0, 4)}</span>
        </span>
        <span className="flex gap-1">
          <span>{makePersianNumberString(startTime)}</span>
          <span>تا</span>
          <span>{makePersianNumberString(stopTime)}</span>
        </span>
      </div>
      <span>
        {status === 'waiting' && 'در انتظار پرداخت ⌛'}
        {status === 'reserved' && 'رزرو شد ✅'}
        {status === 'canceled' && 'لغو شد ❌'}
      </span>
    </div>
  );
}

export default ReserveRecord;
