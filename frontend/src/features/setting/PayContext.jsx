import { createContext, useContext, useState } from 'react';
//---

const PayContext = createContext();

function PayProvider({ children }) {
  const [isPayOpen, setIsPayOpen] = useState(false);

  function togglePayWindow() {
    setIsPayOpen((open) => !open);
  }

  function hidePayWindow() {
    setIsPayOpen(false);
  }

  return (
    <PayContext.Provider value={{ isPayOpen, togglePayWindow, hidePayWindow }}>
      {children}
    </PayContext.Provider>
  );
}

function usePay() {
  const context = useContext(PayContext);
  if (context === undefined) throw new Error('PayContext used outside of PayProvider!');
  return context;
}

export { PayProvider, usePay };
