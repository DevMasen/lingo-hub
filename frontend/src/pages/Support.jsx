import TicketForm from '../features/support/TicketForm';
import TicketList from '../features/support/TicketList';
//---

function Support() {
  //! Main JSX
  return (
    <div className="m-4 grid grid-cols-1 gap-4 rounded-xl bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))]">
      <header className="flex items-center justify-between border-b border-[var(--color-slate-600)] p-4">
        <h2 className="text-2xl font-bold">پشتیبانی</h2>
        <p className="text-sm text-[var(--color-slate-300)]">
          در این بخش می‌توانید تیکت‌ها را ارسال و وضعیت آن‌ها را مشاهده کنید.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-md bg-[var(--color-slate-800)] lg:col-span-1">
          <TicketForm />
        </div>

        <div className="rounded-md bg-[var(--color-slate-800)] lg:col-span-2">
          <TicketList />
        </div>
      </div>
    </div>
  );
}

export default Support;
