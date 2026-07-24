import { useForm } from 'react-hook-form';
import { useSession } from '../authentication/useSession';
import { useCreateTicket } from './useCreateTicket';
import PanelButton from '../../ui/PanelButton';
import Spinner from '../../ui/Spinner';
import SpinnerMini from '../../ui/SpinnerMini';
import Error from '../../ui/Error';
//---

function TicketForm() {
  //! React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      subject: '',
      body: '',
    },
  });

  //! React Query
  const { userId, isLoading, error } = useSession();
  const { createTicket, isCreatingTicket } = useCreateTicket();

  //! Handlers
  function onSuccess({ subject, body }) {
    if (!subject || !userId) return;
    const newTicket = {
      userId,
      subject,
      body,
      status: 'open',
    };
    createTicket(newTicket, { onSettled: () => reset() });
  }
  function onError(errors) {
    console.error(errors);
  }

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

  //! Main JSX
  return (
    <form className="flex flex-col gap-3 p-4" onSubmit={handleSubmit(onSuccess, onError)}>
      <label className="flex flex-col">
        <span className="mb-2 text-sm">موضوع</span>
        <div className="flex flex-col gap-3">
          <input
            placeholder="موضوع تیکت"
            disabled={isCreatingTicket}
            maxLength={30}
            className={`rounded-md border bg-[var(--color-slate-700)] p-2 outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${errors?.subject ? 'border-red-600 focus:border-red-600' : 'border-[var(--color-slate-700)] focus:border-indigo-600'}`}
            {...register('subject', {
              required: 'لطفا موضوع تیکت را وارد کنید',
            })}
          />
          {errors?.subject && <Error error={errors.subject.message} />}
        </div>
      </label>

      <label className="flex flex-col">
        <span className="mb-2 text-sm">متن</span>
        <textarea
          placeholder="توضیحات بیشتر (اختیاری)"
          disabled={isCreatingTicket}
          maxLength={300}
          rows={6}
          className="rounded-md border border-[var(--color-slate-700)] bg-[var(--color-slate-700)] p-2 outline-none focus:border-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
          {...register('body')}
        />
      </label>

      <div className="flex justify-end">
        <PanelButton
          type="submit"
          disabled={isCreatingTicket}
          className="px-3 py-2 text-sm text-slate-200 sm:text-base"
        >
          {isCreatingTicket ? (
            <span className="px-3">
              {' '}
              <SpinnerMini />{' '}
            </span>
          ) : (
            'ارسال'
          )}
        </PanelButton>
      </div>
    </form>
  );
}

export default TicketForm;
