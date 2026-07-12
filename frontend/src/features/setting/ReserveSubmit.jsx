import { moneyFormat } from 'num2persian';
import PanelButton from '../../ui/PanelButton';
import { useRooms } from '../reserve/useRooms';

function ReserveSubmit({ reservationId, roomId, rooms }) {
  const currentRoomCost = rooms?.find((room) => room.id === roomId)?.reservePricePerHalfHour * 3;
  return (
    <div className="flex items-center gap-3">
      <div className="whitespace-nowrap rounded-xl bg-[var(--color-slate-700)] px-3 py-2 text-sm sm:text-base">
        <span>{moneyFormat(currentRoomCost)}</span>
        <span> تومان </span>
      </div>
      <PanelButton extraClasses="px-3 py-2 text-sm sm:text-base"> پرداخت </PanelButton>
      <PanelButton extraClasses="px-3 py-2 text-sm sm:text-base bg-[var(--color-red-800)] hover:bg-[var(--color-red-700)]">
        لغو
      </PanelButton>
    </div>
  );
}

export default ReserveSubmit;
