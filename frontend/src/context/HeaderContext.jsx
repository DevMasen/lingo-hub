import { createContext, useContext, useReducer } from 'react';
//---

const HeaderContext = createContext();

const initialState = {
  isNotificationOpen: false,
  isProfileOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'header/toggleNotification':
      return {
        ...state,
        isNotificationOpen: !state.isNotificationOpen,
      };
    case 'header/toggleProfile':
      return {
        ...state,
        isProfileOpen: !state.isProfileOpen,
      };
    default:
      throw new Error('Unknown Action!');
  }
}

function HeaderProvider({ children }) {
  const [{ isNotificationOpen, isProfileOpen }, dispatch] = useReducer(reducer, initialState);

  function toggleNotification() {
    dispatch({ type: 'header/toggleNotification' });
  }

  function toggleProfile() {
    dispatch({ type: 'header/toggleProfile' });
  }

  return (
    <HeaderContext.Provider
      value={{ isNotificationOpen, isProfileOpen, toggleNotification, toggleProfile }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) throw new Error('HeaderContext used outside of HeaderProvider');
  return context;
}

export { HeaderProvider, useHeader };
