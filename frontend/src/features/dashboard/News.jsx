import NewsItem from '../dashboard/NewsItem';
//---

function News({ className, news }) {
  return (
    <div className={className}>
      <h3 className="border-b border-[var(--color-slate-500)] pb-3 text-lg font-semibold text-[var(--color-slate-400)]">
        اخبار
      </h3>
      {news.length > 0 ? (
        <ul className="space-y-3">
          {news.map((newsItem, i) => (
            <NewsItem key={i} newsItem={newsItem} />
          ))}
        </ul>
      ) : (
        <p className="flex items-center justify-center p-2 text-xl text-[var(--color-slate-500)]">
          خبری وجود ندارد
        </p>
      )}
    </div>
  );
}

export default News;
