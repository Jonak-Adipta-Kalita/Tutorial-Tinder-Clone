import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [age, setAge] = useState(null);
  const [job, setJob] = useState(null);

  const incompleteForm = !image || !age || !job;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={tw("flex-1 items-center pt-3")}>
      <Image
        style={tw("h-20 w-full")}
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />
      <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
        Welcome {user.displayName}
      </Text>

      <KeyboardAvoidingView>
        <Text style={tw("text-center p-4 font-bold text-red-400")}>
          Step 1: Profile Picture
        </Text>
        <TextInput
          value={image}
          onChangeText={(text) => setImage(text)}
          style={tw("text-center text-xl pb-2")}
          placeholder="Enter a Profile Pic URL"
        />

        <Text style={tw("text-center p-4 font-bold text-red-400")}>
          Step 2: Occupation
        </Text>
        <TextInput
          value={job}
          onChangeText={(text) => setJob(text)}
          style={tw("text-center text-xl pb-2")}
          placeholder="Enter your Occupation"
        />

        <Text style={tw("text-center p-4 font-bold text-red-400")}>
          Step 3: Age
        </Text>
        <TextInput
          value={age}
          onChangeText={(text) => setAge(text)}
          style={tw("text-center text-xl pb-2")}
          placeholder="Enter your Age"
          keyboardType="numeric"
          maxLength={2}
        />
      </KeyboardAvoidingView>

      <TouchableOpacity
        disabled={incompleteForm}
        onPress={updateUserProfile}
        style={tw(
          `w-64 p-3 rounded-xl absolute bottom-2 ${
            incompleteForm ? "bg-gray-300" : "bg-red-400"
          }`
        )}
      >
        <Text style={tw("text-center text-white text-xl")}>Update Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ModalScreen;
