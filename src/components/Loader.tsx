import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loader = () => {
  return (
    <View
      className="items-center justify-center flex-1"
      style={{ backgroundColor: "#121212" }}
    >
      <ActivityIndicator size="large" color={"#1DB954"} />
    </View>
  );
};

export default Loader;
