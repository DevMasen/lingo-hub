import { useTickets } from './useTickets';

function statusBadge(status) {
  const base = 'px-2 py-1 rounded-full text-xs';
  if (status === 'open') return <span className={base + ' bg-green-600'}>باز</span>;
  if (status === 'pending') return <span className={base + ' bg-yellow-500'}>در دست بررسی</span>;
  if (status === 'closed') return <span className={base + ' bg-slate-600'}>بسته شده</span>;
  return <span className={base + ' bg-slate-600'}>{status}</span>;
}

export default function SupportList() {
  const { tickets, isLoading } = useTickets();

  if (isLoading)
    return <div className="p-4">در حال بارگذاری تیکت ها...</div>;

  if (!tickets.length)
    return <div className="p-4">تیکتی وجود ندارد. اولین تیکت را ارسال کنید!</div>;

  return (
    <div className="p-4 overflow-auto">
      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="text-left text-[var(--color-slate-300)]">
            <th className="pb-2">شناسه</th>
            <th className="pb-2">موضوع</th>
            <th className="pb-2">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.id} className="border-b border-[var(--color-slate-600)]">
              <td className="py-3">{t.id}</td>
              <td className="py-3">{t.subject}</td>
              <td className="py-3">{statusBadge(t.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
