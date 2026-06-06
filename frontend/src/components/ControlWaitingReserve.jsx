import ReservePrice from './ReservePrice';
import PanelButton from './PanelButton';

import { usePay } from '../context/PayContext';

function ControlWaitingReserve({ record, fetcher }) {
  //! Context Data
  const { togglePayWindow } = usePay();

  //! JSX
  return (
    <>
      <ReservePrice fetcher={fetcher} record={record} />
      <PanelButton
        to={`pay?cost=${
          fetcher.data?.rooms.find((room) => room.roomName === record.roomName)
            .reservePricePerHalfHour * 3
        }&recordId=${record.id}&roomName=${record.roomName}&timePartIndex=${record.timePart}`}
        onClick={togglePayWindow}
        extraClasses="text-sm px-5"
      >
        پرداخت
      </PanelButton>

      <fetcher.Form method="PATCH">
        <PanelButton
          type="submit"
          extraClasses="text-sm bg-red-800 border-red-300 hover:bg-red-700 px-5 w-full h-full"
        >
          لغو
        </PanelButton>
        <input type="hidden" name="recordId" value={record.id} />
        <input type="hidden" name="roomName" value={record.roomName} />
        <input type="hidden" name="timePartIndex" value={record.timePart} />
      </fetcher.Form>
    </>
  );
}

export default ControlWaitingReserve;
