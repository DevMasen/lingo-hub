import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useSignup } from '../context/SignupContext';

function HomeButton({ children, to, onClick, extraClasses }) {
  const { error: loginError } = useAuth();
  const { error: signupError } = useSignup();
  return (
    <Link
      onClick={onClick}
      to={to}
      className={`flex items-center justify-center gap-2 border-2 border-slate-800 bg-slate-900 text-slate-200 shadow-md shadow-slate-700 transition-all duration-200 hover:bg-slate-800 disabled:cursor-not-allowed ${extraClasses}`}
      disabled={loginError.length > 0 || signupError.length > 0}
    >
      {children}
    </Link>
  );
}

export default HomeButton;
