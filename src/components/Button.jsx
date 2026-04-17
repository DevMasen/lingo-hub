function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-800 px-3 py-3"
    >
      {children}
    </button>
  );
}

export default Button;
