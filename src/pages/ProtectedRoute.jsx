import { useEffect } from "react";
import { useNavigate } from "react-router";
////////////////////////////////
import { useAuth } from "../context/AuthContext";
////////////////////////////////////
import PropTypes from "prop-types";
ProtectedRoute.propTypes = {
  children: PropTypes.element,
};
////////////////////////////////
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate],
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
