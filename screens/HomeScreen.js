import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import tw from "tailwind-rn";
import { View, Text, TouchableOpacity, Image } from "react-native";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import Card from "../components/Card";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "@firebase/firestore";
import { db } from "../firebase";

const DUMMY_DATA = [
  {
    id: 0,
    displayName: "Jonak Adipta Kalita",
    job: "Student",
    photoURL: "https://avatars.githubusercontent.com/u/70377522?v=4",
    age: 14,
  },
  {
    id: 1,
    displayName: "Kiaara Advani",
    job: "Actress",
    photoURL:
      "https://wikibio.in/wp-content/uploads/2019/02/Kiara-Advani-Photo.jpg",
    age: 29,
  },
];

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const dummyData = false;
  const swipeRef = useRef(null);
  const [profiles, setProfiles] = useState([]);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const passes = await getDocs(collection(db, "users", user.uid, "passes"))
        .then((snapshot) => snapshot.docs.map((doc) => doc.id))
        .catch((error) => alert(error.message));

      const swipes = await getDocs(collection(db, "users", user.uid, "swipes"))
        .then((snapshot) => snapshot.docs.map((doc) => doc.id))
        .catch((error) => alert(error.message));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? passes : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  }, [db]);

  const swipedLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    setDoc(
      doc(db, "users", user.uid, "passes", userSwiped.id),
      userSwiped
    ).catch((error) => alert(error));
  };

  const swipedRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
  };

  return (
    <SafeAreaView style={tw("flex-1")}>
      <View
        style={tw("flex-row items-center relative mt-2 justify-between px-5")}
      >
        <TouchableOpacity onPress={logout} style={tw("")}>
          <Image
            source={{ uri: user?.photoURL }}
            style={tw("h-10 w-10 rounded-full")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Modal")}
          style={tw("")}
        >
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
      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          cards={dummyData ? DUMMY_DATA : profiles}
          containerStyle={{ backgroundColor: "transparent" }}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          onSwipedLeft={(cardIntex) => swipedLeft(cardIntex)}
          onSwipedRight={(cardIndex) => swipedRight(cardIndex)}
          backgroundColor={"#4FD0E9"}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  textAlign: "left",
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) =>
            card ? (
              <Card
                key={card.id}
                displayName={card.displayName}
                photoURL={card.photoURL}
                job={card.job}
                age={card.age}
              />
            ) : (
              <View
                style={[
                  tw(
                    "relative bg-white h-3/4 rounded-xl justify-center items-center"
                  ),
                  {
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                  },
                ]}
              >
                <Text style={tw("font-bold pb-5")}>No More Profiles</Text>
                <Image
                  style={tw("h-20 w-20")}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
        />
      </View>
      <View style={tw("flex flex-row justify-evenly")}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-red-200"
          )}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-green-200"
          )}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
