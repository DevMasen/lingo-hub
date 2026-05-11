import { redirect, useFetcher, useSearchParams } from 'react-router';
import Modal from '../ui/Modal';
import { usePay } from '../context/PayContext';

function PayModal() {
  //! React Router
  const fetcher = useFetcher();
  const [query] = useSearchParams();

  //! Context Data
  const { isPayOpen } = usePay();

  return (
    <fetcher.Form method="PATCH">
      <Modal
        name="payModal"
        type="form"
        isOpen={isPayOpen}
        message={`هزینه رزرو اتاق برای ۹۰ دقیقه : ${new Intl.NumberFormat('fa-IR').format(
          query.get('cost')
        )} تومان`}
        text={{ confirm: 'پرداخت آنلاین', cancel: 'پرداخت با کیف پول' }}
        backgroundColor={{ confirm: 'bg-green-600', cancel: 'bg-slate-800' }}
        hoverColor={{ confirm: 'hover:bg-green-500', cancel: 'hover:bg-slate-900' }}
        disabledStyles={{
          confirm: 'disabled:bg-green-500 disabled:hover:bg-green-500 disabled:opacity-70',
        }}
      />
    </fetcher.Form>
  );
}

//TODO Complete this action
export async function action({ request, params }) {
  // return redirect(`/app/${params.userId}/status`);
  return null;
}

export default PayModal;
