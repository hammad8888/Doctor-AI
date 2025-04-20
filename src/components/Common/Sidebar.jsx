// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useAuth } from '../../context/AuthContext';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiMessageSquare, FiTrash2, FiPlus, FiX, FiUser, FiSettings, FiLogIn, FiLogOut } from 'react-icons/fi';
// import ThemeToggle from './ThemeToggle';

// export default function Sidebar({
//   selectedChat,
//   onNewChat,
//   onSelectChat,
//   onDeleteChat,
//   mobileOpen,
//   setMobileOpen,
//   isMobile
// }) {
//   const { user, logout, clearChats } = useAuth();
//   const navigate = useNavigate();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [localChats, setLocalChats] = useState([]);

//   const loadChats = () => {
//     const storageKey = user?.uid ? `chats_${user.uid}` : 'guest_chats';
//     const storedChats = JSON.parse(localStorage.getItem(storageKey) || '[]');
//     //const storedChats = JSON.parse(localStorage.getItem(storageKey) || [];
//     setLocalChats(storedChats);
//   };

//   useEffect(() => {
//     loadChats();
//     const handleChatsUpdated = () => loadChats();
    
//     window.addEventListener('chatsUpdated', handleChatsUpdated);
//     return () => window.removeEventListener('chatsUpdated', handleChatsUpdated);
//   }, [user?.uid]);

//   const handleDeleteChat = (chatId) => {
//     const storageKey = user?.uid ? `chats_${user.uid}` : 'guest_chats';
//     const updatedChats = localChats.filter(chat => chat.id !== chatId);
    
//     localStorage.setItem(storageKey, JSON.stringify(updatedChats));
//     localStorage.removeItem(`chat_${chatId}`);
//     window.dispatchEvent(new Event('chatsUpdated'));
//     onDeleteChat(chatId);
//   };

//   const handleLogout = () => {
//     if (user?.isGuest) {
//       localStorage.removeItem('guest_chats');
//       clearChats();
//     }
//     logout();
//     setShowDropdown(false);
//     if (isMobile) setMobileOpen(false);
//     navigate('/');
//   };

//   return (
//     <aside className={`${isMobile ? 'fixed inset-0 z-40 bg-white dark:bg-gray-800' : 'relative'} 
//       w-64 transform transition-transform duration-300 ease-in-out
//       ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:bg-transparent`}
//     >
//       <div className="h-full flex flex-col border-r dark:border-gray-700">
//         <div className="p-4 border-b dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
//               DoctorAI
//             </h1>
//             <button onClick={onNewChat} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
//               <FiPlus className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {localChats.length === 0 ? (
//             <div className="p-4 text-center text-gray-500 dark:text-gray-400">
//               No chats yet. Start a new conversation!
//             </div>
//           ) : (
//             <div className="divide-y dark:divide-gray-700">
//               {localChats.map(chat => (
//                 <div
//                   key={chat.id}
//                   onClick={() => onSelectChat(chat.id)}
//                   className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
//                     selectedChat === chat.id ? 'bg-blue-50 dark:bg-gray-700' : ''
//                   }`}
//                 >
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                       <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
//                         <FiMessageSquare className="text-blue-600 dark:text-blue-400" />
//                       </div>
//                       <div>
//                         <p className="font-medium truncate">{chat.title}</p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                           {new Date(chat.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDeleteChat(chat.id);
//                       }}
//                       className="p-1 hover:text-red-500"
//                     >
//                       <FiTrash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t dark:border-gray-700">
//           <div className="flex flex-col gap-4">
//             <div className="flex items-center justify-between">
//               <ThemeToggle />
//               {user && (
//                 <Link to="/settings" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
//                   <FiSettings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
//                 </Link>
//               )}
//             </div>

//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
//                 >
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-green-500 text-white flex items-center justify-center">
//                     {user?.photoURL ? (
//                       <img src={user.photoURL} alt="Profile" className="rounded-full w-full h-full object-cover" />
//                     ) : (
//                       <FiUser className="w-5 h-5" />
//                     )}
//                   </div>
//                   <div className="text-left">
//                     <p className="font-medium truncate">{user?.displayName || 'Guest'}</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                       {user?.email || 'Guest session'}
//                     </p>
//                   </div>
//                 </button>

//                 {showDropdown && (
//                   <div className="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border dark:border-gray-700">
//                     {user?.isGuest ? (
//                       <>
//                         <button
//                           onClick={handleLogout}
//                           className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
//                         >
//                           <FiX className="w-4 h-4" />
//                           Exit Guest Mode
//                         </button>
//                         <Link
//                           to="/login"
//                           className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//                           onClick={() => setShowDropdown(false)}
//                         >
//                           <FiLogIn className="w-4 h-4" />
//                           Login to Save Chats
//                         </Link>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           onClick={handleLogout}
//                           className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
//                         >
//                           <FiLogOut className="w-4 h-4" />
//                           Logout
//                         </button>
//                         <button
//                           onClick={() => {
//                             logout();
//                             navigate('/guest');
//                           }}
//                           className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//                         >
//                           <FiUser className="w-4 h-4" />
//                           Switch to Guest Mode
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex flex-col gap-2">
//                 <Link
//                   to="/login"
//                   className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg hover:from-blue-700 hover:to-green-600 text-center flex items-center justify-center gap-2"
//                 >
//                   <FiLogIn className="w-4 h-4" />
//                   Login
//                 </Link>
//                 <button
//                   onClick={() => navigate('/guest')}
//                   className="px-4 py-2 border dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
//                 >
//                   Continue as Guest
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }

