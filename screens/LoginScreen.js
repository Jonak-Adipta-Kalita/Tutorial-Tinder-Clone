import React from "react";
import tw from "tailwind-rn";
import { View, Button, Text } from "react-native";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <View style={tw("")}>
      <Button title="Login" onPress={signInWithGoogle} />
    </View>
  );
};

export default LoginScreen;
