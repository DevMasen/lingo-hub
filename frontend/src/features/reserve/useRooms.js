import { useQuery } from '@tanstack/react-query';
import { useError } from '../../hooks/useError';

import { getAllRooms } from '../../api/services/rooms.service';
//---
export function useRooms() {
  const {
    data: rooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['rooms'],
    queryFn: getAllRooms,
  });

  useError(error);

  return { rooms, isLoading, error };
}
