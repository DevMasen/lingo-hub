import { useHeader } from '../context/HeaderContext';

function HeaderOverlay() {
  //! Context Data
  const { isNotificationOpen, toggleNotification, isProfileOpen, toggleProfile } = useHeader();

  //! JSX
  return (
    <div
      onClick={() => {
        if (isNotificationOpen) toggleNotification();
        if (isProfileOpen) toggleProfile();
      }}
      className="fixed left-0 top-0 z-30 h-full w-full bg-slate-800/20 backdrop-blur-sm"
    ></div>
  );
}

export default HeaderOverlay;
