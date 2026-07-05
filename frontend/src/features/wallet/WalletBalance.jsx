import { Tooltip } from 'react-tooltip';

import { BiWallet } from 'react-icons/bi';
import { GrAddCircle } from 'react-icons/gr';

import HeaderButton from '../header/HeaderButton';
//---

function WalletBalance() {
  //! Context Data

  const userBalance = '500000';

  //!JSX
  return (
    <div className="ml-3 hidden items-center gap-2 rounded-lg border border-[var(--color-slate-500)] p-2 md:flex">
      <BiWallet className="h-6 w-6 text-[var(--color-slate-200)]" />
      <div className="whitespace-nowrap">
        <span> {new Intl.NumberFormat('fa-IR').format(userBalance)} </span>
        <span> تومان </span>
      </div>
      <HeaderButton to={'wallet'} tooltipId={'increase-balance'} tooltipContent={'افزایش وجه'}>
        <GrAddCircle className="h-[1.75rem] w-[1.75rem] p-1 text-[var(--color-slate-200)] transition-all duration-200 hover:text-[var(--color-indigo-700)]" />
      </HeaderButton>
      <Tooltip id="increase-balance" />
    </div>
  );
}

export default WalletBalance;
