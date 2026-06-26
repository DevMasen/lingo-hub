import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { HiOutlineArrowLeft } from 'react-icons/hi';
import { BsListCheck } from 'react-icons/bs';

import HomeButton from '../../ui/HomeButton';
import LoginTabs from './LoginTabs';
import Error from '../../ui/Error';

import { useAuth } from '../../context/AuthContext';
import { useSignup } from '../../context/SignupContext';

import { useKey } from '../../hooks/useKey';

import makeNumericInput from '../../utils/makeNumericInput';
import validateEmail from '../../utils/validateEmail';
//---

//! Global Styles
const inputContainerStyles = 'flex items-center justify-between w-full rounded-md bg-slate-300';
const inputStyles =
  'w-full rounded-md bg-inherit p-3 text-slate-800 focus:bg-slate-50 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed transition-all duration-300';

function LoginOptions() {
  //! React Router

  //TODO : replace with real data
  //! Fake Data
  const users = [];

  const navigate = useNavigate();

  //! Context Data
  const { error, setError, path, setPath, activeTab } = useAuth();
  const { setStep } = useSignup();

  //! Controlled Elements
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  //! Effects
  useEffect(
    function () {
      setPhoneNumberInput((cur) => makeNumericInput(cur));
    },
    [phoneNumberInput]
  );
  useEffect(
    function () {
      setError('');
      setPath('');
    },
    [setError, setPath]
  );

  //! Custom Hooks
  useKey('enter', handleContinue);

  //! Handlers
  function handleContinue() {
    switch (activeTab) {
      case 'mobile': {
        if (phoneNumberInput.length < 10) {
          setError('شماره موبایل باید ۱۰ رقمی باشد.');
          setPath('');
          break;
        }
        if (phoneNumberInput.at(0) !== '۹') {
          setError('شماره موبایل نامعتبر است.');
          setPath('');
          break;
        }
        const userByPhone = users.find((user) => user.phoneNumber === phoneNumberInput);
        if (userByPhone === undefined) {
          setError(' کاربری با این شماره موبایل وجود ندارد. ');
          setPath('/signup');
          break;
        }
        navigate(`/login/${userByPhone.id}`);
        setError('');
        setPath('');
        break;
      }
      case 'email': {
        if (!emailInput) {
          setError('لطفا ایمیل خود را وارد کنید.');
          setPath('');
          break;
        }
        if (!validateEmail(emailInput)) {
          setError('ایمیل نا معتبر است.');
          setPath('');
          break;
        }
        const userByEmail = users.find((user) => user.email === emailInput);
        if (userByEmail === undefined) {
          setError(' کاربری با این ایمیل وجود ندارد. ');
          setPath('/signup');
          break;
        }
        navigate(`/login/${userByEmail.id}`);
        setError('');
        setPath('');
        break;
      }
      default:
        return;
    }
  }

  //! JSX
  return (
    <>
      <LoginTabs />
      {activeTab === 'mobile' && (
        <div className={inputContainerStyles}>
          <input
            type="text"
            name="phone-number"
            id="phone-number"
            value={phoneNumberInput}
            onChange={(e) => setPhoneNumberInput(e.target.value)}
            maxLength="10"
            placeholder="۹۱۳۱۲۳۴۵۶۷"
            required
            aria-required="true"
            className={`${inputStyles} ${error && 'border-2 border-red-600'} placeholder:text-end`}
          />
          <span className="w-18 flex items-center justify-center gap-2 px-6 text-slate-800">
            <span className="flex gap-1">
              <span>۹۸</span>
              <span>+</span>
            </span>
            <img src="/flag.webp" alt="!fg" className="w-5 rounded-sm" />
          </span>
        </div>
      )}

      {activeTab === 'email' && (
        <div className={inputContainerStyles}>
          <input
            type="email"
            name="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="آدرس ایمیل"
            required
            aria-required="true"
            className={`${inputStyles} ${error && 'border-2 border-red-600'}`}
          />
        </div>
      )}

      <div className="flex gap-3">
        <HomeButton
          to={'/signup'}
          onClick={() => {
            setError('');
            setStep('1');
          }}
          extraClasses={'py-2 rounded-md grow'}
        >
          <span className="text-lg font-medium">ثبت‌نام</span>{' '}
          <BsListCheck className="text-xl text-slate-300" />
        </HomeButton>
        <HomeButton extraClasses={'py-2 px-12 rounded-md grow'} onClick={handleContinue}>
          <span className="text-lg font-medium">ادامه</span>
          <HiOutlineArrowLeft />
        </HomeButton>
      </div>
      {error.length > 0 && <Error error={error} toPath={path} />}
    </>
  );
}

export default LoginOptions;
