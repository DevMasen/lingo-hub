import { useState } from 'react';
import Loader from '../components/Loader';
import LoginTabs from '../components/LoginTabs';
import Button from '../components/Button';
import HidePasswordButton from '../components/HidePasswordButton';
import Error from '../components/Error';
import CloseFormButton from '../components/CloseFormButton';

function Login() {
  const [activeTab, setActiveTab] = useState('mobile');
  const [step] = useState(0);
  const [isLoading] = useState(false);
  const [error] = useState('');
  const [isPassHidden, setIsPassHidden] = useState(true);

  function handleActiveTab(option = '') {
    setActiveTab(option);
  }

  function handleHidePassword() {
    setIsPassHidden((cur) => !cur);
  }

  return (
    <div className="background flex h-dvh items-center justify-center">
      {isLoading && <Loader />}
      <CloseFormButton />

      <form
        action="GET"
        className="text-md w-[450px] rounded-lg bg-slate-600 bg-opacity-65 px-12 py-8 text-slate-200"
      >
        <legend className="flex items-end gap-2 text-2xl font-bold">
          <span> ورود / ثبت‌نام </span>
          <img src="/enter.svg" alt="<-" className="h-6 w-6" />
        </legend>
        {step === 0 && (
          <>
            <LoginTabs activeTab={activeTab} onActiveTab={handleActiveTab} />
            {activeTab === 'mobile' && (
              <div className="mt-4 flex w-full justify-between rounded-md border-slate-700 bg-slate-300">
                <input
                  name="phone-number"
                  type="number"
                  placeholder="9167432385"
                  className="w-full rounded-md bg-inherit px-3 py-3 text-end text-slate-800 placeholder:text-end focus:bg-slate-50 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed"
                  required
                />
                <span className="w-18 flex items-center justify-center gap-2 px-6 text-slate-800">
                  <span>98+</span>
                  <img src="/flag.webp" alt="!fg" className="w-5 rounded-sm" />
                </span>
              </div>
            )}
            {activeTab === 'email' && (
              <div className="mt-4 w-full">
                <input
                  name="email"
                  type="email"
                  className="w-full rounded-md bg-slate-300 px-3 py-3 text-slate-800 focus:bg-slate-50 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed"
                  placeholder="آدرس ایمیل"
                  required
                />
              </div>
            )}
            <Button src={'/solar-arrow-left-bold-duotone.svg'}>ادامه</Button>
          </>
        )}
        {step === 1 && (
          <>
            <div className="mt-4 flex items-center justify-center rounded-md bg-slate-300">
              <input
                name="password"
                type={isPassHidden ? 'password' : 'text'}
                placeholder="رمز عبور"
                className="w-full rounded-md bg-inherit px-3 py-3 text-slate-800 focus:bg-slate-50 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed"
                required
              />
              <HidePasswordButton isPassHidden={isPassHidden} onHidePassword={handleHidePassword} />
            </div>
            <Button src={'/solar-arrow-left-bold-duotone.svg'}>ورود</Button>
          </>
        )}
        <Error error={error} />
      </form>
    </div>
  );
}

export default Login;
