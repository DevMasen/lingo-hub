function FullPage({ children }) {
  return (
    <div className="flex h-dvh items-center justify-center bg-[var(--color-slate-800)]">
      {children}
    </div>
  );
}

export default FullPage;
