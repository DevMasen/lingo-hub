import { useSearchParams } from 'react-router';
import toast from 'react-hot-toast';
import { addDays, format } from 'date-fns';
import { en2fa } from 'num2persian';
import { useCreateReservation } from './useCreateReservation';
import { useSession } from '../authentication/useSession';
import { useReserveRemainCount } from '../../hooks/useReserveRemainCount';
import Spinner from '../../ui/Spinner';
import SpinnerMini from '../../ui/SpinnerMini';
import Error from '../../ui/Error';
import PanelButton from '../../ui/PanelButton';
import mapTime from '../../utils/mapTime';
//---

//! Global Const Variables
const tomorrow = addDays(new Date(), 1);
const tomorrowISOString = format(tomorrow, 'yyyy-MM-dd');

function ConfirmReserve({ onCloseModal }) {
  //! React Router
  const [searchParams] = useSearchParams();

  //! React Query
  const { userId, isLoading: isLoadingSession, error: sessionError } = useSession();
  const { createReservation, isCreatingReservation } = useCreateReservation();

  //! Custom Hooks
  const {
    reserveRemainCount,
    isLoading: isLoadingReserveRemainCount,
    error: reserveRemainCountError,
  } = useReserveRemainCount();

  //! Derived States
  const { startTime, stopTime } = mapTime(+searchParams.get('timePart'));
  const isLoading = isLoadingSession || isLoadingReserveRemainCount;
  const error = sessionError || reserveRemainCountError;

  //! Handlers
  function handleReserve() {
    if (reserveRemainCount <= 0) {
      onCloseModal?.();
      toast.error('تعداد رزرو شما بیش از حد مجاز است!');
      return;
    }
    const newReservation = {
      userId,
      roomId: +searchParams.get('roomId'),
      reservationDate: tomorrowISOString,
      timePart: +searchParams.get('timePart'),
      status: 'waiting',
    };
    createReservation(newReservation);
    onCloseModal?.();
  }

  //! Conditional JSX
  if (isLoading)
    return (
      <div className="flex h-52 w-60 items-center justify-center sm:w-80">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="flex h-52 w-60 items-center justify-center sm:w-80">
        <Error error={error.message} />
      </div>
    );

  //! Main JSX
  return (
    <div className="w-60 sm:w-full">
      <h2 className="text-lg leading-10 text-[var(--color-slate-200)] sm:whitespace-nowrap sm:text-xl sm:leading-none md:text-2xl">
        آیا از رزرو
        <span className="mx-2 rounded-xl bg-[var(--color-slate-700)] px-2 py-1">
          اتاق {searchParams.get('roomName')}
        </span>
        برای ساعت
        <span className="mx-2 rounded-xl bg-[var(--color-slate-700)] px-2 py-1">
          {en2fa(startTime)} تا {en2fa(stopTime)}
        </span>
        مطمئنی ؟
      </h2>
      <div className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row">
        <PanelButton
          disabled={isCreatingReservation}
          onClick={handleReserve}
          className="flex-grow px-7 py-2"
        >
          {isCreatingReservation ? <SpinnerMini /> : <span>آره، رزرو کن</span>}
        </PanelButton>
        <PanelButton
          disabled={isCreatingReservation}
          onClick={onCloseModal}
          className="flex-grow bg-[var(--color-red-700)] px-3 py-2 hover:bg-[var(--color-red-600)]"
        >
          نه، منصرف شدم
        </PanelButton>
      </div>
    </div>
  );
}

export default ConfirmReserve;
