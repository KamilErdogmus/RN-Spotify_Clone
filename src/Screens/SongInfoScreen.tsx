import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { Image } from "react-native";
import MusicProgressBar from "../components/MusicProgressBar";
import Lyrics from "../components/Lyrics";
import { closeModalAtom, currentTrackAtom } from "../atom/currentAtom";
import { useAtom } from "jotai";
import { togglePlayback } from "../utils/player";
import { LinearGradient } from "expo-linear-gradient";
import { LyricLine } from "../utils/types";
import { getTrackLyrics } from "../services/api";
import { formatTime } from "../utils/formatTime";
import AddList from "../components/AddList";

const SongInfoScreen = ({ query = false }) => {
  const [, closeModal] = useAtom(closeModalAtom);
  const [currentTrack, setCurrentTrack] = useAtom(currentTrackAtom);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [progress, setProgress] = useState({
    position: 0,
    duration: currentTrack?.duration || 30,
  });

  useEffect(() => {
    if (currentTrack?.trackID) {
      fetchLyrics(currentTrack.trackID);
    }
  }, [currentTrack?.trackID, fetchLyrics]);

  const fetchLyrics = async (trackId: string) => {
    try {
      const lyricsData = await getTrackLyrics(trackId);
      setLyrics(lyricsData);
    } catch (error) {
      console.error("Error fetching lyrics:", error);
    }
  };
  const handlePlayPause = async () => {
    try {
      await togglePlayback(currentTrack, setCurrentTrack);
    } catch (error) {
      console.error("Error in handlePlayPause:", error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentTrack?.isPlaying) {
        setProgress((prev) => ({
          ...prev,
          position: prev.position < prev.duration ? prev.position + 1 : 0,
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTrack?.isPlaying]);

  useEffect(() => {
    setProgress({
      position: 0,
      duration: currentTrack?.duration || 30,
    });
  }, [currentTrack?.trackID, currentTrack?.duration]);

  return (
    <LinearGradient
      locations={[0.4, 1]}
      className="z-30 flex-1"
      colors={[currentTrack?.hexColor as string, "#121212"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70, paddingHorizontal: 8 }}
      >
        <SafeAreaView className="px-1">
          <View className="flex-row items-center justify-between">
            <Pressable onPress={closeModal}>
              <AntDesign name="down" size={28} color="white" />
            </Pressable>
            <Text className="text-lg font-semibold text-center text-gring-gray-40000">
              Playing From {query ? "Search" : "Album"}
            </Text>
            <Entypo name="dots-three-vertical" size={24} color="gray" />
          </View>

          <View className="items-center justify-center mx-6 my-12">
            <Image
              resizeMode="cover"
              className="w-full h-[400]"
              source={{
                uri: currentTrack.trackImageUrl || currentTrack.albumImageUrl,
              }}
            />
          </View>

          <View className="flex-row items-center justify-between p-1 mt-12">
            <View>
              <Text className="text-2xl font-semibold text-white">
                {currentTrack.trackName}
              </Text>
              <Text className="text-lg font-semibold text-gray-400">
                {currentTrack.artistName}
              </Text>
            </View>
            <AddList track={currentTrack} />
          </View>

          <MusicProgressBar
            position={progress.position}
            duration={progress.duration}
          />

          <View className="flex-row items-center justify-between my-2">
            <Text className="text-gray-300">
              {formatTime(progress.position)}
            </Text>
            <Text className="text-gray-300">
              {formatTime(progress.duration)}
            </Text>
          </View>

          <View className="flex-row items-center justify-between my-4">
            <Entypo name="shuffle" size={28} color="#1ED760" />
            <Ionicons name="play-skip-back" size={24} color="gray" />
            <TouchableOpacity className="p-2" onPress={handlePlayPause}>
              {currentTrack.isPlaying ? (
                <FontAwesome name="pause" size={46} color="white" />
              ) : (
                <Entypo name="controller-play" size={46} color="white" />
              )}
            </TouchableOpacity>
            <Ionicons name="play-skip-forward" size={24} color="white" />
            <MaterialCommunityIcons
              name="timer-outline"
              size={24}
              color="white"
            />
          </View>

          <View className="flex-row items-center justify-between my-4">
            <MaterialCommunityIcons
              name="monitor-speaker"
              size={28}
              color="white"
            />
            <Octicons name="share-android" size={24} color="white" />
          </View>

          {lyrics.length > 0 && <Lyrics lyrics={lyrics} />}
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default SongInfoScreen;
