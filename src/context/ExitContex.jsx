import { createContext, useContext, useReducer } from 'react';
//////////////////////////////////////////////////////////////
const ExitContext = createContext();
const initialState = {
  isExitOpen: false,
};
function reducer(state, action) {
  switch (action.type) {
    case 'exit/toggleExitWindow':
      return {
        ...state,
        isExitOpen: !state.isExitOpen,
      };
    case 'exit/hideExitWindow':
      return { ...state, isExitOpen: false };
    default:
      throw new Error('Action Unknown!');
  }
}

function ExitProvider({ children }) {
  const [{ isExitOpen }, dispatch] = useReducer(reducer, initialState);

  function toggleExitWindow() {
    dispatch({ type: 'exit/toggleExitWindow' });
  }

  function hideExitWindow() {
    dispatch({ type: 'exit/hideExitWindow' });
  }

  return (
    <ExitContext.Provider value={{ isExitOpen, toggleExitWindow, hideExitWindow }}>
      {children}
    </ExitContext.Provider>
  );
}

function useExit() {
  const context = useContext(ExitContext);
  if (context === undefined) throw new Error('ExitContext used outside of ExitProvider!');
  return context;
}

export { ExitProvider, useExit };
