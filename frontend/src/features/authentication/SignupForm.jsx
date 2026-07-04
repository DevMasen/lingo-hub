import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiCheckCircle, HiOutlineClipboardList } from 'react-icons/hi';
import { CgEnter } from 'react-icons/cg';

import { useSignup } from './useSignup';

import HomeButton from '../../ui/HomeButton';
import Error from '../../ui/Error';
import HidePasswordButton from '../../ui/HidePasswordButton';
import SpinnerMini from '../../ui/SpinnerMini';

import toEnglishDigits from '../../utils/toEnglishDigits';
//---

//! Global Styles
const inputContainerStyles = 'rounded-md bg-slate-300 text-slate-800 flex';
const inputStyles =
  'w-full rounded-md bg-inherit px-3 py-3 focus:bg-slate-50 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed transition-all duration-300';
const inputErrorStyles = 'border-2 border-red-600 text-red-600';

function SignupForm() {
  //! Local States
  const [isPassHidden, setIsPassHidden] = useState(true);
  const [isPassRepHidden, setIsPassRepHidden] = useState(true);

  const { signup, isSigningUp } = useSignup();
  //TODO : disable buttons and inputs while signing up

  //! React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      language: 'انگلیسی',
      level: 'مبتدی',
      explanation: '',
      password: '',
      passwordRepeat: '',
    },
  });

  function onSuccess({
    firstName,
    lastName,
    phoneNumber,
    email,
    language,
    level,
    explanation,
    password,
  }) {
    if (!email || !password) return;
    const newProfile = {
      firstName,
      lastName,
      phoneNumber: toEnglishDigits(phoneNumber),
      language,
      level,
      explanation,
      signupStatus: 'pending',
      creditBalance: 0,
      maxReserveCount: 3,
    };
    console.log(email, password, newProfile);
    signup({ email, password, profile: newProfile });
  }

  function onError(errors) {
    console.error(errors);
  }

  return (
    <form
      onSubmit={handleSubmit(onSuccess, onError)}
      className="text-md h-[30rem] w-[500px] space-y-3 overflow-auto scroll-smooth rounded-lg bg-slate-600/65 px-12 py-8 text-slate-200"
    >
      <legend className="flex items-center gap-2 text-2xl font-bold">
        <span> ثبت‌نام کاربر </span>
        <HiOutlineClipboardList className="text-3xl" />
      </legend>

      <div className={`${inputContainerStyles} ${errors?.firstName && 'bg-red-100'}`}>
        <input
          id="firstName"
          type="text"
          placeholder=" نام "
          aria-required="true"
          maxLength={30}
          className={`${inputStyles} ${errors?.firstName && inputErrorStyles}`}
          {...register('firstName', { required: 'نام خود را وارد کنید' })}
        />
      </div>
      {errors?.firstName && <Error error={errors?.firstName.message} />}

      <div className={`${inputContainerStyles} ${errors?.lastName && 'bg-red-100'}`}>
        <input
          id="lastName"
          type="text"
          placeholder=" نام خانوادگی "
          aria-required="true"
          maxLength={30}
          className={`${inputStyles} ${errors?.lastName && inputErrorStyles}`}
          {...register('lastName', { required: 'نام خانوادگی خود را وارد کنید' })}
        />
      </div>
      {errors?.lastName && <Error error={errors?.lastName.message} />}

      <div className={`${inputContainerStyles} ${errors?.phoneNumber && 'bg-red-100'}`}>
        <input
          id="phoneNumber"
          type="text"
          placeholder=" شماره موبایل "
          aria-required="true"
          maxLength="10"
          className={`${inputStyles} ${errors?.phoneNumber && inputErrorStyles}`}
          {...register('phoneNumber', {
            required: 'شماره تماس خود را وارد کنید',
            pattern: {
              value: /^[9۹][0-9۰-۹]{9}$/,
              message: 'شماره تماس نامعتبر است',
            },
          })}
        />
        <span className="w-18 flex items-center justify-center gap-2 px-6 text-slate-800">
          <span className="flex gap-1">
            <span>۹۸</span>
            <span>+</span>
          </span>
          <img
            src="https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/iran-flag.svg.webp"
            alt="!fg"
            className="w-5 rounded-sm opacity-[var(--image-opacity)] grayscale-[var(--image-grayscale)]"
          />
        </span>
      </div>
      {errors?.phoneNumber && <Error error={errors?.phoneNumber.message} />}

      <div className={`${inputContainerStyles} ${errors?.email && 'bg-red-100'}`}>
        <input
          id="email"
          type="email"
          placeholder=" آدرس ایمیل "
          aria-required="true"
          maxLength="40"
          className={`${inputStyles} ${errors?.email && inputErrorStyles}`}
          {...register('email', {
            required: 'آدرس ایمیل خود را وارد کنید',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'ایمیل معتبر نیست',
            },
          })}
        />
      </div>
      {errors?.email && <Error error={errors?.email.message} />}

      <div className={`${inputContainerStyles} flex px-3 py-2`}>
        <label className="flex w-36 items-center font-semibold" htmlFor="language">
          زبان تدریس :
        </label>
        <select
          id="language"
          aria-required="true"
          className={`${inputStyles}`}
          {...register('language')}
        >
          <option value="انگلیسی"> انگلیسی </option>
          <option value="آلمانی"> آلمانی </option>
          <option value="فرانسوی"> فرانسوی </option>
          <option value="چینی"> چینی </option>
        </select>
      </div>
      <div className={`${inputContainerStyles} flex px-3 py-2`}>
        <label className="flex w-36 items-center font-semibold" htmlFor="level">
          سطح تدریس:
        </label>
        <select id="level" aria-required="true" className={`${inputStyles}`} {...register('level')}>
          <option value="مبتدی"> مبتدی </option>
          <option value="متوسط"> متوسط </option>
          <option value="پیشرفته"> پیشرفته </option>
          <option value="استاد"> استاد </option>
        </select>
      </div>

      <div className={`${inputContainerStyles}`}>
        <textarea
          id="explanation"
          placeholder=" توضیحات تکمیلی ..."
          aria-required="true"
          maxLength="100"
          className={`${inputStyles}`}
          {...register('explanation')}
        />
      </div>

      <div className={`${inputContainerStyles} ${errors?.password && 'bg-red-100'}`}>
        <input
          id="password"
          type={isPassHidden ? 'password' : 'text'}
          name="password"
          placeholder=" رمز عبور "
          aria-required="true"
          maxLength="30"
          className={`${inputStyles} ${errors?.password && inputErrorStyles}`}
          {...register('password', {
            required: 'رمز عبور خود را وارد کنید',
            minLength: {
              value: 6,
              message: 'رمزعبور باید حداقل ۶ کاراکتر باشد',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!.,])[A-Za-z\d@#$!.,]+$/,
              message:
                'رمز عبور باید فقط شامل حروف انگلیسی، اعداد و یکی از کاراکترهای @، #، $، !، . یا ، باشد و حداقل شامل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر ویژه باشد.',
            },
          })}
        />
        <HidePasswordButton
          isPassHidden={isPassHidden}
          onPassHidden={() => setIsPassHidden((hidden) => !hidden)}
        />
      </div>
      {errors?.password && <Error error={errors?.password.message} />}

      <div className={`${inputContainerStyles} ${errors?.passwordRepeat && 'bg-red-100'}`}>
        <input
          id="passwordRepeat"
          type={isPassRepHidden ? 'password' : 'text'}
          name="password"
          placeholder=" تکرار رمز عبور "
          aria-required="true"
          maxLength="30"
          className={`${inputStyles} ${errors?.passwordRepeat && inputErrorStyles}`}
          {...register('passwordRepeat', {
            required: 'تکرار رمز عبور خود را وارد کنید',
            validate: (value) =>
              value === getValues().password || 'رمز عبور و تکرار آن یکسان نیستند',
          })}
        />
        <HidePasswordButton
          isPassHidden={isPassRepHidden}
          onPassHidden={() => setIsPassRepHidden((hidden) => !hidden)}
        />
      </div>
      {errors?.passwordRepeat && <Error error={errors?.passwordRepeat.message} />}

      <div className="flex gap-3">
        <HomeButton to={'/login'} extraClasses={'py-2 px-2 rounded-md grow'}>
          <span className="text-sm font-medium sm:text-lg"> ورود </span>
          <CgEnter />
        </HomeButton>

        <HomeButton
          disabled={isSigningUp}
          type={'submit'}
          extraClasses={'py-2 rounded-md flex-grow'}
        >
          <span className="text-sm font-medium sm:text-lg">ثبت‌نام</span>
          {isSigningUp ? <SpinnerMini /> : <HiCheckCircle className="text-xl" />}
        </HomeButton>
      </div>
    </form>
  );
}

export default SignupForm;
