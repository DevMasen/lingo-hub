import PanelButton from './PanelButton';

const sectionPartsStyles = 'bg-slate-800 rounded-lg border border-slate-500 p-3';

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
            className={`${sectionPartsStyles} grid max-h-[15rem] min-h-[12rem] grid-cols-1 grid-rows-[auto_1fr] space-y-4 overflow-auto`}
          >
            <h3 className="flex border-b border-slate-500 pb-3 text-lg font-semibold text-slate-400">
              تاریخچه رزرو ها
            </h3>
            {false ? (
              <ul className="flex flex-col gap-3">
                <li className="flex justify-between rounded-lg bg-slate-700 p-3">
                  <div className="flex gap-8">
                    <span>
                      <span>1</span>
                      <span>.</span>
                    </span>
                    <span className="flex gap-1">
                      <span>اتاق</span>
                      <span>101</span>
                    </span>
                    <span className="flex gap-1">
                      <span>30</span>
                      <span>فروردین</span>
                      <span>1405</span>
                    </span>
                    <span className="flex gap-2">
                      <span>
                        <span>7</span>:<span>00</span>
                      </span>
                      <span>تا</span>
                      <span>
                        <span>8</span>:<span>30</span>
                      </span>
                    </span>
                  </div>
                  <span> لغو شد ❌ </span>
                </li>
                <li className="flex justify-between rounded-lg bg-slate-700 p-3">
                  <div className="flex gap-8">
                    <span>
                      <span>2</span>
                      <span>.</span>
                    </span>
                    <span className="flex gap-1">
                      <span>اتاق</span>
                      <span>102</span>
                    </span>
                    <span className="flex gap-1">
                      <span>31</span>
                      <span>فروردین</span>
                      <span>1405</span>
                    </span>
                    <span className="flex gap-2">
                      <span>
                        <span>8</span>:<span>30</span>
                      </span>
                      <span>تا</span>
                      <span>
                        <span>10</span>:<span>00</span>
                      </span>
                    </span>
                  </div>
                  <span> رزرو شد ✅ </span>
                </li>
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
            className={`${sectionPartsStyles} grid max-h-[15rem] min-h-[12rem] grid-cols-1 grid-rows-[auto_1fr] space-y-4 overflow-auto`}
          >
            <h3 className="border-b border-slate-500 pb-3 text-lg font-semibold text-slate-400">
              اخبار
            </h3>
            <p className="flex items-center justify-center p-2 text-xl text-slate-500">
              خبری وجود ندارد
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
