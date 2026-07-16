import WalletBody from '../features/wallet/WalletBody';
import WalletFooter from '../features/wallet/WalletFooter';
import WalletHeader from '../features/wallet/WalletHeader';
//---

function Wallet() {
  //! Main JSX
  return (
    <div className="m-4 grid grid-cols-1 grid-rows-[auto_1fr_auto] rounded-xl bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))]">
      <WalletHeader />
      <WalletBody />
      <WalletFooter />
    </div>
  );
}

export default Wallet;
