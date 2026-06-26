import './index.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

// Not Protected
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PageNotFound from './pages/PageNotFound';

// Protected
import Dashboard from './pages/Dashboard';
import ReserveRoom from './pages/ReserveRoom';
import Wallet from './pages/Wallet';
import Setting from './pages/Setting';
import Support from './pages/Support';

import LoginOptions from './features/authentication/LoginOptions';
import LoginUser from './features/authentication/LoginUser';
import LoginByOTP from './features/authentication/LoginByOTP';
import UserInfo from './features/setting/UserInfo';
import PaymentStatus from './features/setting/PaymentStatus';
import PayModal from './features/setting/PayModal';
import PasswordChange from './features/setting/PasswordChange';

import AppLayout from './ui/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reserve" element={<ReserveRoom />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="setting" element={<Setting />}>
            <Route index element={<Navigate to="user" replace />} />
            <Route path="user" element={<UserInfo />} />
            <Route path="user/change-name" element={<UserInfo />} />
            <Route path="user/pay" element={<PayModal />} />
            <Route path="change-password" element={<PasswordChange />} />
          </Route>
          <Route path="status" element={<PaymentStatus />} />
          <Route path="support" element={<Support />} />
        </Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />}>
          <Route index element={<Navigate to="options" />} />
          <Route path="options" element={<LoginOptions />} />
          <Route path="user" element={<LoginUser />} />
          <Route path="otp" element={<LoginByOTP />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
