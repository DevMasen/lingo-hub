import { createContext, useContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
//////////////////////////////////////////////////////////////
const API_URL = 'http://localhost:8000';
const PayContext = createContext();
const initialState = {
  isPayOpen: false,
  userBalace: 0,
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
  const params = useParams();

  //TODO fix that shit
  // useEffect(
  //   function () {
  //     async function getUserBalance(userId) {
  //       try {
  //         const res = await fetch(`${API_URL}/users/${userId}`);
  //         if (!res.ok) throw Error();

  //         return user.creditBalance;
  //       } catch {
  //         throw Error('Failed getting userBalace');
  //       }
  //     }
  //   },
  //   [params.userId]
  // );

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
