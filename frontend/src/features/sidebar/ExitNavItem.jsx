function ExitNavItem({ children, onOpenModal, className }) {
  return (
    <li>
      <button className={className} onClick={onOpenModal}>
        {children}
      </button>
    </li>
  );
}

export default ExitNavItem;
