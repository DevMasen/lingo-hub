function FullPage({ children }) {
  return (
    <div className="fixed left-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-[var(--color-slate-800)] opacity-75 backdrop:blur-2xl">
      {children}
    </div>
  );
}

export default FullPage;
