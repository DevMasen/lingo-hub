import { useSearchParams } from 'react-router';

// import { usePay } from './PayContext';

//---

function PayModal() {
  //! React Router
  const [query] = useSearchParams();

  //! Context Data
  // const { isPayOpen, togglePayWindow } = usePay();

  //! JSX
  return (
    <form method="PATCH">
      <input type="hidden" name="cost" value={query.get('cost')} />
      <input type="hidden" name="recordId" value={query.get('recordId')} />
      <input type="hidden" name="roomName" value={query.get('roomName')} />
      <input type="hidden" name="timePartIndex" value={query.get('timePartIndex')} />
    </form>
  );
}

export default PayModal;
