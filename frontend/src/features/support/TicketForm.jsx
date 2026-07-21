function TicketForm() {
  // const { createTicket, isCreatingTicket } = useCreateTicket();
  const isCreatingTicket = false;

  return (
    <form className="flex flex-col gap-3 p-4">
      <label className="flex flex-col">
        <span className="mb-2 text-sm">موضوع</span>
        <input placeholder="موضوع تیکت" className="rounded-md bg-[var(--color-slate-700)] p-2" />
      </label>

      <label className="flex flex-col">
        <span className="mb-2 text-sm">متن</span>
        <textarea
          placeholder="توضیحات بیشتر (اختیاری)"
          rows={6}
          className="rounded-md bg-[var(--color-slate-700)] p-2"
        />
      </label>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isCreatingTicket}
          className="rounded-md bg-indigo-500 px-4 py-2 text-white disabled:opacity-60"
        >
          ارسال
        </button>
      </div>
    </form>
  );
}

export default TicketForm;
