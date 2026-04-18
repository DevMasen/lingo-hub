import { createContext, useContext, useReducer } from 'react';

const SignupContext = createContext();

const initialState = {
  loading: false,
  error: '',
  errorField: '',
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'signup/toggleLoading':
      return { ...state, loading: !state.loading };
    case 'signup/setError':
      return { ...state, error: action.payload };
    case 'signup/setErrorField':
      return { ...state, errorField: action.payload };
    default:
      throw new Error('Unknown Action');
  }
}

function SignupProvider({ children }) {
  const [{ loading, error, errorField, user }, dispatch] = useReducer(reducer, initialState);

  function toggleLoading() {
    dispatch({ type: 'signup/toggleLoading' });
  }

  function setError(errorMessage = 'Unknown Error!') {
    dispatch({ type: 'signup/setError', payload: errorMessage });
  }

  function setErrorField(field = '') {
    dispatch({ type: 'signup/setErrorField', payload: field });
  }

  return (
    <SignupContext.Provider
      value={{ loading, error, errorField, user, toggleLoading, setError, setErrorField }}
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