// Sidebar.propTypes = {
//   selectedChat: PropTypes.string,
//   onNewChat: PropTypes.func.isRequired,
//   onSelectChat: PropTypes.func.isRequired,
//   onDeleteChat: PropTypes.func.isRequired,
//   mobileOpen: PropTypes.bool.isRequired,
//   setMobileOpen: PropTypes.func.isRequired,
//   isMobile: PropTypes.bool.isRequired
// };
























import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMessageSquare, FiTrash2, FiPlus, FiX, FiUser, FiSettings, FiLogIn, FiLogOut } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

export default function Sidebar({
  selectedChat,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  mobileOpen,
  setMobileOpen,
  isMobile
}) {
  const { t } = useTranslation();
  const { user, logout, clearChats } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [localChats, setLocalChats] = useState([]);

  const loadChats = () => {
    const storageKey = user?.uid ? `chats_${user.uid}` : 'guest_chats';
    const storedChats = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setLocalChats(storedChats);
  };

  useEffect(() => {
    loadChats();
    const handleChatsUpdated = () => loadChats();
    
    window.addEventListener('chatsUpdated', handleChatsUpdated);
    return () => window.removeEventListener('chatsUpdated', handleChatsUpdated);
  }, [user?.uid]);

  const handleDeleteChat = (chatId) => {
    const storageKey = user?.uid ? `chats_${user.uid}` : 'guest_chats';
    const updatedChats = localChats.filter(chat => chat.id !== chatId);
    
    localStorage.setItem(storageKey, JSON.stringify(updatedChats));
    localStorage.removeItem(`chat_${chatId}`);
    window.dispatchEvent(new Event('chatsUpdated'));
    onDeleteChat(chatId);
  };

  const handleLogout = () => {
    if (user?.isGuest) {
      localStorage.removeItem('guest_chats');
      clearChats();
    }
    logout();
    setShowDropdown(false);
    if (isMobile) setMobileOpen(false);
    navigate('/');
  };

  return (
    <aside className={`${isMobile ? 'fixed inset-0 z-40 bg-white dark:bg-gray-800' : 'relative'} 
      w-64 transform transition-transform duration-300 ease-in-out
      ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:bg-transparent`}
    >
      <div className="h-full flex flex-col border-r dark:border-gray-700">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              DoctorAI
            </h1>
            <button onClick={onNewChat} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <FiPlus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {localChats.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              {t('sidebar.noChats')}
            </div>
          ) : (
            <div className="divide-y dark:divide-gray-700">
              {localChats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    selectedChat === chat.id ? 'bg-blue-50 dark:bg-gray-700' : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                        <FiMessageSquare className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium truncate">{chat.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(chat.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChat(chat.id);
                      }}
                      className="p-1 hover:text-red-500"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <ThemeToggle />
              {user && (
                <Link to="/settings" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <FiSettings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </Link>
              )}
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-green-500 text-white flex items-center justify-center">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="rounded-full w-full h-full object-cover" />
                    ) : (
                      <FiUser className="w-5 h-5" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-medium truncate">{user?.displayName || t('settings.guest')}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email || t('settings.guestEmail')}
                    </p>
                  </div>
                </button>

                {showDropdown && (
                  <div className="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border dark:border-gray-700">
                    {user?.isGuest ? (
                      <>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                        >
                          <FiX className="w-4 h-4" />
                          {t('sidebar.exitGuest')}
                        </button>
                        <Link
                          to="/login"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FiLogIn className="w-4 h-4" />
                          {t('sidebar.saveChats')}
                        </Link>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                        >
                          <FiLogOut className="w-4 h-4" />
                          {t('settings.logout')}
                        </button>
                        <button
                          onClick={() => {
                            logout();
                            navigate('/guest');
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <FiUser className="w-4 h-4" />
                          {t('sidebar.switchGuest')}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg hover:from-blue-700 hover:to-green-600 text-center flex items-center justify-center gap-2"
                >
                  <FiLogIn className="w-4 h-4" />
                  {t('login.emailButton')}
                </Link>
                <button
                  onClick={() => navigate('/guest')}
                  className="px-4 py-2 border dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {t('login.guestButton')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  selectedChat: PropTypes.string,
  onNewChat: PropTypes.func.isRequired,
  onSelectChat: PropTypes.func.isRequired,
  onDeleteChat: PropTypes.func.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  setMobileOpen: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
};