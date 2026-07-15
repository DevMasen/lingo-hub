import { addDays, endOfDay, isEqual } from 'date-fns';

import { useProfile } from '../features/setting/useProfile';
import { useUserReservations } from '../features/reserve/useUserReservations';
//---

export function useReserveRemainCount() {
  const { profile, isLoading: isLoadingProfile, error: profileError } = useProfile();
  const tomorrow = addDays(new Date(), 1);

  const {
    userReservations,
    isLoading: isLoadingUserReservations,
    error: userReservationsError,
  } = useUserReservations();
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
  return {
    reserveRemainCount,
    isLoading: isLoadingProfile || isLoadingUserReservations,
    error: profileError || userReservationsError,
  };
}
