import { SPECIALIZATIONS } from '../../config/constants';
import { useTranslation } from 'react-i18next';

export default function SpecializationSelect({ value, onChange }) {
  const { t } = useTranslation();

  const getTranslatedSpecialization = (spec) => {
    return t(`specializations.${spec.replace(/\s+/g, '_').toLowerCase()}`) || spec;
  };

  return (
    <div className="relative w-full max-w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 sm:p-2 md:p-3 pl-4 pr-10
                   text-base sm:text-sm 
                   rounded-xl sm:rounded-lg 
                   border border-gray-200 dark:border-gray-700 
                   bg-white dark:bg-gray-800 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   appearance-none transition-all 
                   hover:border-gray-300 dark:hover:border-gray-600 
                   min-w-0"
      >
        {SPECIALIZATIONS.map(spec => (
          <option key={spec} value={spec} className="text-base sm:text-sm">
            {getTranslatedSpecialization(spec)}
          </option>
        ))}
      </select>
      <div className="absolute right-3 sm:right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg 
          className="w-5 h-5 sm:w-4 sm:h-4 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </div>
    </div>
  );
}