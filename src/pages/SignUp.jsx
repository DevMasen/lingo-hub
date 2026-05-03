import { useEffect, useState } from 'react';
import { Form, redirect, useLoaderData, useNavigation } from 'react-router';
/////////////////////////////////////////////////////////////
import { HiOutlineArrowRight, HiOutlineArrowLeft, HiOutlineClipboardList } from 'react-icons/hi';
import { HiCheckBadge } from 'react-icons/hi2';
import { CgEnter } from 'react-icons/cg';
//////////////////////////////////////////
import Loader from '../components/Loader';
import Error from '../components/Error';
import CloseFormButton from '../components/CloseFormButton';
import HomeButton from '../components/HomeButton';
import HidePasswordButton from '../components/HidePasswordButton';
//////////////////////////////////////////////////////////////////
import { useSignup } from '../context/SignupContext';
/////////////////////////////////////////////////////
import { createUser, getUsers } from '../services/apiUsers';
//////////////////////////////////////////////////
import makeNumericInput from '../utils/makeNumericInput';
import validateEmail from '../utils/validateEmail';
import { createHash } from '../services/apiHash';
///////////////////////////////////////////////////

//! Constant Styles
const inputContainerStyles = 'rounded-md bg-slate-300 text-slate-800 flex';
const inputStyles =
  'w-full rounded-md bg-inherit px-3 py-3 focus:bg-slate-50 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed transition-all duration-300';
const inputErrorStyles = 'border-2 border-red-600 text-red-600';

