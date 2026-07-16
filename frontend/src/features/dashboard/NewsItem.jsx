import { en2fa } from 'num2persian';
import mapToPersianMonth from '../../utils/mapToPersianMonth';
import { toPersianDate } from '../../utils/toPersianDate';
//---

function NewsItem({ newsItem }) {
  //! Derived States
  const dateTimeParts = newsItem.publishedAt.split('T');
  const formattedPersianPublishedAtDate = toPersianDate(new Date(dateTimeParts.at(0)));
  const timeParts = en2fa(dateTimeParts.at(1).split('+').at(0)).split(':');
  const dateParts = formattedPersianPublishedAtDate.split('-');

  //! Main JSX
  return (
    <li className="flex flex-col gap-2 rounded-lg bg-[var(--color-slate-700)] p-3">
      <h4 className="font-semibold text-[var(--color-slate-200)]">{newsItem.label}</h4>
      <p className="pr-2 text-[var(--color-slate-300)]">{newsItem.body}</p>
      <div className="flex justify-between border-t border-[var(--color-indigo-400)] pt-2 text-sm">
        <div>
          <span>
            {timeParts.at(0)}:{timeParts.at(1)}
          </span>
        </div>
        <div className="flex gap-1">
          <span>{dateParts.at(2)}</span>
          <span>{mapToPersianMonth(dateParts.at(1))}</span>
          <span>{dateParts.at(0)}</span>
        </div>
      </div>
    </li>
  );
}

export default NewsItem;
