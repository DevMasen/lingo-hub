import { useQuery } from '@tanstack/react-query';
import { useSession } from '../authentication/useSession';
import { useError } from '../../hooks/useError';
import { getProfileById } from '../../api/services/profiles.service';
//---

export function useProfile() {
  //! React Query
  const { userId, isLoading: isLoadingSession, error: sessionError } = useSession();
  const {
    data: profile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getProfileById(userId),
    enabled: !!userId,
    retry: false,
  });

  //! Custom Hooks
  useError(sessionError);
  useError(profileError);

  return {
    profile,
    isLoading: isLoadingSession || isLoadingProfile,
    error: sessionError || profileError,
  };
}
