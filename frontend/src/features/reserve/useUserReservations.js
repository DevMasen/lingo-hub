import { useQuery } from '@tanstack/react-query';
import { useSession } from '../authentication/useSession';
import { useError } from '../../hooks/useError';
import { getReservationsByUser } from '../../api/services/reservations.service';
//---

export function useUserReservations() {
  //! React Query
  const { userId, isLoading: isLoadingSession, error: sessionError } = useSession();
  const {
    data: userReservations,
    isLoading: isLoadingUserReservations,
    error: userReservationsError,
  } = useQuery({
    queryKey: ['reservations', userId],
    queryFn: () => getReservationsByUser(userId),
    enabled: !!userId,
    retry: false,
  });

  //! Custom Hooks
  useError(sessionError);
  useError(userReservationsError);

  return {
    userReservations,
    isLoading: isLoadingSession || isLoadingUserReservations,
    error: sessionError || userReservationsError,
  };
}
