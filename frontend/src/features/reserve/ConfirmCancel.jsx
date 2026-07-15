import { en2fa } from 'num2persian';
import { useCancelReservation } from './useCancelReservation';
import PanelButton from '../../ui/PanelButton';
//---

function ConfirmCancel({ onCloseModal, reservationId = '0' }) {
  const { cancelReservation, isCancelingReservation } = useCancelReservation();
  return (
    <div className="space-y-8">
      <h2 className="text-xl text-[var(--color-slate-200)] sm:text-2xl">
        آیا از لغو رزرو #{en2fa(reservationId)} مطمئنی ؟
      </h2>
      <div className="flex w-56 flex-col gap-5 text-sm sm:w-full sm:flex-row">
        <PanelButton
          disabled={isCancelingReservation}
          onClick={() => {
            cancelReservation(reservationId, { onSettled: onCloseModal });
          }}
          className="flex-grow whitespace-nowrap bg-[var(--color-red-800)] px-3 py-2 hover:bg-[var(--color-red-700)]"
        >
          آره، لغوش کن
        </PanelButton>
        <PanelButton
          disabled={isCancelingReservation}
          className="flex-grow whitespace-nowrap px-3 py-2"
          onClick={onCloseModal}
        >
          نه، منصرف شدم
        </PanelButton>
      </div>
    </div>
  );
}

export default ConfirmCancel;
