import { useState } from 'react';
import { Form, Link, redirect, useActionData } from 'react-router';
/////////////////////////////////////
import { useAuth } from '../context/AuthContext';
////////////////////////////////////////////////
import HidePasswordButton from '../components/HidePasswordButton';
import HomeButton from '../components/HomeButton';
import { BsArrowRight } from 'react-icons/bs';
import { AiOutlineEnter } from 'react-icons/ai';
import Error from '../components/Error';
import { hash } from '../services/apiHash';
import { useKey } from '../hooks/useKey';
////////////////////////////////////////////////
//! Styles Constant
const inputContainerStyles = 'flex items-center justify-between w-full rounded-md bg-slate-300';
const inputStyles =
  'w-full rounded-md bg-inherit p-3 text-slate-800 focus:bg-slate-50 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed transition-all duration-300';

function LoginUser() {
  //! React Router
  const errors = useActionData();

  //! Context Data
  const { isPassHidden, togglePassHidden, login } = useAuth();

  //! Controlled Elements
  const [passwordInput, setPasswordInput] = useState('');

  //! Handlers
  function handleSubmit() {
    if (errors?.wrongPassword) return;
    login();
  }

  //! JSX
  return (
    <Form method="PATCH" className="space-y-3" onSubmit={handleSubmit}>
      <div className={inputContainerStyles}>
        <input
          type={isPassHidden ? 'password' : 'text'}
          name="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="رمز عبور"
          maxLength="16"
          required
          aria-required="true"
          className={`${inputStyles} ${errors && 'border-2 border-red-600'}`}
        />
        <HidePasswordButton isPassHidden={isPassHidden} onPassHidden={togglePassHidden} />
      </div>
      <div className="flex gap-3">
        <HomeButton extraClasses={'py-2 rounded-md flex-grow'} to={'/login/options'}>
          <BsArrowRight className="text-2xl text-slate-300" />
        </HomeButton>
        <HomeButton
          type="submit"
          disabled={!passwordInput}
          extraClasses={'px-5 py-2 rounded-md flex-grow'}
        >
          <span className="text-lg font-medium">ورود</span>
          <AiOutlineEnter className="text-2xl text-slate-300" />
        </HomeButton>
      </div>
      <div className="flex h-6 justify-between px-5 font-medium text-indigo-400">
        <Link
          to={'otp'}
          className="transition-colors duration-200 hover:border-b hover:border-indigo-300 hover:text-indigo-300"
        >
          فراموشی رمز عبور
        </Link>
      </div>
      {errors?.wrongPassword && <Error error={errors.wrongPassword} />}
    </Form>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const hashData = await hash(params.userId);

  const errors = {};
  if (data.password !== hashData.property) {
    errors.wrongPassword = 'رمز عبور اشتباه است';
  }

  if (Object.keys(errors).length > 0) return errors;

  return redirect(`/app/${params.userId}`);
}

export default LoginUser;
