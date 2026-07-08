function ExitButton({ children, className, onOpenModal }) {
  return (
    <button className={className} onClick={onOpenModal}>
      {children}
    </button>
  );
}

export default ExitButton;
