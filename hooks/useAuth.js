import React, { createContext, useContext } from "react";
import { androidClientId, iosClientId } from "@env";
import * as Google from "expo-google-app-auth";

const AuthContext = createContext({});

const config = {
  androidClientId: androidClientId,
  iosClientId: iosClientId,
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const signInWithGoogle = async () => {
    Google.logInAsync(config).then(async (loginResult) => {
      if (loginResult.type === "success") {
        // Login
      }
    });
  };
  return (
    <AuthContext.Provider value={{ user: null, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
