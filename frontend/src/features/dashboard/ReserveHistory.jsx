import ReserveRecord from '../reserve/ReserveRecord';
//---

function ReserveHistory({ className, userReservedRooms }) {
  return (
    <div className={className}>
      <h3 className="flex border-b border-[var(--color-slate-500)] pb-3 text-lg font-semibold text-[var(--color-slate-400)]">
        تاریخچه رزرو ها
      </h3>
      {userReservedRooms?.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {[...userReservedRooms].reverse().map((record, i) => (
            <li key={record.id}>
              <ReserveRecord
                number={i + 1}
                roomName={record.roomName}
                date={record.date}
                timePart={record.timePart}
                status={record.status}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex items-center justify-center p-2 text-xl text-[var(--color-slate-500)]">
          تاریخچه ای وجود ندارد
        </p>
      )}
    </div>
  );
}

export default ReserveHistory;
