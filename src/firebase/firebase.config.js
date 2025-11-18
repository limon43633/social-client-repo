// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";   // 🔥 YOU MISSED THIS

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhw8bAxxE5ezsVCE_mxI_Dvs2L2Zw24Ng",
  authDomain: "social-event-b399c.firebaseapp.com",
  projectId: "social-event-b399c",
  storageBucket: "social-event-b399c.firebasestorage.app",
  messagingSenderId: "45226050710",
  appId: "1:45226050710:web:5c0e3d5b4a310c09b7eeb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Correctly export auth
export const auth = getAuth(app);

export default app;
