function Introduction({ className, userFirstName = '' }) {
  return (
    <div className={className}>
      <img src="/icon.png" className="w-48 rounded-xl" alt="logo" />
      <div className="space-y-6">
        <h2 className="text-xl">
          <span>{userFirstName}</span> به آکادمی زبان لینگوهاب خوش اومدی
        </h2>
        <p className="text-lg font-semibold text-[var(--color-slate-400)]">
          {' '}
          اینجا زبان مزه دیگه ای میده 😉{' '}
        </p>
      </div>
    </div>
  );
}

export default Introduction;
