import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { IPremiumPlansDetails } from "../utils/types";

const PremiumPlans = ({ item }: { item: IPremiumPlansDetails }) => {
  return (
    <View className="bg-[#1f1f1f] rounded-2xl mx-4 px-8 mb-8 justify-between pb-4">
      <View>
        <View className="flex-row items-center mt-12 mb-4">
          <Entypo name="spotify" size={28} color="white" />
          <Text className="ml-2 text-lg text-white">Premium</Text>
        </View>

        <Text style={{ color: item.themeColor }} className="mb-4 text-4xl ">
          {item.name}
        </Text>
        {item.trial && (
          <Text className="text-xl text-white">Free for 1 month</Text>
        )}
        <Text className="text-[#7A7A7A] text-base">
          {item.price}/month after
        </Text>

        <View className="my-4 border-b border-gray-700" />

        <View className="px-4 mb-4 gapy-1">
          {item.extras.map((item: string, index: number) => (
            <Text key={index} className="text-lg text-white">
              &bull; {item}
            </Text>
          ))}
        </View>
      </View>

      <TouchableOpacity
        className="items-center py-3 border rounded-full"
        style={{ backgroundColor: item.themeColor }}
        activeOpacity={0.7}
      >
        <Text className="text-xl font-bold text-black">
          {item.trial ? "Try for 1 month" : `Get Premium ${item.name}`}
        </Text>
      </TouchableOpacity>

      <Text className="my-4 text-sm text-center text-gray-400">
        {item.description}
      </Text>
      {item.trial && (
        <View
          style={{ backgroundColor: item.themeColor }}
          className="absolute inset-0 items-center justify-center w-40 h-8 rounded-tl-lg rounded-br-lg"
        >
          <Text className="text-lg font-bold text-black">Free for 1 month</Text>
        </View>
      )}
    </View>
  );
};

export default PremiumPlans;
