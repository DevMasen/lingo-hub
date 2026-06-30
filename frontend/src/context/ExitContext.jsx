import { createContext, useContext, useState } from 'react';
//---

const ExitContext = createContext();

function ExitProvider({ children }) {
  const [isExitOpen, setIsExitOpen] = useState(false);

  function toggleExitWindow() {
    setIsExitOpen((open) => !open);
  }

  function hideExitWindow() {
    setIsExitOpen(false);
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
