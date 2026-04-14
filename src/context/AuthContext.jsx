import { createContext, useContext, useReducer } from "react";
/////////////////////////////////////////////////////////////
import PropTypes from "prop-types";
AuthProvider.propTypes = {
  children: PropTypes.element,
};
/////////////////////////////////////
const AuthContext = createContext();
const FAKE_USERS = [
  {
    id: 0,
    firstName: "محمدحسین",
    lastName: "محسنی",
    phoneNumber: "09339602368",
    language: "انگلیسی",
    level: "پیشرفته",
    email: "jack@example.com",
    password: "qwerty",
    signupStatus: "confirmed",
    reservedRooms: [
      { roomId: 0, time: 3 },
      { roomId: 3, time: 4 },
    ],
    maxReserveCount: 3,
  },
];
const initialState = {
  user: null,
  isAuthenticated: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown Action!");
  }
}
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function login(id, email, password) {
    const user = FAKE_USERS.find((user) => user.id === id);
    if (user.email === email && user.password === password)
      dispatch({ type: "login", payload: user });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
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
  if (context === undefined)
    throw new Error("AuthContext used outside of AuthProvider!");
  return context;
}

// eslint-disable-next-line
export { AuthProvider, useAuth };
