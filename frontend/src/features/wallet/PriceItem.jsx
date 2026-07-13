import { useWallet } from './WalletContext';
//---

function PriceItem({ price }) {
  //! Context Data
  const { currentPrice, setCurrentPrice } = useWallet();

  //! JSX
  return (
    <li
      className="flex cursor-pointer items-center justify-between rounded-xl border border-[var(--color-indigo-500)] px-3 py-4 text-sm sm:text-base"
      onClick={() => setCurrentPrice(price)}
    >
      <div>
        <span>{new Intl.NumberFormat('fa-IR').format(price)}</span>
        <span> تومان </span>
      </div>
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border-[var(--color-indigo-500)] p-[2px] transition-all duration-200 ${currentPrice === price ? 'border-4' : 'border'}`}
      ></div>
    </li>
  );
}

export default PriceItem;
