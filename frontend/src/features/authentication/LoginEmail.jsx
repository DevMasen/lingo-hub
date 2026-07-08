import { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { BsListCheck } from 'react-icons/bs';
import { AiOutlineEnter } from 'react-icons/ai';

import { useKey } from '../../hooks/useKey';
import { useLogin } from './useLogin';

import HomeButton from '../../ui/HomeButton';
import Error from '../../ui/Error';
import HidePasswordButton from '../../ui/HidePasswordButton';
import SpinnerMini from '../../ui/SpinnerMini';
//---

//! Global Styles
const inputContainerStyles = 'flex items-center justify-between w-full rounded-md bg-slate-300';
const inputStyles =
  'w-full rounded-md bg-inherit p-3 text-slate-800 focus:bg-slate-100 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base';

function LoginEmail() {
  //! Custom Hooks
  useKey('enter', onSuccess);

  //! Local States
  const [isPassHidden, setIsPassHidden] = useState(true);

  //! React Query
  const { login, isLoggingIn } = useLogin();

  //! React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSuccess({ email, password }) {
    if (!email || !password) return;
    login({ email, password });
  }
  function onError(errors) {
    console.error(errors);
  }

  //! JSX
  return (
    <form onSubmit={handleSubmit(onSuccess, onError)} className="flex flex-col gap-3">
      <div className={`${inputContainerStyles} ${isLoggingIn && 'opacity-50'}`}>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="آدرس ایمیل"
          aria-required="true"
          autoComplete="true"
          className={`${inputStyles} ${errors?.email && 'border-2 border-red-600'}`}
          {...register('email', {
            required: 'لطفا ایمیل خود را وارد کنید',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'ایمیل معتبر نیست',
            },
          })}
          disabled={isLoggingIn}
        />
      </div>
      <div className={`${inputContainerStyles} ${isLoggingIn && 'opacity-50'}`}>
        <input
          id="password"
          type={isPassHidden ? 'password' : 'text'}
          name="password"
          placeholder="رمز عبور"
          aria-required="true"
          className={`${inputStyles} ${errors?.password && 'border-2 border-red-600'}`}
          {...register('password', {
            required: 'لطفا رمز عبور خود را وارد کنید',
            minLength: {
              value: 6,
              message: 'رمز عبور باید حداقل ۶ کاراکتر باشد',
            },
          })}
          disabled={isLoggingIn}
        />
        <HidePasswordButton
          isPassHidden={isPassHidden}
          onPassHidden={() => setIsPassHidden((isHidden) => !isHidden)}
        />
      </div>

      <div className="flex gap-3">
        <HomeButton
          to={isLoggingIn ? '' : '/signup'}
          extraClasses={`py-2 rounded-md grow ${isLoggingIn && 'cursor-not-allowed hover:translate-y-0 shadow-0 opacity-70'}`}
        >
          <span className="text-sm font-medium sm:text-lg">ثبت‌نام</span>{' '}
          <BsListCheck className="text-xl text-slate-300" />
        </HomeButton>
        <HomeButton
          type="submit"
          disabled={Object.keys(errors).length || isLoggingIn}
          extraClasses={`px-5 py-2 rounded-md flex-grow ${isLoggingIn && 'hover:translate-y-0 shadow-0'}`}
        >
          {isLoggingIn ? (
            <SpinnerMini />
          ) : (
            <>
              <span className="text-sm font-medium sm:text-lg">ورود</span>
              <AiOutlineEnter className="text-2xl text-slate-300" />
            </>
          )}
        </HomeButton>
      </div>
      <div className="flex h-6 justify-between px-5 font-medium text-indigo-400">
        <Link
          to={isLoggingIn ? '' : '/login/otp'}
          className={`text-sm transition-colors duration-200 hover:text-indigo-300 sm:text-lg ${isLoggingIn && 'cursor-not-allowed'}`}
        >
          فراموشی رمز عبور
        </Link>
      </div>
      {errors?.email && <Error error={errors.email.message} />}
      {errors?.password && <Error error={errors.password.message} />}
    </form>
  );
}

export default LoginEmail;
