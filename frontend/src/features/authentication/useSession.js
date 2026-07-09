import { useQuery } from '@tanstack/react-query';

import { getCurrentSession } from '../../api/services/auth.service';
import { useError } from '../../hooks/useError';
//---

export function useSession() {
  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['session'],
    queryFn: getCurrentSession,
  });

  useError(error);

  return {
    isLoading,
    error,
    isAuthenticated: session?.role === 'authenticated',
    email: session?.email,
    userId: session?.userId,
  };
}
