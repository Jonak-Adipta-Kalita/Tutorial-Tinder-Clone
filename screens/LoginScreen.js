import React from "react";
import tw from "tailwind-rn";
import { View } from "react-native";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  return <View style={tw("")}></View>;
};

export default LoginScreen;
