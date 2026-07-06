function Error({ error = '', extraClasses = '' }) {
  //! JSX
  return (
    <div
      className={`${extraClasses} flex flex-col items-center justify-center rounded-md bg-red-800 p-3 text-center text-sm text-red-100 sm:text-lg`}
    >
      <span>خطا : {error}</span>
    </div>
  );
}

export default Error;
