import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { adjustCreditBalance } from '../../api/services/profiles.service';

import { getErrorMessage } from '../../utils/getErrorMessage';
//---

export function useUpdateBalance() {
  const queryClient = useQueryClient();
  const { mutate: updateUserBalance, isPending: isUpdatingUserBalance } = useMutation({
    mutationFn: ({ userId, delta }) => adjustCreditBalance(userId, delta),
    onSuccess: () => {
      toast.success('موجودی کیف پول شما با موفقیت بروزرسانی شد');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error(error);
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
  return { updateUserBalance, isUpdatingUserBalance };
}
