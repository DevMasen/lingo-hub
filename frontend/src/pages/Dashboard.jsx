import DashboardHeader from '../features/dashboard/DashboardHeader';
import Introduction from '../features/dashboard/Introduction';
import ReserveHistory from '../features/dashboard/ReserveHistory';
import News from '../features/dashboard/News';
//---

//! Global Styles
const sectionPartsStyles =
  'bg-[linear-gradient(45deg,var(--color-slate-800),var(--color-indigo-900))] rounded-lg border border-slate-500 p-3';

function Dashboard() {
  //TODO : replace with real data
  //! Fake Data
  const news = [];
  const userReservedRooms = [];

  //! JSX
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr]">
      <DashboardHeader />
      <section className="grid grid-cols-[2fr_1fr] grid-rows-[auto_1fr] gap-4 p-4">
        <Introduction
          className={`${sectionPartsStyles} col-span-2 flex items-center gap-6 pl-9`}
          userFirstName={'<User FirstName>'}
        />
        <div>
          <ReserveHistory
            className={`${sectionPartsStyles} grid max-h-[20rem] min-h-[5rem] grid-cols-1 grid-rows-[auto_1fr] space-y-4 overflow-auto`}
            userReservedRooms={userReservedRooms}
          />
        </div>
        <div>
          <News
            news={news}
            className={`${sectionPartsStyles} grid max-h-[20rem] min-h-[12rem] grid-cols-1 grid-rows-[auto_1fr] space-y-4 overflow-auto`}
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
