

import { FiUser, FiFile, FiImage } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function MessageBubble({ message, isBot }) {
  const { t } = useTranslation();

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} ${t('messageBubble.bytes')}`;
    if (bytes < 1048576) return `${(bytes/1024).toFixed(1)} ${t('messageBubble.kb')}`;
    return `${(bytes/1048576).toFixed(1)} ${t('messageBubble.mb')}`;
  };

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[90%] md:max-w-[85%] p-4 rounded-2xl ${
        isBot ? 
          'bg-white dark:bg-gray-700 shadow-md border border-gray-100 dark:border-gray-600' :
          'bg-gradient-to-r from-blue-600 to-green-500 text-white'
      }`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 pt-1">
            {isBot ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-white">
                <span className="text-sm">⚕</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <FiUser className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium ${
                isBot ? 'text-blue-600 dark:text-blue-400' : 'text-white/90'
              }`}>
                {isBot ? t('messageBubble.doctorAI') : t('messageBubble.you')}
              </span>
              <span className={`text-xs ${
                isBot ? 'text-gray-500 dark:text-gray-400' : 'text-white/70'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            
            {message.text && (
              <p className={`whitespace-pre-wrap ${
                isBot ? 'text-gray-800 dark:text-gray-200' : 'text-white'
              }`}>
                {message.text}
              </p>
            )}
            
            {message.file && (
              <div className={`mt-3 p-2 rounded-lg ${
                isBot ? 
                  'bg-gray-100 dark:bg-gray-800' : 
                  'bg-white/20'
              } flex items-center gap-2`}>
                {message.file.type.startsWith('image/') ? (
                  <>
                    <FiImage className="w-5 h-5" />
                    <img 
                      src={URL.createObjectURL(message.file)}
                      alt={t('messageBubble.uploadedImage')}
                      className="h-20 w-20 object-cover rounded"
                    />
                  </>
                ) : (
                  <>
                    <FiFile className="w-5 h-5" />
                    <div>
                      <p className={`text-sm font-medium truncate ${
                        isBot ? 'text-gray-800 dark:text-gray-200' : 'text-white'
                      }`}>
                        {message.file.name}
                      </p>
                      <p className={`text-xs ${
                        isBot ? 'text-gray-500 dark:text-gray-400' : 'text-white/70'
                      }`}>
                        {formatFileSize(message.file.size)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

MessageBubble.propTypes = {
  message: PropTypes.object.isRequired,
  isBot: PropTypes.bool
};