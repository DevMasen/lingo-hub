import { Link } from 'react-router';

import { useSignup } from '../features/authentication/SignupContext';
//---

function Error({ error = '', toPath = '' }) {
  //! Context Data
  const { setStep } = useSignup();

  //! JSX
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-red-800 p-3 text-red-100">
      <span>خطا : {error}</span>
      {toPath.length > 0 && (
        <span className="flex gap-1">
          <span>لطفا ابتدا</span>
          <Link
            to={toPath}
            onClick={() => {
              setStep('1');
            }}
            className="border-indigo-400 font-semibold text-indigo-300 transition-colors duration-300 hover:border-b hover:text-indigo-400"
          >
            ثبت‌نام کنید
          </Link>
        </span>
      )}
    </div>
  );
}

export default Error;
