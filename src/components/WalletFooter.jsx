import num2persian from 'num2persian';
import PanelButton from '../components/PanelButton';
import { useWallet } from '../context/WalletContext';

////////////////////////////////////////////////////
function WalletFooter() {
  //! Context Data
  const { currentPrice } = useWallet();

  //! JSX
  return (
    <section className="border-t border-slate-300">
      <div>
        <span> مبلغ پرداختی شما : </span>{' '}
        <span> {new Intl.NumberFormat('fa-IR').format(currentPrice)} تومان </span>{' '}
        <span>( {num2persian(currentPrice)} تومان )</span>
      </div>
      <PanelButton> پرداخت هزینه</PanelButton>
    </section>
  );
}

export default WalletFooter;