function SignUp() {
  //! React Router
  const users = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  //! Context Data
  const {
    step,
    loading,
    error,
    errorField,
    setStep,
    setError,
    setErrorField,
    isPassHidden,
    isPassRepHidden,
    toggleHidePass,
    toggleHidePassRep,
  } = useSignup();

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

  //! Effects
  useEffect(
    function () {
      setInputPhoneNumber((cur) => makeNumericInput(cur));
    },
    [inputPhoneNumber]
  );

  useEffect(
    function () {
      if (inputEmail.length === 0) {
        setError('');
        setErrorField('');
        return;
      }
      const isEmailValid = validateEmail(inputEmail);
      if (!isEmailValid) {
        setError('ایمیل معتبر نیست');
        setErrorField('7');
        return;
      }
      setError('');
      setErrorField('');
    },
    [inputEmail, setError, setErrorField]
  );

  useEffect(
    function () {
      switch (step) {
        case '1':
          if (inputFirstName.length > 0) {
            setError('');
            setErrorField('');
            break;
          }
          break;
        case '2':
          if (inputLastName.length > 0) {
            setError('');
            setErrorField('');
            break;
          }
          break;
        case '3':
          if (inputPhoneNumber.length > 0) {
            setError('');
            setErrorField('');
            break;
          }
          break;
        default:
          break;
      }
    },
    [step, inputFirstName, inputLastName, inputPhoneNumber, setError, setErrorField]
  );

  useEffect(
    function () {
      setError('');
      setErrorField('');
    },
    [step, setError, setErrorField]
  );

  useEffect(
    function () {
      if (step !== '6') return;
      if (inputPassword.length === 0) {
        setError('');
        setErrorField('');
        return;
      }
      if (inputPassword.length < 8) {
        setError('رمز عبور باید حداقل ۸ کاراکتر باشد');
        setErrorField('8');
        return;
      }
      if (inputPassword !== inputPasswordRepeat) {
        setError('رمز عبور با تکرار آن یکسان نیست');
        setErrorField('9');
        return;
      }
      setError('');
      setErrorField('');
    },
    [step, inputPassword, inputPasswordRepeat, setError, setErrorField]
  );

  //! Handlers
  function handleContinue() {
    switch (step) {
      case '1':
        if (!inputFirstName) {
          setError('لطفا نام خود را وارد کنید');
          setErrorField('1');
          break;
        }
        setStep('2');
        break;
      case '2':
        if (!inputLastName) {
          setError('لطفا نام خانوادگی خود را وارد کنید');
          setErrorField('2');
          break;
        }
        setStep('3');
        break;
      case '3':
        if (inputPhoneNumber.length < 10) {
          setError('شماره موبایل باید 10 رقمی باشد');
          setErrorField('3');
          break;
        }
        if (users.some((user) => user.phoneNumber === inputPhoneNumber)) {
          setError('کاربر با این شماره موبایل قبلا ثبت نام کرده است.');
          setErrorField('3');
          break;
        }
        setStep('4');
        break;
      case '4':
        setStep('5');
        break;
      case '5':
        if (!inputEmail) {
          setError('لطفا ایمیل خود را وارد کنید');
          setErrorField('7');
          break;
        }
        if (error) break;
        if (users.some((user) => user.email === inputEmail)) {
          setError(' کاربر با این ایمیل قبلا ثبت نام کرده است.');
          setErrorField('7');
          break;
        }
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

  //! JSX
  return (
    <div className="background flex h-dvh items-center justify-center">
      {(loading || isSubmitting) && <Loader />}
      <CloseFormButton />

      <Form
        method="POST"
        className="text-md w-[500px] space-y-3 overflow-auto scroll-smooth rounded-lg bg-slate-600 bg-opacity-65 px-12 py-8 text-slate-200"
      >
        <legend className="flex items-center gap-2 text-2xl font-bold">
          <span> ثبت‌نام کاربر </span>
          <HiOutlineClipboardList className="text-3xl" />
        </legend>
        {step === '1' && (
          <>
            <div className={`${inputContainerStyles} ${errorField === '1' && 'bg-red-100'}`}>
              <input
                type="text"
                value={inputFirstName}
                onChange={(e) => setInputFirstName(e.target.value)}
                placeholder=" نام "
                required
                aria-required="true"
                maxLength="30"
                className={`${inputStyles} ${errorField === '1' && inputErrorStyles}`}
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
          </>
        )}
        {step === '2' && (
          <>
            <div className={`${inputContainerStyles} ${errorField === '2' && 'bg-red-100'}`}>
              <input
                type="text"
                value={inputLastName}
                onChange={(e) => setInputLastName(e.target.value)}
                placeholder=" نام خانوادگی "
                required
                aria-required="true"
                maxLength="30"
                className={`${inputStyles} ${errorField === '2' && inputErrorStyles}`}
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
        {step === '3' && (
          <>
            <div className={`${inputContainerStyles} ${errorField === '3' && 'bg-red-100'}`}>
              <input
                type="text"
                value={inputPhoneNumber}
                onChange={(e) => setInputPhoneNumber(e.target.value)}
                placeholder=" شماره موبایل "
                required
                aria-required="true"
                maxLength="10"
                className={`${inputStyles} ${errorField === '3' && inputErrorStyles}`}
              />
              <span className="w-18 flex items-center justify-center gap-2 px-6 text-slate-800">
                <span className="flex gap-1">
                  <span>۹۸</span>
                  <span>+</span>
                </span>
                <img src="/flag.webp" alt="!fg" className="w-5 rounded-sm" />
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
          </>
        )}

        {step === '4' && (
          <>
            <div className={`${inputContainerStyles} flex px-3 py-2`}>
              <label className="flex w-36 items-center font-semibold" htmlFor="lang">
                زبان تدریس :
              </label>
              <select
                id="lang"
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
                id="level"
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
            <div className={`${inputContainerStyles} ${errorField === '7' && 'bg-red-100'}`}>
              <input
                type="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                placeholder=" آدرس ایمیل "
                required
                aria-required="true"
                maxLength="40"
                className={`${inputStyles} ${errorField === '7' && inputErrorStyles}`}
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
        {step === '6' && (
          <>
            <input type="hidden" name="firstName" value={inputFirstName} />
            <input type="hidden" name="lastName" value={inputLastName} />
            <input type="hidden" name="phoneNumber" value={inputPhoneNumber} />
            <input type="hidden" name="language" value={inputLanguage} />
            <input type="hidden" name="level" value={inputLevel} />
            <input type="hidden" name="explanation" value={inputExplanation} />
            <input type="hidden" name="email" value={inputEmail} />
            <div className={`${inputContainerStyles} ${errorField === '8' && 'bg-red-100'}`}>
              <input
                type={isPassHidden ? 'password' : 'text'}
                name="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                placeholder=" رمز عبور "
                required
                aria-required="true"
                maxLength="16"
                className={`${inputStyles} ${errorField === '8' && inputErrorStyles}`}
              />
              <HidePasswordButton isPassHidden={isPassHidden} onPassHidden={toggleHidePass} />
            </div>
            <div className={`${inputContainerStyles} ${errorField === '9' && 'bg-red-100'}`}>
              <input
                type={isPassRepHidden ? 'password' : 'text'}
                name="password"
                value={inputPasswordRepeat}
                onChange={(e) => setInputPasswordRepeat(e.target.value)}
                placeholder=" تکرار رمز عبور "
                required
                aria-required="true"
                maxLength="16"
                className={`${inputStyles} ${errorField === '9' && inputErrorStyles}`}
              />
              <HidePasswordButton isPassHidden={isPassRepHidden} onPassHidden={toggleHidePassRep} />
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
                <HiCheckBadge className="text-xl" />
              </HomeButton>
            </div>
          </>
        )}
        {error.length > 0 && <Error error={error} />}
      </Form>
    </div>
  );
}

export async function loader() {
  const users = await getUsers();
  return users;
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const user = {
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber,
    language: data.language,
    level: data.level,
    explanation: data.explanation,
    email: data.email,
    signupStatus: 'waiting',
    reservedRooms: [],
    maxReserveCount: 3,
  };
  const hashData = { property: data.password };
  await createUser(user);
  await createHash(hashData);
  return redirect('/login');
}

export default SignUp;
