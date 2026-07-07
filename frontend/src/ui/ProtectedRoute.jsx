import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useSession } from '../features/authentication/useSession';

import FullPage from './FullPage';
import Spinner from './Spinner';
import Error from './Error';
import HomeButton from './HomeButton';
import { HiOutlineHome } from 'react-icons/hi';
//---

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoadingSession, error } = useSession();

  useEffect(
    function () {
      if (!isLoadingSession && !isAuthenticated) {
        navigate('/home');
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

  if (error) {
    return (
      <FullPage>
        <Error extraClasses="w-80 h-36" error={error.message} />
        <HomeButton to={'/home'}>
          <span>خانه</span>
          <HiOutlineHome />
        </HomeButton>
      </FullPage>
    );
  }
  return children;
}

export default ProtectedRoute;
