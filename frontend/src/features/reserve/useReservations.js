import { useQuery } from '@tanstack/react-query';
import { useError } from '../../hooks/useError';
import { getReservationsForRoomOnDate } from '../../api/services/reservations.service';
//---

export function useReservations(roomId, date) {
  //! React Query
  const {
    data: reservations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['reservations', roomId, date],
    queryFn: () => getReservationsForRoomOnDate(roomId, date),
  });

  //! Custom Hooks
  useError(error);

  return { reservations, isLoading, error };
}
