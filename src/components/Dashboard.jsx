import PanelButton from './PanelButton';
import ReserveRecord from './ReserveRecord';

const sectionPartsStyles =
  'bg-[linear-gradient(45deg,var(--color-slate-800),var(--color-indigo-900))] rounded-lg border border-slate-500 p-3';

function Dashboard() {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr]">
      <header className="flex items-center justify-between border-b border-slate-500 bg-slate-800 p-4">
        <span className="text-xl"> داشبورد </span>
        <PanelButton to={'/app/rooms'} extraClasses="px-4 py-2">
          رزرو اتاق
        </PanelButton>
      </header>
      <section className="grid grid-cols-[2fr_1fr] grid-rows-[auto_1fr] gap-4 p-4">
        <div className={`${sectionPartsStyles} col-span-2 flex items-center justify-between pl-9`}>
          <div className="space-y-3">
            <h2 className="text-slate-400"> آکادمی زبان لینگوهاب </h2>
            <p className="text-lg font-semibold"> اینجا زبان مزه دیگه ای میده 😉 </p>
          </div>
          <img src="/icon.png" className="w-16" alt="logo" />
        </div>
        <div>
          <div
            className={`${sectionPartsStyles} grid min-h-[5rem] grid-cols-1 grid-rows-[auto_1fr] space-y-4 overflow-auto`}
          >
            <h3 className="flex border-b border-slate-500 pb-3 text-lg font-semibold text-slate-400">
              تاریخچه رزرو ها
            </h3>
            {true ? (
              <ul className="flex flex-col gap-3">
                <ReserveRecord number={1} roomName="100" timePart={0} status="waiting" />
              </ul>
            ) : (
              <p className="flex items-center justify-center p-2 text-xl text-slate-500">
                تاریخچه ای وجود ندارد
              </p>
            )}
          </div>
        </div>
        <div>
          <div
            className={`${sectionPartsStyles} grid min-h-[12rem] grid-cols-1 grid-rows-[auto_1fr] space-y-4 overflow-auto`}
          >
            <h3 className="border-b border-slate-500 pb-3 text-lg font-semibold text-slate-400">
              اخبار
            </h3>
            {true ? (
              <ul className="space-y-3">
                <li className="flex flex-col gap-2 rounded-lg bg-slate-700 bg-opacity-70 p-3">
                  <h4 className="font-semibold">تیتر خبر</h4>
                  <p className="pr-2 text-slate-300">متن خبر</p>
                  <div className="flex justify-between border-t border-indigo-200 pt-2 text-sm text-indigo-200">
                    <div>
                      <span>۹</span>:<span>۴۸</span>
                    </div>
                    <div className="flex gap-1">
                      <span>۳۱</span>
                      <span>فروردین</span>
                      <span>۱۴۰۵</span>
                    </div>
                  </div>
                </li>
              </ul>
            ) : (
              <p className="flex items-center justify-center p-2 text-xl text-slate-500">
                خبری وجود ندارد
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
