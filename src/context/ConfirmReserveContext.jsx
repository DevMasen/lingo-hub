import { createContext, useContext, useReducer } from 'react';
//////////////////////////////////////////////////////////////
const ConfirmReserve = createContext();
const initialState = {
  isConfirmOpen: false,
};
function reducer(state, action) {
  switch (action.type) {
    case 'confirm/toggleConfirmWindow':
      return {
        ...state,
        isConfirmOpen: !state.isConfirmOpen,
      };
    default:
      throw new Error('Action Unknown!');
  }
}

function ConfirmReserveProvider({ children }) {
  const [{ isConfirmOpen }, dispatch] = useReducer(reducer, initialState);

  function toggleConfirmWindow() {
    dispatch({ type: 'confirm/toggleConfirmWindow' });
  }

  return (
    <ConfirmReserve.Provider value={{ isConfirmOpen, toggleConfirmWindow }}>
      {children}
    </ConfirmReserve.Provider>
  );
}

function useConfirmReserve() {
  const contex = useContext(ConfirmReserve);
  if (contex === undefined)
    throw new Error('ConfirmReserveContext used outside of ConfirmReserveProvider!');
  return contex;
}

export { ConfirmReserveProvider, useConfirmReserve };
