import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useLogout } from '../authentication/useLogout';
import { changePassword as changePasswordApi } from '../../api/services/auth.service';

import { getErrorMessage } from '../../utils/getErrorMessage';
//---

export function useChangePassword() {
  const { logout } = useLogout();
  const { mutate: changePassword, isPending: isChangingPassword } = useMutation({
    mutationFn: ({ newPassword, currentPassword }) =>
      changePasswordApi({ newPassword, currentPassword }),
    onSuccess: () => {
      logout();
      toast.success('رمز عبور با موفقیت تغییر کرد. لطفا دوباره وارد شوید');
    },
    onError: (error) => {
      console.error(error);
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });

  return { changePassword, isChangingPassword };
}
