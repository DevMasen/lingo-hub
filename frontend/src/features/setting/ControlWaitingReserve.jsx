import ReservePrice from '../reserve/ReservePrice';
import PanelButton from '../../ui/PanelButton';

import { usePay } from './PayContext';
//---

function ControlWaitingReserve({ record }) {
  //! Context Data
  const { togglePayWindow } = usePay();

  //! fake Data
  const roomsData = [];
  const paymentCost =
    roomsData.find((room) => {
      return room.roomName === record.roomName;
    })?.reservePricePerHalfHour * 3 || 0;

  //! JSX
  return (
    <>
      <ReservePrice record={record} />
      <PanelButton
        to={`pay?cost=${paymentCost}&recordId=${record.id}&roomName=${record.roomName}&timePartIndex=${record.timePart}`}
        onClick={togglePayWindow}
        extraClasses="text-sm px-5"
      >
        پرداخت
      </PanelButton>

      {/* TODO : make a real form with react hook form */}
      <form method="PATCH">
        <PanelButton
          type="submit"
          extraClasses="text-sm bg-[var(--color-red-800)] border-red-300 hover:bg-[var(--color-red-700)] px-5 w-full h-full"
        >
          لغو
        </PanelButton>
        <input type="hidden" name="recordId" value={record.id} />
        <input type="hidden" name="roomName" value={record.roomName} />
        <input type="hidden" name="timePartIndex" value={record.timePart} />
      </form>
    </>
  );
}

export default ControlWaitingReserve;
