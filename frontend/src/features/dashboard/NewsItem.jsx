import mapToPersianMonth from '../../utils/mapToPersianMonth';
//---

function NewsItem({ newsItem }) {
  return (
    <li className="flex flex-col gap-2 rounded-lg bg-slate-700/70 p-3">
      <h4 className="font-semibold">{newsItem.label}</h4>
      <p className="pr-2 text-[var(--color-slate-300)]">{newsItem.body}</p>
      <div className="flex justify-between border-t border-[var(--color-indigo-200)] pt-2 text-sm text-[var(--color-indigo-200)]">
        <div>
          <span>{newsItem.time}</span>
        </div>
        <div className="flex gap-1">
          <span>{newsItem.date.slice(6, 8)}</span>
          <span>{mapToPersianMonth(newsItem.date.slice(4, 6))}</span>
          <span>{newsItem.date.slice(0, 4)}</span>
        </div>
      </div>
    </li>
  );
}

export default NewsItem;
