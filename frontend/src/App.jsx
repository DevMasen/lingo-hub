import './index.css';

import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { Toaster } from 'react-hot-toast';

import AppLayout from './ui/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';
import FullPage from './ui/FullPage';
import Spinner from './ui/Spinner';

// Not Protected
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

// Protected
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ReserveRoom = lazy(() => import('./pages/ReserveRoom'));
const Wallet = lazy(() => import('./pages/Wallet'));
const Setting = lazy(() => import('./pages/Setting'));
const Support = lazy(() => import('./pages/Support'));

const LoginEmail = lazy(() => import('./features/authentication/LoginEmail'));
const LoginVerifyOTP = lazy(() => import('./features/authentication/LoginVerifyOTP'));
const UserInfo = lazy(() => import('./features/setting/UserInfo'));
const PasswordChange = lazy(() => import('./features/setting/PasswordChange'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense
          fallback={
            <FullPage>
              <Spinner />
            </FullPage>
          }
        >
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
              {/* TODO #5: add new route: resume */}
              <Route path="setting" element={<Setting />}>
                <Route index element={<Navigate to="user" replace />} />
                <Route path="user" element={<UserInfo />} />
                <Route path="change-password" element={<PasswordChange />} />
              </Route>
              <Route path="support" element={<Support />} />
            </Route>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />}>
              <Route index element={<Navigate to="email" />} />
              <Route path="email" element={<LoginEmail />} />
              <Route path="otp" element={<LoginVerifyOTP />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
        <ReactQueryDevtools initialOpen={false} />
        <Toaster
          position="top-center"
          reverseOrder={true}
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-slate-600)',
              color: 'var(--color-slate-200)',
            },
            success: { duration: 3000 },
            error: { duration: 5000 },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
