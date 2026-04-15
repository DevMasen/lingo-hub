import { useState } from 'react';
import Loader from '../ui/Loader';
import { Link } from 'react-router';

function SignUp() {
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

      <form
        action="POST"
        className="text-md w-[450px] rounded-lg bg-slate-600 bg-opacity-65 px-12 py-8 text-slate-200"
      >
        <legend className="flex items-center gap-2 text-2xl font-bold">
          <span> ثبت‌نام کاربر</span>
          <img src="/checklist.svg" alt="✅" className="h-6 w-6" />
        </legend>
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-slate-800 px-3 py-3">
          <div className="text-lg font-medium">
            <span> ثبت‌نام </span>
          </div>
          <img src="/check.svg" className="w-6" alt="<-" />
        </button>
      </form>
    </div>
  );
}

export default SignUp;
