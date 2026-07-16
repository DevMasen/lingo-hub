import { BiSolidPencil } from 'react-icons/bi';
import SettingButton from './SettingButton';
//---

function UserParameter({ children }) {
  return children;
}
function Label({ children }) {
  return <div>{children}</div>;
}
function Value({ children, bgColor = 'bg-[var(--color-slate-700)]' }) {
  return (
    <span
      className={`rounded-xl px-4 py-2 text-sm transition-colors duration-200 sm:text-base ${bgColor}`}
    >
      {children}
    </span>
  );
}
function UpdateButton({ onClick }) {
  return (
    <SettingButton onClick={onClick}>
      <BiSolidPencil className="h-4 w-4" />
    </SettingButton>
  );
}
UserParameter.Label = Label;
UserParameter.Value = Value;
UserParameter.UpdateButton = UpdateButton;

export default UserParameter;
