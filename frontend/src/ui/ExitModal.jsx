import { useExit } from '../context/ExitContext';
import { useLogout } from '../features/authentication/useLogout';

import Modal from './Modal';
import Spinner from './Spinner';
import FullPage from './FullPage';
//---

function ExitModal() {
  //! Context Data
  const { isExitOpen, toggleExitWindow } = useExit();
  const { logout, isLoggingOut } = useLogout();

  if (isLoggingOut)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //! JSX
  return (
    <Modal
      name="exitModal"
      isOpen={isExitOpen}
      message="آیا مطمئن هستید میخواهید خارج شوید ؟"
      onClick={{
        confirm: () => {
          toggleExitWindow();
          logout();
        },
        cancel: toggleExitWindow,
      }}
      path={{ confirm: '/home', cancel: '/dashboard' }}
      text={{ confirm: 'آره خارج شو!', cancel: 'نه می‌مونم.' }}
    />
  );
}

export default ExitModal;
