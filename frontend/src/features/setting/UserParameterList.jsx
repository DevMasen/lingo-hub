import { useEffect, useRef, useState } from 'react';
import { en2fa } from 'num2persian';

import UserParameter from './UserParameter';
import { useProfile } from './useProfile';
import Skeleton from '../../ui/Skeleton';
import Error from '../../ui/Error';
import { useSession } from '../authentication/useSession';
//---

function UserParameterList({ userId, date, query }) {
  //! React Query
  const { email, isLoadingSession, error: sessionError } = useSession();
  const { profile, isLoadingProfile, error: profileError } = useProfile(userId);

  //! Local States
  const [reserveRemainCountBG, setReserveRemainCountBg] = useState('bg-[var(--color-slate-700)]');

  //! Local Elements Ref
  const reserveRemainRef = useRef(null);

  //TODO : change strategy on this
  const reservedRooms = [];

  //! Derived States
  const reserveRemainCount =
    reservedRooms.length === 0
      ? profile?.maxReserveCount
      : profile?.maxReserveCount -
        reservedRooms
          .filter((res) => res.date === date.reserveDate)
          .reduce((acc, reserve) => {
            if (reserve.status !== 'canceled') return acc + 1;
            return acc;
          }, 0);
  const statusBGColor =
    profile?.signupStatus === 'pending'
      ? 'bg-yellow-500/65'
      : profile?.signupStatus === 'confirmed'
        ? 'bg-green-500/65'
        : profile?.signupStatus === 'rejected'
          ? 'bg-red-500/65'
          : '';
  const statusValue =
    profile?.signupStatus === 'pending'
      ? 'در حال بررسی...'
      : profile?.signupStatus === 'confirmed'
        ? 'تأیید شده'
        : profile?.signupStatus === 'rejected'
          ? 'مسدود شده'
          : '';
  const names = [
    { name: 'شماره تلفن', value: '۰' + en2fa(profile?.phoneNumber) },
    { name: 'ایمیل', value: email },
    { name: 'زبان تدریس', value: profile?.language },
    { name: 'سطح تدریس', value: profile?.level },
    { name: 'وضعیت ثبت نام', value: profile?.signupStatus, valueType: 'status' },
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

  if (sessionError || profileError)
    return (
      <div className="flex items-center justify-center">
        {sessionError && <Error extraClasses="w-full" error={sessionError.message} />}
        {profileError && <Error extraClasses="w-full" error={profileError.message} />}
      </div>
    );

  //! JSX
  return (
    <ul className="mt-5 space-y-7 text-lg">
      {names.map((userProperty, i) => {
        if (isLoadingProfile || isLoadingSession) return <Skeleton className="h-12 w-[20%]" />;

        return (
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
        );
      })}
    </ul>
  );
}

export default UserParameterList;
