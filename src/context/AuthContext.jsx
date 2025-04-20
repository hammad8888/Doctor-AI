// import { createContext, useContext, useState, useEffect } from 'react';
// import {
//   auth,
//   googleProvider,
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   deleteUser,
//   sendPasswordResetEmail,
//   updateProfile
// } from '../firebase';
// import { LANGUAGES } from '../config/languages';
// import i18n from '../i18n';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [theme, setTheme] = useState('light');
//   const [language, setLanguage] = useState('en');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser({
//           uid: user.uid,
//           email: user.email,
//           displayName: user.displayName || 'User',
//           photoURL: user.photoURL,
//           isGuest: false
//         });
//       }
//       setLoading(false);
//     });

//     const savedTheme = localStorage.getItem('theme') || 'light';
//     const savedLang = localStorage.getItem('language') || 'en';

//     setTheme(savedTheme);
//     setLanguage(savedLang);
//     document.documentElement.classList.add(savedTheme);
//     i18n.changeLanguage(savedLang);

//     return () => unsubscribe();
//   }, []);

//   const loginWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       return result.user;
//     } catch (error) {
//       console.error('Google login error:', error);
//       throw error;
//     }
//   };

//   const loginWithEmail = async (email, password) => {
//     try {
//       const result = await signInWithEmailAndPassword(auth, email, password);
//       setUser({
//         uid: result.user.uid,
//         email: result.user.email,
//         displayName: result.user.displayName || 'User',
//         photoURL: result.user.photoURL,
//         isGuest: false
//       });
//       return result.user;
//     } catch (error) {
//       console.error('Email login error:', error);
//       throw error;
//     }
//   };

//   const signup = async (email, password, displayName) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       await updateProfile(userCredential.user, { displayName });
//       setUser({
//         uid: userCredential.user.uid,
//         email: userCredential.user.email,
//         displayName,
//         photoURL: userCredential.user.photoURL,
//         isGuest: false
//       });
//       return userCredential.user;
//     } catch (error) {
//       console.error('Signup error:', error);
//       throw error;
//     }
//   };

//   const guestLogin = () => {
//     setUser({
//       uid: `guest-${Date.now()}`,
//       email: null,
//       displayName: 'Guest User',
//       photoURL: null,
//       isGuest: true
//     });
//   };

//   const logout = async () => {
//     try {
//       if (!user?.isGuest) await signOut(auth);
//       setUser(null);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const resetPassword = async (email) => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       return true;
//     } catch (error) {
//       console.error('Password reset error:', error);
//       throw error;
//     }
//   };

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.classList.remove(theme);
//     document.documentElement.classList.add(newTheme);
//   };

//   const updateLanguage = (lang) => {
//     if (LANGUAGES.some((l) => l.code === lang)) {
//       setLanguage(lang);
//       localStorage.setItem('language', lang);
//       i18n.changeLanguage(lang);
//       document.documentElement.lang = lang;
//       return true;
//     }
//     return false;
//   };

//   const clearChats = () => {
//     const keyPrefix = user?.uid ? `chats_${user.uid}` : 'guest_chats';
//     const chats = JSON.parse(localStorage.getItem(keyPrefix) || '[]');
//     chats.forEach(chat => localStorage.removeItem(`chat_${chat.id}`));
//     localStorage.removeItem(keyPrefix);
//   };

//   const deleteAccount = async () => {
//     try {
//       if (user && !user.isGuest) {
//         await deleteUser(auth.currentUser);
//       }
//       clearChats();
//       setUser(null);
//     } catch (error) {
//       console.error('Account deletion error:', error);
//       throw error;
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         theme,
//         language,
//         loginWithGoogle,
//         loginWithEmail,
//         signup,
//         guestLogin,
//         logout,
//         resetPassword,
//         toggleTheme,
//         setLanguage: updateLanguage,
//         clearChats,
//         deleteAccount
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);















// import { createContext, useContext, useState, useEffect } from 'react';
// import {
//   auth,
//   googleProvider,
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   deleteUser,
//   sendPasswordResetEmail,
//   updateProfile
// } from '../firebase';
// import { LANGUAGES } from '../config/languages';
// import i18n from '../i18n';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [theme, setTheme] = useState('light');
//   const [language, setLanguage] = useState('en');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser({
//           uid: user.uid,
//           email: user.email,
//           displayName: user.displayName || 'User',
//           photoURL: user.photoURL,
//           isGuest: false
//         });
//       }
//       setLoading(false);
//     });

//     const savedTheme = localStorage.getItem('theme') || 'light';
//     const savedLang = localStorage.getItem('language') || 'en';

//     setTheme(savedTheme);
//     setLanguage(savedLang);
//     document.documentElement.classList.add(savedTheme);
//     i18n.changeLanguage(savedLang);

//     return () => unsubscribe();
//   }, []);

