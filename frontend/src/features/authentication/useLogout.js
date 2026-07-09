import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { signOut } from '../../api/services/auth.service';

import { getErrorMessage } from '../../utils/getErrorMessage';
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
      console.error(error);
      const message = getErrorMessage(error);
      toast.error(message);
      navigate('/dashboard');
    },
  });

  return { logout, isLoggingOut };
}
