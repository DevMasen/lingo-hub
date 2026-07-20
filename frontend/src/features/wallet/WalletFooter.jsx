import num2persian from 'num2persian';
import { useWallet } from './WalletContext';
import PanelButton from '../../ui/PanelButton';
//---

function WalletFooter() {
  //! Context
  const { currentPrice } = useWallet();

  //! Main JSX
  return (
    <section className="flex items-center justify-between gap-3 border-t-2 border-[var(--color-slate-700)] px-5 py-6">
      <div>
        <span> مبلغ پرداختی شما : </span>{' '}
        <span> {new Intl.NumberFormat('fa-IR').format(currentPrice)} تومان </span>{' '}
        <span>( {num2persian(currentPrice)} تومان )</span>
      </div>
      {/* TODO#7: implement this feature when the host and domain was ready */}
      <PanelButton
        disabled={currentPrice < 100000 || currentPrice > 10000000}
        className="whitespace-nowrap px-3 py-2"
      >
        {' '}
        پرداخت هزینه
      </PanelButton>
    </section>
  );
}

export default WalletFooter;
