import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) return <div>{t('common.loading')}</div>;
  return user ? children : <Navigate to="/login" replace />;
}