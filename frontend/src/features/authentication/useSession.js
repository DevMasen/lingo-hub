import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { getCurrentSession } from '../../api/services/auth.service';
//---

export function useSession() {
  const {
    data: session,
    error,
    isLoading: isLoadingSession,
  } = useQuery({
    queryKey: ['session'],
    queryFn: getCurrentSession,
  });

  if (error) {
    console.error(error);
    const message =
      error?.message ??
      ((typeof error === 'string' ? error : JSON.stringify(error)) || 'خطایی رخ داد');
    toast.error(message);
  }

  return { session, isLoadingSession, isAuthenticated: session?.role === 'authenticated' };
}
