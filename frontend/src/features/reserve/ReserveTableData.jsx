import { useNavigate } from 'react-router';

import { useConfirmReserve } from '../../context/ConfirmReserveContext';
//---

//! Global Styles
const publicStyles = 'rounded-xl border-b border-slate-800 transition-all duration-200';

function ReserveTableData({ timePartIndex, timePartStatus, roomData, reserveDate, userId }) {
  //! React Router
  const navigate = useNavigate();

  //! Context Data
  const { toggleConfirmWindow } = useConfirmReserve();

  //! Handlers
  function handleClickReserved() {
    const query = `?roomName=${roomData.roomName}&timePart=${timePartIndex}&status=${timePartStatus?.at(1)}`;
    navigate(`/app/${userId}/setting/user${query}`);
  }

  //! JSX
  if (timePartStatus === null || timePartStatus?.at(1) === 'canceled')
    return (
      <td
        onClick={() => {
          toggleConfirmWindow();
          navigate(
            `/app/${userId}/reserve?roomName=${roomData.roomName}&timePart=${timePartIndex}`
          );
        }}
        className={
          publicStyles + ' cursor-pointer text-transparent hover:bg-indigo-700 hover:text-slate-200'
        }
      >
        <span>رزرو</span>
      </td>
    );
  if (timePartStatus?.at(0) === userId && timePartStatus?.at(1) === 'reserved')
    return (
      <td
        onClick={handleClickReserved}
        className={publicStyles + ' cursor-pointer bg-green-600 text-green-100 hover:bg-green-500'}
      >
        <span> رزرو شد ✅</span>
      </td>
    );
  if (timePartStatus?.at(0) === userId && timePartStatus?.at(1) === 'waiting')
    return (
      <td
        onClick={handleClickReserved}
        className={
          publicStyles + ' cursor-pointer bg-yellow-600 text-yellow-100 hover:bg-yellow-500'
        }
      >
        <span> در انتظار پرداخت⏳ </span>
      </td>
    );
  if (timePartStatus === 'untouchable')
    return (
      <td className={publicStyles + ' cursor-not-allowed bg-gray-900 text-gray-400'}>
        <span> خارج از سرویس </span>
      </td>
    );
  return (
    <td className={publicStyles + ' cursor-not-allowed bg-red-600 text-red-100'}>
      <span> رزرو شده </span>
    </td>
  );
}

export default ReserveTableData;
