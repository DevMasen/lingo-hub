import WalletBalance from '../wallet/WalletBalance';
import UserNotifications from '../header/UserNotifications';
import UserProfile from '../header/UserProfile';
//---

function LeftHeader() {
  //! JSX
  return (
    <section className="flex items-center gap-2">
      <WalletBalance />
      <UserNotifications />
      <UserProfile />
    </section>
  );
}

export default LeftHeader;
