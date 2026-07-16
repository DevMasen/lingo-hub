import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { signUp as signupApi } from '../../api/services/auth.service';
import { getErrorMessage } from '../../utils/getErrorMessage';
//---

export function useSignup() {
  //! React Router
  const navigate = useNavigate();

  //! React Query
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: ({ email, password, profile }) => signupApi({ email, password, profile }),
    onSuccess: (data) => {
      toast.success('حساب کاربری با موفقیت ایجاد شد');
      toast.success('لطفا ابتدا از طریق لینک ارسال شده ایمیل خود را تأیید کنید');
      navigate(`/login?email=${data.profile.email}`);
    },
    onError: (error) => {
      console.error(error);
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });

  return { signup, isSigningUp };
}
