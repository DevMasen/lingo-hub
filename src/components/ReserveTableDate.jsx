const publicStyles = 'rounded-xl border-b border-slate-800 transition-all duration-200';

function ReserveTableData({ timePartStatus, roomData, reserveDate, currentUser }) {
  console.log(currentUser);
  function someReservedCallback(reserve) {
    if (
      reserve.date === reserveDate &&
      reserve.roomName === roomData.roomName &&
      reserve.status === 'reserved'
    )
      return true;
    return false;
  }

  function someWaitingCallback(reserve) {
    if (
      reserve.date === reserveDate &&
      reserve.roomName === roomData.roomName &&
      reserve.status === 'waiting'
    )
      return true;
    return false;
  }

  if (timePartStatus === null)
    return (
      <td
        className={
          publicStyles + ' cursor-pointer text-transparent hover:bg-indigo-700 hover:text-slate-200'
        }
      >
        <span>رزرو</span>
      </td>
    );
  if (
    timePartStatus === currentUser.id &&
    currentUser.reservedRooms.some((reserve) => someReservedCallback(reserve))
  )
    return (
      <td
        className={publicStyles + ' cursor-pointer bg-green-600 text-green-100 hover:bg-green-500'}
      >
        <span> رزرو شد ✅</span>
      </td>
    );
  if (
    timePartStatus === currentUser.id &&
    currentUser.reservedRooms.some((reserve) => someWaitingCallback(reserve))
  )
    return (
      <td
        className={
          publicStyles + ' cursor-pointer bg-yellow-600 text-yellow-100 hover:bg-yellow-500'
        }
      >
        <span> در انتظار پرداخت⏳ </span>
      </td>
    );
  if (typeof timePartStatus === 'number' && timePartStatus !== currentUser.id)
    return (
      <td className={publicStyles + ' cursor-not-allowed bg-red-600 text-red-100'}>
        <span>رزرو شده </span>
      </td>
    );
  if (timePartStatus === 'untouchable')
    return (
      <td className={publicStyles + ' cursor-not-allowed bg-gray-900 text-gray-400'}>
        <span> خارج از سرویس </span>
      </td>
    );
}

export default ReserveTableData;

// className={`${part === null ? 'cursor-pointer hover:bg-indigo-700' : part === currentUser.id && currentUser.reservedRooms.some((reserve) => reserve.roomName === rooms[0].roomName && reserve.date === date[0].reserveDate) && currentUser.reservedRooms.some((reserve) => reserve.roomName === rooms[0].roomName && reserve.status === 'reserved') ? 'bg-green-700' : part === currentUser.id && currentUser.reservedRooms.some((reserve) => reserve.roomName === rooms[0].roomName && reserve.date === date[0].reserveDate) && currentUser.reservedRooms.some((reserve) => reserve.roomName === rooms[0].roomName && reserve.status === 'waiting') ? 'cursor-pointer bg-yellow-600' : 'cursor-not-allowed bg-red-700 hover:bg-red-600'}`}
