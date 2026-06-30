import { Link, useNavigate } from 'react-router';

import { useExit } from '../context/ExitContext';
import { useConfirmReserve } from '../features/reserve/ConfirmReserveContext';
import { usePay } from '../features/setting/PayContext';
//---

function Modal({
  name = '',
  isOpen = false,
  message = '',
  onClick = { confirm: () => {}, cancel: () => {} },
  path = { confirm: '', cancel: '' },
  text = { confirm: '', cancel: '' },
  type = 'default',
  backgroundColor = { confirm: 'bg-[var(--color-red-700)]', cancel: 'bg-[var(--color-slate-800)]' },
  hoverColor = {
    confirm: 'hover:bg-[var(--color-red-600)]',
    cancel: 'hover:bg-[var(--color-slate-900)]',
  },
  disabledStyles = { confirm: '', cancel: '' },
}) {
  //! React Router
  const navigate = useNavigate();

  //! Context Data
  const { hideExitWindow } = useExit();
  const { hideConfirmWindow } = useConfirmReserve();
  const { hidePayWindow } = usePay();

  //! JSX
  return (
    <div
      onClick={(e) => {
        if (!e.target.classList.contains('overlay')) return;
        hideExitWindow();
        hideConfirmWindow();
        hidePayWindow();
        if (name === 'payModal') navigate('/setting/user');
      }}
      className={`overlay fixed right-0 top-0 z-50 flex items-center justify-center bg-slate-800/20 backdrop-blur-sm transition-all duration-100 ${!isOpen ? 'h-0 w-0' : 'h-dvh w-full'}`}
    >
      <div
        className={`z-[60] w-[400px] flex-col items-center space-y-3 rounded-lg bg-slate-600/65 px-12 py-8 ${!isOpen ? 'hidden' : 'flex'}`}
      >
        <h2 className="text-center text-2xl font-semibold">{message}</h2>
        {type === 'default' && (
          <Link
            to={path.confirm}
            onClick={onClick.confirm}
            className={`w-full rounded-lg ${backgroundColor.confirm} p-3 text-center text-lg font-medium text-[var(--color-slate-100)] transition-all duration-300 ${hoverColor.confirm}`}
          >
            {text.confirm}
          </Link>
        )}
        {type === 'form' && (
          <button
            disabled={name === 'payModal'}
            type="submit"
            onClick={onClick.confirm}
            className={`w-full rounded-lg ${backgroundColor.confirm} p-3 text-center text-lg font-medium text-[var(--color-slate-100)] transition-all duration-300 disabled:cursor-not-allowed ${disabledStyles.confirm} ${hoverColor.confirm}`}
          >
            {text.confirm}
          </button>
        )}
        {name === 'payModal' ? (
          <button
            type="submit"
            onClick={onClick.cancel}
            className={`w-full rounded-lg ${backgroundColor.cancel} p-3 text-center text-lg font-medium text-[var(--color-slate-100)] transition-all duration-300 ${disabledStyles.cancel} ${hoverColor.cancel}`}
          >
            {text.cancel}
          </button>
        ) : (
          <Link
            to={path.cancel}
            onClick={onClick.cancel}
            className={`w-full rounded-lg ${backgroundColor.cancel} p-3 text-center text-lg font-medium text-[var(--color-slate-100)] transition-all duration-300 ${disabledStyles.cancel} ${hoverColor.cancel}`}
          >
            {text.cancel}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Modal;
