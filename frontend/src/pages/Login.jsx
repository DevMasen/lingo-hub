import { Outlet } from 'react-router';

import { CgEnter } from 'react-icons/cg';

import CloseFormButton from '../ui/CloseFormButton';
import HeroBackground from '../ui/HeroBackground';
//---

function Login() {
  return (
    <HeroBackground
      src={
        'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/home-bg.png?width=1600&quality=80'
      }
      placeholderSrc={
        'https://ewwmegszjxnicvnvzyhb.supabase.co/storage/v1/object/public/images/home-bg.png?width=20&quality=20'
      }
    >
      <div className="flex h-dvh items-center justify-center px-5">
        <CloseFormButton />
        <section className="text-md w-[500px] space-y-3 rounded-lg bg-slate-600/65 px-12 py-8 text-slate-200">
          <legend className="flex items-end gap-2 text-2xl font-bold">
            <span> ورود کاربر </span>
            <CgEnter className="text-3xl text-slate-300" />
          </legend>
          <Outlet />
        </section>
      </div>
    </HeroBackground>
  );
}

export default Login;
