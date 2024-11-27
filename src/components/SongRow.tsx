import { View, Text, Pressable, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Photo from "./Photo";
import { IAlbumTracks } from "../utils/types";
import millify from "millify";
import { useAtom } from "jotai";
import { fetchTrackAtom, trackAtom } from "../atom/trackAtom";
import { currentTrackAtom } from "../atom/currentAtom";
import { playTrack } from "../utils/player";

interface ISongRow {
  artistDetail?: boolean;
  dots?: boolean;
  photo?: boolean;
  color?: string;
  data: IAlbumTracks;
}

const SongRow = ({ artistDetail, dots, photo, data, color }: ISongRow) => {
  const [{ tracks, isLoading, error }] = useAtom(trackAtom);
  const [, fetchTrack] = useAtom(fetchTrackAtom);
  const [currentTrack, setCurrentTrack] = useAtom(currentTrackAtom);

  const trackData = data?.songID ? tracks[data.songID] : null;

  React.useEffect(() => {
    if (data?.songID && !tracks[data.songID]) {
      fetchTrack(data.songID);
    }
  }, [data?.songID, fetchTrack, tracks]);

  const handlePlay = async () => {
    if (isLoading) {
      console.log("Track data is loading...");
      return;
    }

    if (error) {
      console.error("Error loading track:", error);
      Alert.alert("Error", "Failed to load track data");
      return;
    }

    if (!trackData) {
      console.log("No track data available");
      return;
    }

    if (!trackData.previewUrl) {
      console.log("No preview URL for track:", trackData);
      Alert.alert(
        "Preview Unavailable",
        "Sorry, this track doesn't have a preview available."
      );
      return;
    }

    try {
      setCurrentTrack({
        trackID: data.songID,
        trackName: data.songName,
        artistName: data.artistName,
        artistID: data.artistID,
        albumName: "",
        albumID: data.albumID,
        artistImageUrl: undefined,
        albumImageUrl: data.albumImage,
        trackImageUrl: data.albumImage,
        duration: trackData.duration / 1000,
        hexColor: color,
        isPlaying: true,
        currentTime: 0,
      });
      await playTrack(
        {
          id: data.songID,
          url: trackData.previewUrl,
          title: data.songName,
          artist: data.artistName,
          artwork: data.albumImage,
          duration: trackData.duration / 1000,
          artistId: data.artistID,
          albumId: data.albumID,
          albumName: "",
          hexColor: color,
        },
        setCurrentTrack
      );
    } catch (error) {
      console.error("Error playing track:", error);
      Alert.alert(
        "Error",
        "There was an error playing this track. Please try again."
      );

      setCurrentTrack((prev) => ({
        ...prev,
        isPlaying: false,
      }));
    }
  };

  const isCurrentlyPlaying = currentTrack?.trackID === data.songID;
  return (
    <Pressable
      onPress={handlePlay}
      className="flex-row items-center justify-between w-full p-2"
    >
      <View className="flex-row items-center px-1 space-x-3">
        {photo && (
          <Photo size={12} rounded src={data?.imageUrl || data?.albumImage} />
        )}
        <View className="w-[80%]">
          <Text
            numberOfLines={1}
            className={`text-xl font-semibold ${
              isCurrentlyPlaying ? "text-[#1ED760]" : "text-white"
            }`}
          >
            {data?.songName}
          </Text>
          <Text className="mt-1 text-base text-gray-500">
            {artistDetail ? `${millify(data?.playcount)}` : data?.artistName}
          </Text>
        </View>
      </View>

      <TouchableOpacity className="p-2">
        {dots ? (
          <Entypo name="dots-three-vertical" size={24} color="gray" />
        ) : (
          <AntDesign name="close" size={24} color="gray" />
        )}
      </TouchableOpacity>
    </Pressable>
  );
};

export default SongRow;
