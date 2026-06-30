import { useEffect, useRef, useState } from 'react';

import { HiOutlineArrowRight } from 'react-icons/hi';
import { AiOutlineEnter } from 'react-icons/ai';

import HomeButton from '../../ui/HomeButton';
import Error from '../../ui/Error';
//---

//! Global Styles
const inputContainerStyles =
  'flex items-center justify-between w-full rounded-md bg-[var(--color-slate-300)]';
const inputStyles =
  'w-full rounded-md bg-inherit p-3 text-[var(--color-slate-800)] focus:bg-[var(color-slate-50)] focus:outline-none focus:ring focus:ring-[var(--color-slate-700)] focus:ring-offset-1 disabled:cursor-not-allowed transition-all duration-300';

function LoginVerifyOTP() {
  //? handle errors with react-hook-form and auth.service.js
  const errors = {};

  //! Local States and Refs
  const recoveryCode1Ref = useRef(null);
  const recoveryCode2Ref = useRef(null);
  const recoveryCode3Ref = useRef(null);
  const recoveryCode4Ref = useRef(null);
  const enterButtonRef = useRef(null);

  //! Controlled Elements
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');

  //! Effects
  useEffect(function () {
    recoveryCode1Ref.current.focus();
  }, []);
  useEffect(
    function () {
      if (input1.length === 1) recoveryCode2Ref.current.focus();
      if (input2.length === 1) recoveryCode3Ref.current.focus();
      if (input3.length === 1) recoveryCode4Ref.current.focus();
      if (input4.length === 1) enterButtonRef.current.focus();
    },
    [input1.length, input2.length, input3.length, input4.length]
  );

  //! Handlers
  function handleSubmit() {
    if (errors?.wrongCode) return;
    //TODO : handle login with auth.service.js
    // login();
  }

  //! JSX
  return (
    <form method="PATCH" onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <div>
        <h3> کد ارسال شده به ایمیل خود را وارد کنید </h3>
      </div>
      <div className="flex w-60 gap-3 text-lg font-semibold" dir="ltr">
        <div className={inputContainerStyles}>
          <input
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            type="text"
            name="recoveryCode1"
            maxLength="1"
            required
            aria-required="true"
            className={`${inputStyles} text-center`}
            ref={recoveryCode1Ref}
          />
        </div>
        <div className={inputContainerStyles}>
          <input
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            type="text"
            name="recoveryCode2"
            maxLength="1"
            required
            aria-required="true"
            className={`${inputStyles} text-center`}
            ref={recoveryCode2Ref}
          />
        </div>
        <div className={inputContainerStyles}>
          <input
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
            type="text"
            name="recoveryCode3"
            maxLength="1"
            required
            aria-required="true"
            className={`${inputStyles} text-center`}
            ref={recoveryCode3Ref}
          />
        </div>
        <div className={inputContainerStyles}>
          <input
            value={input4}
            onChange={(e) => setInput4(e.target.value)}
            type="text"
            name="recoveryCode4"
            maxLength="1"
            required
            aria-required="true"
            className={`${inputStyles} text-center`}
            ref={recoveryCode4Ref}
          />
        </div>
      </div>
      <div className="flex w-full gap-2">
        <HomeButton to={-1} extraClasses={'py-2 rounded-md flex-grow'}>
          <HiOutlineArrowRight />
        </HomeButton>
        <HomeButton
          type="submit"
          ref={enterButtonRef}
          extraClasses={'px-5 py-2 rounded-md flex-grow'}
        >
          <span className="text-lg font-medium"> ورود</span>
          <AiOutlineEnter className="text-2xl text-[var(--color-slate-300)]" />
        </HomeButton>
      </div>
      {errors?.wrongCode && <Error error={errors.wrongCode} />}
    </form>
  );
}

export default LoginVerifyOTP;
