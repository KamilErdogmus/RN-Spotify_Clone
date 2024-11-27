import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { TabNavigationProp } from "../utils/types";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import SongRow from "../components/SongRow";
import { useAtom } from "jotai";
import { likedSongsAtom, loadLikedSongsAtom } from "../atom/likedSongatom";

const LikedSong = () => {
  const navigation = useNavigation<TabNavigationProp>();
  const [likedSongs] = useAtom(likedSongsAtom);
  const [, loadLikedSongs] = useAtom(loadLikedSongsAtom);

  useEffect(() => {
    loadLikedSongs();
  }, [likedSongs]);

  return (
    <ScrollView className="flex-1 bg-bg">
      <LinearGradient
        colors={["#25337A", "#14141C"]}
        locations={[0.6, 1]}
        className="flex-1"
      >
        <SafeAreaView className="px-4 my-5">
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={28} color="white" />
          </Pressable>

          <Text className="mt-8 text-3xl font-bold text-white ">
            Liked Songs
          </Text>
          <Text className="my-4 font-semibold text-gray-400">
            {likedSongs.length} songs
          </Text>
          <View className="flex-row items-center justify-between">
            <Feather name="arrow-down-circle" size={28} color="lightgray" />
            <View className="flex-row items-center justify-between gap-x-6">
              <Entypo name="shuffle" size={28} color="#1ED760" />
              <AntDesign name="play" size={45} color="#1ED760" />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <View className="flex px-1 my-4 gap-y-4">
        {likedSongs.map((track) => (
          <SongRow
            key={track.trackID}
            data={{
              songID: track.trackID,
              songName: track.trackName,
              artistName: track.artistName,
              artistID: track.artistID,
              albumName: track.albumName,
              albumID: track.albumID,
              albumImage: track.albumImageUrl || track.trackImageUrl,
              imageUrl: track.trackImageUrl || track.albumImageUrl,
              type: "track",
            }}
            photo
            dots
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default LikedSong;