//   const loginWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       return result.user;
//     } catch (error) {
//       console.error('Google login error:', error);
//       throw error;
//     }
//   };

//   const loginWithEmail = async (email, password) => {
//     try {
//       const result = await signInWithEmailAndPassword(auth, email, password);
//       setUser({
//         uid: result.user.uid,
//         email: result.user.email,
//         displayName: result.user.displayName || 'User',
//         photoURL: result.user.photoURL,
//         isGuest: false
//       });
//       return result.user;
//     } catch (error) {
//       console.error('Email login error:', error);
//       throw error;
//     }
//   };

//   const signup = async (email, password, displayName) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       await updateProfile(userCredential.user, { displayName });
//       setUser({
//         uid: userCredential.user.uid,
//         email: userCredential.user.email,
//         displayName,
//         photoURL: userCredential.user.photoURL,
//         isGuest: false
//       });
//       return userCredential.user;
//     } catch (error) {
//       console.error('Signup error:', error);
//       throw error;
//     }
//   };

//   const guestLogin = () => {
//     setUser({
//       uid: `guest-${Date.now()}`,
//       email: null,
//       displayName: 'Guest User',
//       photoURL: null,
//       isGuest: true
//     });
//   };

//   const logout = async () => {
//     try {
//       if (!user?.isGuest) await signOut(auth);
//       setUser(null);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const resetPassword = async (email) => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       return true;
//     } catch (error) {
//       console.error('Password reset error:', error);
//       throw error;
//     }
//   };

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.classList.remove(theme);
//     document.documentElement.classList.add(newTheme);
//   };

//   const updateLanguage = (lang) => {
//     if (LANGUAGES.some((l) => l.code === lang)) {
//       setLanguage(lang);
//       localStorage.setItem('language', lang);
//       i18n.changeLanguage(lang);
//       document.documentElement.lang = lang;
//       return true;
//     }
//     return false;
//   };

//   const clearChats = () => {
//     const keyPrefix = user?.uid ? `chats_${user.uid}` : 'guest_chats';
//     const chats = JSON.parse(localStorage.getItem(keyPrefix) || '[]');
//     chats.forEach(chat => localStorage.removeItem(`chat_${chat.id}`));
//     localStorage.removeItem(keyPrefix);
//   };

//   const deleteAccount = async () => {
//     try {
//       if (user && !user.isGuest) {
//         await deleteUser(auth.currentUser);
//       }
//       clearChats();
//       setUser(null);
//     } catch (error) {
//       console.error('Account deletion error:', error);
//       throw error;
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         theme,
//         language,
//         loginWithGoogle,
//         loginWithEmail,
//         signup,
//         guestLogin,
//         logout,
//         resetPassword,
//         toggleTheme,
//         setLanguage: updateLanguage,
//         clearChats,
//         deleteAccount
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);





























import { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  updateProfile
} from '../firebase';
import { LANGUAGES } from '../config/languages';
import i18n from '../i18n';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || i18n.t('settings.guest'),
          photoURL: user.photoURL,
          isGuest: false
        });
      }
      setLoading(false);
    });

    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLang = localStorage.getItem('language') || i18n.language;

    setTheme(savedTheme);
    setLanguage(savedLang);
    document.documentElement.classList.add(savedTheme);
    i18n.changeLanguage(savedLang);
    document.documentElement.lang = savedLang;

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || i18n.t('settings.guest'),
        photoURL: result.user.photoURL,
        isGuest: false
      });
      return result.user;
    } catch (error) {
      console.error('Email login error:', error);
      throw error;
    }
  };

  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName,
        photoURL: userCredential.user.photoURL,
        isGuest: false
      });
      return userCredential.user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const guestLogin = () => {
    setUser({
      uid: `guest-${Date.now()}`,
      email: null,
      displayName: i18n.t('settings.guest'),
      photoURL: null,
      isGuest: true
    });
  };

  const logout = async () => {
    try {
      if (!user?.isGuest) await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  const updateLanguage = (lang) => {
    if (LANGUAGES.some((l) => l.code === lang)) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
      i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
      return true;
    }
    return false;
  };

  const clearChats = () => {
    const keyPrefix = user?.uid ? `chats_${user.uid}` : 'guest_chats';
    const chats = JSON.parse(localStorage.getItem(keyPrefix) || '[]');
    chats.forEach(chat => localStorage.removeItem(`chat_${chat.id}`));
    localStorage.removeItem(keyPrefix);
  };

  const deleteAccount = async () => {
    try {
      if (user && !user.isGuest) {
        await deleteUser(auth.currentUser);
      }
      clearChats();
      setUser(null);
    } catch (error) {
      console.error('Account deletion error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        theme,
        language,
        loginWithGoogle,
        loginWithEmail,
        signup,
        guestLogin,
        logout,
        resetPassword,
        toggleTheme,
        setLanguage: updateLanguage,
        clearChats,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);