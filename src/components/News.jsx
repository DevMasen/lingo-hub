//TODO make a real database for this
function News({ className }) {
  return (
    <div className={className}>
      <h3 className="border-b border-slate-500 pb-3 text-lg font-semibold text-slate-400">اخبار</h3>
      {false ? (
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
  );
}

export default News;
