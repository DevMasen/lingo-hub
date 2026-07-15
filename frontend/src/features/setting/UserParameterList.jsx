import { en2fa } from 'num2persian';

import { useSession } from '../authentication/useSession';
import { useProfile } from './useProfile';
import { useReserveRemainCount } from '../../hooks/useReserveRemainCount';

import UserParameter from './UserParameter';
import Skeleton from '../../ui/Skeleton';
import Error from '../../ui/Error';
//---

const listItemStyles = 'flex gap-3';
const skeletonStyles = 'h-10 w-40';

function UserParameterList() {
  //! React Query
  const { email } = useSession();
  const { profile, isLoading: isLoadingProfile, error: profileError } = useProfile();

  //! Custom Hooks
  const {
    reserveRemainCount,
    isLoading: isLoadingReserveRemainCount,
    error: reserveRemainCountError,
  } = useReserveRemainCount();

  //! Derived States
  const isLoading = isLoadingProfile || isLoadingReserveRemainCount;
  const error = profileError || reserveRemainCountError;
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

  if (error)
    return (
      <div className="flex items-center justify-center">
        <Error className="w-full" error={error.message} />
      </div>
    );

  //! JSX
  return (
    <ul className="space-y-7 py-4 text-lg">
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
          <UserParameter.Value>{en2fa(reserveRemainCount)}</UserParameter.Value>
        )}
      </li>
    </ul>
  );
}

export default UserParameterList;
