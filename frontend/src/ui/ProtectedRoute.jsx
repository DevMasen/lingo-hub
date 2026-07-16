import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { HiOutlineHome } from 'react-icons/hi';
import { useSession } from '../features/authentication/useSession';
import FullPage from './FullPage';
import Spinner from './Spinner';
import Error from './Error';
import HomeButton from './HomeButton';
//---

function ProtectedRoute({ children }) {
  //! React Router
  const navigate = useNavigate();

  //! React Query
  const { isAuthenticated, isLoading, error } = useSession();

  //! Effects
  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) {
        navigate('/home');
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  //! Conditional JSX
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (error) {
    return (
      <FullPage>
        <Error className="h-36 w-80" error={error.message} />
        <HomeButton to={'/home'}>
          <span>خانه</span>
          <HiOutlineHome />
        </HomeButton>
      </FullPage>
    );
  }

  //! Main JSX
  return children;
}

export default ProtectedRoute;
