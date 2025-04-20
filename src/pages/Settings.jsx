// // import { useState, useEffect } from 'react';
// // import { useAuth } from '../context/AuthContext';
// // import { FiX, FiUser, FiMail, FiGlobe, FiMoon, FiSun, FiTrash2, FiLogOut } from 'react-icons/fi';
// // import { useNavigate } from 'react-router-dom';
// // import { useTranslation } from 'react-i18next';
// // import { LANGUAGES } from '../config/languages'; // Import from config
// // import { motion } from 'framer-motion';

// // const SettingsModal = () => {
// //   const { t } = useTranslation();
// //   const navigate = useNavigate();
// //   const { user, logout, clearChats, deleteAccount, theme, toggleTheme, language, setLanguage } = useAuth();
// //   const [activeTab, setActiveTab] = useState('general');
// //   const [successMsg, setSuccessMsg] = useState('');
// //   const [errorMsg, setErrorMsg] = useState('');

// //   const LANGUAGES = [
// //     { code: 'en', name: 'English' },
// //     { code: 'sk', name: 'Slovak' },
// //     { code: 'zh', name: 'Chinese' }
// //   ];

// //   useEffect(() => {
// //     if (successMsg) {
// //       const timer = setTimeout(() => setSuccessMsg(''), 3000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [successMsg]);

// //   const handleLanguageChange = (e) => {
// //     const lang = e.target.value;
// //     if (setLanguage(lang)) {
// //       setSuccessMsg(t('settings.languageChanged'));
// //     } else {
// //       setErrorMsg(t('settings.languageError'));
// //     }
// //   };

// //   const handleDeleteAccount = async () => {
// //     if (window.confirm(t('settings.confirmDeleteAccount'))) {
// //       try {
// //         await deleteAccount();
// //         navigate('/');
// //       } catch (error) {
// //         setErrorMsg(t('settings.deleteError'));
// //       }
// //     }
// //   };

// //   const handleClearChats = () => {
// //     if (window.confirm(t('settings.confirmClearChats'))) {
// //       clearChats();
// //       setSuccessMsg(t('settings.chatsDeleted'));
// //     }
// //   };

// //   return (
// //     <motion.div 
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
// //     >
// //       <motion.div 
// //         initial={{ y: 20, opacity: 0 }}
// //         animate={{ y: 0, opacity: 1 }}
// //         className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
// //       >
// //         <div className="flex flex-col md:flex-row h-full">
// //           <div className="w-full md:w-48 border-b md:border-b-0 md:border-r dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
// //             <div className="p-4 relative">
// //               <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t('settings.title')}</h3>
// //               <button
// //                 onClick={() => navigate('/')}
// //                 className="absolute top-3 right-3 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
// //               >
// //                 <FiX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
// //               </button>
// //             </div>
// //             <nav className="space-y-1 p-2">
// //               <button
// //                 onClick={() => setActiveTab('general')}
// //                 className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
// //                   activeTab === 'general' 
// //                     ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
// //                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
// //                 }`}
// //               >
// //                 {t('settings.general')}
// //               </button>
// //               <button
// //                 onClick={() => setActiveTab('account')}
// //                 className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
// //                   activeTab === 'account' 
// //                     ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
// //                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
// //                 }`}
// //               >
// //                 {t('settings.account')}
// //               </button>
// //             </nav>
// //           </div>

// //           <div className="flex-1 overflow-y-auto relative">
// //             <div className="p-6">
// //               {successMsg && (
// //                 <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-lg">
// //                   {successMsg}
// //                 </div>
// //               )}
// //               {errorMsg && (
// //                 <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
// //                   {errorMsg}
// //                 </div>
// //               )}

// //               {activeTab === 'general' && (
// //                 <div className="space-y-6">
// //                   <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{t('settings.general')}</h4>
// //                   <div className="space-y-2">
// //                     <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
// //                       <FiGlobe className="w-5 h-5" />
// //                       {t('settings.language')}
// //                     </label>
// //                     <select
// //                       value={language}
// //                       onChange={handleLanguageChange}
// //                       className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
// //                     >
// //                       {LANGUAGES.map((lang) => (
// //                         <option key={lang.code} value={lang.code}>
// //                           {lang.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   <div className="space-y-2">
// //                     <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
// //                       {theme === 'dark' ? (
// //                         <FiMoon className="w-5 h-5" />
// //                       ) : (
// //                         <FiSun className="w-5 h-5" />
// //                       )}
// //                       {t('settings.theme')}
// //                     </label>
// //                     <button
// //                       onClick={toggleTheme}
// //                       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
// //                         theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
// //                       }`}
// //                     >
// //                       <span
// //                         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
// //                           theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
// //                         }`}
// //                       />
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}

