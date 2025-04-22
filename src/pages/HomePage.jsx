import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Common/Sidebar';
import Chatbot from '../components/Chat/Chatbot';
import { FiPlus, FiMenu } from 'react-icons/fi';
import Settings from './Settings';

export default function HomePage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [successMsg, setSuccessMsg] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const storageKey = user?.uid ? `chats_${user.uid}` : 'guest_chats';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedChats = localStorage.getItem(storageKey);
    setChats(savedChats ? JSON.parse(savedChats) : []);
  }, [user, storageKey]);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: t('homepage.newChatTitle'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setSelectedChat(newChat.id);
    localStorage.setItem(storageKey, JSON.stringify(updatedChats));
    if (isMobile) setSidebarOpen(false);
  };

  const handleDeleteChat = (chatId) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    localStorage.setItem(storageKey, JSON.stringify(updatedChats));
    localStorage.removeItem(`chat_${chatId}`);
    if (selectedChat === chatId) setSelectedChat(updatedChats[0]?.id || null);
    setSuccessMsg(t('homepage.chatDeleted'));
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {successMsg && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg animate-fade-in">
          {successMsg}
        </div>
      )}

      {isMobile && (
        <header className="md:hidden fixed top-0 w-full z-30 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={handleNewChat}
              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <FiPlus className="w-6 h-6" />
            </button>
            
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              DoctorAI
            </h1>
            
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </header>
      )}

      <Sidebar
        chats={chats}
        selectedChat={selectedChat}
        onNewChat={handleNewChat}
        onSelectChat={(id) => {
          setSelectedChat(id);
          if (isMobile) setSidebarOpen(false);
        }}
        onDeleteChat={handleDeleteChat}
        mobileOpen={sidebarOpen}
        setMobileOpen={setSidebarOpen}
        isMobile={isMobile}
        setShowSettings={setShowSettings}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden pt-16 md:pt-0">
        {selectedChat ? (
          <Chatbot 
            key={selectedChat} 
            chatId={selectedChat} 
            updateChatTitle={(id, title) => {
              setChats(prev => prev.map(chat => 
                chat.id === id ? { ...chat, title, updatedAt: new Date().toISOString() } : chat
              ));
            }}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md mx-auto animate-slide-up">
              <div className="bg-gradient-to-r from-blue-600 to-green-500 p-3 rounded-xl shadow-lg inline-block mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {user ? t('homepage.welcomeUser') : t('homepage.welcomeGuest')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('homepage.subtitle')}
              </p>
              <button
                onClick={handleNewChat}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-green-600 transition-all"
              >
                {t('homepage.newChatButton')}
              </button>
            </div>
          </div>
        )}
      </main>

      <Settings
        visible={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}