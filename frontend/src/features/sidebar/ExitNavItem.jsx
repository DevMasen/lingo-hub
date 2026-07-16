function ExitNavItem({ children, onOpenModal, className }) {
  //! Main JSX
  return (
    <li>
      <button className={className} onClick={onOpenModal}>
        {children}
      </button>
    </li>
  );
}

export default ExitNavItem;
