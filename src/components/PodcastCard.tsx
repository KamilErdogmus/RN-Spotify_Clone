import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { PodcastEpisode } from "../utils/types";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import Loader from "./Loader";
import Error from "./Error";
import { getRandomPastelColor } from "../utils/getRandomColor";

interface IPodcastCard {
  episodes: PodcastEpisode[];
  rounded?: boolean;
  loading: boolean;
  error: string | null;
}

const PodcastCard = ({ episodes, loading, error }: IPodcastCard) => {
  return (
    <View className="mt-4">
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : episodes.length === 0 ? (
        <View className="items-center justify-center">
          <Text className="text-white">No podcast episodes available</Text>
        </View>
      ) : (
        <ScrollView>
          {episodes.map((episode) => (
            <View key={episode.id} className="mb-4">
              <View className="flex-row items-center p-3">
                <Text className="text-sm font-semibold text-white">
                  Popular with listeners of
                  <Text className="font-bold"> Easy German Podcast</Text>
                </Text>
              </View>

              <View
                className={`px-2 py-4 rounded-3xl ${getRandomPastelColor()}`}
              >
                <View className="flex-row items-center justify-between px-2">
                  <View className="flex-1">
                    <Text className="text-2xl text-white" numberOfLines={2}>
                      {episode.name}
                    </Text>
                    <Text className="text-base text-gray-300" numberOfLines={1}>
                      Episode - Easy German: Learn with
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => {}}>
                    <AntDesign name="pluscircleo" size={24} color="white" />
                  </TouchableOpacity>
                </View>

                <View className="relative items-center my-4">
                  <View className="w-full h-40">
                    <Image
                      source={{ uri: episode?.image }}
                      className="w-full h-full rounded-lg"
                      resizeMode="contain"
                    />
                  </View>
                  <Text className="px-4 mt-2 text-center text-gray-300">
                    <Text className="font-semibold text-white">
                      {new Date(episode.date).toLocaleDateString()} &bull;{" "}
                      {Math.floor(episode.duration / 60000)} mins{" "}
                    </Text>
                    {episode.description}
                    <TouchableOpacity>
                      <Text className="font-bold text-gray-50"> More</Text>
                    </TouchableOpacity>
                  </Text>
                </View>

                <View className="flex-row items-center justify-between px-2 mt-2">
                  <TouchableOpacity
                    className="flex-row items-center p-3 space-x-2 rounded-full bg-off/80"
                    onPress={() => {}}
                  >
                    <FontAwesome name="volume-down" size={20} color="white" />
                    <Text className="text-sm text-white" numberOfLines={1}>
                      Preview episode
                    </Text>
                  </TouchableOpacity>

                  <View className="flex-row items-center space-x-4">
                    <TouchableOpacity onPress={() => {}}>
                      <Entypo
                        name="dots-three-vertical"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                      <AntDesign name="play" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default PodcastCard;
