import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import { db, storage } from "../firebase";
import useAuth from "../hooks/useAuth";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

async function uploadImageAsync(uri, userUID) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = (error) => {
      alert(error);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(storage, `images/${userUID}/profile-pic`);
  const result = await uploadBytes(fileRef, blob);

  blob.close();

  return await getDownloadURL(fileRef);
}

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [age, setAge] = useState(null);
  const [job, setJob] = useState(null);

  const incompleteForm = !image || !age || !job;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const selectPic = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    try {
      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri, user.uid);
        setImage(uploadUrl);
      }
    } catch (error) {
      alert(error);
    }
  };

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
        <TouchableOpacity
          style={tw("w-64 p-3 rounded-xl pb-2 bg-blue-400")}
          onPress={selectPic}
        >
          <Text style={tw("text-center text-white text-xl")}>
            Select Picture
          </Text>
        </TouchableOpacity>

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
