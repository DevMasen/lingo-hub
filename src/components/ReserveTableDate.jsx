// import { useAuth } from '../context/AuthContext';

const publicStyles = 'rounded-xl border-b border-slate-800 transition-all duration-200';

function ReserveTableData({ timePartStatus, roomData, reserveDate }) {
  // const { currentUser } = useAuth();

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
  if (false)
    //TODO CONDITION

    return (
      <td
        className={publicStyles + ' cursor-pointer bg-green-600 text-green-100 hover:bg-green-500'}
      >
        <span> رزرو شد ✅</span>
      </td>
    );
  if (false)
    //TODO CONDITION

    return (
      <td
        className={
          publicStyles + ' cursor-pointer bg-yellow-600 text-yellow-100 hover:bg-yellow-500'
        }
      >
        <span> در انتظار پرداخت⏳ </span>
      </td>
    );
  if (false)
    //TODO CONDITION)
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
