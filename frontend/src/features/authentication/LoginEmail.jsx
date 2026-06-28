import { useEffect, useState } from 'react';

import { HiOutlineArrowLeft } from 'react-icons/hi';
import { BsListCheck } from 'react-icons/bs';

import HomeButton from '../../ui/HomeButton';
import Error from '../../ui/Error';

import { useSignup } from './SignupContext';

import { useKey } from '../../hooks/useKey';

import makeNumericInput from '../../utils/makeNumericInput';
//---

//! Global Styles
const inputContainerStyles = 'flex items-center justify-between w-full rounded-md bg-slate-300';
const inputStyles =
  'w-full rounded-md bg-inherit p-3 text-slate-800 focus:bg-slate-50 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed transition-all duration-300';

function LoginEmail() {
  //TODO : replace with real data

  //? Handle errors with react-hook-form
  const error = [];

  //! Context Data
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

  //! Handlers
  function handleContinue() {
    //TODO : implement this feature later
  }

  //! Custom Hooks
  useKey('enter', handleContinue);

  //! JSX
  return (
    <>
      <div className={inputContainerStyles}>
        <input
          type="email"
          name="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="آدرس ایمیل"
          required
          aria-required="true"
          className={`${inputStyles} ${error.length && 'border-2 border-red-600'}`}
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
          <BsListCheck className="text-xl text-slate-300" />
        </HomeButton>
        <HomeButton extraClasses={'py-2 px-12 rounded-md grow'} onClick={handleContinue}>
          <span className="text-lg font-medium">ادامه</span>
          <HiOutlineArrowLeft />
        </HomeButton>
      </div>
      {error.length > 0 && <Error error={error} />}
    </>
  );
}

export default LoginEmail;
