// import { useState, useRef, useEffect } from 'react';
// import { FiSend, FiPaperclip } from 'react-icons/fi';
// import PropTypes from 'prop-types';

// export default function UserInput({ onSend, isProcessing }) {
//   const [input, setInput] = useState('');
//   const [file, setFile] = useState(null);
//   const fileInputRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (!isProcessing && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isProcessing]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!input.trim() && !file) return;
//     onSend({ text: input, file });
//     setInput('');
//     setFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;
//     if (selectedFile.size > 5 * 1024 * 1024) {
//       alert('File size should be less than 5MB');
//       return;
//     }
//     setFile(selectedFile);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4">
//       {file && (
//         <div className="mb-3 flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
//           <span className="text-sm flex items-center gap-2 text-blue-600 dark:text-blue-400">
//             <FiPaperclip className="flex-shrink-0" />
//             {file.name}
//           </span>
//           <button
//             type="button"
//             onClick={() => {
//               setFile(null);
//               fileInputRef.current.value = '';
//             }}
//             className="text-red-500 hover:text-red-700 text-sm"
//           >
//             Remove
//           </button>
//         </div>
//       )}
      
//       <div className="flex items-center gap-2">
//         <label className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
//           <FiPaperclip className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             className="hidden"
//             accept="image/*, .pdf, .doc, .docx, .txt"
//             disabled={isProcessing}
//           />
//         </label>

//         <div className="flex-1 relative">
//           <input
//             ref={inputRef}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your message or describe symptoms..."
//             className="w-full p-3 pl-4 pr-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={isProcessing}
//           />
          
//           <button
//             type="submit"
//             disabled={isProcessing || (!input.trim() && !file)}
//             className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
//               (!input.trim() && !file) || isProcessing ?
//                 'bg-gray-200 dark:bg-gray-700 text-gray-400' :
//                 'bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600'
//             } transition-all`}
//           >
//             <FiSend className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

// UserInput.propTypes = {
//   onSend: PropTypes.func.isRequired,
//   isProcessing: PropTypes.bool.isRequired
// };






import { useState, useRef, useEffect } from 'react';
import { FiSend, FiPaperclip } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function UserInput({ onSend, isProcessing }) {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isProcessing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isProcessing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() && !file) return;
    onSend({ text: input, file });
    setInput('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert(t('userInput.fileSizeError'));
      return;
    }
    setFile(selectedFile);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {file && (
        <div className="mb-3 flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <span className="text-sm flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <FiPaperclip className="flex-shrink-0" />
            {file.name}
          </span>
          <button
            type="button"
            onClick={() => {
              setFile(null);
              fileInputRef.current.value = '';
            }}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            {t('userInput.remove')}
          </button>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <label className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
          <FiPaperclip className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*, .pdf, .doc, .docx, .txt"
            disabled={isProcessing}
          />
        </label>

        <div className="flex-1 relative">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('userInput.placeholder')}
            className="w-full p-3 pl-4 pr-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing}
          />
          
          <button
            type="submit"
            disabled={isProcessing || (!input.trim() && !file)}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
              (!input.trim() && !file) || isProcessing ?
                'bg-gray-200 dark:bg-gray-700 text-gray-400' :
                'bg-gradient-to-r from-blue-600 to-green-500 text-white hover:from-blue-700 hover:to-green-600'
            } transition-all`}
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}

UserInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired
};