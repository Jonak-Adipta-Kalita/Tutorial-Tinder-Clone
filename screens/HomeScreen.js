import React, { useLayoutEffect } from "react";
import tw from "tailwind-rn";
import { View, Text, TouchableOpacity, Image } from "react-native";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  return (
    <SafeAreaView style={tw("")}>
      <View
        style={tw("flex-row items-center relative mt-2 justify-between px-5")}
      >
        <TouchableOpacity onPress={logout} style={tw("")}>
          <Image
            source={{ uri: user?.photoURL }}
            style={tw("h-10 w-10 rounded-full")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={tw("")}>
          <Image
            style={tw("h-14 w-14")}
            source={{
              uri: "https://logos-world.net/wp-content/uploads/2020/09/Tinder-Emblem.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chat")}
          style={tw("")}
        >
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
