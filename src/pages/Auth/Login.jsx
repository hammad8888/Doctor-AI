// Login.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FiX, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ForgotPassword from './ForgotPassword';

export default function Login({ onClose, onSwitchToSignup }) {
  const { t } = useTranslation();
  const { loginWithGoogle, loginWithEmail, guestLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      onClose();
    } catch (err) {
      setError(t('Google Error'));
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    guestLogin();
    onClose();
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t('Fill All Fields'));
      return;
    }

    try {
      setLoading(true);
      await loginWithEmail(email, password);
      onClose();
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError(t('User Not Found'));
          break;
        case 'auth/wrong-password':
          setError(t('Wrong Password'));
          break;
        default:
          setError(t('General Error'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showForgotPassword && (
          <ForgotPassword onClose={() => setShowForgotPassword(false)} />
        )}
      </AnimatePresence>

      {!showForgotPassword && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t('Welcome Back')}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {t('To Login')}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-lg flex items-center gap-2">
                  <FiX className="flex-shrink-0" />
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleEmailLogin}>
                <div className="space-y-4">
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder={t('Enter Email')}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:text-white transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      placeholder={t('Enter Password')}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:text-white transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl transition-all ${
                    loading
                      ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600'
                  }`}
                >
                  <span className="font-semibold">
                    {loading ? t('Loading') : t('Login')}
                  </span>
                  <FiArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  {t('OR')}
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <FcGoogle className="w-5 h-5" />
                  <span className="text-sm font-medium">Google</span>
                </button>

                <button
                  onClick={handleGuestLogin}
                  className="flex items-center justify-center gap-2 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-sm font-medium">{t('Guest Mode')}</span>
                </button>
              </div>

              <div className="text-center space-y-3">
                <button
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t('Forgot Password')}
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("Don't have an account?")}{' '}
                  <button
                    onClick={() => {
                      onClose();
                      onSwitchToSignup();
                    }}
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t('Sign up')}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}