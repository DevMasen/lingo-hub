import Modal from '../ui/Modal';

function ConfirmReserveModal({
  timePartString = '<نامعلوم>',
  roomName = '<نامعلوم>',
  dateString = '<نامعلوم>',
}) {
  const message =
    ' آیا از رزرو اتاق ' +
    roomName +
    ' برای تاریخ ' +
    dateString +
    ' و ساعت ' +
    timePartString +
    ' مطمئن هستید؟ ';
  return <Modal isOpen={true} message={message} text={{ confirm: 'بله', cancel: 'خیر' }} />;
}

export default ConfirmReserveModal;
