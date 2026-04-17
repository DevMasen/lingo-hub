import './index.css';
//////////////////////
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
//////////////////////////////////
import AppLayout from './ui/AppLayout';
import HomePage from './pages/HomePage';
import ProtectedRoute from './ui/ProtectedRoute';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RoomList from './components/RoomList';
import PageNotFound from './pages/PageNotFound';
import AboutUs from './pages/AboutUs';
import Dashboard from './components/Dashboard';
import UserInfo from './components/UserInfo';

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
      { path: 'rooms', element: <RoomList /> },
      { path: 'setting/user', element: <UserInfo /> },
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
