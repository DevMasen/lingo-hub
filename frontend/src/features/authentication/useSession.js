import { useQuery } from '@tanstack/react-query';
import { useError } from '../../hooks/useError';
import { getCurrentSession } from '../../api/services/auth.service';
//---

export function useSession() {
  //! React Query
  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['session'],
    queryFn: getCurrentSession,
  });

  //! Custom Hooks
  useError(error);

  return {
    isLoading,
    error,
    isAuthenticated: session?.role === 'authenticated',
    email: session?.email,
    userId: session?.userId,
  };
}
