// import { Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';  // Import useAuth
// import HomePage from './pages/HomePage';
// import Settings from './pages/Settings';
// import Login from './pages/Auth/Login';
// import Signup from './pages/Auth/Signup';
// import ForgotPassword from './pages/Auth/ForgotPassword';
// import ErrorBoundary from './components/Common/ErrorBoundary';
// import PrivateRoute from './components/Auth/PrivateRoute';
// import './i18n';

// function LoadingFallback() {
//   const { t } = useTranslation();
//   return <div>{t('common.loading')}</div>;
// }

// export default function App() {
//   return (
//     <Suspense fallback={<LoadingFallback />}>
//       <Router>
//         <AuthProvider>  {/* Move AuthProvider here */}
//           <ErrorBoundary>
//             <AppContent />
//           </ErrorBoundary>
//         </AuthProvider>
//       </Router>
//     </Suspense>
//   );
// }

// function AppContent() {
//   const { user } = useAuth();  // Access user from AuthContext

//   return (
//     <Routes>
//       <Route path="/" element={user ? <HomePage /> : <Navigate to="/guest" />} />
//       <Route path="/guest" element={<HomePage />} />  {/* Replace with your guest homepage */}
//       <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
//       <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }





import { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ErrorBoundary from './components/Common/ErrorBoundary';
import PrivateRoute from './components/Auth/PrivateRoute';
import './i18n';

function LoadingFallback() {
  return <div>Loading...</div>;
}

function AppContent() {
  const { user } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage showSettings={showSettings} setShowSettings={setShowSettings} />} />
        <Route path="/guest" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      {showSettings && (
        <Settings
          visible={showSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Router>
        <AuthProvider>
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </AuthProvider>
      </Router>
    </Suspense>
  );
}