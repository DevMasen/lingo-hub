import num2persian from 'num2persian';
//////////////////////////////////////
import PanelButton from '../components/PanelButton';
////////////////////////////////////////////////////
import { useWallet } from '../context/WalletContext';
////////////////////////////////////////////////////
function WalletFooter() {
  //! Context Data
  const { currentPrice } = useWallet();

  //! JSX
  return (
    <section className="flex items-center justify-between border-t-2 border-slate-700 px-5 py-6">
      <div>
        <span> مبلغ پرداختی شما : </span>{' '}
        <span> {new Intl.NumberFormat('fa-IR').format(currentPrice)} تومان </span>{' '}
        <span>( {num2persian(currentPrice)} تومان )</span>
      </div>
      <PanelButton
        disabled={currentPrice < 100000 || currentPrice > 10000000}
        extraClasses="px-3 py-2"
      >
        {' '}
        پرداخت هزینه
      </PanelButton>
    </section>
  );
}

export default WalletFooter;
