import { addDays } from 'date-fns';
import UserReserveList from './UserReserveList';
import { toPersianDate } from '../../utils/toPersianDate';

function MyReservations() {
  const tomorrow = addDays(new Date(), 1);
  const persianTomorrow = toPersianDate(tomorrow);
  return (
    <div className="m-5">
      <div className="pb-7 text-xl">
        <span className="font-semibold text-[var(--color-slate-300)]">
          اتاق های رزرو شده برای تاریخ :{' '}
        </span>
        <span className="rounded-lg bg-[var(--color-slate-800)] px-3 py-1">
          {persianTomorrow.replaceAll('-', '/')}{' '}
        </span>
      </div>
      <UserReserveList />
    </div>
  );
}

export default MyReservations;
