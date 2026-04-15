import { useState } from 'react';
import { Link } from 'react-router';
import Loader from '../ui/Loader';

function Login() {
  const [activeTab, setActiveTab] = useState('mobile');
  const [step, setStep] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [isPassHidden, setIsPassHidden] = useState(true);
  return (
    <div className="flex h-dvh items-center justify-center">
      {isLoading && <Loader />}
      <Link
        className="fixed right-7 top-6 flex h-4 w-4 cursor-pointer items-center justify-center font-serif text-4xl font-semibold text-red-700"
        to="/"
      >
        &times;
      </Link>

      <form
        action="POST"
        className="text-md w-[450px] rounded-lg bg-slate-600 bg-opacity-65 px-12 py-8 text-slate-200"
      >
        <legend className="flex items-end gap-2 text-2xl font-bold">
          <span> ورود / ثبت‌نام </span>
          <img src="/enter.svg" alt="<-" className="h-6 w-6" />
        </legend>
        {step === 0 && (
          <>
            <div className="mt-6 flex gap-4 text-sm font-semibold text-slate-800">
              <span
                className={`${activeTab === 'mobile' ? 'active-tab' : ''} cursor-pointer`}
                onClick={() => setActiveTab('mobile')}
              >
                استفاده از موبایل
              </span>

              <span
                className={`${activeTab === 'email' ? 'active-tab' : ''} cursor-pointer`}
                onClick={() => setActiveTab('email')}
              >
                استفاده از آدرس ایمیل
              </span>
            </div>
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
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-slate-800 px-3 py-3">
              <img src="/solar-arrow-left-bold-duotone.svg" className="w-6" alt="<-" />

              <div className="text-lg font-medium">
                <span> ادامه </span>
              </div>
            </button>
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
              <div className="flex w-16 items-center justify-center gap-2 pl-2 pr-5 pt-1 text-slate-800">
                <span
                  className="w-full cursor-pointer"
                  onClick={() => setIsPassHidden((cur) => !cur)}
                >
                  <img
                    className="w-full"
                    src={isPassHidden ? '/hide.svg' : '/unhide.svg'}
                    alt="!"
                  />
                </span>
              </div>
            </div>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-slate-800 px-3 py-3">
              <img src="/solar-arrow-left-bold-duotone.svg" className="w-6" alt="<-" />
              <div className="text-lg font-medium">
                <span> ورود </span>
              </div>
            </button>
          </>
        )}
        {/* hidden <-> flex */}
        <div className="mt-4 hidden items-center justify-center rounded-md bg-red-900 p-3 text-red-100">
          خطا! : متن خطا
        </div>
      </form>
    </div>
  );
}

export default Login;
