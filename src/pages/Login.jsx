import { Outlet } from 'react-router';
////////////////////////////////////////////
import { useAuth } from '../context/AuthContext';
/////////////////////////////////////////////////
import Loader from '../components/Loader';
import CloseFormButton from '../components/CloseFormButton';
import { CgEnter } from 'react-icons/cg';
///////////////////////////////////////
function Login() {
  //! Context Data
  const { loading } = useAuth();

  //! JSX
  return (
    <div className="background flex h-dvh items-center justify-center">
      {loading && <Loader />}
      <CloseFormButton />

      <section className="text-md w-[500px] space-y-3 rounded-lg bg-slate-600 bg-opacity-65 px-12 py-8 text-slate-200">
        <legend className="flex items-end gap-2 text-2xl font-bold">
          <span> ورود کاربر </span>
          <CgEnter className="text-3xl text-slate-300" />
        </legend>

        <Outlet />
      </section>
    </div>
  );
}

export default Login;
