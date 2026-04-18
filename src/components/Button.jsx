import { useAuth } from '../context/AuthContext';

function Button({ children, onClick }) {
  const { error } = useAuth();
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-800 px-3 py-3 disabled:cursor-not-allowed"
      disabled={error.length > 0}
    >
      {children}
    </button>
  );
}

export default Button;
