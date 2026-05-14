function HeaderOverlay({ onNotifOpen, onProfileOpen }) {
  return (
    <div
      onClick={() => {
        onNotifOpen();
        onProfileOpen();
      }}
      className="fixed left-0 top-0 z-30 h-full w-full bg-slate-800/20 backdrop-blur-sm"
    ></div>
  );
}

export default HeaderOverlay;
