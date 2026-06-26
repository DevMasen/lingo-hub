import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
//---

function PaymentStatus() {
  //! React Router
  const params = useParams();
  const [query] = useSearchParams();
  const navigate = useNavigate();

  //! Context Data
  // const { setUserBalance } = usePay();

  //! Local States
  const [isOpen, setIsOpen] = useState(true);
  const [milliseconds, setmilliseconds] = useState(0);

  //! Derived States
  const status = query.get('status');
  const message =
    status === 'success' ? 'تراکنش با موفقیت انجام شد ✅' : 'موجودی کیف پول کافی نیست ⚠️';

  //! Const variables
  const maxMiliSecondsWait = 5000;

  //! Effects
  useEffect(
    function () {
      setTimeout(() => {
        setIsOpen(false);
        navigate(`/app/${params.userId}/setting/user`);
      }, maxMiliSecondsWait + 2000);
    },
    [navigate, params.userId]
  );
  useEffect(
    function () {
      const timer = setInterval(function () {
        setmilliseconds((cur) => cur + 10);
        if (milliseconds > maxMiliSecondsWait) clearInterval(timer);
      }, 10);

      return () => {
        clearInterval(timer);
      };
    },
    [milliseconds]
  );

  //TODO : update user balance after success status

  //! JSX
  return (
    <div
      onClick={() => {
        setIsOpen(false);
        navigate(`/app/${params.userId}/setting/user`);
      }}
      className={`fixed right-0 top-0 z-50 flex items-center justify-center bg-slate-800/20 backdrop-blur-sm transition-all duration-100 ${!isOpen ? 'h-0 w-0' : 'h-dvh w-full'}`}
    >
      <div
        className={`w-[45 0px] relative h-40 flex-col items-center justify-center space-y-3 rounded-lg bg-opacity-65 px-12 py-8 ${(status === null || status === 'failed') && 'bg-red-700'} ${status === 'success' && 'bg-green-500'} ${!isOpen ? 'hidden' : 'flex'}`}
      >
        <progress
          max={maxMiliSecondsWait}
          value={milliseconds}
          className="absolute right-0 top-0 h-1 w-full"
        />
        <h2
          className={`text-center text-2xl font-semibold ${(status === null || status === 'failed') && 'text-red-200'} ${status === 'success' && 'text-green-200'}`}
        >
          {message ?? 'خطای نا شناخته'}
        </h2>
      </div>
    </div>
  );
}

export default PaymentStatus;
