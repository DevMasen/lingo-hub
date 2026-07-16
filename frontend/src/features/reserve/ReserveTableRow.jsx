import { addDays, format } from 'date-fns';
import { useReservations } from './useReservations';
import ReserveTableData from './ReserveTableData';
import Modal from '../../ui/Modal';
import Skeleton from '../../ui/Skeleton';
import { timeParts } from '../../utils/timeParts';
//---

//! Global Const Variables
const tomorrow = addDays(new Date(), 1);
const tomorrowISOString = format(tomorrow, 'yyyy-MM-dd');

function ReserveTableRow({ userId, room }) {
  //! React Query
  const { reservations, isLoading, error } = useReservations(room.id, tomorrowISOString);

  //! Conditional JSX
  if (isLoading)
    return (
      <tr>
        <th className="bg-[var(--color-slate-800)] py-5">{room.roomName}</th>
        {timeParts.map((partIndex) => (
          <td key={partIndex}>
            <Skeleton className="h-14 w-[5.5rem]" />
          </td>
        ))}
      </tr>
    );
  if (error) return;

  //! Main JSX
  return (
    <tr>
      <th className="bg-[var(--color-slate-800)] py-5">{room.roomName}</th>
      {timeParts.map((partIndex) => (
        <Modal.Open opens={'reservation'} key={partIndex}>
          <ReserveTableData
            timePartIndex={partIndex}
            userId={userId}
            reservations={reservations}
            roomName={room.roomName}
            roomId={room.id}
          />
        </Modal.Open>
      ))}
    </tr>
  );
}

export default ReserveTableRow;
