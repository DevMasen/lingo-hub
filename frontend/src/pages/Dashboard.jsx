import DashboardHeader from '../features/dashboard/DashboardHeader';
import Introduction from '../features/dashboard/Introduction';
import ReserveHistory from '../features/dashboard/ReserveHistory';
import News from '../features/dashboard/News';
//---

//! Global Const Variables
const sectionPartsStyles =
  'bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))] rounded-lg border border-[var(--color-slate-500)] p-3';

function Dashboard() {
  //! Main JSX
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr]">
      <DashboardHeader />
      <section className="grid grid-cols-1 grid-rows-[auto_1fr] gap-4 p-4 lg:grid-cols-[2fr_1fr]">
        <Introduction className={sectionPartsStyles} />
        <div>
          <ReserveHistory
            className={`${sectionPartsStyles} scrollbar grid max-h-[20rem] min-h-[12rem] grid-cols-1 grid-rows-[auto_1fr] space-y-4 overflow-auto`}
          />
        </div>
        <div>
          <News
            className={`${sectionPartsStyles} scrollbar grid max-h-[20rem] min-h-[12rem] grid-cols-1 grid-rows-[auto_1fr] space-y-4 overflow-auto`}
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
