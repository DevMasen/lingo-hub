import { useForm } from 'react-hook-form';

import { useProfile } from '../setting/useProfile';
import { useUpdateProfile } from './useUpdateProfile';

import FileUploader from '../../ui/FileUploader';
import PanelButton from '../../ui/PanelButton';
import Spinner from '../../ui/Spinner';
import SpinnerMini from '../../ui/SpinnerMini';
import Error from '../../ui/Error';
//---

const errorContainerStyles =
  'border-[var(--color-red-700)] focus-within:border-[var(--color-red-700)]';
const inputStyles =
  'bg-inherit text-[var(--color-slate-200)] outline-none w-52 sm:w-80 md:w-96 disabled:cursor-not-allowed';

function UpdateAvatarForm({ onCloseModal }) {
  const { profile, isLoading, error } = useProfile();
  const { updateProfile, isUpdatingProfile } = useUpdateProfile();

  const inputContainerStyles = `flex w-fit items-center rounded-lg border px-3 py-2 border-[var(--color-slate-500)] transition-all duration-300 focus-within:border-[var(--color-indigo-700)] ${isUpdatingProfile && 'opacity-50'}`;

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
    if (isLoading || error || !firstName || !lastName) return;
    const newProfile = {
      firstName,
      lastName,
    };
    updateProfile({
      userId: profile.id,
      changes: newProfile,
      avatarFile: avatar ? avatar[0] : null,
      resumeFile: null,
    });
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
            disabled={isUpdatingProfile}
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
            disabled={isUpdatingProfile}
            {...register('lastName', {
              required: 'نام خانوادگی جدید را وارد کنید',
            })}
          />
        </div>
        <FileUploader
          register={register}
          className={inputContainerStyles}
          label="انتخاب عکس"
          isUpdatingProfile={isUpdatingProfile}
        />
      </div>
      <div className="flex gap-4">
        <PanelButton disabled={isUpdatingProfile} type="submit" className="px-5 py-2">
          {isUpdatingProfile ? <SpinnerMini /> : <span>تأیید</span>}
        </PanelButton>
        <PanelButton
          disabled={isUpdatingProfile}
          onClick={onCloseModal}
          type="button"
          className="bg-[var(--color-red-800)] px-5 py-2 hover:bg-[var(--color-red-700)]"
        >
          <span>لغو</span>
        </PanelButton>
      </div>
    </form>
  );
}

export default UpdateAvatarForm;
