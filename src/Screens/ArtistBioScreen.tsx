import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootTabParamList, ArtistBio } from "../utils/types";
import { AntDesign, Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useAtom } from "jotai";
import {
  combinedArtistBioAtom,
  fetchArtistBioAtom,
} from "../atom/artistBioAtom";
import Loader from "../components/Loader";
import Error from "../components/Error";

type ArtistBioScreenRouteProp = RouteProp<RootTabParamList, "ArtistBio">;

const ArtistBioScreen = () => {
  const route = useRoute<ArtistBioScreenRouteProp>();
  const { id } = route.params;

  const [{ artistBio, ArtistBioError, ArtistBioIsLoading }] = useAtom(
    combinedArtistBioAtom
  );
  const [, fetchArtistBio] = useAtom(fetchArtistBioAtom);

  useEffect(() => {
    if (id) {
      fetchArtistBio(id);
    }
  }, [id, fetchArtistBio]);

  if (!id) {
    return <Error message="No artist ID provided" />;
  }

  if (ArtistBioIsLoading) return <Loader />;
  if (ArtistBioError)
    return <Error message={ArtistBioError?.message || "Failed"} />;

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80 }}
      className="flex-1 bg-bg"
    >
      <View className="items-center justify-center m-8 h-96">
        <Image
          resizeMode="cover"
          className="w-full h-96"
          source={{ uri: artistBio?.image || artistBio?.avatarImage }}
        />
      </View>

      <Text style={{ fontSize: 60 }} className="px-4 font-bold text-white">
        {artistBio?.monthlyListeners?.toLocaleString()}
      </Text>
      <Text className="px-4 text-lg font-semibold text-gray-300">
        MONTHLY LISTENERS
      </Text>

      <Text className="px-4 mt-10 text-lg leading-relaxed tracking-wide text-white">
        {artistBio?.biography}
      </Text>

      <View className="flex-row items-center px-4 my-4">
        <Image
          className="w-16 h-16 rounded-full"
          source={{ uri: artistBio?.avatarImage }}
        />
        <Text className="ml-4 text-lg text-white ">
          Posted By {artistBio?.name}
        </Text>
      </View>

      <View className="px-4 my-4 gap-y-6">
        <View className="flex-row">
          <AntDesign name="instagram" size={28} color="white" />
          <Text className="ml-4 text-lg text-white">Instagram</Text>
        </View>
        <View className="flex-row">
          <FontAwesome6 name="x-twitter" size={28} color="white" />
          <Text className="ml-4 text-lg text-white">X</Text>
        </View>
        <View className="flex-row">
          <Entypo name="facebook" size={24} color="white" />
          <Text className="ml-4 text-lg text-white">Facebook</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ArtistBioScreen;
