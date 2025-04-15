import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'sk', name: 'Slovak' },
  { code: 'zh', name: 'Chinese' }
];

export default function LanguageSelector() {
  const { language, setLanguage } = useAuth();
  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <select
      value={language}
      onChange={handleChange}
      className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}