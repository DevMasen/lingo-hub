import makePersianNumberString from '../utils/makePersianNumbersString';
import mapToPersianMonth from '../utils/mapToPersianMonth';
import mapTime from '../utils/mapTime';
///////////////////////////////////////
function ReserveRecord({
  number = 0,
  roomName = '',
  date = '',
  timePart = 0,
  status = '', // reserved/canceled/waiting
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
