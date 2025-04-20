// app.jsx
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ErrorBoundary from './components/Common/ErrorBoundary';
import PrivateRoute from './components/Auth/PrivateRoute';
import './i18n';

function LoadingFallback() {
  const { t } = useTranslation();
  return <div>{t('common.loading')}</div>;
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Router>
        <AuthProvider>
          <ErrorBoundary>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
              <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ErrorBoundary>
        </AuthProvider>
      </Router>
    </Suspense>
  );
}