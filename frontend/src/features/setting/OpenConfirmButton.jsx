import PanelButton from '../../ui/PanelButton';
//---

function OpenConfirmButton({ children, onOpenModal, className }) {
  return (
    <PanelButton onClick={onOpenModal} className={className}>
      {children}
    </PanelButton>
  );
}

export default OpenConfirmButton;
