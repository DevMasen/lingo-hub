import { useState } from 'react';
import Loader from '../components/Loader';
import CloseFormButton from '../components/CloseFormButton';
import Button from '../components/Button';

function SignUp() {
  const [isLoading] = useState(false);

  return (
    <div className="background flex h-dvh items-center justify-center">
      {isLoading && <Loader />}
      <CloseFormButton />

      <form
        action="POST"
        className="text-md w-[450px] rounded-lg bg-slate-600 bg-opacity-65 px-12 py-8 text-slate-200"
      >
        <legend className="flex items-center gap-2 text-2xl font-bold">
          <span> ثبت‌نام کاربر </span>
          <img src="/checklist.svg" alt="✅" className="h-6 w-6" />
        </legend>
        <Button src={'/check.svg'}> ثبت‌نام </Button>
      </form>
    </div>
  );
}

export default SignUp;
