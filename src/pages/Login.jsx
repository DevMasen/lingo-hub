import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import LoginTabs from '../components/LoginTabs';
import HomeButton from '../components/HomeButton';
import HidePasswordButton from '../components/HidePasswordButton';
import Error from '../components/Error';
import CloseFormButton from '../components/CloseFormButton';
import makeNumericInput from '../utils/makeNumericInput';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { AiOutlineEnter } from 'react-icons/ai';
import { CgEnter } from 'react-icons/cg';
import { useAuth } from '../context/AuthContext';

const inputContainerStyles = 'flex items-center justify-between w-full rounded-md bg-slate-300';
const inputStyles =
  'w-full rounded-md bg-inherit p-3 text-slate-800 focus:bg-slate-50 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed transition-all duration-300';

function Login() {
  const { activeTab, step, isPassHidden, loading, error } = useAuth();
  ///////////////////////////

  // Controlled Elements
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(
    function () {
      setPhoneNumberInput((cur) => makeNumericInput(cur));
    },
    [phoneNumberInput]
  );

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="background flex h-dvh items-center justify-center">
      {loading && <Loader />}
      <CloseFormButton />

      <form
        action="GET"
        onSubmit={handleSubmit}
        className="text-md w-[450px] space-y-3 rounded-lg bg-slate-600 bg-opacity-65 px-12 py-8 text-slate-200"
      >
        <legend className="flex items-end gap-2 text-2xl font-bold">
          <span> ورود / ثبت‌نام </span>
          <CgEnter className="text-3xl text-slate-300" />
        </legend>
        {step === 'first' && (
          <>
            <LoginTabs />
            {activeTab === 'mobile' && (
              <div className={`${inputContainerStyles}`}>
                <input
                  name="phone-number"
                  id="phone-number"
                  value={phoneNumberInput}
                  onChange={(e) => setPhoneNumberInput(e.target.value)}
                  maxLength="10"
                  type="text"
                  placeholder="9167432385"
                  className={`${inputStyles} ${error && 'border-2 border-red-600'} placeholder:text-end`}
                  required
                />
                <span className="w-18 flex items-center justify-center gap-2 px-6 text-slate-800">
                  <span>98+</span>
                  <img src="/flag.webp" alt="!fg" className="w-5 rounded-sm" />
                </span>
              </div>
            )}
            {activeTab === 'email' && (
              <div className={`${inputContainerStyles}`}>
                <input
                  name="email"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className={`${inputStyles} ${error && 'border-2 border-red-600'}`}
                  placeholder="آدرس ایمیل"
                  required
                />
              </div>
            )}
            <HomeButton extraClasses={'py-2 rounded-md'}>
              <span className="text-lg font-medium">ادامه</span>
              <HiOutlineArrowLeft className="text-xl text-slate-300" />
            </HomeButton>
          </>
        )}
        {step === 'second' && (
          <>
            <div className={`${inputContainerStyles}`}>
              <input
                name="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                type={isPassHidden ? 'password' : 'text'}
                placeholder="رمز عبور"
                className={`${inputStyles} ${error && 'border-2 border-red-600'}`}
                maxLength="16"
                required
              />
              <HidePasswordButton />
            </div>
            <HomeButton extraClasses={'py-2 rounded-md'}>
              <span className="text-lg font-medium">ورود</span>
              <AiOutlineEnter className="text-2xl text-slate-300" />
            </HomeButton>
          </>
        )}
        {error.length > 0 && <Error error={error} />}
      </form>
    </div>
  );
}

export default Login;
