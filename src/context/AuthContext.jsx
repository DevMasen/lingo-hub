import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
/////////////////////////////////////////////////////////////
import PropTypes from 'prop-types';
AuthProvider.propTypes = {
  children: PropTypes.element,
};
/////////////////////////////////////
const AuthContext = createContext();
const BASE_URL = 'http://localhost:8000';
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
  users: [],
  currentUser: undefined,
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
    case 'auth/usersLoaded':
      return {
        ...state,
        users: action.payload,
      };
    case 'auth/setCurrentUser':
      return {
        ...state,
        currentUser: action.payload,
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
        currentUser: undefined,
        step: 'first',
        activeTab: 'mobile',
      };

    default:
      throw new Error('Unknown Action!');
  }
}
function AuthProvider({ children }) {
  const [
    { activeTab, step, isPassHidden, loading, error, users, currentUser, isAuthenticated },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function getUsers() {
      try {
        const res = await fetch(`${BASE_URL}/users`);
        if (!res.ok) throw new Error('Network Error : code01');
        const data = await res.json();
        dispatch({ type: 'auth/usersLoaded', payload: data });
      } catch (e) {
        console.error(e.message);
      }
    }
    getUsers();
  }, []);

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

  const submitByMobile = useCallback(
    function submitByMobile(phoneNumber = '') {
      const user = users.find((user) => user.phoneNumber === phoneNumber);
      dispatch({ type: 'auth/setCurrentUser', payload: user });
    },
    [users]
  );

  const submitByEmail = useCallback(
    function submitByEmail(email = '') {
      const user = users.find((user) => user.email === email);
      dispatch({ type: 'auth/setCurrentUser', payload: user });
    },
    [users]
  );

  function login(password = '') {
    if (currentUser.password === password) {
      dispatch({ type: 'auth/login' });
      return true;
    }
    return false;
  }

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
        currentUser,
        isAuthenticated,
        toggleActiveTab,
        setStep,
        togglePassHidden,
        toggleLoading,
        setError,
        submitByMobile,
        submitByEmail,
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
