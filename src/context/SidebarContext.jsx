import { createContext, useContext, useReducer } from 'react';

const SidebarContext = createContext();
const initialState = {
  isSidebarOpen: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'sidebar/toggleSidebar':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      throw new Error('Unknown Action!');
  }
}

function SidebarProvider({ children }) {
  const [{ isSidebarOpen }, dispatch] = useReducer(reducer, initialState);

  function toggleSidebar() {
    dispatch({ type: 'sidebar/toggleSidebar' });
  }

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) throw new Error('Sidebar Context used outside of SidebarProvider');
  return context;
}

export { SidebarProvider, useSidebar };
