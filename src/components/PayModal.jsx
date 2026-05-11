import { redirect, useFetcher, useSearchParams } from 'react-router';
/////////////////////////////////////////////////////////////////////
import { usePay } from '../context/PayContext';
///////////////////////////////////////////////
import { getUser, updateBalace } from '../services/apiUsers';
//////////////////////////////
import Modal from '../ui/Modal';
////////////////////////////////
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
      <input type="hidden" name="cost" value={query.get('cost')} />
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const user = await getUser(params.userId);
  const userBalance = user.creditBalance;

  const newBalace = {
    creditBalance: userBalance - +data.cost,
  };

  if (userBalance >= +data.cost) await updateBalace(params.userId, newBalace);

  return redirect(
    `/app/${params.userId}/status?status=${userBalance - +data.cost >= 0 ? 'success' : 'failed'}`
  );
}

export default PayModal;
