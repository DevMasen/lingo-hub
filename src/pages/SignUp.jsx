import Loader from '../components/Loader';
import Error from '../components/Error';
import CloseFormButton from '../components/CloseFormButton';
import HomeButton from '../components/HomeButton';
import { HiOutlineArrowRight, HiOutlineArrowLeft, HiOutlineClipboardList } from 'react-icons/hi';
import { HiCheckBadge } from 'react-icons/hi2';
import { useSignup } from '../context/SignupContext';
import { useState } from 'react';

const inputContainerStyles = 'rounded-md bg-slate-300 text-slate-800';
const inputStyles =
  'w-full rounded-md bg-inherit px-3 py-2 focus:bg-slate-50 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed transition-all duration-300';
const inputErrorStyles = 'border-2 border-red-600 text-red-600';

function SignUp() {
  const { step, loading, error, errorField } = useSignup();

  // Controlled Elements
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');
  const [inputLanguage, setInputLanguage] = useState('انگلیسی');
  const [inputLevel, setInputLevel] = useState('مبتدی');
  const [inputExplanation, setInputExplanation] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordRepeat, setInputPasswordRepeat] = useState('');

  // useEffect(
  //   function () {
  //     setPhoneNumberInput((cur) => makeNumericInput(cur));
  //   },
  //   [phoneNumberInput]
  // );

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="background flex h-dvh items-center justify-center">
      {loading && <Loader />}
      <CloseFormButton />

      <form
        action="POST"
        onSubmit={handleSubmit}
        className="text-md w-[450px] space-y-3 overflow-auto scroll-smooth rounded-lg bg-slate-600 bg-opacity-65 px-12 py-8 text-slate-200"
      >
        <legend className="flex items-center gap-2 text-2xl font-bold">
          <span> ثبت‌نام کاربر </span>
          <HiOutlineClipboardList className="text-3xl" />
        </legend>
        {step === '1' && (
          <>
            <div className={`${inputContainerStyles} ${errorField === '1' && 'bg-red-100'}`}>
              <input
                type="text"
                name="firstName"
                value={inputFirstName}
                onChange={(e) => setInputFirstName(e.target.value)}
                placeholder=" نام "
                required
                aria-required="true"
                maxLength="30"
                className={`${inputStyles} ${errorField === '1' && inputErrorStyles}`}
              />
            </div>
            <HomeButton extraClasses={'py-2 rounded-md'}>
              <span className="text-lg font-medium">ادامه</span>
              <HiOutlineArrowLeft />
            </HomeButton>
          </>
        )}
        {step === '2' && (
          <>
            <div className={`${inputContainerStyles} ${errorField === '2' && 'bg-red-100'}`}>
              <input
                type="text"
                name="lastName"
                value={inputLastName}
                onChange={(e) => setInputLastName(e.target.value)}
                placeholder=" نام خانوادگی "
                required
                aria-required="true"
                maxLength="30"
                className={`${inputStyles} ${errorField === '2' && inputErrorStyles}`}
              />
            </div>
            <div className="flex gap-3">
              <HomeButton extraClasses={'py-2 rounded-md flex-grow'}>
                <HiOutlineArrowRight />
              </HomeButton>
              <HomeButton extraClasses={'py-2 rounded-md flex-grow'}>
                <HiOutlineArrowLeft />
              </HomeButton>
            </div>
          </>
        )}
        {step === '3' && (
          <>
            <div className={`${inputContainerStyles} ${errorField === '3' && 'bg-red-100'}`}>
              <input
                type="text"
                name="phoneNumber"
                value={inputPhoneNumber}
                onChange={(e) => setInputPhoneNumber(e.target.value)}
                placeholder=" شماره موبایل "
                required
                aria-required="true"
                maxLength="11"
                className={`${inputStyles} ${errorField === '3' && inputErrorStyles}`}
              />
            </div>
            <div className="flex gap-3">
              <HomeButton extraClasses={'py-2 rounded-md flex-grow'}>
                <HiOutlineArrowRight />
              </HomeButton>
              <HomeButton extraClasses={'py-2 rounded-md flex-grow'}>
                <HiOutlineArrowLeft />
              </HomeButton>
            </div>
          </>
        )}

        {step === '4' && (
          <>
            <div className={`${inputContainerStyles} flex px-3 py-2`}>
              <label className="flex w-36 items-center font-semibold" htmlFor="lang">
                زبان تدریس :
              </label>
              <select
                id="lang"
                name="language"
                value={inputLanguage}
                onChange={(e) => setInputLanguage(e.target.value)}
                required
                aria-required="true"
                className={`${inputStyles}`}
              >
                <option value="انگلیسی"> انگلیسی </option>
                <option value="آلمانی"> آلمانی </option>
                <option value="فرانسوی"> فرانسوی </option>
                <option value="چینی"> چینی </option>
              </select>
            </div>
            <div className={`${inputContainerStyles} flex px-3 py-2`}>
              <label className="flex w-36 items-center font-semibold" htmlFor="level">
                سطح تدریس:
              </label>
              <select
                id="level"
                name="level"
                value={inputLevel}
                onChange={(e) => setInputLevel(e.target.value)}
                required
                aria-required="true"
                className={`${inputStyles}`}
              >
                <option value="مبتدی"> مبتدی </option>
                <option value="متوسط"> متوسط </option>
                <option value="پیشرفته"> پیشرفته </option>
                <option value="استاد"> استاد </option>
              </select>
            </div>

            <div className={`${inputContainerStyles}`}>
              <textarea
                name="explanation"
                value={inputExplanation}
                onChange={(e) => setInputExplanation(e.target.value)}
                placeholder=" توضیحات تکمیلی ..."
                required
                aria-required="true"
                maxLength="100"
                className={`${inputStyles}`}
              />
            </div>
            <div className="flex gap-3">
              <HomeButton extraClasses={'py-2 rounded-md flex-grow'}>
                <HiOutlineArrowRight />
              </HomeButton>
              <HomeButton extraClasses={'py-2 rounded-md flex-grow'}>
                <HiOutlineArrowLeft />
              </HomeButton>
            </div>
          </>
        )}

        {step === '5' && (
          <>
            <div className={`${inputContainerStyles} ${errorField === '7' && 'bg-red-100'}`}>
              <input
                type="email"
                name="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                placeholder=" آدرس ایمیل "
                required
                aria-required="true"
                maxLength="40"
                className={`${inputStyles} ${errorField === '7' && inputErrorStyles}`}
              />
            </div>
            <div className="flex gap-3">
              <HomeButton extraClasses={'py-2 rounded-md flex-grow'}>
                <HiOutlineArrowRight />
              </HomeButton>
              <HomeButton extraClasses={'py-2 rounded-md flex-grow'}>
                <HiOutlineArrowLeft />
              </HomeButton>
            </div>
          </>
        )}
        {step === '6' && (
          <>
            <div className={`${inputContainerStyles} ${errorField === '8' && 'bg-red-100'}`}>
              <input
                type="password"
                name="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                placeholder=" رمز عبور "
                required
                aria-required="true"
                maxLength="16"
                className={`${inputStyles} ${errorField === '8' && inputErrorStyles}`}
              />
            </div>
            <div className={`${inputContainerStyles} ${errorField === '9' && 'bg-red-100'}`}>
              <input
                type="password"
                name="passwordRepeat"
                value={inputPasswordRepeat}
                onChange={(e) => setInputPasswordRepeat(e.target.value)}
                placeholder=" تکرار رمز عبور "
                required
                aria-required="true"
                maxLength="16"
                className={`${inputStyles} ${errorField === '9' && inputErrorStyles}`}
              />
            </div>
            <HomeButton extraClasses={'py-2 rounded-md'}>
              <span className="text-lg font-medium">ثبت‌نام</span>
              <HiCheckBadge className="text-xl" />
            </HomeButton>
          </>
        )}
        {error.length > 0 && <Error error={error} />}
      </form>
    </div>
  );
}

export default SignUp;
