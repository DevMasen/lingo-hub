import { useLoaderData, useSearchParams } from 'react-router';

import { getUser, updateUserReserveHistory } from '../../services/apiUsers';
import { getDate } from '../../services/apiDate';
import { getRooms, updateTimeLines } from '../../services/apiRooms';

import UserInfoHeader from './UserInfoHeader';
import UserParameterList from './UserParameterList';
import UserReserveList from './UserReserveList';

function UserInfo() {
  //! React Router
  const [query] = useSearchParams();
  const { user, date } = useLoaderData();

  //! JSX
  return (
    <div className="space-y-5 border-b border-slate-500 p-3">
      <UserInfoHeader user={user} />
      <section className="space-y-7 rounded-2xl bg-[linear-gradient(45deg,var(--color-indigo-900),var(--color-slate-800))] px-5 py-2">
        <UserParameterList user={user} date={date} query={query} />
        <UserReserveList user={user} date={date} query={query} />
      </section>
    </div>
  );
}

export async function loader({ params }) {
  const user = await getUser(params.userId);
  const date = await getDate();
  return { user, date };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const rooms = await getRooms();
  const user = await getUser(params.userId);

  const currentRoomTimeLines = rooms.find((room) => room.roomName === data.roomName)?.timeLines;
  const roomId = rooms.find((room) => room.roomName === data.roomName)?.id;

  const updatedRoom = {
    timeLines: Array.from({ length: currentRoomTimeLines.length }, (_, k) =>
      k === +data.timePartIndex ? [+params.userId, 'canceled'] : currentRoomTimeLines[k]
    ),
  };

  await updateTimeLines(roomId, updatedRoom);

  const updatedUser = {
    reservedRooms: Array.from({ length: user.reservedRooms.length }, (_, k) =>
      k + 1 === +data.recordId
        ? { ...user.reservedRooms[k], status: 'canceled' }
        : user.reservedRooms[k]
    ),
  };

  await updateUserReserveHistory(params.userId, updatedUser);

  return null;
}

export default UserInfo;
