import DashboardHeader from '../features/dashboard/DashboardHeader';
import Introduction from '../features/dashboard/Introduction';
import ReserveHistory from '../features/dashboard/ReserveHistory';
import News from '../features/dashboard/News';
//---

//! Global Styles
const sectionPartsStyles =
  'bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))] rounded-lg border border-[var(--color-slate-500)] p-3';

function Dashboard() {
  //TODO : replace with real data
  //! Fake Data
  const news = [];
  const userReservedRooms = [];
  const userFirstName = 'محمدحسین';

  //! JSX
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr]">
      <DashboardHeader />
      <section className="grid grid-cols-1 grid-rows-[auto_1fr] gap-4 p-4 lg:grid-cols-[2fr_1fr]">
        <Introduction
          className={`${sectionPartsStyles} flex flex-col items-center gap-6 md:flex-row md:pl-9 lg:col-span-2`}
          userFirstName={userFirstName}
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
