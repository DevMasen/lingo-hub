import { useSearchParams } from 'react-router';

import { useSession } from '../authentication/useSession';

import UserInfoHeader from './UserInfoHeader';
import UserParameterList from './UserParameterList';
import UserReserveList from './UserReserveList';

import Spinner from '../../ui/Spinner';
import Error from '../../ui/Error';
//---

function UserInfo() {
  //! React Query
  const { userId, isLoadingSession, error } = useSession();

  //! React Router
  const [query] = useSearchParams();

  //! Fake Data
  const date = {
    reserveDate: '۱۴۰۵۰۳۱۸',
  };

  if (isLoadingSession)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <Error extraClasses="w-80 h-36" error={error.message} />
      </div>
    );
  }

  //! JSX
  return (
    <div className="space-y-5 border-b border-[var(--color-slate-500)] p-3">
      <UserInfoHeader userId={userId} />
      <section className="space-y-7 rounded-2xl bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))] px-5 py-2">
        <UserParameterList userId={userId} date={date} query={query} />
        <UserReserveList date={date} query={query} />
      </section>
    </div>
  );
}

export default UserInfo;
