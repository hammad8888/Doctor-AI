import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FiX, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Signup() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loginWithGoogle, signup } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(t('signup.passwordMismatch'));
      return;
    }

    if (formData.password.length < 6) {
      setError(t('signup.passwordLength'));
      return;
    }

    try {
      setLoading(true);
      await signup(formData.email, formData.password, formData.displayName);
      navigate('/');
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError(t('signup.emailExists'));
          break;
        case 'auth/invalid-email':
          setError(t('signup.invalidEmail'));
          break;
        case 'auth/weak-password':
          setError(t('signup.weakPassword'));
          break;
        default:
          setError(t('signup.generalError'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(t('signup.googleError'));
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
              {t('signup.title')}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('signup.displayName')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={t('signup.displayNamePlaceholder')}
                  className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('signup.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder={t('signup.emailPlaceholder')}
                  className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('signup.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder={t('signup.passwordPlaceholder')}
                  className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('signup.confirmPassword')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder={t('signup.confirmPasswordPlaceholder')}
                  className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
              {loading ? t('signup.loading') : t('signup.submitButton')}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white dark:bg-gray-800 text-sm text-gray-500">
                {t('signup.or')}
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FcGoogle className="w-5 h-5" />
            {t('signup.googleButton')}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            {t('signup.haveAccount')}{' '}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              {t('signup.loginLink')}
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}