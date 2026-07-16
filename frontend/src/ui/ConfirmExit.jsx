import { useNavigate } from 'react-router';
import { useLogout } from '../features/authentication/useLogout';
import { useHeader } from '../features/header/HeaderContext';
import SpinnerMini from './SpinnerMini';
import PanelButton from './PanelButton';
//---

function ConfirmExit({ onCloseModal }) {
  //! React Router
  const navigate = useNavigate();

  //! React Query
  const { logout, isLoggingOut } = useLogout();

  //! Context
  const { isProfileOpen, toggleProfile } = useHeader();

  //! Main JSX
  return (
    <div className="flex flex-col justify-between gap-10 text-center">
      <h1 className="text-xl font-semibold text-[var(--color-slate-300)]">
        آیا مطمئنی میخوای از حسابت خارج بشی؟
      </h1>
      <div className="flex gap-6">
        <PanelButton
          className="flex-grow whitespace-nowrap bg-[var(--color-red-700)] px-3 py-2 hover:bg-[var(--color-red-600)] disabled:bg-[var(--color-red-800)]"
          disabled={isLoggingOut}
          onClick={() => {
            logout({
              onSettled: () => {
                navigate('/home');
              },
            });
            isProfileOpen && toggleProfile();
          }}
        >
          {isLoggingOut ? <SpinnerMini /> : 'بله، خارج شو'}
        </PanelButton>
        <PanelButton
          className="flex-grow whitespace-nowrap px-3 py-2"
          disabled={isLoggingOut}
          onClick={() => {
            onCloseModal();
            isProfileOpen && toggleProfile();
            navigate('/dashboard');
          }}
        >
          نه، می‌مونم
        </PanelButton>
      </div>
    </div>
  );
}

export default ConfirmExit;
