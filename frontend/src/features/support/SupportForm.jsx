import { useState } from 'react';
import { useTickets } from './useTickets';
import toast from 'react-hot-toast';

export default function SupportForm() {
  const { createTicket, creating } = useTickets();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!subject.trim()) {
      toast.error('لطفا موضوع را وارد کنید');
      return;
    }

    try {
      await createTicket({ subject: subject.trim(), body: body.trim() });
      toast.success('تیکت ارسال شد');
      setSubject('');
      setBody('');
    } catch (err) {
      console.error(err);
      toast.error('ارسال تیکت با خطا مواجه شد');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
      <label className="flex flex-col">
        <span className="mb-2 text-sm">موضوع</span>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="موضوع تیکت"
          className="rounded-md bg-[var(--color-slate-700)] p-2"
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-2 text-sm">متن</span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="توضیحات بیشتر (اختیاری)"
          rows={6}
          className="rounded-md bg-[var(--color-slate-700)] p-2"
        />
      </label>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={creating}
          className="rounded-md bg-indigo-500 px-4 py-2 text-white disabled:opacity-60"
        >
          ارسال
        </button>
      </div>
    </form>
  );
}
