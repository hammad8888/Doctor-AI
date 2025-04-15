import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FiX, FiMail, FiLock } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loginWithGoogle, loginWithEmail, guestLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(t('login.googleError'));
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    guestLogin();
    navigate('/');
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t('login.fillAllFields'));
      return;
    }

    try {
      setLoading(true);
      await loginWithEmail(email, password);
      navigate('/');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError(t('login.userNotFound'));
          break;
        case 'auth/wrong-password':
          setError(t('login.wrongPassword'));
          break;
        default:
          setError(t('login.generalError'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg"
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {t('login.title')}
            </h2>
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('login.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder={t('login.emailPlaceholder')}
                  className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('login.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder={t('login.passwordPlaceholder')}
                  className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-lg transition-colors ${
                loading
                  ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600'
              }`}
            >
              {loading ? t('login.loading') : t('login.emailButton')}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white dark:bg-gray-800 text-sm text-gray-500">
                {t('login.or')}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FcGoogle className="w-5 h-5" />
              {t('login.googleButton')}
            </button>

            <button
              onClick={handleGuestLogin}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {t('login.guestButton')}
            </button>
          </div>

          <div className="text-center space-y-2">
            <Link 
              to="/forgot-password" 
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t('login.forgotPassword')}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('login.noAccount')}{' '}
              <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
                {t('login.signupLink')}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}