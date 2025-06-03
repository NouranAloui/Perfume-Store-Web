
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword , signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const handleLogout = () => {
  signOut(auth)
    .then(() => {
      toast.success("Logged out successfully");
      window.location.href = '/admin/signin';
    })
    .catch((err) => {
      toast.error("Error logging out: " + err.message);
    });
};

export const checkAuth = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();  

      if (user) {
        resolve(user);
      } else {
        reject(new Error('User not authenticated'));
      }
    });
  });
};

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, handleLogout };