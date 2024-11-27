import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { ExploreItem } from "../utils/types";

const ExploreCard = ({ item }: { item: ExploreItem }) => {
  return (
    <View
      style={{ backgroundColor: item.color }}
      className="relative flex-1 h-40 p-4 m-2 overflow-hidden rounded-lg"
    >
      <Text className="text-xl font-bold text-white max-w-[60%]">
        {item.title}
      </Text>

      <View className="absolute -right-5 bottom-3">
        <Image
          style={{
            width: 110,
            height: 110,
            transform: [{ rotate: "25deg" }],
            borderRadius: 4,
          }}
          source={{ uri: item.image }}
        />
      </View>
    </View>
  );
};

export default ExploreCard;
