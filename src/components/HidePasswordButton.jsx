function HidePasswordButton({ isPassHidden, onPassHidden }) {
  return (
    <div className="flex w-16 items-center justify-center gap-2 pl-2 pr-5 pt-1 text-slate-800">
      <span className="w-full cursor-pointer" onClick={onPassHidden}>
        <img className="w-full" src={isPassHidden ? '/hide.svg' : '/unhide.svg'} alt="!" />
      </span>
    </div>
  );
}

export default HidePasswordButton;
