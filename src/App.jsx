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
import User from './components/User';
import PageNotFound from './pages/PageNotFound';
import AboutUs from './pages/AboutUs';

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
      { index: true, element: <Navigate to="user" replace /> },
      { path: 'user', element: <User /> },
      { path: 'rooms', element: <RoomList /> },
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
