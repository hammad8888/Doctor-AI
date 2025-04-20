// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// // Translations
// const resources = {
//   en: {
//     translation: {
//       login: {
//         title: 'Welcome Back',
//         subtitle: 'Sign in to continue to DoctorAI',
//         email: 'Email',
//         emailPlaceholder: 'Enter your email',
//         password: 'Password',
//         passwordPlaceholder: 'Enter your password',
//         emailButton: 'Sign In',
//         googleButton: 'Continue with Google',
//         guestButton: 'Continue as Guest',
//         forgotPassword: 'Forgot Password?',
//         noAccount: "Don't have an account?",
//         signupLink: 'Sign Up',
//         or: 'OR',
//         fillAllFields: 'Please fill in all fields',
//         userNotFound: 'User not found',
//         wrongPassword: 'Incorrect password',
//         generalError: 'Login failed. Please try again.',
//         googleError: 'Google login failed. Please try again.',
//         loading: 'Signing in...'
//       },
//       signup: {
//         title: 'Create Account',
//         subtitle: 'Get started with DoctorAI',
//         displayName: 'Display Name',
//         displayNamePlaceholder: 'Enter your name',
//         email: 'Email',
//         emailPlaceholder: 'Enter your email',
//         password: 'Password',
//         passwordPlaceholder: 'Create a password',
//         confirmPassword: 'Confirm Password',
//         confirmPasswordPlaceholder: 'Re-enter your password',
//         submitButton: 'Sign Up',
//         googleButton: 'Continue with Google',
//         haveAccount: 'Already have an account?',
//         loginLink: 'Login',
//         or: 'OR',
//         passwordMismatch: 'Passwords do not match',
//         passwordLength: 'Password must be at least 6 characters',
//         emailExists: 'Email already in use',
//         invalidEmail: 'Invalid email address',
//         weakPassword: 'Password is too weak',
//         generalError: 'Signup failed. Please try again.',
//         googleError: 'Google signup failed. Please try again.',
//         loading: 'Creating account...'
//       },
//       forgotPassword: {
//         title: 'Reset Password',
//         subtitle: 'Enter your email to receive a reset link',
//         email: 'Email',
//         emailPlaceholder: 'Enter your email',
//         submitButton: 'Send Reset Link',
//         rememberPassword: 'Remember your password?',
//         loginLink: 'Login here',
//         emailRequired: 'Please enter your email',
//         userNotFound: 'No account found with this email',
//         invalidEmail: 'Please enter a valid email',
//         generalError: 'Failed to send reset email. Please try again.',
//         resetSent: 'Password reset link has been sent to your email',
//         loading: 'Sending reset link...'
//       },
//       settings: {
//         title: 'Settings',
//         general: 'General',
//         account: 'Account',
//         language: 'Language',
//         theme: 'Theme',
//         logout: 'Logout',
//         clearChats: 'Clear All Chats',
//         deleteAccount: 'Delete Account',
//         dangerZone: 'Danger Zone',
//         guest: 'Guest',
//         guestEmail: 'guest@example.com',
//         languageChanged: 'Language changed successfully',
//         languageError: 'Failed to change language',
//         confirmClearChats: 'Are you sure you want to delete all your chats? This cannot be undone.',
//         confirmDeleteAccount: 'Are you sure you want to delete your account? This cannot be undone.',
//         chatsDeleted: 'All chats have been deleted',
//         deleteError: 'Failed to delete account'
//       }
//     }
//   },
//   sk: {
//     translation: {
//       login: {
//         title: 'Vitajte späť',
//         subtitle: 'Prihláste sa a pokračujte v DoctorAI',
//         email: 'Email',
//         emailPlaceholder: 'Zadajte váš email',
//         password: 'Heslo',
//         passwordPlaceholder: 'Zadajte vaše heslo',
//         emailButton: 'Prihlásiť sa',
//         googleButton: 'Pokračovať s Google',
//         guestButton: 'Pokračovať ako hosť',
//         forgotPassword: 'Zabudnuté heslo?',
//         noAccount: 'Nemáte účet?',
//         signupLink: 'Registrovať sa',
//         or: 'ALEBO',
//         fillAllFields: 'Vyplňte všetky polia',
//         userNotFound: 'Používateľ nebol nájdený',
//         wrongPassword: 'Nesprávne heslo',
//         generalError: 'Prihlásenie zlyhalo. Skúste to znova.',
//         googleError: 'Prihlásenie cez Google zlyhalo. Skúste to znova.',
//         loading: 'Prihlasovanie...'
//       }
//       // ... other translations for Slovak
//     }
//   },
//   zh: {
//     translation: {
//       login: {
//         title: '欢迎回来',
//         subtitle: '登录继续使用 DoctorAI',
//         email: '电子邮件',
//         emailPlaceholder: '输入您的电子邮件',
//         password: '密码',
//         passwordPlaceholder: '输入您的密码',
//         emailButton: '登录',
//         googleButton: '使用 Google 继续',
//         guestButton: '以访客身份继续',
//         forgotPassword: '忘记密码？',
//         noAccount: '没有帐户？',
//         signupLink: '注册',
//         or: '或',
//         fillAllFields: '请填写所有字段',
//         userNotFound: '用户未找到',
//         wrongPassword: '密码错误',
//         generalError: '登录失败。请再试一次。',
//         googleError: 'Google 登录失败。请再试一次。',
//         loading: '正在登录...'
//       }
//       // ... other translations for Chinese
//     }
//   }
// };

// i18n
//   .use(initReactI18next)
//   .init({
//     resources,
//     lng: 'en',
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false
//     }
//   });

// export default i18n;



















// Updated i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../public/locals/en/translation.json';
import skTranslations from '../public/locals/sk/translation.json';

const resources = {
  en: { translation: enTranslations },
  sk: { translation: skTranslations }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;