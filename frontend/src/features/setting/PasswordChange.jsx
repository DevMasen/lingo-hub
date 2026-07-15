import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';

import PanelButton from '../../ui/PanelButton';
import Error from '../../ui/Error';
import { useChangePassword } from './useChangePassword';
//---

//! Global Styles
const rowStyles = 'flex flex-col gap-3 w-full md:flex-row md:items-center';
const inputStyles = 'bg-inherit outline-none w-full disabled:cursor-not-allowed';
const hideButtonStyles =
  'text-[var(--color-slate-500)] transition-colors duration-300 hover:text-[var(--color-indigo-700)]';

function PasswordChange() {
  //! React Query
  const { changePassword, isChangingPassword } = useChangePassword();

  const inputContainerStyles = `flex items-center rounded-lg border px-3 py-2 h-12 transition-all duration-300 md:min-w-80 focus-within:border-[var(--color-indigo-700)] ${isChangingPassword && 'opacity-50'}`;

  //! Local States
  const [isOldHidden, setIsOldHidden] = useState(true);
  const [isNewHidden, setIsNewHidden] = useState(true);
  const [isNewRepHidden, setIsNewRepHidden] = useState(true);

  //! React Hook Form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordRepeat: '',
    },
  });

  function onSuccess({ oldPassword, newPassword }) {
    if (!oldPassword || !newPassword) return;
    changePassword({ newPassword: newPassword, currentPassword: oldPassword });
  }

  function onError(errors) {
    console.error(errors);
  }
  //! JSX
  return (
    <div className="border-b border-[var(--color-slate-500)] p-3">
      <form
        method="PATCH"
        onSubmit={handleSubmit(onSuccess, onError)}
        className="flex h-full flex-col items-start gap-4 rounded-xl bg-[linear-gradient(45deg,var(--color-slate-700),var(--color-slate-800))] p-5"
      >
        <div className={rowStyles}>
          <div
            className={`${errors?.oldPassword ? 'border-[var(--color-red-700)] focus-within:border-[var(--color-red-700)]' : 'border-[var(--color-slate-500)]'} ${inputContainerStyles}`}
          >
            <input
              name="oldPassword"
              id="oldPassword"
              type={isOldHidden ? 'password' : 'text'}
              placeholder="رمز عبور قدیمی"
              aria-required="true"
              maxLength={30}
              className={inputStyles}
              disabled={isChangingPassword}
              {...register('oldPassword', {
                required: 'لطفا رمز عبور قبلی خود را وارد کنید',
                minLength: {
                  value: 8,
                  message: 'رمز عبور قبلی باید حداقل ۸ کاراکتر باشد',
                },
              })}
            />
            <button
              type="button"
              className={hideButtonStyles}
              disabled={isChangingPassword}
              onClick={() => setIsOldHidden((cur) => !cur)}
            >
              {isOldHidden ? <RxEyeClosed /> : <RxEyeOpen />}
            </button>
          </div>
          {errors?.oldPassword && <Error error={errors.oldPassword.message} />}
        </div>
        <div className={rowStyles}>
          <div
            className={
              `${errors?.newPassword ? 'border-[var(--color-red-700)] focus-within:border-[var(--color-red-700)]' : 'border-[var(--color-slate-500)]'} ` +
              inputContainerStyles
            }
          >
            <input
              name="newPassword"
              id="newPassword"
              type={isNewHidden ? 'password' : 'text'}
              placeholder="رمز عبور جدید"
              aria-required="true"
              maxLength={30}
              className={inputStyles}
              disabled={isChangingPassword}
              {...register('newPassword', {
                required: 'لطفا رمز عبور جدید خود را وارد کنید',
                validate: (value) => {
                  return value !== getValues().oldPassword || 'رمز عبور جدید با قبلی یکسان است';
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!.,])[A-Za-z\d@#$!.,]+$/,
                  message:
                    'رمز عبور جدید باید فقط شامل حروف انگلیسی، اعداد و یکی از کاراکترهای @، #، $، !، . یا ، باشد و حداقل شامل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر ویژه باشد.',
                },
              })}
            />
            <button
              type="button"
              className={hideButtonStyles}
              disabled={isChangingPassword}
              onClick={() => setIsNewHidden((cur) => !cur)}
            >
              {isNewHidden ? <RxEyeClosed /> : <RxEyeOpen />}
            </button>
          </div>
          {errors?.newPassword && <Error error={errors.newPassword.message} />}
        </div>
        <div className={rowStyles}>
          <div
            className={
              `${errors?.newPasswordRepeat ? 'border-[var(--color-red-700)] focus-within:border-[var(--color-red-700)]' : 'border-[var(--color-slate-500)]'} ` +
              inputContainerStyles
            }
          >
            <input
              name="newPasswordRepeat"
              id="newPasswordRepeat"
              type={isNewRepHidden ? 'password' : 'text'}
              placeholder="تکرار رمز عبور جدید"
              aria-required="true"
              maxLength={30}
              className={inputStyles}
              disabled={isChangingPassword}
              {...register('newPasswordRepeat', {
                required: 'لطفا تکرار رمز عبور را وارد کنید',
                validate: (value) =>
                  value === getValues().newPassword || 'رمز عبور با تکرار آن برابر نیست',
              })}
            />
            <button
              type="button"
              className={hideButtonStyles}
              disabled={isChangingPassword}
              onClick={() => setIsNewRepHidden((cur) => !cur)}
            >
              {isNewRepHidden ? <RxEyeClosed /> : <RxEyeOpen />}
            </button>
          </div>
          {errors?.newPasswordRepeat && <Error error={errors.newPasswordRepeat.message} />}
        </div>
        <PanelButton
          disabled={isChangingPassword}
          type="submit"
          className="px-4 py-3 text-sm text-slate-200"
        >
          تغییر رمز عبور
        </PanelButton>
      </form>
    </div>
  );
}

export default PasswordChange;
