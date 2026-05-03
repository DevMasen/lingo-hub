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
  isPassHidden: true,
  loading: false,
  error: '',
  path: '',
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
    case 'auth/togglePassHidden':
      return {
        ...state,
        isPassHidden: !state.isPassHidden,
      };
    case 'auth/setLoading':
      return {
        ...state,
        loading: action.payload,
      };
    case 'auth/setError':
      return {
        ...state,
        error: action.payload,
      };
    case 'auth/setPath':
      return {
        ...state,
        path: action.payload,
      };
    case 'auth/login':
      return {
        ...state,
        isAuthenticated: true,
        activeTab: 'mobile',
      };
    case 'auth/logout':
      return {
        ...state,
        isAuthenticated: false,
        activeTab: 'mobile',
      };

    default:
      throw new Error('Unknown Action!');
  }
}
function AuthProvider({ children }) {
  const [{ activeTab, isPassHidden, loading, error, path, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function toggleActiveTab() {
    dispatch({ type: 'auth/toggleActiveTab' });
  }

  function togglePassHidden() {
    dispatch({ type: 'auth/togglePassHidden' });
  }

  const setLoading = useCallback(function setLoading(isLoading) {
    dispatch({ type: 'auth/setLoading', payload: isLoading });
  }, []);

  const setError = useCallback(function setError(errorMessage = '') {
    dispatch({ type: 'auth/setError', payload: errorMessage });
  }, []);

  const setPath = useCallback(function setPath(toPath = '') {
    dispatch({ type: 'auth/setPath', payload: toPath });
  }, []);

  function login() {
    dispatch({ type: 'auth/login' });
  }

  function logout() {
    dispatch({ type: 'auth/logout' });
  }

  return (
    <AuthContext.Provider
      value={{
        activeTab,
        isPassHidden,
        loading,
        error,
        path,
        isAuthenticated,
        toggleActiveTab,
        togglePassHidden,
        setLoading,
        setError,
        setPath,
        login,
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
