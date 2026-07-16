import { BiWallet } from 'react-icons/bi';
import { GrAddCircle } from 'react-icons/gr';
import { useProfile } from '../setting/useProfile';
import HeaderButton from '../header/HeaderButton';
import Skeleton from '../../ui/Skeleton';
//---

function WalletBalance() {
  //! React Query
  const { profile, isLoading, error } = useProfile();

  //! Main JSX
  return (
    <div className="ml-3 hidden items-center gap-2 rounded-lg border border-[var(--color-slate-500)] p-2 md:flex">
      <BiWallet className="h-6 w-6 text-[var(--color-slate-200)]" />
      {isLoading ? (
        <Skeleton className="h-4 w-16" />
      ) : (
        <div className="whitespace-nowrap">
          {error ? (
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
