import { useAuth } from '../context/AuthContext';
import { useSignup } from '../context/SignupContext';

function Button({ children, onClick }) {
  const { error: loginError } = useAuth();
  const { error: signupError } = useSignup();
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-800 px-3 py-3 disabled:cursor-not-allowed"
      disabled={loginError.length > 0 || signupError.length > 0}
    >
      {children}
    </button>
  );
}

export default Button;
