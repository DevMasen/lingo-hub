import { createContext, useContext, useReducer } from 'react';
/////////////////////////////////////////////////////////////
import PropTypes from 'prop-types';
AuthProvider.propTypes = {
  children: PropTypes.element,
};
/////////////////////////////////////
const AuthContext = createContext();
// const FAKE_USERS = [
//   {
//     id: 0,
//     firstName: 'محمدحسین',
//     lastName: 'محسنی',
//     phoneNumber: '09339602368',
//     language: 'انگلیسی',
//     level: 'پیشرفته',
//     explanation: '',
//     email: 'jack@example.com',
//     password: 'qwerty',
//     signupStatus: 'confirmed',
//     reservedRooms: [
//       { roomId: 0, timePart: 4 },
//       { roomId: 3, timePart: 8 },
//     ],
//     maxReserveCount: 3,
//   },
// ];
const initialState = {
  activeTab: 'mobile',
  step: 'first',
  isPassHidden: true,
  loading: false,
  error: '',
  user: null,
  isAuthenticated: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'auth/toggleActiveTab':
      return {
        ...state,
        activeTab: state.activeTab === 'mobile' ? 'email' : 'mobile',
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
      return { ...state };
    default:
      throw new Error('Unknown Action!');
  }
}
function AuthProvider({ children }) {
  const [{ activeTab, step, isPassHidden, loading, error, user, isAuthenticated }, dispatch] =
    useReducer(reducer, initialState);

  function toggleActiveTab() {
    dispatch({ type: 'auth/toggleActiveTab' });
  }

  function setStep(step = 'first') {
    dispatch({ type: 'auth/setStep', payload: step });
  }

  function togglePassHidden() {
    dispatch({ type: 'auth/togglePassHidden' });
  }

  function toggleLoading() {
    dispatch({ type: 'auth/toggleLoading' });
  }

  function setError(errorMessage = '') {
    dispatch({ type: 'auth/setError', payload: errorMessage });
  }

  function login() {}

  return (
    <AuthContext.Provider
      value={{
        activeTab,
        step,
        isPassHidden,
        loading,
        error,
        user,
        isAuthenticated,
        toggleActiveTab,
        setStep,
        togglePassHidden,
        toggleLoading,
        setError,
        login,
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
