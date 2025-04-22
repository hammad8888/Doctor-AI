import { useState } from 'react';
import { FiX, FiMail, FiCheckCircle } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPassword({ onClose }) {
  const { t } = useTranslation();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError(t('Email Required'));
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email);
      setMessage(t('Check Your Email'));
      setError('');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError(t('User Not Found'));
          break;
        case 'auth/invalid-email':
          setError(t('Invalid Email'));
          break;
        default:
          setError(t('General Error'));
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
              {t('Reset Password')}
            </h2>
            <button
              onClick={onClose}
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

          {message ? (
            <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-lg flex items-center gap-2">
              <FiCheckCircle className="w-5 h-5" />
              {message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('Enter Email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder={t('Enter Your Email')}
                    className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                {loading ? t('loading') : t('Submit')}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

