import { createContext, useReducer, useContext } from "react";
////////////////////////
import PropTypes from "prop-types";
RoomsProvider.propTypes = {
  children: PropTypes.element,
};
////////////////////
const RoomsContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
  rooms: [],
  status: "loaded", // loading, loaded, error
  errorMessage: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "rooms/loading":
      return {
        ...state,
        status: "loading",
      };
    default:
      throw new Error("Action Unknown");
  }
}
function RoomsProvider({ children }) {
  const [{ rooms, status, errorMessage }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  return (
    <RoomsContext.Provider value={{ rooms, status, errorMessage, dispatch }}>
      {children}
    </RoomsContext.Provider>
  );
}

function useRooms() {
  const context = useContext(RoomsContext);
  if (!context) throw new Error("RoomsContext used outside of RoomsProvider!");
  return context;
}

// eslint-disable-next-line
export { RoomsProvider, useRooms };
