import { View, Text } from "react-native";
import React from "react";

const Error = ({ message }: { message: string }) => {
  return (
    <View
      className="items-center justify-center flex-1 p-6 bg-black"
      style={{ backgroundColor: "#121212" }}
    >
      <Text className="text-[#1DB954] text-2xl font-bold text-center">
        Error
      </Text>
      <Text className="mt-4 text-lg text-center text-white">{message}</Text>
    </View>
  );
};

export default Error;
