import { useState } from 'react';
import PriceItem from './PriceItem';
const prices = [100000, 500000, 1000000, 2000000, 3000000, 5000000];
function WalletBody() {
  const [activePrice, setActivePrice] = useState(0);

  function handleActivePrice(price) {
    setActivePrice(price);
  }
  return (
    <section>
      <p className="mx-5 my-3 flex items-center gap-3 rounded-xl border border-indigo-500 px-4 py-2 shadow-md shadow-slate-900">
        <span className="rounded-lg bg-indigo-600 px-3 py-1 text-center text-indigo-100">
          {' '}
          توجه{' '}
        </span>
        <span className="text-slate-300">
          محدوده مجاز افزایش وجه حداقل <span>X</span> تومان و حداکثر <span>Y</span> تومان است.
        </span>
      </p>
      <div className="px-5 py-3">
        <h2 className="text-lg font-semibold text-slate-300"> ثبت وجه درخواستی </h2>
        <p className="text-slate-400">مبلغ مورد نظر را انتخاب یا به صورت دستی وارد نمایید.</p>
        <ul className="mt-5 grid grid-cols-3 gap-4">
          {prices.map((price) => (
            <PriceItem price={price} activePrice={activePrice} onActivePrice={handleActivePrice} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default WalletBody;
