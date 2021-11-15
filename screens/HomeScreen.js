import React from "react";
import tw from "tailwind-rn";
import { View, Button } from "react-native";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const { logout } = useAuth();
  return (
    <View style={tw("")}>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
