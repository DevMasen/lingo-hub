import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  //! React Router
  const navigate = useNavigate();

  //! Context Data
  const { isAuthenticated } = useAuth();

  //! Effects
  useEffect(
    function () {
      if (!isAuthenticated) navigate('/');
    },
    [isAuthenticated, navigate]
  );

  //! JSX
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
