import { useEffect } from 'react';
import { useFetcher } from 'react-router';

import WalletBalance from './WalletBalance';
import UserNotifications from './UserNotifications';
import UserProfile from './UserProfile';

function LeftHeader() {
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
      <UserNotifications />
      <UserProfile fetcher={fetcher} />
    </section>
  );
}

export default LeftHeader;
