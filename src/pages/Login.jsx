import { useState } from 'react';
import { Link } from 'react-router';
import Loader from '../ui/Loader';

function Login() {
  const [activeTab, setActiveTab] = useState('mobile');
  const [step, setStep] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  return (
    <div className="flex h-dvh items-center justify-center">
      {isLoading && <Loader />}
      <Link
        className="fixed right-7 top-6 flex h-4 w-4 cursor-pointer items-center justify-center font-serif text-4xl font-semibold text-red-700"
        to="/"
      >
        &times;
      </Link>

      <form action="POST" className="text-md rounded-lg bg-slate-600 px-8 py-6 text-slate-200">
        <legend className="text-3xl font-bold"> ورود / ثبت نام </legend>
        {step === 0 && (
          <>
            <div className="mt-3 flex gap-4 font-semibold text-slate-800">
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
              <div className="mt-4 flex justify-between rounded-md bg-slate-300">
                <input
                  type="text"
                  placeholder="9167432385"
                  className="rounded-md bg-inherit px-3 py-2"
                />
                <span className="flex items-center justify-center px-3">
                  <span>98+</span>
                  <img src="/flag.webp" alt="!fg" className="w-5 rounded-sm" />
                </span>
              </div>
            )}
            {activeTab === 'email' && (
              <div>
                <input type="email" placeholder="آدرس ایمیل" />
              </div>
            )}
          </>
        )}
        {step === 1 && (
          <>
            <div>
              <input type="password" placeholder="رمز عبور" />
            </div>
          </>
        )}
        <button className="flex items-center gap-3">
          <img src="/solar-arrow-left-bold-duotone.svg" className="w-8" alt="<-" />

          {step === 0 ? <span> ادامه </span> : <span> ورود </span>}
        </button>
      </form>
    </div>
  );
}

export default Login;
