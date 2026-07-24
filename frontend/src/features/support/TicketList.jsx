import { PiEmpty } from 'react-icons/pi';
import { useUserTickets } from './useUserTickets';
import StatusBadge from './StatusBadge';
import Error from '../../ui/Error';
import Spinner from '../../ui/Spinner';
//---

function TicketList() {
  //! React Query
  const { userTickets, isLoading, error } = useUserTickets();

  //! Conditional JSX
  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="flex h-full items-center justify-center">
        <Error error={error.message} />
      </div>
    );
  if (!userTickets.length)
    return (
      <div className="flex h-full items-center justify-center text-xl text-[var(--color-slate-400)]">
        <span>تیکتی وجود ندارد.</span>
        <PiEmpty />
      </div>
    );

  //! Main JSX
  return (
    <div className="overflow-auto p-4">
      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="text-right text-[var(--color-slate-300)]">
            <th className="pb-2">شناسه</th>
            <th className="pb-2">موضوع</th>
            <th className="pb-2">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {userTickets?.map((t) => (
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

export default TicketList;
