import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import SongRow from "../components/SongRow";
import { useAtom } from "jotai";
import {
  combinedRelatedArtistsAtom,
  fetchRelatedArtistsAtom,
} from "../atom/relatedArtist";
import HomeCard from "../components/HomeCard";
import {
  combinedArtistBioAtom,
  fetchArtistBioAtom,
} from "../atom/artistBioAtom";
import { Screens } from "../utils/Screens";
import { TabNavigationProp } from "../utils/types";
import millify from "millify";
import {
  combinedArtistDataAtom,
  fetchArtistDataAtom,
} from "../atom/artistDataAtom";
import Loader from "../components/Loader";
import Error from "../components/Error";

const ArtistInfoScreen = () => {
  const route = useRoute<RouteProp<{ params: { id: string } }, "params">>();
  const { id } = route.params;
  const navigation = useNavigation<TabNavigationProp>();
  const [selected, setSelected] = useState<boolean>(true);

  const [{ relatedArtists, relatedIsLoading, relatedError }] = useAtom(
    combinedRelatedArtistsAtom
  );
  const [{ artistBio, ArtistBioError, ArtistBioIsLoading }] = useAtom(
    combinedArtistBioAtom
  );
  const [{ artistData, artistDataError, artistDataLoading }] = useAtom(
    combinedArtistDataAtom
  );
  const [, fetchArtistBio] = useAtom(fetchArtistBioAtom);
  const [, fetchRelatedArtists] = useAtom(fetchRelatedArtistsAtom);
  const [, fetchArtistData] = useAtom(fetchArtistDataAtom);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        await fetchArtistData(id);
        await fetchArtistBio(id);
        await fetchRelatedArtists(id);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };

    fetchData();
  }, [id]);

  const isLoading = artistDataLoading || ArtistBioIsLoading;
  const hasError = artistDataError || ArtistBioError;
  const errorMessage =
    artistDataError?.message || ArtistBioError?.message || "An error occurred";

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <Error message={errorMessage} />;
  }

  if (!artistData && !artistBio) {
    return <Error message="No artist data available" />;
  }

  return (
    <View className="flex-1 bg-bg">
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <View className="relative w-full">
          <Pressable
            className="absolute left-4 top-12 z-30 w-10 h-10 items-center justify-center rounded-full bg-[#959798]"
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </Pressable>

          <View className="relative flex-1 w-full z-60">
            <Image
              resizeMode="cover"
              className="w-full h-[400]"
              source={{
                uri: artistData?.avatarImage || artistBio?.image,
              }}
            />
            <View className="absolute inset-0 bg-off/30" />
          </View>
          <View className="absolute bottom-0 z-30 w-full px-4">
            <Text
              numberOfLines={2}
              style={{ fontSize: 60 }}
              className="font-bold text-center text-white"
            >
              {artistData?.artistName || artistBio?.name}
            </Text>
          </View>
        </View>

        <LinearGradient
          locations={[0, 0.1]}
          className="flex-1"
          colors={[artistData?.linearColor as string, "#121212"]}
        >
          <Text className="px-4 my-4 text-gray-400">
            {millify(
              artistBio?.monthlyListeners || artistData?.monthlyListeners
            )}{" "}
            monthly listeners
          </Text>
          <View className="flex-row items-center justify-between px-4 my-4">
            <View className="flex-row items-center gap-x-6">
              <Image
                className="w-10 h-12 border-2 border-gray-300 rounded-lg"
                source={{
                  uri: artistBio?.avatarImage,
                }}
              />

              <Pressable className="items-center justify-center px-4 py-2 bg-transparent border-2 border-gray-300 rounded-lg ">
                <Text className="text-lg text-white">Follow</Text>
              </Pressable>

              <Entypo name="dots-three-vertical" size={24} color="gray" />
            </View>
            <View className="flex-row items-center justify-between gap-x-6">
              <Entypo name="shuffle" size={28} color="#1ED760" />
              <AntDesign name="play" size={45} color="#1ED760" />
            </View>
          </View>
          <View className="flex-row px-4 gap-x-8">
            <Pressable
              onPress={() => setSelected(!selected)}
              className={`pb-4 ${selected && "border-b-4 border-terrary"}`}
            >
              <Text className="text-xl text-white">Music</Text>
            </Pressable>
            <Pressable
              onPress={() => setSelected(!selected)}
              className={`pb-4 ${!selected && "border-b-4 border-terrary"}`}
            >
              <Text className="text-xl text-white">Events</Text>
            </Pressable>
          </View>
          <Text className="px-4 my-4 text-2xl font-bold text-white">
            Popular
          </Text>
          <View className="px-4">
            {artistData?.topTracks?.slice(0, 5).map((item, index) => (
              <View key={index} className="flex-row items-center px-4 my-4">
                <Text className="mr-4 text-lg text-white">{index + 1}</Text>
                <SongRow
                  data={item}
                  artistDetail
                  dots
                  photo
                  color={artistData?.linearColor}
                />
              </View>
            ))}
          </View>

          <View className="flex-row items-center justify-between px-4 my-4">
            <Text className="my-4 text-2xl font-bold text-white">
              Popular releases
            </Text>
            <TouchableOpacity>
              <Text className="px-4 my-4 text-lg font-bold text-gray-400">
                Show all
              </Text>
            </TouchableOpacity>
          </View>
          <View className="px-4">
            {artistData?.otherAlbums.slice(0, 4).map((album) => (
              <Pressable
                onPress={() =>
                  navigation.navigate(Screens.AlbumInfo, { id: album.albumID })
                }
                key={album.albumID}
                className="flex-row items-center my-4"
              >
                <Image
                  className="w-24 h-24 rounded-lg"
                  source={{
                    uri: album?.coverImage,
                  }}
                />
                <View className="ml-4 gap-y-2">
                  <Text className="text-xl text-white">{album.albumName}</Text>
                  <Text className="text-base text-gray-400">{album.type}</Text>
                </View>
              </Pressable>
            ))}
          </View>
          <View className="flex items-center justify-center w-full mt-4">
            <TouchableOpacity className="px-6 py-3 border border-gray-500 rounded-full">
              <Text className="text-white">See discography</Text>
            </TouchableOpacity>
          </View>

          <Text className="px-4 my-4 text-2xl font-bold text-white">About</Text>

          <Pressable
            onPress={() => navigation.navigate(Screens.ArtistBio, { id })}
            className="relative px-4"
          >
            {artistBio?.isVerified && (
              <View className="absolute z-10 flex-row items-center gap-x-2 top-8 left-8">
                <MaterialIcons name="verified" size={24} color="#2578D6" />
                <Text className="font-semibold text-white">
                  Verified Artist
                </Text>
              </View>
            )}

            <Image
              resizeMode="cover"
              className="w-full rounded-lg h-96"
              source={{ uri: artistBio?.image }}
            />

            <View className="absolute z-20 bottom-4 left-8 right-8">
              {artistBio?.monthlyListeners && (
                <Text className="mb-2 text-xl font-bold text-gray-300">
                  {artistBio.monthlyListeners.toLocaleString()}
                  <Text className="text-lg font-semibold text-gray-400">
                    {" "}
                    MONTHLY LISTENERS
                  </Text>
                </Text>
              )}

              <View className="flex-row items-center justify-between">
                <Text className="flex-1 mr-4 text-white" numberOfLines={2}>
                  {artistBio?.biography || "No biography available"}
                </Text>

                <AntDesign name="right" size={24} color="white" />
              </View>
            </View>
          </Pressable>

          {relatedArtists.length > 0 && (
            <HomeCard
              title="Fans also like"
              data={relatedArtists}
              loading={relatedIsLoading}
              error={relatedError}
              rounded
            />
          )}
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default ArtistInfoScreen;
