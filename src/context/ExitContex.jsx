import { createContext, useContext, useReducer } from 'react';
///////////////////////////
import PropTypes from 'prop-types';
ExitProvider.propTypes = {
  children: PropTypes.element,
};
///////////////////////////
const ExitContext = createContext();
const initialState = {
  isExitOpen: false,
};
function reducer(state, action) {
  switch (action.type) {
    case 'exit/showExitWindow':
      return {
        ...state,
        isExitOpen: true,
      };
    case 'exit/hideExitWindow':
      return {
        ...state,
        isExitOpen: false,
      };
    case 'exit/toggleExitWindow':
      return {
        ...state,
        isExitOpen: !state.isExitOpen,
      };
    default:
      throw new Error('Action Unknown!');
  }
}

function ExitProvider({ children }) {
  const [{ isExitOpen }, dispatch] = useReducer(reducer, initialState);

  function showExitWindow() {
    dispatch({ type: 'exit/showExitWindow' });
  }

  function hideExitWindow() {
    dispatch({ type: 'exit/hideExitWindow' });
  }

  function toggleExitWindow() {
    dispatch({ type: 'exit/toggleExitWindow' });
  }

  return (
    <ExitContext.Provider value={{ isExitOpen, showExitWindow, hideExitWindow, toggleExitWindow }}>
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
