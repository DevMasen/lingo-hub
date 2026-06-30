import { useNavigate } from 'react-router';

import { useConfirmReserve } from './ConfirmReserveContext';
//---

//! Global Styles
const publicStyles =
  'rounded-xl border-b border-[var(--color-slate-800)] transition-all duration-200';

function ReserveTableData({ timePartIndex, timePartStatus, roomData, reserveDate, userId }) {
  //! React Router
  const navigate = useNavigate();

  //! Context Data
  const { toggleConfirmWindow } = useConfirmReserve();

  //! Handlers
  function handleClickReserved() {
    const query = `?roomName=${roomData.roomName}&timePart=${timePartIndex}&status=${timePartStatus?.at(1)}`;
    navigate(`/setting/user${query}`);
  }

  //! JSX
  if (timePartStatus === null || timePartStatus?.at(1) === 'canceled')
    return (
      <td
        onClick={() => {
          toggleConfirmWindow();
          navigate(`/reserve?roomName=${roomData.roomName}&timePart=${timePartIndex}`);
        }}
        className={
          publicStyles +
          ' cursor-pointer text-transparent hover:bg-[var(--color-indigo-700)] hover:text-[var(--color-slate-200)]'
        }
      >
        <span>رزرو</span>
      </td>
    );
  if (timePartStatus?.at(0) === userId && timePartStatus?.at(1) === 'reserved')
    return (
      <td
        onClick={handleClickReserved}
        className={
          publicStyles +
          ' cursor-pointer bg-[var(--color-green-600)] text-[var(--color-green-100)] hover:bg-[var(--color-green-500)]'
        }
      >
        <span> رزرو شد ✅</span>
      </td>
    );
  if (timePartStatus?.at(0) === userId && timePartStatus?.at(1) === 'waiting')
    return (
      <td
        onClick={handleClickReserved}
        className={
          publicStyles +
          ' cursor-pointer bg-[var(--color-yellow-600)] text-[var(--color-yellow-100)] hover:bg-[var(--color-yellow-500)]'
        }
      >
        <span> در انتظار پرداخت⏳ </span>
      </td>
    );
  if (timePartStatus === 'untouchable')
    return (
      <td
        className={
          publicStyles +
          ' cursor-not-allowed bg-[var(--color-gray-900)] text-[var(--color-gray-400)]'
        }
      >
        <span> خارج از سرویس </span>
      </td>
    );
  return (
    <td
      className={
        publicStyles + ' cursor-not-allowed bg-[var(--color-red-600)] text-[var(--color-red-100)]'
      }
    >
      <span> رزرو شده </span>
    </td>
  );
}

export default ReserveTableData;
