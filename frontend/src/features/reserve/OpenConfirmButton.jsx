import PanelButton from '../../ui/PanelButton';
//---

function OpenConfirmButton({ children, onOpenModal, className }) {
  //! Main JSX
  return (
    <PanelButton onClick={onOpenModal} className={className}>
      {children}
    </PanelButton>
  );
}

export default OpenConfirmButton;
