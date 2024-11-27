import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "react-native";
import SongRow from "../components/SongRow";
import HomeCard from "../components/HomeCard";
import { useAtom } from "jotai";
import {
  combinedAlbumDataAtom,
  fetchAlbumAtom,
  relatedAlbumsAtom,
} from "../atom/albumAtom";
import dayjs from "dayjs";
import { Screens } from "../utils/Screens";
import {
  combinedAlbumTracksAtom,
  fetchAlbumTracksAtom,
} from "../atom/albumTracksAtom";
import Loader from "../components/Loader";
import Error from "../components/Error";

const AlbumInfoScreen = () => {
  const route = useRoute<RouteProp<{ params: { id: string } }, "params">>();
  const id = route.params.id;
  const navigation = useNavigation();

  const [, fetchAlbum] = useAtom(fetchAlbumAtom);
  const [{ albumDataAtom, albumLoadingAtom, albumErrorAtom }] = useAtom(
    combinedAlbumDataAtom
  );
  const [, fetchAlbumTracks] = useAtom(fetchAlbumTracksAtom);
  const [{ albumTracks, AlbumTracksLoading, AlbumTracksError }] = useAtom(
    combinedAlbumTracksAtom
  );
  const [relatedAlbums] = useAtom(relatedAlbumsAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAlbum(id);
        await fetchAlbumTracks(id);
      } catch (error) {
        console.error("Data fetch error:", error);
      }
    };
    fetchData();
  }, [id, fetchAlbum, fetchAlbumTracks]);

  if (AlbumTracksLoading) {
    return <Loader />;
  }

  if (AlbumTracksError) {
    return <Error message="Failed" />;
  }

  return (
    <ScrollView
      className="flex-1 bg-bg"
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <LinearGradient
        colors={[albumDataAtom.linearColor, "#121212"]}
        locations={[0.6, 1]}
        className="flex-1"
      >
        <SafeAreaView className="relative px-4">
          <Pressable className="absolute" onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={28} color="white" />
          </Pressable>
          <View className="items-center">
            <Image
              className="w-80 h-80"
              source={{
                uri: albumDataAtom.albumImage,
              }}
            />
          </View>
          <Text className="py-4 text-3xl font-bold text-white">
            {albumDataAtom.name}
          </Text>

          <View className="flex-row items-center mb-4 gap-x-4">
            <Image
              className="w-6 h-6 rounded-full"
              source={{
                uri: albumDataAtom.artistAvatarImage,
              }}
            />
            <Text className="font-semibold text-white">
              {albumDataAtom.artistName}
            </Text>
          </View>

          <Text className="text-gray-400">
            Album &bull;{" "}
            {albumDataAtom.releatedAlbums?.[0]?.year || "Unknown Year"}
          </Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center my-4 gap-x-6">
              <Image
                className="w-10 h-12 border-2 border-gray-300 rounded-lg"
                source={{
                  uri: albumDataAtom.albumImage,
                }}
              />
              <TouchableOpacity onPress={() => {}}>
                <AntDesign name="pluscircleo" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <MaterialCommunityIcons
                  name="download-circle-outline"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
              <Entypo name="dots-three-vertical" size={24} color="white" />
            </View>
            <View className="flex-row items-center justify-between gap-x-6">
              <Entypo name="shuffle" size={28} color="#1ED760" />
              <AntDesign name="play" size={45} color="#1ED760" />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View className="px-4 gap-y-4">
        {albumTracks.map((item) => (
          <SongRow key={item.songID} data={item} dots />
        ))}
      </View>

      <Text className="p-4 my-4 text-xl text-white">
        {dayjs(albumDataAtom.date).format("MMMM D, YYYY")}
      </Text>

      <View className="flex-row items-center px-4 my-4 gap-x-4">
        <Image
          className="w-16 h-16 rounded-full"
          source={{
            uri: albumDataAtom.artistAvatarImage,
          }}
        />
        <Pressable
          onPress={() =>
            navigation.navigate(Screens.ArtistBio, {
              id: albumDataAtom.artistId,
            })
          }
        >
          <Text className="font-semibold text-white">
            {albumDataAtom.artistName}
          </Text>
        </Pressable>
      </View>

      <HomeCard
        loading={albumLoadingAtom}
        title={`More by ${albumDataAtom.artistName}`}
        data={relatedAlbums.map((album) => ({
          id: album.relatedAlbumId,
          name: album.name,
          image: album.imageUrl,
          uri: `spotify:album:${album.relatedAlbumId}`,
        }))}
        error={albumErrorAtom}
      />

      <Text className="px-4 my-4 text-white">{albumDataAtom.copyright}</Text>
    </ScrollView>
  );
};

export default AlbumInfoScreen;
