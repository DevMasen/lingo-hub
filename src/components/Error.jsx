function Error({ error }) {
  return (
    <div className="mt-4 flex items-center justify-center rounded-md bg-red-800 p-3 text-red-100">
      خطا! : {error}
    </div>
  );
}

export default Error;
