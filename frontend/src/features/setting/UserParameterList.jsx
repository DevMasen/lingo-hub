import { useContext, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { en2fa } from 'num2persian';

import { useSession } from '../authentication/useSession';
import { useProfile } from './useProfile';

import UserParameter, { UserParameterContext } from './UserParameter';

import Skeleton from '../../ui/Skeleton';
import Error from '../../ui/Error';
//---

const listItemStyles = 'flex items-center gap-3';
const skeletonStyles = 'h-10 w-40';

function UserParameterList() {
  const [query] = useSearchParams();
  const { setValueBgColor } = useContext(UserParameterContext);

  //! React Query
  const { email } = useSession();
  const { profile, isLoading, error } = useProfile();

  //! Local Elements Ref
  const reserveRemainRef = useRef(null);

  //! Derived States
  const reserveRemainCount =
    [].length === 0
      ? profile?.maxReserveCount
      : profile?.maxReserveCount -
        []
          // filter by [userId, date]
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

  //! Effects
  useEffect(
    function () {
      if (query.get('reserveCountLimit') === null) return;
      const scrollPosition = reserveRemainRef.current.getBoundingClientRect().top;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
      setValueBgColor('bg-[var(--color-slate-600)]');
      setTimeout(function () {
        setValueBgColor('bg-[var(--color-slate-700)]');
      }, 1000);
    },
    [query, setValueBgColor]
  );

  if (error)
    return (
      <div className="flex items-center justify-center">
        <Error extraClasses="w-full" error={error.message} />
      </div>
    );

  //! JSX
  return (
    <ul className="mt-5 space-y-7 text-lg">
      <li className={listItemStyles}>
        <UserParameter.Label> شماره تلفن : </UserParameter.Label>
        {isLoading ? (
          <Skeleton className={skeletonStyles} />
        ) : (
          <UserParameter.Value> {'۰' + en2fa(profile?.phoneNumber)} </UserParameter.Value>
        )}
      </li>
      <li className={listItemStyles}>
        <UserParameter.Label> ایمیل : </UserParameter.Label>
        {isLoading ? (
          <Skeleton className={skeletonStyles} />
        ) : (
          <UserParameter.Value> {email} </UserParameter.Value>
        )}
      </li>
      <li className={listItemStyles}>
        <UserParameter.Label> زبان تدریس : </UserParameter.Label>
        {isLoading ? (
          <Skeleton className={skeletonStyles} />
        ) : (
          <>
            <UserParameter.Value> {profile?.language} </UserParameter.Value>
            <UserParameter.UpdateButton />
          </>
        )}
        {/* TODO: implement onClick */}
      </li>
      <li className={listItemStyles}>
        <UserParameter.Label> سطح تدریس : </UserParameter.Label>
        {isLoading ? (
          <Skeleton className={skeletonStyles} />
        ) : (
          <>
            <UserParameter.Value> {profile?.level} </UserParameter.Value>
            <UserParameter.UpdateButton />
          </>
        )}
        {/* TODO: implement onClick */}
      </li>
      <li className={listItemStyles}>
        <UserParameter.Label> وضعیت ثبت نام : </UserParameter.Label>
        {isLoading ? (
          <Skeleton className={skeletonStyles} />
        ) : (
          <UserParameter.Value bgColor={statusBGColor}> {statusValue} </UserParameter.Value>
        )}
      </li>
      <li className={listItemStyles}>
        <UserParameter.Label> تعداد رزرو باقی مانده : </UserParameter.Label>
        {isLoading ? (
          <Skeleton className={skeletonStyles} />
        ) : (
          <UserParameter.Value hasShimmerEffect={true}>
            {en2fa(reserveRemainCount)}
          </UserParameter.Value>
        )}
      </li>
    </ul>
  );
}

export default UserParameterList;
