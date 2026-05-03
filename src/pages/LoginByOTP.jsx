import HomeButton from '../components/HomeButton';
import { useAuth } from '../context/AuthContext';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { AiOutlineEnter } from 'react-icons/ai';
////////////////////////////////////////////////
//! Constant Data
const inputContainerStyles = 'flex items-center justify-between w-full rounded-md bg-slate-300';
const inputStyles =
  'w-full rounded-md bg-inherit p-3 text-slate-800 focus:bg-slate-50 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-1 disabled:cursor-not-allowed transition-all duration-300';

function LoginByOTP() {
  //! Context Data
  const { activeTab } = useAuth();

  //! JSX
  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        {activeTab === 'mobile' ? (
          <h3> کد پیامک شده به شماره تلفن خود را وارد کنید </h3>
        ) : (
          <h3> کد ارسال شده به ایمیل خود را وارد کنید </h3>
        )}
      </div>
      <div className="flex w-60 gap-3 text-lg font-semibold" dir="ltr">
        <div className={inputContainerStyles}>
          <input
            type="text"
            name="recoveryCode1"
            maxLength="1"
            required
            aria-required="true"
            className={`${inputStyles} text-center`}
          />
        </div>
        <div className={inputContainerStyles}>
          <input
            type="text"
            name="recoveryCode2"
            maxLength="1"
            required
            aria-required="true"
            className={`${inputStyles} text-center`}
          />
        </div>
        <div className={inputContainerStyles}>
          <input
            type="text"
            name="recoveryCode3"
            maxLength="1"
            required
            aria-required="true"
            className={`${inputStyles} text-center`}
          />
        </div>
        <div className={inputContainerStyles}>
          <input
            type="text"
            name="recoveryCode4"
            maxLength="1"
            required
            aria-required="true"
            className={`${inputStyles} text-center`}
          />
        </div>
      </div>
      <div className="flex w-full gap-2">
        <HomeButton to={-1} extraClasses={'py-2 rounded-md flex-grow'}>
          <HiOutlineArrowRight />
        </HomeButton>
        {/* TODO OTP authentication */}
        <HomeButton extraClasses={'px-5 py-2 rounded-md flex-grow'}>
          <span className="text-lg font-medium"> ورود</span>
          <AiOutlineEnter className="text-2xl text-slate-300" />
        </HomeButton>
      </div>
    </div>
  );
}

export default LoginByOTP;
