import { useForm } from 'react-hook-form';

import { useProfile } from '../setting/useProfile';

import FileUploader from '../../ui/FileUploader';
import PanelButton from '../../ui/PanelButton';
import Spinner from '../../ui/Spinner';
import Error from '../../ui/Error';
//---

const inputContainerStyles =
  'flex items-center rounded-lg border px-3 py-2 border-[var(--color-slate-500)] transition-all duration-300 focus-within:border-[var(--color-indigo-700)]';
const errorContainerStyles =
  'border-[var(--color-red-700)] focus-within:border-[var(--color-red-700)]';
const inputStyles = 'bg-inherit text-[var(--color-slate-200)] outline-none w-60 sm:w-80 md:w-96';

function UpdateAvatarForm({ onCloseModal }) {
  const { profile, isLoading, error } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      avatar: null,
    },
  });

  function onSuccess({ firstName, lastName, avatar }) {
    console.log(firstName, lastName, avatar);
  }

  function onError(errors) {
    console.error(errors);
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center">
        <Error error={error.message} />
      </div>
    );

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSuccess, onError)}>
      <div className="space-y-4">
        <div className={`${inputContainerStyles} ${errors?.firstName && errorContainerStyles}`}>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="نام جدید"
            aria-required="true"
            maxLength={30}
            className={inputStyles}
            defaultValue={profile?.firstName}
            {...register('firstName', {
              required: 'نام جدید را وارد کنید',
            })}
          />
        </div>
        <div className={`${inputContainerStyles} ${errors?.lastName && errorContainerStyles}`}>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="نام خانوادگی جدید"
            aria-required="true"
            maxLength={30}
            className={inputStyles}
            defaultValue={profile?.lastName}
            {...register('lastName', {
              required: 'نام خانوادگی جدید را وارد کنید',
            })}
          />
        </div>
        <FileUploader register={register} className={inputContainerStyles} label="انتخاب عکس" />
      </div>
      <div className="flex gap-4">
        <PanelButton type="submit" extraClasses="px-5 py-2">
          تأیید
        </PanelButton>
        <PanelButton
          onClick={onCloseModal}
          type="button"
          extraClasses="px-5 py-2 bg-[var(--color-red-800)] hover:bg-[var(--color-red-700)]"
        >
          لغو
        </PanelButton>
      </div>
    </form>
  );
}

export default UpdateAvatarForm;
