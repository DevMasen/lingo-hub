import { PiEmpty } from 'react-icons/pi';
//---

function ReserveNotFound({ children }) {
  //! Main JSX
  return (
    <p className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-slate-800)] py-8 text-xl text-[var(--color-slate-400)]">
      <span>{children}</span>
      <PiEmpty />
    </p>
  );
}

export default ReserveNotFound;
