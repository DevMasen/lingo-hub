import { useContext, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { addDays, endOfDay, isEqual } from 'date-fns';
import { en2fa } from 'num2persian';

import { useSession } from '../authentication/useSession';
import { useProfile } from './useProfile';

import UserParameter, { UserParameterContext } from './UserParameter';
import UserReserveList from './UserReserveList';
import Skeleton from '../../ui/Skeleton';
import Error from '../../ui/Error';

import { toPersianDate } from '../../utils/toPersianDate';
import { useUserReservations } from './useUserReservations';
//---

const listItemStyles = 'flex gap-3';
const skeletonStyles = 'h-10 w-40';
const tomorrow = addDays(new Date(), 1);
const persianTomorrow = toPersianDate(tomorrow);

function UserParameterList() {
  const [query] = useSearchParams();
  const { setValueBgColor } = useContext(UserParameterContext);

  //! React Query
  const { email } = useSession();
  const { profile, isLoading: isLoadingProfile, error: profileError } = useProfile();
  const {
    userReservations,
    isLoading: isLoadingUserReservations,
    error: userReservationsError,
  } = useUserReservations();

  const isLoading = isLoadingProfile || isLoadingUserReservations;
  const error = profileError || userReservationsError;

  //! Local Elements Ref
  const reserveRemainRef = useRef(null);

  //! Derived States
  const userReservationCountForTomorrow = userReservations
    ?.filter((reservation) =>
      isEqual(endOfDay(new Date(reservation.reservationDate)), endOfDay(tomorrow))
    )
    ?.reduce(
      (acc, reservation) =>
        reservation.status === 'reserved' || reservation.status === 'waiting' ? acc + 1 : acc,
      0
    );
  const reserveRemainCount =
    Number(profile?.maxReserveCount ?? 3) - userReservationCountForTomorrow;

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
        <Error className="w-full" error={error.message} />
      </div>
    );

  //! JSX
  return (
    <ul className="mt-5 space-y-7 text-lg">
      <li className={`${listItemStyles} items-center`}>
        <UserParameter.Label> شماره تلفن : </UserParameter.Label>
        {isLoading ? (
          <Skeleton className={skeletonStyles} />
        ) : (
          <UserParameter.Value> {'۰' + en2fa(profile?.phoneNumber)} </UserParameter.Value>
        )}
      </li>
      <li className={`${listItemStyles} items-center`}>
        <UserParameter.Label> ایمیل : </UserParameter.Label>
        {isLoading ? (
          <Skeleton className={skeletonStyles} />
        ) : (
          <UserParameter.Value> {email} </UserParameter.Value>
        )}
      </li>
      <li className={`${listItemStyles} items-center`}>
        <UserParameter.Label> زبان تدریس : </UserParameter.Label>
        {isLoading ? (
          <Skeleton className={skeletonStyles} />
        ) : (
          <UserParameter.Value> {profile?.language} </UserParameter.Value>
        )}
      </li>
      <li className={`${listItemStyles} items-center`}>
        <UserParameter.Label> سطح تدریس : </UserParameter.Label>
        {isLoading ? (
          <Skeleton className={skeletonStyles} />
        ) : (
          <UserParameter.Value> {profile?.level} </UserParameter.Value>
        )}
      </li>
      <li className={`${listItemStyles} items-center`}>
        <UserParameter.Label> وضعیت ثبت نام : </UserParameter.Label>
        {isLoading ? (
          <Skeleton className={skeletonStyles} />
        ) : (
          <UserParameter.Value bgColor={statusBGColor}> {statusValue} </UserParameter.Value>
        )}
      </li>
      <li className={`${listItemStyles} items-center`}>
        <UserParameter.Label> تعداد رزرو باقی مانده : </UserParameter.Label>
        {isLoading ? (
          <Skeleton className={skeletonStyles} />
        ) : (
          <UserParameter.Value hasShimmerEffect={true}>
            {en2fa(reserveRemainCount)}
          </UserParameter.Value>
        )}
      </li>
      <li className={`${listItemStyles} flex-col`}>
        <UserParameter.Label>
          اتاق های رزرو شده برای فردا {`(${persianTomorrow.replaceAll('-', '/')})`} :
        </UserParameter.Label>
        <UserReserveList />
      </li>
    </ul>
  );
}

export default UserParameterList;
