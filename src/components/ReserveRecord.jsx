import makePersianNumberString from '../utils/makePersianNumbersString';
import mapTime from '../utils/mapTime';
import mapToPersianMonth from '../utils/mapToPersianMonth';
import persianDate from 'persian-date/dist/persian-date';

function ReserveRecord({
  number = 1,
  roomName = 'نامشخص',
  date = new persianDate(),
  timePart = 0,
  status = 'waiting', // reserved/canceled/waiting
  extraClasses = '',
}) {
  const { startTime, stopTime } = mapTime(timePart);
  return (
    <div
      className={`flex justify-between gap-4 rounded-xl bg-slate-700 bg-opacity-70 p-3 ${extraClasses}`}
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
          <span>{makePersianNumberString(String(date.date()).padStart(2, '0'))}</span>
          <span>{mapToPersianMonth(date.month())}</span>
          <span>{makePersianNumberString(String(date.year()).padStart(4, '0'))}</span>
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
