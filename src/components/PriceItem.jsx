function PriceItem({ price, activePrice, onActivePrice }) {
  return (
    <li
      className="flex cursor-pointer items-center justify-between rounded-md border border-indigo-500 px-3 py-4"
      onClick={() => onActivePrice(price)}
    >
      <div>
        <span>{new Intl.NumberFormat('fa-IR').format(price)}</span>
        <span> تومان </span>
      </div>
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border-indigo-500 p-[2px] transition-all duration-200 ${activePrice === price ? 'border-4' : 'border'}`}
      ></div>
    </li>
  );
}

export default PriceItem;
