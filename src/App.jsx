import './index.css';
//////////////////////
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
//////////////////////////////////
import AppLayout from './ui/AppLayout';
import HomePage from './pages/HomePage';
import ProtectedRoute from './ui/ProtectedRoute';
import Login from './pages/Login';
import SignUp, { action as createUserAction } from './pages/SignUp';
import ReserveRoom, { loader as reserveRoomLoader } from './components/ReserveRoom';
import PageNotFound from './pages/PageNotFound';
import AboutUs from './pages/AboutUs';
import Dashboard from './components/Dashboard';
import UserInfo from './components/UserInfo';
import Setting from './components/Setting';
import PasswordChange from './components/PasswordChange';
import Support from './components/Support';
import ErrorPage from './pages/ErrorPage';
//////////////////////////////////////
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
    action: createUserAction,
    errorElement: <ErrorPage />,
  },
  { path: '/aboutus', element: <AboutUs /> },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
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
