function Button({ children, src }) {
  return (
    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-slate-800 px-3 py-3">
      <img src={src} className="w-6" alt="!" />

      <div className="text-lg font-medium">
        <span> {children} </span>
      </div>
    </button>
  );
}

export default Button;
