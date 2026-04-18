import Loader from '../components/Loader';
import Error from '../components/Error';
import CloseFormButton from '../components/CloseFormButton';
import Button from '../components/Button';
import { HiCheckBadge } from 'react-icons/hi2';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { useSignup } from '../context/SignupContext';

const inputContainerStyles = 'rounded-md bg-slate-300 text-slate-800';
const inputStyles =
  'w-full rounded-md bg-inherit px-3 py-2 focus:bg-slate-50 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed transition-all duration-300';
const inputErrorStyles = 'border-2 border-red-600 text-red-600';

function SignUp() {
  const { loading, error, errorField } = useSignup();

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
        className="text-md h-[500px] w-[450px] space-y-3 overflow-auto scroll-smooth rounded-lg bg-slate-600 bg-opacity-65 px-12 py-8 text-slate-200"
      >
        <legend className="flex items-center gap-2 text-2xl font-bold">
          <span> ثبت‌نام کاربر </span>
          <HiOutlineClipboardList className="text-3xl" />
        </legend>

        <div className={`${inputContainerStyles} ${errorField === '1' && 'bg-red-100'}`}>
          <input
            className={`${inputStyles} ${errorField === '1' && inputErrorStyles}`}
            type="text"
            name="firstName"
            placeholder=" نام "
            required
            aria-required="true"
            maxLength="30"
          />
        </div>
        <div className={`${inputContainerStyles} ${errorField === '2' && 'bg-red-100'}`}>
          <input
            className={`${inputStyles} ${errorField === '2' && inputErrorStyles}`}
            type="text"
            name="lastName"
            placeholder=" نام خانوادگی "
            required
            aria-required="true"
            maxLength="30"
          />
        </div>
        <div className={`${inputContainerStyles} ${errorField === '3' && 'bg-red-100'}`}>
          <input
            className={`${inputStyles} ${errorField === '3' && inputErrorStyles}`}
            type="text"
            name="phoneNumber"
            placeholder=" شماره موبایل "
            required
            aria-required="true"
            maxLength="11"
          />
        </div>
        <div className={`${inputContainerStyles} flex px-3 py-2`}>
          <label className="flex w-36 items-center font-semibold" htmlFor="lang">
            زبان تدریس :
          </label>
          <select
            className={`${inputStyles}`}
            id="lang"
            name="language"
            required
            aria-required="true"
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
            className={`${inputStyles}`}
            id="level"
            name="level"
            required
            aria-required="true"
          >
            <option value="مبتدی"> مبتدی </option>
            <option value="متوسط"> متوسط </option>
            <option value="پیشرفته"> پیشرفته </option>
            <option value="استاد"> استاد </option>
          </select>
        </div>

        <div className={`${inputContainerStyles}`}>
          <textarea
            className={`${inputStyles}`}
            name="explanation"
            placeholder=" توضیحات تکمیلی ..."
            required
            aria-required="true"
            maxLength="100"
          />
        </div>

        <div className={`${inputContainerStyles} ${errorField === '7' && 'bg-red-100'}`}>
          <input
            className={`${inputStyles} ${errorField === '7' && inputErrorStyles}`}
            type="email"
            name="email"
            placeholder=" آدرس ایمیل "
            required
            aria-required="true"
            maxLength="40"
          />
        </div>

        <div className={`${inputContainerStyles} ${errorField === '8' && 'bg-red-100'}`}>
          <input
            className={`${inputStyles} ${errorField === '8' && inputErrorStyles}`}
            type="password"
            name="password"
            placeholder=" رمز عبور "
            required
            aria-required="true"
            maxLength="16"
          />
        </div>
        <div className={`${inputContainerStyles} ${errorField === '9' && 'bg-red-100'}`}>
          <input
            className={`${inputStyles} ${errorField === '9' && inputErrorStyles}`}
            type="password"
            name="password-repeat"
            placeholder=" تکرار رمز عبور "
            required
            aria-required="true"
            maxLength="16"
          />
        </div>

        <Button>
          <span className="text-lg font-medium">ثبت‌نام</span>
          <HiCheckBadge className="text-xl" />
        </Button>
        {error.length > 0 && <Error error={error} />}
      </form>
    </div>
  );
}

export default SignUp;
