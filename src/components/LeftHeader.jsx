import { useEffect } from 'react';
import { useFetcher } from 'react-router';
//////////////////////////////////////////
import WalletBalance from './WalletBalance';
import UserNotifications from './UserNotifications';
import UserProfile from './UserProfile';
///////////////////////////////////////////////
function LeftHeader({ isNotifOpen, isProfileOpen, onNotifOpen, onProfileOpen }) {
  //! React Router
  const fetcher = useFetcher();

  //! Effects
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('setting/user');
    },
    [fetcher]
  );

  //! JSX
  return (
    <section className="flex items-center gap-2">
      <WalletBalance fetcher={fetcher} />
      <UserNotifications isNotifOpen={isNotifOpen} onNotifOpen={onNotifOpen} />
      <UserProfile fetcher={fetcher} />
    </section>
  );
}

export default LeftHeader;
