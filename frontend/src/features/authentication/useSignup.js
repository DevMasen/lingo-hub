import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

import { signUp as signupApi } from '../../api/services/auth.service';
//---
export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: ({ email, password, profile }) => signupApi({ email, password, profile }),
    onSuccess: (data) => {
      toast.success('حساب کاربری با موفقیت ایجاد شد');
      toast.success('لطفا ابتدا از طریق لینک ارسال شده ایمیل خود را تأیید کنید');
      navigate(`/login?email=${data.profile.email}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return { signup, isSigningUp };
}
