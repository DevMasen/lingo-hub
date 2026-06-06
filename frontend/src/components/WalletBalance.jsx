import { useEffect } from 'react';

import { Tooltip } from 'react-tooltip';

import { BiWallet } from 'react-icons/bi';
import { GrAddCircle } from 'react-icons/gr';

import { usePay } from '../context/PayContext';

import HeaderButton from './HeaderButton';

function WalletBalance({ fetcher }) {
  //! Context Data
  const { userBalance, setUserBalance } = usePay();

  //! Effects
  useEffect(
    function () {
      setUserBalance(+fetcher.data?.user.creditBalance);
    },
    [fetcher.data?.user.creditBalance, setUserBalance]
  );

  //!JSX
  return (
    <div className="ml-3 flex items-center gap-2 rounded-lg border border-slate-500 p-2">
      <BiWallet className="h-6 w-6 text-slate-200" />
      <div>
        <span> {new Intl.NumberFormat('fa-IR').format(userBalance)} </span>
        <span> تومان </span>
      </div>
      <HeaderButton to={'wallet'} tooltipId={'increase-balance'} tooltipContent={'افزایش وجه'}>
        <GrAddCircle className="h-[1.75rem] w-[1.75rem] p-1 text-slate-200 transition-all duration-200 hover:text-indigo-700" />
      </HeaderButton>
      <Tooltip id="increase-balance" />
    </div>
  );
}

export default WalletBalance;
