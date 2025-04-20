import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { language, setLanguage } = useAuth();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
  };

  return (
    <select
      value={language}
      onChange={handleChange}
      className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
    >
      <option value="en">{t('languages.en')}</option>
      <option value="sk">{t('languages.sk')}</option>
    </select>
  );
}