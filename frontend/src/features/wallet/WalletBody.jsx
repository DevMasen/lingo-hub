import { useEffect, useState } from 'react';

import num2persian, { fa2en, moneyFormat } from 'num2persian';
import { BsCheckCircleFill } from 'react-icons/bs';

import PriceItem from './PriceItem';

import { useWallet } from './WalletContext';

import makeNumericInput from '../../utils/makeNumericInput';
//---

//! Global const var
const prices = [100000, 500000, 1000000, 2000000, 3000000, 5000000];

function WalletBody() {
  //! Context Data
  const { setCurrentPrice } = useWallet();

  //! Controlled Elements
  const [desiredPriceInput, setDesiredPriceInput] = useState('');

  //!Effects
  useEffect(
    function () {
      setDesiredPriceInput(moneyFormat(makeNumericInput(desiredPriceInput)));
      setCurrentPrice(+fa2en(desiredPriceInput.split('،').join('')));
    },
    [desiredPriceInput, setCurrentPrice]
  );

  //! JSX
  return (
    <section className="px-5">
      <p className="mt-6 flex items-center gap-3 rounded-xl border border-indigo-500 px-4 py-2 shadow-md shadow-slate-900">
        <span className="rounded-lg bg-indigo-600 px-3 py-1 text-center text-indigo-100">توجه</span>
        <span className="text-slate-300">
          محدوده مجاز افزایش وجه حداقل <span>{moneyFormat(100000)}</span> تومان و حداکثر
          <span>{moneyFormat(10000000)}</span> تومان است.
        </span>
      </p>
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-slate-300"> ثبت وجه درخواستی </h2>
        <p className="text-slate-400">مبلغ مورد نظر را انتخاب یا به صورت دستی وارد نمایید.</p>
        <ul className="mt-3 grid grid-cols-3 gap-4">
          {prices.map((price, i) => (
            <PriceItem price={price} key={i} />
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-300"> مبلغ دلخواه </h3>
        <div className="mt-2 flex w-fit justify-between rounded-lg border border-slate-500 px-3 py-2 transition-colors duration-300 focus-within:border-indigo-700">
          <input
            value={desiredPriceInput}
            onChange={(e) => setDesiredPriceInput(e.target.value)}
            type="text"
            className="w-72 bg-transparent outline-none"
            placeholder="مبلغ دلخواه واریزی را وارد نمایید"
          />
          <span className="border-r-2 border-slate-500 pr-3"> تومان </span>
        </div>
        <div className="mt-1 pr-2 text-slate-300">
          <span>{num2persian(fa2en(desiredPriceInput.split('،').join('')))} تومان </span>
        </div>
      </div>
      <div className="my-6">
        <h3 className="text-lg font-semibold text-slate-300"> شیوه پرداخت و انتخاب درگاه </h3>
        <ul className="mt-3">
          <li className="flex h-28 w-28 items-center justify-center rounded-xl border border-slate-500 text-center transition-all duration-300 hover:border-indigo-500">
            <button className="relative flex items-center justify-center">
              <div className="absolute left-2 top-0">
                <BsCheckCircleFill className="text-indigo-500" />
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                <img src="/bank-iconbase.svg" className="w-12" alt="bank-icon" />
                <p className="text-xs"> پرداخت آنلاین کارت های عضو شتاب</p>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default WalletBody;
