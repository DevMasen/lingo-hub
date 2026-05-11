import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';

function PaymentStatus() {
  const [isOpen, setIsOpen] = useState(true);
  const [milliseconds, setmilliseconds] = useState(0);
  const [query] = useSearchParams();
  const status = query.get('status');
  const message = 'kir';
  const navigate = useNavigate();
  const params = useParams();

  const maxMiliSecondsWait = 5000;

  useEffect(
    function () {
      setTimeout(() => {
        setIsOpen(false);
        navigate(`/app/${params.userId}/setting/user`);
      }, maxMiliSecondsWait + 3000);
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

  return (
    <div
      onClick={() => {
        setIsOpen(false);
        navigate(`/app/${params.userId}/setting/user`);
      }}
      className={`fixed right-0 top-0 z-50 flex items-center justify-center bg-slate-800/20 backdrop-blur-sm transition-all duration-100 ${!isOpen ? 'h-0 w-0' : 'h-dvh w-full'}`}
    >
      <div
        className={`relative w-[400px] flex-col items-center space-y-3 rounded-lg bg-opacity-65 px-12 py-8 ${(status === null || status === 'failed') && 'bg-red-700'} ${status === 'success' && 'bg-green-500'} ${!isOpen ? 'hidden' : 'flex'}`}
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
