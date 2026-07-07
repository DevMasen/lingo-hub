import { BiWallet } from 'react-icons/bi';
import { GrAddCircle } from 'react-icons/gr';

import HeaderButton from '../header/HeaderButton';
import { useSession } from '../authentication/useSession';
import { useProfile } from '../setting/useProfile';
import Skeleton from '../../ui/Skeleton';
//---

function WalletBalance() {
  //! React Query
  const { userId, isLoadingSession, error: sessionError } = useSession();
  const { profile, isLoadingProfile, error: profileError } = useProfile(userId);

  //!JSX
  return (
    <div className="ml-3 hidden items-center gap-2 rounded-lg border border-[var(--color-slate-500)] p-2 md:flex">
      <BiWallet className="h-6 w-6 text-[var(--color-slate-200)]" />
      {isLoadingProfile || isLoadingSession ? (
        <Skeleton className="h-4 w-16" />
      ) : (
        <div className="whitespace-nowrap">
          {sessionError || profileError ? (
            <span> ۰ </span>
          ) : (
            <span> {new Intl.NumberFormat('fa-IR').format(profile?.creditBalance)} </span>
          )}
          <span> تومان </span>
        </div>
      )}
      <HeaderButton to={'wallet'}>
        <GrAddCircle className="h-[1.75rem] w-[1.75rem] p-1 text-[var(--color-slate-200)] transition-all duration-200 hover:text-[var(--color-indigo-700)]" />
      </HeaderButton>
    </div>
  );
}

export default WalletBalance;
