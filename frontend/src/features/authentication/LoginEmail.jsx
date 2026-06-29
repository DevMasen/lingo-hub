import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsListCheck } from 'react-icons/bs';

import HomeButton from '../../ui/HomeButton';
import Error from '../../ui/Error';

import { useSignup } from './SignupContext';

import { useKey } from '../../hooks/useKey';

import HidePasswordButton from '../../ui/HidePasswordButton';
import { Link } from 'react-router';
import { AiOutlineEnter } from 'react-icons/ai';
import toast from 'react-hot-toast';
//---

//! Global Styles
const inputContainerStyles =
  'flex items-center justify-between w-full rounded-md bg-[var(--color-slate-300)]';
const inputStyles =
  'w-full rounded-md bg-inherit p-3 text-[var(--color-slate-800)] focus:bg-[var(--color-slate-50)] focus:outline-none focus:ring focus:ring-[var(--color-slate-700)] focus:ring-offset-1 disabled:cursor-not-allowed transition-all duration-300';

function LoginEmail() {
  //TODO : replace with real data

  //? Handle errors with react-hook-form
  //! React Hook Form
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  //! Context Data
  const { setStep } = useSignup();

  //! Handlers
  function handleContinue() {
    //TODO : implement this feature later
  }
  function onSuccess({ email, password }) {
    toast.success('ورود با موفقیت انجام شد');
  }

  function onError(errors) {
    console.error(errors);
  }

  //! Custom Hooks
  useKey('enter', handleContinue);

  //! Local States
  const [isPassHidden, setIsPassHidden] = useState(true);

  //! JSX
  return (
    <form onSubmit={handleSubmit(onSuccess, onError)} className="flex flex-col gap-3">
      <div className={inputContainerStyles}>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="آدرس ایمیل"
          aria-required="true"
          className={`${inputStyles} ${errors?.email && 'border-2 border-[var(--color-red-600)]'}`}
          {...register('email', {
            required: 'لطفا ایمیل خود را وارد کنید',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'ایمیل معتبر نیست',
            },
          })}
        />
      </div>
      <div className={inputContainerStyles}>
        <input
          id="password"
          type={isPassHidden ? 'password' : 'text'}
          name="password"
          placeholder="رمز عبور"
          maxLength="16"
          aria-required="true"
          className={`${inputStyles} ${errors?.password && 'border-2 border-[var(--color-red-600)]'}`}
          {...register('password', {
            required: 'لطفا رمز عبور خود را وارد کنید',
            minLength: {
              value: 6,
              message: 'رمز عبور باید حداقل ۶ کاراکتر باشد',
            },
          })}
        />
        <HidePasswordButton
          isPassHidden={isPassHidden}
          onPassHidden={() => setIsPassHidden((isHidden) => !isHidden)}
        />
      </div>

      <div className="flex gap-3">
        <HomeButton
          to={'/signup'}
          onClick={() => {
            setStep('1');
          }}
          extraClasses={'py-2 rounded-md grow'}
        >
          <span className="text-lg font-medium">ثبت‌نام</span>{' '}
          <BsListCheck className="text-xl text-[var(--color-slate-300)]" />
        </HomeButton>
        <HomeButton
          type="submit"
          disabled={Object.keys(errors).length}
          extraClasses={'px-5 py-2 rounded-md flex-grow'}
        >
          <span className="text-lg font-medium">ورود</span>
          <AiOutlineEnter className="text-2xl text-[var(--color-slate-300)]" />
        </HomeButton>
      </div>
      <div className="flex h-6 justify-between px-5 font-medium text-[var(--color-indigo-400)]">
        <Link
          to={'/login/otp'}
          className="transition-colors duration-200 hover:border-b hover:border-[var(--color-indigo-300)] hover:text-[var(--color-indigo-300)]"
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
