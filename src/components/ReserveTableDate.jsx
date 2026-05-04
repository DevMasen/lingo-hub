const publicStyles = 'rounded-xl border-b border-slate-800 transition-all duration-200';

//TODO USE USER DATA TO FIX THIS COMPONENT
function ReserveTableData({ timePartStatus, roomData, reserveDate }) {
  if (timePartStatus === null || timePartStatus?.at(1) === 'canceled')
    return (
      <td
        className={
          publicStyles + ' cursor-pointer text-transparent hover:bg-indigo-700 hover:text-slate-200'
        }
      >
        <span>رزرو</span>
      </td>
    );
  // if (timePartStatus?.at(0) === currentUser.id && timePartStatus?.at(1) === 'reserved')
  //   return (
  //     <td
  //       className={publicStyles + ' cursor-pointer bg-green-600 text-green-100 hover:bg-green-500'}
  //     >
  //       <span> رزرو شد ✅</span>
  //     </td>
  //   );
  // if (timePartStatus?.at(0) === currentUser.id && timePartStatus?.at(1) === 'waiting')
  //   return (
  //     <td
  //       className={
  //         publicStyles + ' cursor-pointer bg-yellow-600 text-yellow-100 hover:bg-yellow-500'
  //       }
  //     >
  //       <span> در انتظار پرداخت⏳ </span>
  //     </td>
  //   );
  // if (timePartStatus?.at(0) !== currentUser.id)
  //   return (
  //     <td className={publicStyles + ' cursor-not-allowed bg-red-600 text-red-100'}>
  //       <span>رزرو شده </span>
  //     </td>
  //   );
  if (timePartStatus === 'untouchable')
    return (
      <td className={publicStyles + ' cursor-not-allowed bg-gray-900 text-gray-400'}>
        <span> خارج از سرویس </span>
      </td>
    );
}

export default ReserveTableData;
