import './index.css';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import ReserveRoom, { loader as reserveRoomLoader } from './features/reserve/ReserveRoom';
import Dashboard, { loader as NewsLoader } from './features/dashboard/Dashboard';
import Setting from './pages/Setting';
import UserInfo, {
  loader as userLoader,
  action as cancelReserveAction,
} from './features/user/UserInfo';
import { action as changeNameAction } from './components/UserInfoHeader';
import PasswordChange from './components/PasswordChange';
import Support from './pages/Support';
import { action as confirmReserveAction } from './features/reserve/ConfirmReserveModal';
import Wallet from './features/wallet/Wallet';
import PayModal, { action as payAction } from './components/PayModal';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import LoginOptions, { loader as loginOptionsLoader } from './pages/LoginOptions';
import LoginUser, { action as loginUserAction } from './pages/LoginUser';
import LoginByOTP, {
  action as loginByOTPAction,
  loader as loginByOTPLoader,
} from './pages/LoginByOTP';
import SignUp, { action as createUserAction, loader as usersLoader } from './pages/SignUp';
import AboutUs from './pages/AboutUs';
import ErrorPage from './pages/ErrorPage';
import PageNotFound from './pages/PageNotFound';
import PaymentStatus from './pages/PaymentStatus';

import AppLayout from './ui/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';

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
      {
        path: ':userId/otp',
        element: <LoginByOTP />,
        action: loginByOTPAction,
        loader: loginByOTPLoader,
        errorElement: <ErrorPage />,
      },
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
        loader: NewsLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: 'reserve',
        element: <ReserveRoom />,
        loader: reserveRoomLoader,
        action: confirmReserveAction,
        errorElement: <ErrorPage />,
      },
      { path: 'wallet', element: <Wallet /> },
      { path: 'support', element: <Support /> },
      {
        path: 'setting',
        element: <Setting />,
        children: [
          { index: true, element: <Navigate to="user" replace /> },
          {
            path: 'user',
            element: <UserInfo />,
            loader: userLoader,
            action: cancelReserveAction,
            errorElement: <ErrorPage />,
          },
          {
            path: 'user/pay',
            element: <PayModal />,
            action: payAction,
            errorElement: <ErrorPage />,
          },
          {
            path: 'user/changename',
            element: <UserInfo />,
            loader: userLoader,
            action: changeNameAction,
            errorElement: <ErrorPage />,
          },
          { path: 'password', element: <PasswordChange /> },
        ],
      },
      { path: 'status', element: <PaymentStatus /> },
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
