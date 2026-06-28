import { createContext, useContext, useState } from 'react';
//---

const SignupContext = createContext();

function SignupProvider({ children }) {
  const [step, setStep] = useState('1');

  return (
    <SignupContext.Provider
      value={{
        step,
        setStep,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
}

function useSignup() {
  const context = useContext(SignupContext);
  if (context === undefined) throw new Error('SignupContext used outside of SignupProvider');
  return context;
}

export { SignupProvider, useSignup };
