import StatusBadge from './StatusBadge';
import Error from '../../ui/Error';
//---

function SupportList() {
  // const { tickets, isLoading, error } = useTickets();
  const tickets = [];
  const isLoading = false;
  const error = undefined;

  if (isLoading) return <div className="p-4">در حال بارگذاری تیکت ها...</div>;
  if (error)
    return (
      <div>
        <Error error={error.message} />
      </div>
    );

  if (!tickets.length)
    return <div className="p-4">تیکتی وجود ندارد. اولین تیکت را ارسال کنید!</div>;

  return (
    <div className="overflow-auto p-4">
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
              <td className="py-3">
                <StatusBadge status={t.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupportList;
