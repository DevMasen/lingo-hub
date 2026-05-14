import { PiEmpty } from 'react-icons/pi';
/////////////////////////////////////////
function ReserveNotFound({ children }) {
  return (
    <p className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 py-8 text-xl text-slate-400">
      <span>{children}</span>
      <PiEmpty />
    </p>
  );
}

export default ReserveNotFound;
