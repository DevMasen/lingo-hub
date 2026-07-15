import { useLatestNews } from './useLatestNews';

import NewsItem from '../dashboard/NewsItem';

import Error from '../../ui/Error';
import Skeleton from '../../ui/Skeleton';
//---

function News({ className }) {
  const { news, isLoading, error } = useLatestNews(10);

  return (
    <div className={className}>
      <h3 className="border-b border-[var(--color-slate-500)] pb-3 text-lg font-semibold text-[var(--color-slate-400)]">
        اخبار
      </h3>
      {isLoading ? (
        <Skeleton />
      ) : error ? (
        <Error error={error.message} />
      ) : news?.length === 0 ? (
        <p className="flex items-center justify-center p-2 text-xl text-[var(--color-slate-500)]">
          خبری وجود ندارد
        </p>
      ) : (
        <ul className="space-y-3">
          {news.map((newsItem, i) => (
            <NewsItem key={i} newsItem={newsItem} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default News;
