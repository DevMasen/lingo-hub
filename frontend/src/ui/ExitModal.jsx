import { useParams } from 'react-router';

import { useExit } from '../context/ExitContext';

import Modal from './Modal';
//---

function ExitModal() {
  //! React Router
  const params = useParams();

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
      path={{ confirm: '/', cancel: `/app/${params.userId}` }}
      text={{ confirm: 'آره خارج شو!', cancel: 'نه می‌مونم.' }}
    />
  );
}

export default ExitModal;
