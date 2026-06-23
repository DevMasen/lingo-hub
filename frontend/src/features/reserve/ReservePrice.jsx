function ReservePrice({ fetcher, record }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-slate-700 px-3 text-sm">
      <span>
        {new Intl.NumberFormat('fa-IR').format(
          fetcher.data?.rooms.find((room) => room.roomName === record.roomName)
            .reservePricePerHalfHour * 3
        )}
      </span>
      <span>تومان</span>
    </div>
  );
}

export default ReservePrice;
