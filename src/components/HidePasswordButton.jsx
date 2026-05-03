import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';

function HidePasswordButton({ isPassHidden, onPassHidden }) {
  return (
    <div className="flex w-16 items-center justify-center gap-2 pl-2 pr-5 pt-1 text-slate-800">
      <span className="w-full cursor-pointer" onClick={onPassHidden}>
        {isPassHidden ? (
          <RxEyeClosed className="h-6 w-6 text-slate-800" />
        ) : (
          <RxEyeOpen className="h-6 w-6 text-slate-800" />
        )}
      </span>
    </div>
  );
}

export default HidePasswordButton;
