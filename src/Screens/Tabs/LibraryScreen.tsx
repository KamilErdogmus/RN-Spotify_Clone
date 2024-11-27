import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Photo from "../../components/Photo";
import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { librarySelectedArea } from "../../utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../utils/Screens";
import { TabNavigationProp } from "../../utils/types";

const LibraryScreen = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const navigation = useNavigation<TabNavigationProp>();
  return (
    <SafeAreaView className="flex-1 px-4 bg-bg">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        <View className="flex-row items-center justify-between mx-1">
          <View className="flex-row items-center ">
            <Photo />
            <Text className="text-2xl font-bold text-white">Your Library</Text>
          </View>
          <View className="flex-row items-center gap-x-8 ">
            <AntDesign name="search1" size={28} color="white" />
            <AntDesign name="plus" size={28} color="white" />
          </View>
        </View>

        <View className="flex-row items-center px-2 py-4">
          {selected !== null && (
            <TouchableOpacity onPress={() => setSelected(null)}>
              <Text className="px-2 text-lg text-white border rounded-full">
                X
              </Text>
            </TouchableOpacity>
          )}
          {librarySelectedArea.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => setSelected(index)}
                className={`px-4 py-2 mx-1 rounded-full ${
                  selected === index ? "bg-terrary" : "bg-off"
                }`}
              >
                <Text
                  className={`
              ${selected === index ? "text-black font-bold" : "text-gray-200"}
            `}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className="border border-b border-black" />

        <View className="flex-row items-center justify-between my-4">
          <View className="flex-row px-1">
            <MaterialIcons
              style={{ transform: [{ rotate: "90deg" }] }}
              name="compare-arrows"
              size={24}
              color="white"
            />
            <Text className="ml-2 text-base font-semibold text-white">
              Recents
            </Text>
          </View>
          <Feather name="grid" size={24} color="white" />
        </View>

        <Pressable
          className="flex-row my-4"
          onPress={() => navigation.navigate(Screens.LikedSongs)}
        >
          <LinearGradient colors={["#5019EF", "#BDE0C7"]} className="p-6">
            <AntDesign name="heart" size={28} color="white" />
          </LinearGradient>
          <View>
            <View className="items-start justify-center ml-4 gap-y-2">
              <Text className="text-lg text-white">Liked Songs</Text>

              <View className="flex-row">
                <Entypo name="pin" size={18} color={"#1ED760"} />
                <Text className="text-gray-200"> Playlist </Text>
              </View>
            </View>
          </View>
        </Pressable>

        <View className="flex-row my-4">
          <View className="p-6 bg-[#282828] rounded-full">
            <AntDesign name="plus" size={28} color="white" />
          </View>
          <View className="items-start justify-center ml-4 gap-y-2">
            <Text className="text-lg text-white">Add artist</Text>
          </View>
        </View>

        <View className="flex-row my-4">
          <View className="p-6 bg-[#282828]">
            <AntDesign name="plus" size={28} color="white" />
          </View>
          <View className="items-start justify-center ml-4 gap-y-2">
            <Text className="text-lg text-white">Add podcast</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LibraryScreen;
