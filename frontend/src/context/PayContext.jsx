import { createContext, useCallback, useContext, useReducer } from 'react';
//---

const PayContext = createContext();
const initialState = {
  isPayOpen: false,
  userBalance: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case 'pay/togglePayWindow':
      return {
        ...state,
        isPayOpen: !state.isPayOpen,
      };
    case 'pay/hidePayWindow':
      return {
        ...state,
        isPayOpen: false,
      };
    case 'pay/setUserBalance':
      return {
        ...state,
        userBalance: action.payload,
      };
    default:
      throw new Error('Action Unknown!');
  }
}

function PayProvider({ children }) {
  const [{ isPayOpen, userBalance }, dispatch] = useReducer(reducer, initialState);

  function togglePayWindow() {
    dispatch({ type: 'pay/togglePayWindow' });
  }

  function hidePayWindow() {
    dispatch({ type: 'pay/hidePayWindow' });
  }

  const setUserBalance = useCallback(function setUserBalance(newBalance = 0) {
    dispatch({ type: 'pay/setUserBalance', payload: newBalance });
  }, []);

  return (
    <PayContext.Provider
      value={{ isPayOpen, userBalance, togglePayWindow, hidePayWindow, setUserBalance }}
    >
      {children}
    </PayContext.Provider>
  );
}

function usePay() {
  const contex = useContext(PayContext);
  if (contex === undefined) throw new Error('PayContext used outside of PayProvider!');
  return contex;
}

export { PayProvider, usePay };
