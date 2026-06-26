import { useSearchParams } from 'react-router';

import { usePay } from '../../context/PayContext';

import Modal from '../../ui/Modal';
//---

function PayModal() {
  //! React Router
  const [query] = useSearchParams();

  //! Context Data
  const { isPayOpen, togglePayWindow } = usePay();

  //! JSX
  return (
    <form method="PATCH">
      <Modal
        name="payModal"
        type="form"
        isOpen={isPayOpen}
        message={`هزینه رزرو اتاق برای ۹۰ دقیقه : ${new Intl.NumberFormat('fa-IR').format(
          query.get('cost')
        )} تومان`}
        onClick={{ cancel: togglePayWindow }}
        text={{ confirm: 'پرداخت آنلاین', cancel: 'پرداخت با کیف پول' }}
        backgroundColor={{ confirm: 'bg-green-600', cancel: 'bg-slate-800' }}
        hoverColor={{ confirm: 'hover:bg-green-500', cancel: 'hover:bg-slate-900' }}
        disabledStyles={{
          confirm: 'disabled:bg-green-500 disabled:hover:bg-green-500 disabled:opacity-70',
        }}
      />
      <input type="hidden" name="cost" value={query.get('cost')} />
      <input type="hidden" name="recordId" value={query.get('recordId')} />
      <input type="hidden" name="roomName" value={query.get('roomName')} />
      <input type="hidden" name="timePartIndex" value={query.get('timePartIndex')} />
    </form>
  );
}

export default PayModal;
