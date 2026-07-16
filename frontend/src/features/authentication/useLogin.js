import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn } from '../../api/services/auth.service';
import { getErrorMessage } from '../../utils/getErrorMessage';
//---

export function useLogin() {
  //! React Router
  const navigate = useNavigate();

  //! React Query
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
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });

  return { login, isLoggingIn };
}
