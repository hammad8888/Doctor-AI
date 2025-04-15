

import { initializeApp } from 'firebase/app'
import { 
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyC-htEVL6-5-XTjUAf3MHUlBuFxkVIzPoU",
  authDomain: "doctor-ai-8888.firebaseapp.com",
  projectId: "doctor-ai-8888",
  storageBucket: "doctor-ai-8888.appspot.com", // Fixed storageBucket
  messagingSenderId: "616459522735",
  appId: "1:616459522735:web:f089205c0acfc30870ba5a",
  measurementId: "G-Q30MZ4BVB8"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { 
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
}