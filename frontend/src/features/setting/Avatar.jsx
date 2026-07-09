function Avatar({ children }) {
  return (
    <div className="flex h-fit w-fit items-center justify-center overflow-hidden rounded-full border-2 border-indigo-700 bg-[var(--color-slate-800)]">
      {children}
    </div>
  );
}

export default Avatar;
