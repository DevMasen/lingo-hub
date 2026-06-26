import { useSearchParams } from 'react-router';

import { usePay } from '../../context/PayContext';

import Modal from '../../ui/Modal';
//---

function PayModal() {
  //! React Router
  const [query] = useSearchParams();

  //! Context Data
  const { isPayOpen, togglePayWindow } = usePay();

  //! JSX
  return (
    <form method="PATCH">
      <Modal
        name="payModal"
        type="form"
        isOpen={isPayOpen}
        message={`هزینه رزرو اتاق برای ۹۰ دقیقه : ${new Intl.NumberFormat('fa-IR').format(
          query.get('cost')
        )} تومان`}
        onClick={{ cancel: togglePayWindow }}
        text={{ confirm: 'پرداخت آنلاین', cancel: 'پرداخت با کیف پول' }}
        backgroundColor={{ confirm: 'bg-green-600', cancel: 'bg-slate-800' }}
        hoverColor={{ confirm: 'hover:bg-green-500', cancel: 'hover:bg-slate-900' }}
        disabledStyles={{
          confirm: 'disabled:bg-green-500 disabled:hover:bg-green-500 disabled:opacity-70',
        }}
      />
      <input type="hidden" name="cost" value={query.get('cost')} />
      <input type="hidden" name="recordId" value={query.get('recordId')} />
      <input type="hidden" name="roomName" value={query.get('roomName')} />
      <input type="hidden" name="timePartIndex" value={query.get('timePartIndex')} />
    </form>
  );
}

// export async function action({ request, params }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   const user = await getUser(params.userId);
//   const rooms = await getRooms();
//   const userBalance = user.creditBalance;
//   const newBalance = {
//     creditBalance: userBalance - +data.cost,
//   };
//   const updatedUser = {
//     reservedRooms: Array.from({ length: user.reservedRooms.length }, (_, k) =>
//       k + 1 === +data.recordId
//         ? { ...user.reservedRooms[k], status: 'reserved' }
//         : user.reservedRooms[k]
//     ),
//   };
//   const currentRoomTimeLines = rooms.find((room) => room.roomName === data.roomName)?.timeLines;
//   const roomId = rooms.find((room) => room.roomName === data.roomName)?.id;
//   const updatedRoom = {
//     timeLines: Array.from({ length: currentRoomTimeLines.length }, (_, k) =>
//       k === +data.timePartIndex ? [+params.userId, 'reserved'] : currentRoomTimeLines[k]
//     ),
//   };

//   if (userBalance >= +data.cost) {
//     await updateBalance(params.userId, newBalance);
//     await updateUserReserveHistory(params.userId, updatedUser);
//     await updateTimeLines(roomId, updatedRoom);
//   }

//   const status = userBalance - +data.cost >= 0 ? 'success' : 'failed';
//   return redirect(`/app/${params.userId}/status?status=${status}`);
// }

export default PayModal;
