import { useState } from 'react';
import Loader from '../components/Loader';
import CloseFormButton from '../components/CloseFormButton';
import Button from '../components/Button';

// const inputStyles = '';

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

        <div>
          <input type="text" name="firstName" placeholder=" نام " />
        </div>
        <div>
          <input type="text" name="lastName" placeholder=" نام خانوادگی " />
        </div>
        <div>
          <input type="text" name="phoneNumber" placeholder=" شماره موبایل " />
        </div>
        <div>
          <label htmlFor="lang"> زبان تدریس : </label>
          <select id="lang" name="language">
            <option value="انگلیسی"> انگلیسی </option>
            <option value="آلمانی"> آلمانی </option>
            <option value="فرانسوی"> فرانسوی </option>
            <option value="چینی"> چینی </option>
          </select>
        </div>
        <div>
          <label htmlFor="level"> سطح تدریس: </label>
          <select id="level" name="level">
            <option value="مبتدی"> مبتدی </option>
            <option value="متوسط"> متوسط </option>
            <option value="پیشرفته"> پیشرفته </option>
            <option value="استاد"> استاد </option>
          </select>
        </div>

        <div>
          <textarea name="explanation" placeholder=" توضیحات تکمیلی ..." />
        </div>

        <div>
          <input type="email" name="email" placeholder=" آدرس ایمیل " />
        </div>

        <div>
          <input type="password" name="password" placeholder=" رمز عبور " />
        </div>
        <div>
          <input type="password" name="password-repeat" placeholder=" تکرار رمز عبور " />
        </div>

        <Button src={'/check.svg'}> ثبت‌نام </Button>
      </form>
    </div>
  );
}

export default SignUp;
