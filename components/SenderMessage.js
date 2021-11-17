import React from "react";
import { View, Text } from "react-native";
import tw from "tailwind-rn";
import moment from "moment";

const SenderMessage = ({ message }) => {
  return (
    <View
      style={[
        tw("bg-purple-600 rounded-tr-none px-5 py-3 mx-3 my-2"),
        {
          alignSelf: "flex-start",
          marginLeft: "auto",
        },
      ]}
    >
      <Text style={tw("text-white")}>{message.message}</Text>
      <Text
        style={[tw("text-gray-300"), { alignSelf: "flex-end", fontSize: 12 }]}
      >
        {message.timestamp
          ? moment(message?.timestamp.toDate().getTime()).format("LT")
          : "..."}
      </Text>
    </View>
  );
};

export default SenderMessage;
