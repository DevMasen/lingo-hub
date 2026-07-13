import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateProfile as updateProfileApi } from '../../api/services/profiles.service';

import { getErrorMessage } from '../../utils/getErrorMessage';
//---

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationFn: ({ userId, changes, avatarFile, resumeFile }) =>
      updateProfileApi(userId, changes, avatarFile, resumeFile),
    onSuccess: () => {
      toast.success('پروفایل با موفقیت بروزرسانی شد');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error(error);
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });

  return { updateProfile, isUpdatingProfile };
}
