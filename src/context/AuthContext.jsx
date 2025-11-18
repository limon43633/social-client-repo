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

  // Observe auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (current) => {
      setUser(current);
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
      setUser(null);
      toast.success("Logged out");
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
