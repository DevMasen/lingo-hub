import { createContext, useContext, useState } from 'react';
//---

const ConfirmReserve = createContext();

function ConfirmReserveProvider({ children }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  function toggleConfirmWindow() {
    setIsConfirmOpen((open) => !open);
  }

  function hideConfirmWindow() {
    setIsConfirmOpen(false);
  }

  return (
    <ConfirmReserve.Provider value={{ isConfirmOpen, toggleConfirmWindow, hideConfirmWindow }}>
      {children}
    </ConfirmReserve.Provider>
  );
}

function useConfirmReserve() {
  const context = useContext(ConfirmReserve);
  if (context === undefined)
    throw new Error('ConfirmReserveContext used outside of ConfirmReserveProvider!');
  return context;
}

export { ConfirmReserveProvider, useConfirmReserve };
