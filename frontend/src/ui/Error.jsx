function Error({ error = '', className = '' }) {
  //! Main JSX
  return (
    <div
      className={`${className} flex flex-col items-center justify-center rounded-md bg-[var(--color-red-800)] p-3 text-center text-sm text-[var(--color-red-100)] sm:text-lg`}
    >
      <span>خطا : {error}</span>
    </div>
  );
}

export default Error;
