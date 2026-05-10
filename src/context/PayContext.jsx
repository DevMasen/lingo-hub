import { createContext, useContext, useReducer } from 'react';
//////////////////////////////////////////////////////////////
const PayContext = createContext();
const initialState = {
  isPayOpen: false,
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
    default:
      throw new Error('Action Unknown!');
  }
}

function PayProvider({ children }) {
  const [{ isPayOpen }, dispatch] = useReducer(reducer, initialState);

  function togglePayWindow() {
    dispatch({ type: 'pay/togglePayWindow' });
  }

  function hidePayWindow() {
    dispatch({ type: 'pay/hidePayWindow' });
  }

  return (
    <PayContext.Provider value={{ isPayOpen, togglePayWindow, hidePayWindow }}>
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
