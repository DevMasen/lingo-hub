import { useEffect, useState } from 'react';
import {
  HiCheckCircle,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineClipboardList,
} from 'react-icons/hi';
import { CgEnter } from 'react-icons/cg';

import { useSignup } from './SignupContext';
import { useKey } from '../../hooks/useKey';

import HomeButton from '../../ui/HomeButton';
import Error from '../../ui/Error';
import HidePasswordButton from '../../ui/HidePasswordButton';

import makeNumericInput from '../../utils/makeNumericInput';
import validateEmail from '../../utils/validateEmail';
//---

//! Global Styles
const inputContainerStyles = 'rounded-md bg-slate-300 text-slate-800 flex';
const inputStyles =
  'w-full rounded-md bg-inherit px-3 py-3 focus:bg-slate-50 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed transition-all duration-300';
const inputErrorStyles = 'border-2 border-red-600 text-red-600';

function SignupForm() {
  //TODO : replace with real data
  //! Fake Data
  const users = [];

  // handle validations with react-hook-form
  const errors = {};

  //! Context Data
  const { step, setStep } = useSignup();

  //!Controlled Elements
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');
  const [inputLanguage, setInputLanguage] = useState('انگلیسی');
  const [inputLevel, setInputLevel] = useState('مبتدی');
  const [inputExplanation, setInputExplanation] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordRepeat, setInputPasswordRepeat] = useState('');

  //! Local States
  const [isPassHidden, setIsPassHidden] = useState(true);
  const [isPassRepHidden, setIsPassRepHidden] = useState(true);

  //! Effects
  useEffect(
    function () {
      setInputPhoneNumber((cur) => makeNumericInput(cur));
    },
    [inputPhoneNumber]
  );

  //TODO : implement validations with react hook-form

  //! Custom Hooks
  useKey('enter', handleContinue);

  //! Handlers
  function handleContinue() {
    switch (step) {
      case '1':
        if (!inputFirstName) {
          break;
        }
        setStep('2');
        break;
      case '2':
        if (!inputLastName) {
          break;
        }
        setStep('3');
        break;
      case '3':
        if (inputPhoneNumber.length < 10) {
          break;
        }
        if (users.some((user) => user.phoneNumber === inputPhoneNumber)) {
          break;
        }
        setStep('4');
        break;
      case '4':
        setStep('5');
        break;
      case '5':
        if (!inputEmail) {
          break;
        }
        if (Object.keys(errors).length) break;
        setStep('6');
        break;
      default:
        break;
    }
  }
  function handlePrevious() {
    switch (step) {
      case '2':
        setStep('1');
        break;
      case '3':
        setStep('2');
        break;
      case '4':
        setStep('3');
        break;
      case '5':
        if (!validateEmail(inputEmail)) setInputEmail('');
        setStep('4');
        break;
      case '6':
        setStep('5');
        break;
      default:
        break;
    }
  }

  return (
    <form
      method="POST"
      className="text-md w-[500px] space-y-3 overflow-auto scroll-smooth rounded-lg bg-slate-600/65 px-12 py-8 text-slate-200"
    >
      <legend className="flex items-center gap-2 text-2xl font-bold">
        <span> ثبت‌نام کاربر </span>
        <HiOutlineClipboardList className="text-3xl" />
      </legend>
      {step === '1' && (
        <>
          <div className={`${inputContainerStyles} ${errors?.firstName && 'bg-red-100'}`}>
            <input
              type="text"
              value={inputFirstName}
              onChange={(e) => setInputFirstName(e.target.value)}
              placeholder=" نام "
              required
              aria-required="true"
              maxLength="30"
              className={`${inputStyles} ${errors?.firstName && inputErrorStyles}`}
            />
          </div>
          <div className="flex gap-3">
            <HomeButton to={'/login'} extraClasses={'py-2 rounded-md grow'}>
              <span className="text-lg font-medium"> ورود </span>
              <CgEnter />
            </HomeButton>
            <HomeButton extraClasses={'py-2 px-12 rounded-md grow'} onClick={handleContinue}>
              <span className="text-lg font-medium">ادامه</span>
              <HiOutlineArrowLeft />
            </HomeButton>
          </div>
          {errors?.firstName && <Error error={errors?.firstName.message} />}
        </>
      )}
      {step === '2' && (
        <>
          <div className={`${inputContainerStyles} ${errors?.lastName && 'bg-red-100'}`}>
            <input
              type="text"
              value={inputLastName}
              onChange={(e) => setInputLastName(e.target.value)}
              placeholder=" نام خانوادگی "
              required
              aria-required="true"
              maxLength="30"
              className={`${inputStyles} ${errors?.lastName && inputErrorStyles}`}
            />
          </div>
          <div className="flex gap-3">
            <HomeButton extraClasses={'py-3 rounded-md flex-grow'} onClick={handlePrevious}>
              <HiOutlineArrowRight />
            </HomeButton>
            <HomeButton extraClasses={'py-3 rounded-md flex-grow'} onClick={handleContinue}>
              <HiOutlineArrowLeft />
            </HomeButton>
          </div>
          {errors?.lastName && <Error error={errors?.lastName.message} />}
        </>
      )}
      {step === '3' && (
        <>
          <div className={`${inputContainerStyles} ${errors?.phoneNumber && 'bg-red-100'}`}>
            <input
              type="text"
              value={inputPhoneNumber}
              onChange={(e) => setInputPhoneNumber(e.target.value)}
              placeholder=" شماره موبایل "
              required
              aria-required="true"
              maxLength="10"
              className={`${inputStyles} ${errors?.phoneNumber && inputErrorStyles}`}
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
          <div className="flex gap-3">
            <HomeButton extraClasses={'py-3 rounded-md flex-grow'} onClick={handlePrevious}>
              <HiOutlineArrowRight />
            </HomeButton>
            <HomeButton extraClasses={'py-3 rounded-md flex-grow'} onClick={handleContinue}>
              <HiOutlineArrowLeft />
            </HomeButton>
          </div>
          {errors?.phoneNumber && <Error error={errors?.phoneNumber.message} />}
        </>
      )}

      {step === '4' && (
        <>
          <div className={`${inputContainerStyles} flex px-3 py-2`}>
            <label className="flex w-36 items-center font-semibold" htmlFor="language">
              زبان تدریس :
            </label>
            <select
              value={inputLanguage}
              onChange={(e) => setInputLanguage(e.target.value)}
              required
              aria-required="true"
              className={`${inputStyles}`}
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
            <select
              value={inputLevel}
              onChange={(e) => setInputLevel(e.target.value)}
              required
              aria-required="true"
              className={`${inputStyles}`}
            >
              <option value="مبتدی"> مبتدی </option>
              <option value="متوسط"> متوسط </option>
              <option value="پیشرفته"> پیشرفته </option>
              <option value="استاد"> استاد </option>
            </select>
          </div>

          <div className={`${inputContainerStyles}`}>
            <textarea
              value={inputExplanation}
              onChange={(e) => setInputExplanation(e.target.value)}
              placeholder=" توضیحات تکمیلی ..."
              required
              aria-required="true"
              maxLength="100"
              className={`${inputStyles}`}
            />
          </div>
          <div className="flex gap-3">
            <HomeButton extraClasses={'py-3 rounded-md flex-grow'} onClick={handlePrevious}>
              <HiOutlineArrowRight />
            </HomeButton>
            <HomeButton extraClasses={'py-3 rounded-md flex-grow'} onClick={handleContinue}>
              <HiOutlineArrowLeft />
            </HomeButton>
          </div>
        </>
      )}

      {step === '5' && (
        <>
          <div className={`${inputContainerStyles} ${errors?.email && 'bg-red-100'}`}>
            <input
              type="email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              placeholder=" آدرس ایمیل "
              required
              aria-required="true"
              maxLength="40"
              className={`${inputStyles} ${errors?.email && inputErrorStyles}`}
            />
          </div>
          <div className="flex gap-3">
            <HomeButton extraClasses={'py-3 rounded-md flex-grow'} onClick={handlePrevious}>
              <HiOutlineArrowRight />
            </HomeButton>
            <HomeButton extraClasses={'py-3 rounded-md flex-grow'} onClick={handleContinue}>
              <HiOutlineArrowLeft />
            </HomeButton>
          </div>
          {errors?.email && <Error error={errors?.email.message} />}
        </>
      )}
      {step === '6' && (
        //TODO : do registration inputs from here
        <>
          <input id="firstName" type="hidden" name="firstName" value={inputFirstName} />
          <input id="lastName" type="hidden" name="lastName" value={inputLastName} />
          <input id="phoneNumber" type="hidden" name="phoneNumber" value={inputPhoneNumber} />
          <input id="language" type="hidden" name="language" value={inputLanguage} />
          <input id="level" type="hidden" name="level" value={inputLevel} />
          <input id="explanation" type="hidden" name="explanation" value={inputExplanation} />
          <input id="email" type="hidden" name="email" value={inputEmail} />
          <div className={`${inputContainerStyles} ${errors?.password && 'bg-red-100'}`}>
            <input
              id="password"
              type={isPassHidden ? 'password' : 'text'}
              name="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder=" رمز عبور "
              required
              aria-required="true"
              maxLength="16"
              className={`${inputStyles} ${errors?.password && inputErrorStyles}`}
            />
            <HidePasswordButton
              isPassHidden={isPassHidden}
              onPassHidden={() => setIsPassHidden((hidden) => !hidden)}
            />
          </div>
          <div className={`${inputContainerStyles} ${errors?.passwordRepeat && 'bg-red-100'}`}>
            <input
              id="passwordRepeat"
              type={isPassRepHidden ? 'password' : 'text'}
              name="password"
              value={inputPasswordRepeat}
              onChange={(e) => setInputPasswordRepeat(e.target.value)}
              placeholder=" تکرار رمز عبور "
              required
              aria-required="true"
              maxLength="16"
              className={`${inputStyles} ${errors?.passwordRepeat && inputErrorStyles}`}
            />
            <HidePasswordButton
              isPassHidden={isPassRepHidden}
              onPassHidden={() => setIsPassRepHidden((hidden) => !hidden)}
            />
          </div>
          <div className="flex gap-3">
            <HomeButton extraClasses={'py-2 rounded-md flex-grow'} onClick={handlePrevious}>
              <HiOutlineArrowRight />
            </HomeButton>
            <HomeButton
              type={'submit'}
              extraClasses={'py-2 rounded-md flex-grow'}
              disabled={inputPassword.length === 0 || inputPasswordRepeat.length === 0}
            >
              <span className="text-lg font-medium">ثبت‌نام</span>
              <HiCheckCircle className="text-xl" />
            </HomeButton>
          </div>
          {errors?.password && <Error error={errors?.password.message} />}
          {errors?.passwordRepeat && <Error error={errors?.passwordRepeat.message} />}
        </>
      )}
    </form>
  );
}

export default SignupForm;
