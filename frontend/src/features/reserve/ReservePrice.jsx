function ReservePrice({ record }) {
  //! Main JSX
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-[var(--color-slate-700)] px-3 text-sm">
      <span>{new Intl.NumberFormat('fa-IR').format(0)}</span>
      <span>تومان</span>
    </div>
  );
}

export default ReservePrice;
