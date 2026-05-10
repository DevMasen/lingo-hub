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
  const contex = useContext(ExitContext);
  if (contex === undefined) throw new Error('ExitContex used outside of ExitProvider!');
  return contex;
}

export { ExitProvider, useExit };
