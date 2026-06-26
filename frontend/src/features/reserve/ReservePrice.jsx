function ReservePrice({ record }) {
  //! Fake Data : TODO : replace it with real data
  const roomsData = [];

  //! JSX
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-slate-700 px-3 text-sm">
      <span>
        {new Intl.NumberFormat('fa-IR').format(
          roomsData.find((room) => {
            return room.roomName === record.roomName?.reservePricePerHalfHour * 3 ?? 0;
          })
        )}
      </span>
      <span>تومان</span>
    </div>
  );
}

export default ReservePrice;
