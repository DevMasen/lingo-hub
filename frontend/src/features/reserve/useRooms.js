import { useQuery } from '@tanstack/react-query';
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

  if (error) {
    console.error(error);
  }
  return { rooms, isLoading, error };
}
