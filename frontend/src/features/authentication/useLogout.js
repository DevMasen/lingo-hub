import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { signOut } from '../../api/services/auth.service';
//---

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success('با موفقیت از حساب خود خارج شدید.');
      navigate('/home');
    },
    onError: (error) => {
      const message =
        error?.message ??
        ((typeof error === 'string' ? error : JSON.stringify(error)) || 'خطایی رخ داد');
      toast.error(message);
      navigate('/dashboard');
    },
  });

  return { logout, isLoggingOut };
}
