import React from "react";
import { View, Text, Image } from "react-native";
import tw from "tailwind-rn";

const Card = ({ displayName, photoURL, job, age }) => {
  return (
    <View style={tw("relative bg-white h-3/4 rounded-xl")}>
      <Image
        style={tw("absolute h-full w-full rounded-xl top-0")}
        source={{ uri: photoURL }}
      />
      <View
        style={[
          tw(
            "absolute bg-white w-full flex-row justify-between items-center h-20 bottom-0 px-6 py-2 rounded-b-xl"
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
        <View>
          <Text style={[tw("text-xl font-bold"), { fontSize: 16 }]}>
            {displayName}
          </Text>
          <Text>{job}</Text>
        </View>
        <Text style={tw("text-xl font-bold")}>{age}</Text>
      </View>
    </View>
  );
};

export default Card;
