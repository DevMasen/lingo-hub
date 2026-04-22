import { Link } from 'react-router';
import { useSignup } from '../context/SignupContext';
import { useAuth } from '../context/AuthContext';

function Error({ error = '', inputPhoneNumber = '', inputEmail = '' }) {
  const { step, setStep } = useSignup();
  const { checkPhoneExist, checkEmailExist } = useAuth();

  return (
    <div className="mt-4 flex flex-col items-center justify-center rounded-md bg-red-800 p-3 text-red-100">
      <span>خطا : {error}</span>
      {((step === '3' && checkPhoneExist(inputPhoneNumber)) ||
        (step === '5' && checkEmailExist(inputEmail))) && (
        <div>
          <Link
            className="font-semibold text-indigo-400"
            to={'/login'}
            onClick={() => setStep('1')}
          >
            ورود به حساب
          </Link>
        </div>
      )}
    </div>
  );
}

export default Error;
