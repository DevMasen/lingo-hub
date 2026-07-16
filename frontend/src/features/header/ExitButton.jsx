function ExitButton({ children, className, onOpenModal }) {
  //! Main JSX
  return (
    <button className={className} onClick={onOpenModal}>
      {children}
    </button>
  );
}

export default ExitButton;
