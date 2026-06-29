import { useExit } from '../context/ExitContext';

import Modal from './Modal';
//---

function ExitModal() {
  //! Context Data
  const { isExitOpen, toggleExitWindow } = useExit();

  //! JSX
  return (
    <Modal
      name="exitModal"
      isOpen={isExitOpen}
      message="آیا مطمئن هستید میخواهید خارج شوید ؟"
      onClick={{
        confirm: () => {
          toggleExitWindow();
          // logout();
        },
        cancel: toggleExitWindow,
      }}
      path={{ confirm: '/home', cancel: '/' }}
      text={{ confirm: 'آره خارج شو!', cancel: 'نه می‌مونم.' }}
    />
  );
}

export default ExitModal;
