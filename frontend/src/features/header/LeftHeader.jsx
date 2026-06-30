import WalletBalance from '../wallet/WalletBalance';
import UserNotifications from '../header/UserNotifications';
import UserProfile from '../header/UserProfile';
import ToggleDarkMode from './TggleDarkMode';
//---

function LeftHeader() {
  //! JSX
  return (
    <section className="flex items-center gap-2">
      <WalletBalance />
      <UserNotifications />
      <ToggleDarkMode />
      <UserProfile />
    </section>
  );
}

export default LeftHeader;
