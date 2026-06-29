import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

import { signIn } from '../../api/services/auth.service';
//---

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => signIn(email, password),
    onSuccess: (data) => {
      queryClient.setQueryData(['session'], data);
      toast.success('ورود به حساب با موفقیت انجام شد.');
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return { login, isLoggingIn };
}
