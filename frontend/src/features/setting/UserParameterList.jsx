import { useEffect, useRef, useState } from 'react';

import UserParameter from './UserParameter';
//---

function UserParameterList({ user, date, query }) {
  //! Local States
  const [reserveRemainCountBG, setReserveRemainCountBg] = useState('bg-[var(--color-slate-700)]');

  //! Local Elements Ref
  const reserveRemainRef = useRef(null);

  //! Derived States
  const reserveRemainCount =
    user.reservedRooms.length === 0
      ? user.maxReserveCount
      : user.maxReserveCount -
        user.reservedRooms
          .filter((res) => res.date === date.reserveDate)
          .reduce((acc, reserve) => {
            if (reserve.status !== 'canceled') return acc + 1;
            return acc;
          }, 0);
  const statusBGColor =
    user.signupStatus === 'waiting'
      ? 'bg-yellow-500/65'
      : user.signupStatus === 'confirmed'
        ? 'bg-green-500/65'
        : user.signupStatus === 'rejected'
          ? 'bg-red-500/65'
          : '';
  const statusValue =
    user.signupStatus === 'waiting'
      ? 'در حال بررسی...'
      : user.signupStatus === 'confirmed'
        ? 'تأیید شده'
        : user.signupStatus === 'rejected'
          ? 'مسدود شده'
          : '';
  const names = [
    { name: 'شماره تلفن', value: user.phoneNumber },
    { name: 'ایمیل', value: user.email },
    { name: 'زبان تدریس', value: user.language },
    { name: 'سطح تدریس', value: user.level },
    { name: 'وضعیت ثبت نام', value: user.signupStatus, valueType: 'status' },
    { name: 'تعداد رزرو باقی مانده', value: reserveRemainCount, valueType: 'reserveCounter' },
  ];

  //! Effects
  useEffect(
    function () {
      if (query.get('reserveCountLimit') === null) return;
      const scrollPosition = reserveRemainRef.current.getBoundingClientRect().top;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
      setReserveRemainCountBg('bg-[var(--color-slate-600)]');
      setTimeout(function () {
        setReserveRemainCountBg('bg-[var(--color-slate-700)]');
      }, 1000);
    },
    [query]
  );

  //! JSX
  return (
    <ul className="mt-5 space-y-7 text-lg">
      {names.map((userProperty, i) => (
        <UserParameter
          key={i}
          name={userProperty.name}
          value={userProperty.value}
          valueType={userProperty?.valueType ?? 'default'}
          statusBGColor={statusBGColor}
          statusValue={statusValue}
          reserveRemainRef={reserveRemainRef}
          reserveRemainCountBGColor={reserveRemainCountBG}
        />
      ))}
    </ul>
  );
}

export default UserParameterList;
