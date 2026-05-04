import './index.css';
//////////////////////
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
//////////////////////////////////
import ReserveRoom, { loader as reserveRoomLoader } from './components/ReserveRoom';
import Dashboard, { loader as userLoader } from './components/Dashboard';
import Setting from './components/Setting';
import UserInfo from './components/UserInfo';
import PasswordChange from './components/PasswordChange';
import Support from './components/Support';
///////////////////////////////////////////
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import LoginOptions, { loader as loginOptionsLoader } from './pages/LoginOptions';
import LoginUser, { action as loginUserAction } from './pages/LoginUser';
import LoginByOTP from './pages/LoginByOTP';
import SignUp, { action as createUserAction, loader as usersLoader } from './pages/SignUp';
import AboutUs from './pages/AboutUs';
import ErrorPage from './pages/ErrorPage';
import PageNotFound from './pages/PageNotFound';
////////////////////////////////////////////////
import AppLayout from './ui/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';
//////////////////////////////////////
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login />,
    children: [
      { index: true, element: <Navigate to="options" replace /> },
      {
        path: 'options',
        element: <LoginOptions />,
        loader: loginOptionsLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: ':userId',
        element: <LoginUser />,
        action: loginUserAction,
        errorElement: <ErrorPage />,
      },
      { path: ':userId/otp', element: <LoginByOTP /> },
    ],
  },
  {
    path: '/signup',
    element: <SignUp />,
    action: createUserAction,
    loader: usersLoader,
    errorElement: <ErrorPage />,
  },
  { path: '/aboutus', element: <AboutUs /> },
  {
    path: '/app/:userId',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: userLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: 'reserve',
        element: <ReserveRoom />,
        loader: reserveRoomLoader,
        errorElement: <ErrorPage />,
      },
      { path: 'support', element: <Support /> },
      {
        path: 'setting',
        element: <Setting />,
        children: [
          { index: true, element: <Navigate to="user" replace /> },
          { path: 'user', element: <UserInfo /> },
          { path: 'password', element: <PasswordChange /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
