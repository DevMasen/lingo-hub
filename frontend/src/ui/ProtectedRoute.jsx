import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useSession } from '../features/authentication/useSession';

import FullPage from './FullPage';
import Spinner from './Spinner';
//---

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoadingSession } = useSession();

  useEffect(
    function () {
      if (!isLoadingSession && !isAuthenticated) {
        navigate('/login');
      }
    },
    [isAuthenticated, isLoadingSession, navigate]
  );

  if (isLoadingSession)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  return children;
}

export default ProtectedRoute;
