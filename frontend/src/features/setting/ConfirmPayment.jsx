import toast from 'react-hot-toast';
import { addDays } from 'date-fns';
import { en2fa, moneyFormat } from 'num2persian';
import { BiWallet } from 'react-icons/bi';

import { useProfile } from './useProfile';

import PanelButton from '../../ui/PanelButton';
import Spinner from '../../ui/Spinner';
import Error from '../../ui/Error';

import { toPersianDate } from '../../utils/toPersianDate';
import mapTime from '../../utils/mapTime';
import { useUpdateBalance } from './useUpdateBalance';
import { useSubmitReservation } from './useSubmitReservation';
//---

const valueStyles = 'rounded-xl bg-[var(--color-slate-700)] px-3 py-1';

function ConfirmPayment({ onCloseModal, reservation, rooms }) {
  const { profile, isLoading, error } = useProfile();
  const { updateUserBalance, isUpdatingUserBalance } = useUpdateBalance();
  const { submitReservation, isSubmittingReservation } = useSubmitReservation();
  const tomorrow = addDays(new Date(), 1);
  const persianTomorrow = toPersianDate(tomorrow);
  const roomName = rooms?.find((room) => room.id === reservation.roomId)?.roomName;
  const reservePricePerHalfHour = Number(
    rooms?.find((room) => room.id === reservation.roomId)?.reservePricePerHalfHour ?? '0'
  );
  const totalPrice = reservePricePerHalfHour * 3;
  const userCreditBalance = Number(profile?.creditBalance ?? '0');
  const { startTime, stopTime } = mapTime(reservation?.timePart);

  function handlePayWithWallet() {
    if (userCreditBalance < totalPrice) {
      onCloseModal?.();
      toast.error('موجودی کیف پول کافی نیست. لطفا ابتدا کیف پول خود را شارژ کنید.');
      return;
    }
    updateUserBalance(
      { userId: profile.id, delta: -totalPrice },
      {
        onSuccess: () => {
          toast.success('پرداخت با موفقیت انجام شد');
          submitReservation(reservation.id);
        },
        onSettled: () => {
          onCloseModal?.();
        },
      }
    );
  }

  if (isLoading)
    return (
      <div className="flex w-60 items-center justify-center sm:w-80">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="flex w-60 items-center justify-center sm:w-80">
        <Error error={error.message} />
      </div>
    );

  return (
    <div className="w-60 space-y-5 sm:w-80">
      <h2 className="text-2xl text-[var(--color-slate-200)]">جزئیات رزرو شما:</h2>
      <ul className="list-disc space-y-6 text-lg text-[var(--color-slate-300)]">
        <li>
          <span> شماره‌ رزرو : </span>{' '}
          <span className={`${valueStyles}`}>{en2fa(reservation?.id)} #</span>
        </li>
        <li>
          <span> تاریخ رزرو : </span>{' '}
          <span className={`${valueStyles}`}> {persianTomorrow.replaceAll('-', '/')} </span>
        </li>
        <li>
          <span> نام اتاق : </span> <span className={`${valueStyles}`}> {roomName} </span>
        </li>
        <li>
          <span> بازه زمانی : </span>{' '}
          <span className={`${valueStyles}`}>
            {' '}
            {en2fa(startTime)} تا {en2fa(stopTime)}{' '}
          </span>
        </li>
        <li>
          <span> هزینه کل : </span>{' '}
          <span className={`${valueStyles}`}> {moneyFormat(totalPrice)} تومان </span>
        </li>
      </ul>
      <div className="flex flex-col gap-3 sm:flex-row">
        <PanelButton
          disabled={isUpdatingUserBalance || isSubmittingReservation}
          onClick={handlePayWithWallet}
          className="flex flex-grow gap-2 whitespace-nowrap px-3 py-2"
        >
          {' '}
          <span> پرداخت با کیف پول </span> <BiWallet />
        </PanelButton>
        <PanelButton
          disabled={true}
          className="flex-grow whitespace-nowrap bg-green-700 px-3 py-2 hover:bg-green-600 disabled:hover:bg-green-700"
        >
          {' '}
          پرداخت آنلاین{' '}
        </PanelButton>
      </div>
    </div>
  );
}

export default ConfirmPayment;
