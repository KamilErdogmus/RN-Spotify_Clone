import { Image, View, Text } from "react-native";
import React from "react";

interface PhotoProps {
  src?: string;
  name?: string;
  rounded?: boolean;
  size?: number;
  placeholderBgColor?: string;
}

const Photo = ({
  src,
  name = "",
  size = 16,
  rounded = false,
  placeholderBgColor = "bg-blue-500",
}: PhotoProps) => {
  const getInitial = () => {
    return name ? name.charAt(0).toUpperCase() : "K";
  };

  return src ? (
    <Image
      className={`w-${size} h-${size} mr-4 ${rounded ? "rounded-full" : ""}`}
      source={{ uri: src }}
    />
  ) : (
    <View
      className={`w-${size} h-${size} mr-4 h-8 w-8 ${placeholderBgColor} rounded-full items-center justify-center`}
    >
      <Text className="text-xl font-bold text-white">{getInitial()}</Text>
    </View>
  );
};

export default Photo;
