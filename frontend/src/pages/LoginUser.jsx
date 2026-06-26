import { useState } from 'react';
import { Link } from 'react-router';

import { AiOutlineEnter } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';

import HidePasswordButton from '../ui/HidePasswordButton';
import HomeButton from '../ui/HomeButton';
import Error from '../ui/Error';

import { useAuth } from '../context/AuthContext';

//---

//! Global Styles
const inputContainerStyles = 'flex items-center justify-between w-full rounded-md bg-slate-300';
const inputStyles =
  'w-full rounded-md bg-inherit p-3 text-slate-800 focus:bg-slate-50 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed transition-all duration-300';

function LoginUser() {
  //! React Router
  //TODO : replace with react query
  const errors = {};

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
    <form method="PATCH" className="space-y-3" onSubmit={handleSubmit}>
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
    </form>
  );
}

export default LoginUser;
