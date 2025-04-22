import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import MessageBubble from './MessageBubble';
import UserInput from './UserInput';
import { FiLoader } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import SpecializationSelect from '../Common/SpecializationSearch';
import { SPECIALIZATIONS } from '../../config/constants';

export default function Chatbot({ chatId, updateChatTitle }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [specialization, setSpecialization] = useState(SPECIALIZATIONS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);
  const [hasSetTitle, setHasSetTitle] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_${chatId}`);
    setMessages(savedMessages ? JSON.parse(savedMessages) : []);
  }, [chatId]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_${chatId}`, JSON.stringify(messages));
      if (!hasSetTitle && messages[0]?.text) {
        const title = messages[0].text.substring(0, 50);
        updateChatTitle(chatId, title);
        setHasSetTitle(true);
        window.dispatchEvent(new Event('chatsUpdated'));
      }
    }
  }, [messages, chatId, hasSetTitle, updateChatTitle]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async ({ text, file }) => {
    if (!text?.trim() && !file) return;

    const userMessage = {
      id: Date.now().toString(),
      text: text || '',
      file: file || null,
      isBot: false,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now().toString() + '-bot',
        text: generateAIResponse(text, file),
        isBot: true,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsProcessing(false);
      window.dispatchEvent(new Event('chatsUpdated'));
    }, 1000);
  };

  const generateAIResponse = (text, file) => {
    if (file) {
      return t('chatbot.fileResponse', {
        fileType: file.type.startsWith('image/') ? t('chatbot.image') : t('chatbot.document'),
        specialization
      });
    }
    return t('chatbot.textResponse', { specialization, text });
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      <div className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <SpecializationSelect 
            value={specialization}
            onChange={setSpecialization}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 p-6 rounded-full mb-6">
                <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {t('chatbot.welcomeMessage')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                {t('chatbot.promptMessage', { specialization: specialization.toLowerCase() })}
              </p>
            </div>
          )}
          
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isBot={message.isBot}
            />
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="p-3 bg-white dark:bg-gray-700 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600">
                <FiLoader className="animate-spin text-blue-600 dark:text-blue-400 w-5 h-5" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <UserInput onSend={handleSend} isProcessing={isProcessing} />
        </div>
      </div>
    </div>
  );
}