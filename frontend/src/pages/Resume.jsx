import { useState } from 'react';
//---

//TODO#1: Implement this feature
function Resume() {
  const [statusMessage, setStatusMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const file = e.currentTarget.elements.resumeFile.files?.[0];

    if (!file) {
      setStatusMessage('لطفاً فایل رزومه خود را بارگذاری کنید.');
      return;
    }

    setStatusMessage(`رزومه شما با موفقیت ثبت شد. فایل انتخابی: ${file.name}`);
  }

  //! Main JSX
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4 sm:p-6">
      <section className="rounded-2xl bg-[var(--color-slate-800)] p-5 shadow-lg">
        <h1 className="text-xl font-bold text-[var(--color-slate-200)]">ارسال رزومه معلم</h1>
        <p className="mt-2 text-sm leading-7 text-[var(--color-slate-300)]">
          برای ثبت درخواست همکاری، فایل رزومه خود را بارگذاری کنید و در صورت تمایل اطلاعات تکمیلی
          درباره سابقه و مهارت‌های خود را وارد نمایید.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-[var(--color-slate-700)] bg-[var(--color-slate-800)] p-5 shadow-lg"
      >
        <div className="space-y-2">
          <label
            className="block text-sm font-semibold text-[var(--color-slate-200)]"
            htmlFor="resumeFile"
          >
            فایل رزومه <span className="text-red-400">*</span>
          </label>
          <input
            id="resumeFile"
            name="resumeFile"
            type="file"
            accept=".pdf,.doc,.docx"
            required
            className="w-full rounded-lg border border-[var(--color-slate-600)] bg-[var(--color-slate-700)] px-3 py-2 text-sm text-[var(--color-slate-200)] file:mr-3 file:rounded file:border-0 file:bg-[var(--color-slate-600)] file:px-3 file:py-2 file:text-sm file:text-[var(--color-slate-100)]"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label
              className="block text-sm font-semibold text-[var(--color-slate-200)]"
              htmlFor="experience"
            >
              سابقه کار و تجربه تدریس
            </label>
            <textarea
              id="experience"
              name="experience"
              rows="4"
              placeholder="سابقه آموزشی، دوره‌ها و تجربه‌های قبلی"
              className="w-full rounded-lg border border-[var(--color-slate-600)] bg-[var(--color-slate-700)] px-3 py-2 text-sm text-[var(--color-slate-200)]"
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-semibold text-[var(--color-slate-200)]"
              htmlFor="ielts"
            >
              امتیاز IELTS
            </label>
            <input
              id="ielts"
              name="ielts"
              type="text"
              placeholder="مثلاً 7.5"
              className="w-full rounded-lg border border-[var(--color-slate-600)] bg-[var(--color-slate-700)] px-3 py-2 text-sm text-[var(--color-slate-200)]"
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-semibold text-[var(--color-slate-200)]"
              htmlFor="toefl"
            >
              امتیاز TOEFL
            </label>
            <input
              id="toefl"
              name="toefl"
              type="text"
              placeholder="مثلاً 90"
              className="w-full rounded-lg border border-[var(--color-slate-600)] bg-[var(--color-slate-700)] px-3 py-2 text-sm text-[var(--color-slate-200)]"
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-semibold text-[var(--color-slate-200)]"
              htmlFor="notes"
            >
              توضیحات تکمیلی
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              placeholder="گواهی‌ها، مهارت‌های تخصصی و توضیحات اضافی"
              className="w-full rounded-lg border border-[var(--color-slate-600)] bg-[var(--color-slate-700)] px-3 py-2 text-sm text-[var(--color-slate-200)]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            className="rounded-lg bg-[var(--color-slate-200)] px-4 py-2 font-semibold text-[var(--color-slate-900)] transition hover:bg-[var(--color-slate-100)]"
          >
            ارسال رزومه
          </button>
          <p className="text-sm text-[var(--color-slate-300)]">
            فایل‌های PDF، DOC و DOCX پشتیبانی می‌شوند.
          </p>
        </div>
      </form>

      {statusMessage && (
        <p className="rounded-lg border border-[var(--color-slate-700)] bg-[var(--color-slate-800)] px-4 py-3 text-sm text-[var(--color-slate-200)]">
          {statusMessage}
        </p>
      )}
    </div>
  );
}

export default Resume;
