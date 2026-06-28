import { createContext, useContext, useState } from 'react';
//---

const WalletContext = createContext();

function WalletProvider({ children }) {
  const [currentPrice, setCurrentPrice] = useState(0);

  return (
    <WalletContext.Provider value={{ currentPrice, setCurrentPrice }}>
      {children}
    </WalletContext.Provider>
  );
}

function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) throw new Error('WalletContext used outside of WalletProvider');
  return context;
}

export { WalletProvider, useWallet };
