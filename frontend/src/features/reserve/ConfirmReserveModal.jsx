import { useSearchParams } from 'react-router';

// import { useConfirmReserve } from './ConfirmReserveContext';

// import makePersianNumberString from '../../utils/makePersianNumbersString';
// import mapTime from '../../utils/mapTime';
//---

function ConfirmReserveModal({ date }) {
  //! React Router
  const [query] = useSearchParams();

  //! Context Data
  // const { isConfirmOpen, toggleConfirmWindow } = useConfirmReserve();

  //! Derived States
  const roomName = query.get('roomName') ?? '  ';
  // const dateString = date;
  // const timePartString =
  //   makePersianNumberString(mapTime(+query.get('timePart')).startTime) +
  //   ' تا ' +
  //   makePersianNumberString(mapTime(+query.get('timePart')).stopTime);
  // const message =
  //   ' آیا از رزرو اتاق ' +
  //   roomName +
  //   ' برای تاریخ ' +
  //   dateString +
  //   ' و ساعت ' +
  //   timePartString +
  //   ' مطمئن هستید؟ ';

  //! JSX
  return (
    <form method="PATCH">
      <input type="hidden" name="timePartIndex" value={+query.get('timePart')} />
      <input type="hidden" name="roomName" value={roomName} />
      <input type="hidden" name="date" value={date} />
    </form>
  );
}

export default ConfirmReserveModal;
