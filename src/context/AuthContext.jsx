import { createContext, useCallback, useContext, useReducer } from 'react';
/////////////////////////////////////////////////////////////
import PropTypes from 'prop-types';
AuthProvider.propTypes = {
  children: PropTypes.element,
};
/////////////////////////////////////
const AuthContext = createContext();

const initialState = {
  activeTab: 'mobile',
  step: 'first',
  isPassHidden: true,
  loading: false,
  error: '',

  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'auth/toggleActiveTab':
      return {
        ...state,
        activeTab: state.activeTab === 'mobile' ? 'email' : 'mobile',
        error: '',
      };
    case 'auth/setStep':
      return {
        ...state,
        step: action.payload,
      };
    case 'auth/togglePassHidden':
      return {
        ...state,
        isPassHidden: !state.isPassHidden,
      };
    case 'auth/toggleLoading':
      return {
        ...state,
        loading: !state.loading,
      };
    case 'auth/setError':
      return {
        ...state,
        error: action.payload,
      };

    case 'auth/login':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'auth/logout':
      return {
        ...state,
        isAuthenticated: false,
        step: 'first',
        activeTab: 'mobile',
      };

    default:
      throw new Error('Unknown Action!');
  }
}
function AuthProvider({ children }) {
  const [{ activeTab, step, isPassHidden, loading, error, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function toggleActiveTab() {
    dispatch({ type: 'auth/toggleActiveTab' });
  }

  const setStep = useCallback(function setStep(step = 'first') {
    dispatch({ type: 'auth/setStep', payload: step });
  }, []);

  function togglePassHidden() {
    dispatch({ type: 'auth/togglePassHidden' });
  }

  function toggleLoading() {
    dispatch({ type: 'auth/toggleLoading' });
  }

  const setError = useCallback(function setError(errorMessage = '') {
    dispatch({ type: 'auth/setError', payload: errorMessage });
  }, []);

  function logout() {
    dispatch({ type: 'auth/logout' });
  }

  return (
    <AuthContext.Provider
      value={{
        activeTab,
        step,
        isPassHidden,
        loading,
        error,
        isAuthenticated,
        toggleActiveTab,
        setStep,
        togglePassHidden,
        toggleLoading,
        setError,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('AuthContext used outside of AuthProvider!');
  return context;
}

// eslint-disable-next-line
export { AuthProvider, useAuth };
