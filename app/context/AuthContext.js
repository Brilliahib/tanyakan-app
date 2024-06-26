// AuthContext.js
import React, { useContext, createContext, useState, useEffect } from "react";
import { auth, googleProvider } from "@/lib/firebase/firebase";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        user.getIdToken().then((token) => {
          Cookies.set("token", token);
        });
      } else {
        Cookies.remove("token");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      setUser(result.user);
      const token = await result.user.getIdToken();
      Cookies.set("token", token);
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  const signOut = async () => {
    try {
      Cookies.remove("token");
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
