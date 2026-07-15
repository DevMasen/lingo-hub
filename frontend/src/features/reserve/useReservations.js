import { useQuery } from '@tanstack/react-query';

import { getReservationsForRoomOnDate } from '../../api/services/reservations.service';

import { useError } from '../../hooks/useError';
//---

export function useReservations(roomId, date) {
  const {
    data: reservations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['reservations', roomId, date],
    queryFn: () => getReservationsForRoomOnDate(roomId, date),
  });

  useError(error);

  return { reservations, isLoading, error };
}
