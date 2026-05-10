import { redirect, useFetcher, useSearchParams } from 'react-router';
import { useConfirmReserve } from '../context/ConfirmReserveContext';
import Modal from '../ui/Modal';
import mapTime from '../utils/mapTime';
import makePersianNumberString from '../utils/makePersianNumbersString';
import { getRooms, updateTimeLines } from '../services/apiRooms';
import { getUser, updateUserReserveHistory } from '../services/apiUsers';

function ConfirmReserveModal({ date }) {
  const fetcher = useFetcher();
  const { isConfirmOpen, toggleConfirmWindow } = useConfirmReserve();
  const [query] = useSearchParams();

  const roomName = query.get('roomName') ?? '  ';
  const dateString = date;
  const timePartString =
    makePersianNumberString(mapTime(+query.get('timePart')).startTime) +
    ' تا ' +
    makePersianNumberString(mapTime(+query.get('timePart')).stopTime);

  const message =
    ' آیا از رزرو اتاق ' +
    roomName +
    ' برای تاریخ ' +
    dateString +
    ' و ساعت ' +
    timePartString +
    ' مطمئن هستید؟ ';

  return (
    <fetcher.Form method="PATCH">
      <Modal
        name="confirmReserveModal"
        isOpen={isConfirmOpen}
        message={message}
        onClick={{
          confirm: () => {
            toggleConfirmWindow();
          },
          cancel: toggleConfirmWindow,
        }}
        path={{ confirm: '', cancel: '' }}
        text={{ confirm: 'بله', cancel: 'خیر' }}
        type="form"
      />
      <input type="hidden" name="timePartIndex" value={+query.get('timePart')} />
      <input type="hidden" name="roomName" value={roomName} />
      <input type="hidden" name="date" value={date} />
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const rooms = await getRooms();
  const user = await getUser(params.userId);

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const currentRoomTimeLines = rooms.find((room) => room.roomName === data.roomName)?.timeLines;
  const currentRoomId = rooms.find((room) => room.roomName === data.roomName)?.id;

  const updatedRoom = {
    timeLines: Array.from({ length: 10 }, (_, i) =>
      i === +data.timePartIndex ? [+params.userId, 'waiting'] : currentRoomTimeLines.at(i)
    ),
  };

  const reserveRemainCount =
    user.reservedRooms.length === 0
      ? user.maxReserveCount
      : user.maxReserveCount -
        user.reservedRooms.reduce((acc, reserve) => {
          if (reserve.status !== 'canceled') return acc + 1;
          return acc;
        }, 0);

  if (reserveRemainCount === 0)
    return redirect(`/app/${params.userId}/setting/user?reserveCountLimit=true`);

  await updateTimeLines(currentRoomId, updatedRoom);
  const newReserve = {
    id: user.reservedRooms.length + 1,
    roomName: data.roomName,
    date: data.date.split('/').join(''),
    timePart: +data.timePartIndex,
    status: 'waiting',
  };
  const updatedUser = {
    reservedRooms: [...user.reservedRooms, newReserve],
  };
  await updateUserReserveHistory(params.userId, updatedUser);
  return null;
}

export default ConfirmReserveModal;
