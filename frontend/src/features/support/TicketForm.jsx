import PanelButton from '../../ui/PanelButton';
//---

function TicketForm() {
  // const { createTicket, isCreatingTicket } = useCreateTicket();
  const isCreatingTicket = false;

  return (
    <form className="flex flex-col gap-3 p-4">
      <label className="flex flex-col">
        <span className="mb-2 text-sm">موضوع</span>
        <input
          placeholder="موضوع تیکت"
          maxLength={30}
          className="rounded-md border border-[var(--color-slate-700)] bg-[var(--color-slate-700)] p-2 outline-none transition-all duration-300 focus:border-indigo-600"
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-2 text-sm">متن</span>
        <textarea
          placeholder="توضیحات بیشتر (اختیاری)"
          maxLength={300}
          rows={6}
          className="rounded-md border border-[var(--color-slate-700)] bg-[var(--color-slate-700)] p-2 outline-none focus:border-indigo-600"
        />
      </label>

      <div className="flex justify-end">
        <PanelButton
          type="submit"
          disabled={isCreatingTicket}
          className="px-3 py-2 text-sm text-slate-200 sm:text-base"
        >
          ارسال
        </PanelButton>
      </div>
    </form>
  );
}

export default TicketForm;
