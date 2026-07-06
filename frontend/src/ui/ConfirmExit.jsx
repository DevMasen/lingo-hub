import { useLogout } from '../features/authentication/useLogout';

import SpinnerMini from './SpinnerMini';
import PanelButton from './PanelButton';
import { useNavigate } from 'react-router';
//---

function ConfirmExit({ onCloseModal }) {
  const navigate = useNavigate();
  const { logout, isLoggingOut } = useLogout();

  return (
    <div className="flex flex-col justify-between gap-10 text-center">
      <h1 className="text-xl font-semibold text-[var(--color-slate-300)]">
        آیا مطمئنی میخوای از حسابت خارج بشی؟
      </h1>
      <div className="flex gap-6">
        <PanelButton
          extraClasses="bg-[var(--color-red-700)] hover:bg-[var(--color-red-600)] disabled:bg-[var(--color-red-800)] px-3 py-2 flex-grow whitespace-nowrap"
          disabled={isLoggingOut}
          onClick={() => logout({ onSettled: navigate('/home') })}
        >
          {isLoggingOut ? <SpinnerMini /> : 'بله، خارج شو'}
        </PanelButton>
        <PanelButton
          extraClasses="px-3 py-2 flex-grow whitespace-nowrap"
          disabled={isLoggingOut}
          onClick={onCloseModal}
        >
          نه، می‌مونم
        </PanelButton>
      </div>
    </div>
  );
}

export default ConfirmExit;
