import { createContext, useCallback, useContext, useReducer } from 'react';

const SignupContext = createContext();

const initialState = {
  step: '1',
  loading: false,
  error: '',
  errorField: '',
  isPassHidden: true,
  isPassRepHidden: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'signup/setStep':
      return { ...state, step: action.payload };
    case 'signup/setLoading':
      return { ...state, loading: action.payload };
    case 'signup/setError':
      return { ...state, error: action.payload };
    case 'signup/setErrorField':
      return { ...state, errorField: action.payload };
    case 'signup/toggleHidePass':
      return { ...state, isPassHidden: !state.isPassHidden };
    case 'signup/toggleHidePassRep':
      return { ...state, isPassRepHidden: !state.isPassRepHidden };
    default:
      throw new Error('Unknown Action');
  }
}

function SignupProvider({ children }) {
  const [{ step, loading, error, errorField, isPassHidden, isPassRepHidden }, dispatch] =
    useReducer(reducer, initialState);

  function setStep(step = '1') {
    dispatch({ type: 'signup/setStep', payload: step });
  }

  function setLoading(isLoading) {
    dispatch({ type: 'signup/setLoading', payload: isLoading });
  }

  const setError = useCallback(function setError(errorMessage = 'Unknown Error!') {
    dispatch({ type: 'signup/setError', payload: errorMessage });
  }, []);

  const setErrorField = useCallback(function setErrorField(field = '') {
    dispatch({ type: 'signup/setErrorField', payload: field });
  }, []);

  function toggleHidePass() {
    dispatch({ type: 'signup/toggleHidePass' });
  }

  function toggleHidePassRep() {
    dispatch({ type: 'signup/toggleHidePassRep' });
  }

  return (
    <SignupContext.Provider
      value={{
        step,
        loading,
        error,
        errorField,
        isPassHidden,
        isPassRepHidden,
        setStep,
        setLoading,
        setError,
        setErrorField,
        toggleHidePass,
        toggleHidePassRep,
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