// //               {activeTab === 'account' && (
// //                 <div className="space-y-6">
// //                   <div className="flex items-center gap-4">
// //                     <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white">
// //                       {user?.photoURL ? (
// //                         <img src={user.photoURL} alt="Profile" className="rounded-full w-full h-full object-cover" />
// //                       ) : (
// //                         <FiUser className="w-6 h-6" />
// //                       )}
// //                     </div>
// //                     <div>
// //                       <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
// //                         {user?.displayName || t('settings.guest')}
// //                       </h2>
// //                       <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
// //                         <FiMail className="w-4 h-4" />
// //                         {user?.email || t('settings.guestEmail')}
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="space-y-4 pt-4 border-t dark:border-gray-700">
// //                     <h5 className="text-sm font-medium text-red-600 dark:text-red-400">
// //                       {t('settings.dangerZone')}
// //                     </h5>
                    
// //                     <button
// //                       onClick={logout}
// //                       className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
// //                     >
// //                       <FiLogOut className="w-5 h-5" />
// //                       {t('settings.logout')}
// //                     </button>
                    
// //                     <button
// //                       onClick={handleClearChats}
// //                       className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
// //                     >
// //                       <FiTrash2 className="w-5 h-5" />
// //                       {t('settings.clearChats')}
// //                     </button>
                    
// //                     {!user?.isGuest && (
// //                       <button
// //                         onClick={handleDeleteAccount}
// //                         className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
// //                       >
// //                         <FiTrash2 className="w-5 h-5" />
// //                         {t('settings.deleteAccount')}
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </motion.div>
// //     </motion.div>
// //   );
// // };

// // export default SettingsModal;
































// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { FiX, FiUser, FiMail, FiGlobe, FiMoon, FiSun, FiTrash2, FiLogOut } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import { LANGUAGES } from '../config/languages';

// const SettingsModal = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { user, logout, clearChats, deleteAccount, theme, toggleTheme, language, setLanguage } = useAuth();
//   const [activeTab, setActiveTab] = useState('general');
//   const [successMsg, setSuccessMsg] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');

//   useEffect(() => {
//     if (successMsg) {
//       const timer = setTimeout(() => setSuccessMsg(''), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMsg]);

//   const handleLanguageChange = (e) => {
//     const lang = e.target.value;
//     if (setLanguage(lang)) {
//       setSuccessMsg(t('settings.languageChanged'));
//     } else {
//       setErrorMsg(t('settings.languageError'));
//     }
//   };

//   const handleDeleteAccount = async () => {
//     if (window.confirm(t('settings.confirmDeleteAccount'))) {
//       try {
//         await deleteAccount();
//         navigate('/');
//       } catch (error) {
//         setErrorMsg(t('settings.deleteError'));
//       }
//     }
//   };

//   const handleClearChats = () => {
//     if (window.confirm(t('settings.confirmClearChats'))) {
//       clearChats();
//       setSuccessMsg(t('settings.chatsDeleted'));
//     }
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
//     >
//       <motion.div 
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
//       >
//         <div className="flex flex-col md:flex-row h-full">
//           <div className="w-full md:w-48 border-b md:border-b-0 md:border-r dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
//             <div className="p-4 relative">
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t('settings.title')}</h3>
//               <button
//                 onClick={() => navigate('/')}
//                 className="absolute top-3 right-3 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
//               >
//                 <FiX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//               </button>
//             </div>
//             <nav className="space-y-1 p-2">
//               <button
//                 onClick={() => setActiveTab('general')}
//                 className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
//                   activeTab === 'general' 
//                     ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
//                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
//                 }`}
//               >
//                 {t('settings.general')}
//               </button>
//               <button
//                 onClick={() => setActiveTab('account')}
//                 className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
//                   activeTab === 'account' 
//                     ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
//                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
//                 }`}
//               >
//                 {t('settings.account')}
//               </button>
//             </nav>
//           </div>

//           <div className="flex-1 overflow-y-auto relative">
//             <div className="p-6">
//               {successMsg && (
//                 <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-lg">
//                   {successMsg}
//                 </div>
//               )}
//               {errorMsg && (
//                 <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
//                   {errorMsg}
//                 </div>
//               )}

