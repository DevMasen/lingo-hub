import { useSearchParams } from 'react-router';
//---
//! Global Styles
const publicStyles =
  'text-slate-200  border-b border-[var(--color-slate-800)] transition-all duration-200';

function ReserveTableData({ timePartIndex, userId, roomId, roomName, reservations, onOpenModal }) {
  const [, setSearchParams] = useSearchParams();

  const tableDataStatus = reservations?.find((res) => res.timePart === timePartIndex)?.status;
  const tableDataUserId = reservations?.find((res) => res.timePart === timePartIndex)?.userId;

  //! Handlers
  function handleClickReserved() {}

  //! JSX
  if (
    tableDataStatus === undefined ||
    tableDataUserId === undefined ||
    tableDataStatus === 'canceled'
  )
    return (
      <td
        onClick={() => {
          setSearchParams({ roomId, roomName, timePart: timePartIndex });
          onOpenModal?.();
        }}
        className={
          publicStyles +
          ' cursor-pointer text-transparent hover:bg-[var(--color-indigo-700)] hover:text-slate-200'
        }
      >
        <span>رزرو</span>
      </td>
    );
  if (tableDataUserId === userId && tableDataStatus === 'reserved')
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
  if (tableDataUserId === userId && tableDataStatus === 'waiting')
    return (
      <td
        onClick={handleClickReserved}
        className={publicStyles + ' cursor-pointer bg-cyan-600 text-slate-200 hover:bg-cyan-500'}
      >
        <span> در انتظار پرداخت⏳ </span>
      </td>
    );
  if (tableDataUserId === null && tableDataStatus === 'out_of_service')
    return (
      <td className={publicStyles + ' cursor-not-allowed bg-slate-900 text-slate-500'}>
        <span> خارج از سرویس </span>
      </td>
    );
  return (
    <td className={publicStyles + ' cursor-not-allowed bg-rose-600 text-[var(--color-red-100)]'}>
      <span> رزرو شده </span>
    </td>
  );
}

export default ReserveTableData;
