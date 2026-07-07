import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { getProfileById } from '../../api/services/profiles.service';
//---

export function useProfile(userId) {
  const {
    data: profile,
    isLoading: isLoadingProfile,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfileById(userId),
    retry: false,
  });

  if (error) {
    console.error(error);
    const message =
      error?.message ??
      ((typeof error === 'string' ? error : JSON.stringify(error)) || 'خطایی رخ داد');
    toast.error(message);
  }

  return { profile, isLoadingProfile, error };
}
