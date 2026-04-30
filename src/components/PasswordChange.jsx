import { Form } from 'react-router';
import PanelButton from './PanelButton';
import Error from './Error';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import Success from './Success';

const inputContainerStyles =
  'flex items-center rounded-lg border px-3 py-2 transition-all duration-300 focus-within:border-indigo-700';
const inputStyles = 'bg-inherit outline-none w-80';

const hideButtonStyles = 'text-slate-500 transition-colors duration-300 hover:text-indigo-700';

function PasswordChange() {
  const [error, setError] = useState('');
  const [errorField, setErrorField] = useState('');
  const [successMessage] = useState('');

  const [isOldHidden, setIsOldHidden] = useState(true);
  const [isNewHidden, setIsNewHidden] = useState(true);
  const [isNewRepHidden, setIsNewRepHidden] = useState(true);

  // controlled elements
  const [inputOldPass, setInputOldPass] = useState('');
  const [inputNewPass, setInputNewPass] = useState('');
  const [inputNewPassRep, setInputNewPassRep] = useState('');

  useEffect(
    function () {
      if (!inputOldPass && !inputNewPass && !inputNewPassRep) {
        setError('');
        setErrorField('');

        return;
      }
      if (inputNewPass && !inputOldPass) {
        setError('رمز عبور قدیمی را وارد کنید.');
        setErrorField('1');
        return;
      }
      if (inputNewPassRep && !inputOldPass) {
        setError('رمز عبور قدیمی را وارد کنید.');
        setErrorField('1');
        return;
      }
      if (inputNewPass.length < 8) {
        setError('رمز عبور جدید باید حداقل ۸ کاراکتر باشد.');
        setErrorField('2');
        return;
      }
      if (inputOldPass === inputNewPass) {
        setError('رمز قدیمی نباید با رمز جدید یکسان باشد.');
        setErrorField('2');
        return;
      }
      if (inputNewPass !== inputNewPassRep) {
        setError('رمز جدید با تکرار آن یکسان نیست.');
        setErrorField('3');
        return;
      }
      setError('');
      setErrorField('');
    },
    [inputOldPass, inputNewPass, inputNewPassRep]
  );

  return (
    <div className="border-b border-slate-500 p-3">
      <Form
        method="PATCH"
        className="flex h-full flex-col items-start gap-4 rounded-xl bg-[linear-gradient(45deg,var(--color-indigo-900),var(--color-slate-800))] p-5"
      >
        <div
          className={
            `${errorField === '1' ? 'border-red-700 focus-within:border-red-700' : 'border-slate-500'} ` +
            inputContainerStyles
          }
        >
          <input
            name="oldPass"
            value={inputOldPass}
            onChange={(e) => setInputOldPass(e.target.value)}
            type={isOldHidden ? 'password' : 'text'}
            placeholder="رمز عبور قدیمی"
            required
            aria-required="true"
            maxLength={16}
            className={inputStyles}
          />
          <button
            type="button"
            className={hideButtonStyles}
            onClick={() => setIsOldHidden((cur) => !cur)}
          >
            {isOldHidden ? <RxEyeClosed /> : <RxEyeOpen />}
          </button>
        </div>
        <div
          className={
            `${errorField === '2' ? 'border-red-700 focus-within:border-red-700' : 'border-slate-500'} ` +
            inputContainerStyles
          }
        >
          <input
            name="newPass"
            value={inputNewPass}
            onChange={(e) => setInputNewPass(e.target.value)}
            type={isNewHidden ? 'password' : 'text'}
            placeholder="رمز عبور جدید"
            required
            aria-required="true"
            maxLength={16}
            className={inputStyles}
          />
          <button
            type="button"
            className={hideButtonStyles}
            onClick={() => setIsNewHidden((cur) => !cur)}
          >
            {isNewHidden ? <RxEyeClosed /> : <RxEyeOpen />}
          </button>
        </div>
        <div
          className={
            `${errorField === '3' ? 'border-red-700 focus-within:border-red-700' : 'border-slate-500'} ` +
            inputContainerStyles
          }
        >
          <input
            name="newPassRep"
            value={inputNewPassRep}
            onChange={(e) => setInputNewPassRep(e.target.value)}
            type={isNewRepHidden ? 'password' : 'text'}
            placeholder="تکرار رمز عبور جدید"
            required
            aria-required="true"
            maxLength={16}
            className={inputStyles}
          />
          <button
            type="button"
            className={hideButtonStyles}
            onClick={() => setIsNewRepHidden((cur) => !cur)}
          >
            {isNewRepHidden ? <RxEyeClosed /> : <RxEyeOpen />}
          </button>
        </div>
        {inputOldPass && inputNewPass && inputNewPassRep && (
          <PanelButton extraClasses="px-4 py-3 text-sm" disabled={error.length > 0}>
            تغییر رمز عبور
          </PanelButton>
        )}
        {error.length > 0 && <Error error={error} />}
        {successMessage.length > 0 && <Success message={successMessage} />}
      </Form>
    </div>
  );
}

export default PasswordChange;
