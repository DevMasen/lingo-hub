import { moneyFormat } from 'num2persian';
import OpenConfirmButton from './OpenConfirmButton';
import ConfirmPayment from './ConfirmPayment';
import ConfirmCancel from './ConfirmCancel';
import Modal from '../../ui/Modal';
//---

function ReserveSubmit({ reservation, roomId, rooms }) {
  //! Derived States
  const currentRoomCost = rooms?.find((room) => room.id === roomId)?.reservePricePerHalfHour * 3;

  //! Main JSX
  return (
    <Modal>
      <div className="flex items-center justify-between gap-3 px-4">
        <div className="whitespace-nowrap rounded-xl bg-[var(--color-slate-700)] px-3 py-2 text-sm sm:text-base">
          <span>{moneyFormat(currentRoomCost)}</span>
          <span> تومان </span>
        </div>
        <div className="flex gap-2">
          <Modal.Open opens={'confirm-payment'}>
            <OpenConfirmButton className="px-3 py-2 text-sm text-slate-200 sm:text-base">
              پرداخت
            </OpenConfirmButton>
          </Modal.Open>

          <Modal.Open opens={'confirm-cancel'}>
            <OpenConfirmButton className="bg-[var(--color-red-800)] px-3 py-2 text-sm text-red-100 hover:bg-[var(--color-red-700)] sm:text-base">
              لغو
            </OpenConfirmButton>
          </Modal.Open>
        </div>
      </div>
      <Modal.Window name={'confirm-payment'}>
        <ConfirmPayment reservation={reservation} rooms={rooms} />
      </Modal.Window>
      <Modal.Window name={'confirm-cancel'}>
        <ConfirmCancel reservationId={reservation?.id} />
      </Modal.Window>
    </Modal>
  );
}

export default ReserveSubmit;
