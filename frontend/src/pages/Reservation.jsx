import { Outlet } from 'react-router';
import TabNavigation from '../ui/TabNavigation';
//---

function Reservation() {
  const tabs = [
    { route: '/reserve/reserve-room', routeName: 'رزرو اتاق' },
    { route: '/reserve/my-reservations', routeName: 'رزرو های من' },
  ];
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] border-b border-[var(--color-slate-500)]">
      <TabNavigation tabs={tabs} />
      <Outlet />
    </div>
  );
}

export default Reservation;
