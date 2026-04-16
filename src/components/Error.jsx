function Error({ error }) {
  return (
    error.length !== 0 && (
      <div className="mt-4 flex items-center justify-center rounded-md bg-red-900 p-3 text-red-100">
        خطا! : {error}
      </div>
    )
  );
}

export default Error;
