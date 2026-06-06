import WalletBody from './WalletBody';
import WalletFooter from './WalletFooter';
import WalletHeader from './WalletHeader';

function Wallet() {
  return (
    <div className="m-4 grid grid-cols-1 grid-rows-[auto_1fr_auto] rounded-xl bg-[linear-gradient(45deg,var(--color-slate-800),var(--color-indigo-900))]">
      <WalletHeader />
      <WalletBody />
      <WalletFooter />
    </div>
  );
}

export default Wallet;
