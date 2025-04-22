// Signup.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FiX, FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Signup({ onClose, onSwitchToLogin }) {
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
      setError(t('Password Mismatch'));
      return;
    }

    if (formData.password.length < 6) {
      setError(t('Password Length'));
      return;
    }

    try {
      setLoading(true);
      await signup(formData.email, formData.password, formData.displayName);
      onClose();
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError(t('Email Exists'));
          break;
        case 'auth/invalid-email':
          setError(t('Invalid Email'));
          break;
        case 'auth/weak-password':
          setError(t('Weak Password'));
          break;
        default:
          setError(t('General Error'));
      }
    } finally {
      setLoading(false);
    }
  };

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

  return (
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
                {t('Welcome to')}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {t('Sign up')}
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('Full Name')}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:text-white transition-all"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  required
                />
              </div>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder={t('Email Address')}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:text-white transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder={t('Create Password')}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:text-white transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder={t('Confirm Password')}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:text-white transition-all"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                {loading ? t('Creating Account') : t('Submit')}
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

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="text-sm font-medium">Google</span>
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            {t('Already have an account?')}{' '}
            <button 
              onClick={() => {
                onClose();
                onSwitchToLogin();
              }}
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t('Log in')}
            </button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}