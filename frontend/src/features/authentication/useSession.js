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
    session,
    isLoading,
    error,
    isAuthenticated: session?.role === 'authenticated',
    userId: session?.userId,
    email: session?.email,
  };
}
