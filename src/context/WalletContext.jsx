import { createContext, useCallback, useContext, useReducer } from 'react';
////////////////////////////////////////////////////////////////////////////
const WalletContext = createContext();

const initialState = {
  currentPrice: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'wallet/setCurrentPrice':
      return { ...state, currentPrice: action.payload };
    default:
      throw new Error('Unknown Action!');
  }
}

function WalletProvider({ children }) {
  const [{ currentPrice }, dispatch] = useReducer(reducer, initialState);

  const setCurrentPrice = useCallback(function setCurrentPrice(price) {
    dispatch({ type: 'wallet/setCurrentPrice', payload: price });
  }, []);

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
