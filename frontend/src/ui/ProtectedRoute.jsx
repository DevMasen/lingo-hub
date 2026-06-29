import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import FullPage from './FullPage';
import Spinner from './Spinner';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated] = useState(true);
  const [isLoading] = useState(false);

  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) {
        navigate('/home');
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  return children;
}

export default ProtectedRoute;
