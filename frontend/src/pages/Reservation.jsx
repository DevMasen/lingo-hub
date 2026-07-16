import { Outlet } from 'react-router';
import TabNavigation from '../ui/TabNavigation';
//---

//! Global Const Variables
const tabs = [
  { route: '/reserve/reserve-room', routeName: 'رزرو اتاق' },
  { route: '/reserve/my-reservations', routeName: 'رزرو های من' },
];

function Reservation() {
  //! Main JSX
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] border-b border-[var(--color-slate-500)]">
      <TabNavigation tabs={tabs} />
      <Outlet />
    </div>
  );
}

export default Reservation;
