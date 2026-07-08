function SettingButton({ children, onClick, onOpenModal }) {
  return (
    <button
      onClick={() => {
        onOpenModal?.();
        onClick?.();
      }}
      className="h-fit w-fit cursor-pointer rounded-lg p-2 transition-all duration-300 hover:bg-[var(--color-slate-800)] hover:text-[var(--color-indigo-700)]"
    >
      {children}
    </button>
  );
}

export default SettingButton;
