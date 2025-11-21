// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get Firebase ID token
  const getToken = async () => {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken();
    }
    return null;
  };

  // Observe auth state and store token
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await getToken();
        localStorage.setItem('token', token);
        setUser(currentUser);
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const register = async ({ name, email, password, photoURL }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // update profile
      await updateProfile(res.user, {
        displayName: name || "",
        photoURL: photoURL || "",
      });
      
      // Get token and store
      const token = await getToken();
      localStorage.setItem('token', token);
      
      // refresh user state
      setUser({ ...res.user, displayName: name, photoURL });
      toast.success("Registered successfully");
      return res.user;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      
      // Get token and store
      const token = await getToken();
      localStorage.setItem('token', token);
      
      setUser(res.user);
      toast.success("Logged in successfully");
      return res.user;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      
      // Get token and store
      const token = await getToken();
      localStorage.setItem('token', token);
      
      setUser(res.user);
      toast.success("Logged in with Google");
      return res.user;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      setUser(null);
      toast.success("Logged out");
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        loading, 
        register, 
        login, 
        loginWithGoogle, 
        logout,
        getToken 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};