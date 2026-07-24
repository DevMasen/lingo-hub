import { useQuery } from '@tanstack/react-query';
import { useSession } from '../authentication/useSession';
import { getUserTickets } from '../../api/services/tickets.service';
import { useError } from '../../hooks/useError';
//---

export function useUserTickets() {
  //! React Query
  const { userId, isLoading: isLoadingSession, error: sessionError } = useSession();
  const {
    data: userTickets,
    isLoading: isLoadingUserTickets,
    error: userTicketsError,
  } = useQuery({
    queryKey: ['tickets', userId],
    queryFn: () => getUserTickets(userId),
    enabled: !!userId,
    retry: false,
  });

  //! Custom Hooks
  useError(sessionError);
  useError(userTicketsError);

  return {
    userTickets,
    isLoading: isLoadingSession || isLoadingUserTickets,
    error: sessionError || userTicketsError,
  };
}