//               {activeTab === 'general' && (
//                 <div className="space-y-6">
//                   <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{t('settings.general')}</h4>
//                   <div className="space-y-2">
//                     <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
//                       <FiGlobe className="w-5 h-5" />
//                       {t('settings.language')}
//                     </label>
//                     <select
//                       value={language}
//                       onChange={handleLanguageChange}
//                       className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
//                     >
//                       {LANGUAGES.map((lang) => (
//                         <option key={lang.code} value={lang.code}>
//                           {lang.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
//                       {theme === 'dark' ? (
//                         <FiMoon className="w-5 h-5" />
//                       ) : (
//                         <FiSun className="w-5 h-5" />
//                       )}
//                       {t('settings.theme')}
//                     </label>
//                     <button
//                       onClick={toggleTheme}
//                       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                         theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
//                       }`}
//                     >
//                       <span
//                         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                           theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
//                         }`}
//                       />
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'account' && (
//                 <div className="space-y-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white">
//                       {user?.photoURL ? (
//                         <img src={user.photoURL} alt="Profile" className="rounded-full w-full h-full object-cover" />
//                       ) : (
//                         <FiUser className="w-6 h-6" />
//                       )}
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
//                         {user?.displayName || t('settings.guest')}
//                       </h2>
//                       <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
//                         <FiMail className="w-4 h-4" />
//                         {user?.email || t('settings.guestEmail')}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="space-y-4 pt-4 border-t dark:border-gray-700">
//                     <h5 className="text-sm font-medium text-red-600 dark:text-red-400">
//                       {t('settings.dangerZone')}
//                     </h5>
                    
//                     <button
//                       onClick={logout}
//                       className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
//                     >
//                       <FiLogOut className="w-5 h-5" />
//                       {t('settings.logout')}
//                     </button>
                    
//                     <button
//                       onClick={handleClearChats}
//                       className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
//                     >
//                       <FiTrash2 className="w-5 h-5" />
//                       {t('settings.clearChats')}
//                     </button>
                    
//                     {!user?.isGuest && (
//                       <button
//                         onClick={handleDeleteAccount}
//                         className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
//                       >
//                         <FiTrash2 className="w-5 h-5" />
//                         {t('settings.deleteAccount')}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default SettingsModal;






















import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiX, FiUser, FiMail, FiGlobe, FiMoon, FiSun, FiTrash2, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LANGUAGES } from '../config/languages';

const SettingsModal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout, clearChats, deleteAccount, theme, toggleTheme, language, setLanguage } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    if (setLanguage(lang)) {
      setSuccessMsg(t('settings.languageChanged'));
    } else {
      setErrorMsg(t('settings.languageError'));
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(t('settings.confirmDeleteAccount'))) {
      try {
        await deleteAccount();
        navigate('/');
      } catch (error) {
        setErrorMsg(t('settings.deleteError'));
      }
    }
  };

  const handleClearChats = () => {
    if (window.confirm(t('settings.confirmClearChats'))) {
      clearChats();
      setSuccessMsg(t('settings.chatsDeleted'));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-48 border-b md:border-b-0 md:border-r dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="p-4 relative">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t('settings.title')}</h3>
              <button
                onClick={() => navigate('/')}
                className="absolute top-3 right-3 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
              >
                <FiX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <nav className="space-y-1 p-2">
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                  activeTab === 'general' 
                    ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {t('settings.general')}
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                  activeTab === 'account' 
                    ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {t('settings.account')}
              </button>
            </nav>
          </div>

          <div className="flex-1 overflow-y-auto relative">
            <div className="p-6">
              {successMsg && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-lg">
                  {successMsg}
                </div>
              )}
              {errorMsg && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
                  {errorMsg}
                </div>
              )}

              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{t('settings.general')}</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FiGlobe className="w-5 h-5" />
                      {t('settings.language')}
                    </label>
                    <select
                      value={language}
                      onChange={handleLanguageChange}
                      className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      {theme === 'dark' ? (
                        <FiMoon className="w-5 h-5" />
                      ) : (
                        <FiSun className="w-5 h-5" />
                      )}
                      {t('settings.theme')}
                    </label>
                    <button
                      onClick={toggleTheme}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="rounded-full w-full h-full object-cover" />
                      ) : (
                        <FiUser className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        {user?.displayName || t('settings.guest')}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <FiMail className="w-4 h-4" />
                        {user?.email || t('settings.guestEmail')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t dark:border-gray-700">
                    <h5 className="text-sm font-medium text-red-600 dark:text-red-400">
                      {t('settings.dangerZone')}
                    </h5>
                    
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                    >
                      <FiLogOut className="w-5 h-5" />
                      {t('settings.logout')}
                    </button>
                    
                    <button
                      onClick={handleClearChats}
                      className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                    >
                      <FiTrash2 className="w-5 h-5" />
                      {t('settings.clearChats')}
                    </button>
                    
                    {!user?.isGuest && (
                      <button
                        onClick={handleDeleteAccount}
                        className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        <FiTrash2 className="w-5 h-5" />
                        {t('settings.deleteAccount')}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsModal;