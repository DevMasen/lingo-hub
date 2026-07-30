import { useForm } from 'react-hook-form';
import { useProfile } from '../features/setting/useProfile';
import { useUpdateProfile } from '../features/setting/useUpdateProfile';
import FileUploader from '../ui/FileUploader';
import PanelButton from '../ui/PanelButton';
import Error from '../ui/Error';
import Spinner from '../ui/Spinner';
import SpinnerMini from '../ui/SpinnerMini';
//---

function Resume() {
  //! React Query
  const { profile, isLoading, error } = useProfile();
  const { updateProfile, isUpdatingProfile } = useUpdateProfile();

  //! React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      resume: null,
      experience: '',
      explanation: '',
      ielts: '',
      toelf: '',
    },
  });

  //! Handlers
  function onSuccess({ resume, experience, explanation, ielts, toelf }) {
    if (!resume) return;
    const newProfile = {
      explanation: `تجربیات : ${experience}, توضیخات تکمیلی : ${explanation}, نمره آیلتس : ${ielts}, نمره تافل : ${toelf}`,
    };
    updateProfile({
      userId: profile?.id,
      changes: newProfile,
      avatarFile: null,
      resumeFile: resume[0],
    });
  }
  function onError(errors) {
    console.error(errors);
  }

  //!Conditional JSX
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center">
        <Error error={error?.message} />
      </div>
    );

  //! Main JSX
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4 sm:p-6">
      <section className="rounded-2xl bg-[var(--color-slate-800)] p-5 shadow-lg">
        <h1 className="text-xl font-bold text-[var(--color-slate-200)]">ارسال رزومه </h1>
        <p className="mt-2 text-sm leading-7 text-[var(--color-slate-300)]">
          برای ثبت درخواست همکاری، فایل رزومه خود را بارگذاری کنید و در صورت تمایل اطلاعات تکمیلی
          درباره سابقه و مهارت‌های خود را وارد نمایید.
        </p>
      </section>

      <form
        onSubmit={handleSubmit(onSuccess, onError)}
        className="space-y-5 rounded-2xl border border-[var(--color-slate-700)] bg-[var(--color-slate-800)] p-5 shadow-lg"
      >
        <div className="space-y-2">
          <label
            className="block text-sm font-semibold text-[var(--color-slate-200)]"
            htmlFor="resumeFile"
          >
            فایل رزومه <span className="text-red-400">*</span>
          </label>
          <FileUploader
            id="resume"
            register={register}
            registerParams={['resume', { required: 'لطفاً فایل رزومه خود را بارگذاری کنید.' }]}
            accept=".pdf,.doc,.docx"
            isUpdatingProfile={isUpdatingProfile}
            className={`w-full rounded-lg border border-[var(--color-slate-600)] bg-[var(--color-slate-700)] px-3 py-2 text-sm text-[var(--color-slate-200)] file:mr-3 file:rounded file:border-0 file:bg-[var(--color-slate-600)] file:px-3 file:py-2 file:text-sm file:text-[var(--color-slate-100)] ${isUpdatingProfile && 'opacity-50'}`}
          />
          <p className="text-sm text-[var(--color-slate-300)]">
            فایل‌های PDF، DOC و DOCX پشتیبانی می‌شوند.
          </p>
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
              disabled={isUpdatingProfile}
              className="w-full rounded-lg border border-[var(--color-slate-600)] bg-[var(--color-slate-700)] px-3 py-2 text-sm text-[var(--color-slate-200)] disabled:opacity-50"
              {...register('experience')}
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-semibold text-[var(--color-slate-200)]"
              htmlFor="explanation"
            >
              توضیحات تکمیلی
            </label>
            <textarea
              id="explanation"
              name="explanation"
              rows="4"
              placeholder="گواهی‌ها، مهارت‌های تخصصی و توضیحات اضافی"
              disabled={isUpdatingProfile}
              className="w-full rounded-lg border border-[var(--color-slate-600)] bg-[var(--color-slate-700)] px-3 py-2 text-sm text-[var(--color-slate-200)] disabled:opacity-50"
              {...register('explanation')}
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
              disabled={isUpdatingProfile}
              className="w-full rounded-lg border border-[var(--color-slate-600)] bg-[var(--color-slate-700)] px-3 py-2 text-sm text-[var(--color-slate-200)] disabled:opacity-50"
              {...register('ielts')}
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
              disabled={isUpdatingProfile}
              className="w-full rounded-lg border border-[var(--color-slate-600)] bg-[var(--color-slate-700)] px-3 py-2 text-sm text-[var(--color-slate-200)] disabled:opacity-50"
              {...register('toefl')}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <PanelButton
            disabled={isUpdatingProfile}
            type="submit"
            className="px-3 py-2 text-sm text-slate-200 sm:text-base"
          >
            {isUpdatingProfile ? (
              <span className="px-4">
                <SpinnerMini />
              </span>
            ) : (
              'ارسال رزومه'
            )}
          </PanelButton>
        </div>
        {errors?.resume && <Error error={errors.resume?.message} />}
      </form>
    </div>
  );
}

export default Resume;
