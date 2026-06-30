function Success({ message }) {
  return (
    <div className="mt-4 flex flex-col items-center justify-center rounded-md bg-[var(--color-green-800)] p-3 text-[var(--color-green-100)]">
      <span>{message}</span>
    </div>
  );
}

export default Success;
