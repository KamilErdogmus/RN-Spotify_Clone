import { View, Text, Pressable } from "react-native";
import React from "react";
import Photo from "./Photo";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParamList, TabNavigationProp } from "../utils/types";
import { Screens } from "../utils/Screens";

interface SearchResult {
  type: "album" | "artist";
  albumImage?: string;
  artistImage?: string;
  albumName?: string;
  artistName?: string;
  albumID?: string;
  artistID?: string;
}

type Props = {
  navigation: NavigationProp<RootTabParamList>;
  results: {
    type: "album" | "artist";
    albumID?: string;
    artistID?: string;
  };
};

const RenderSearchResult = ({ results }: { results: SearchResult }) => {
  const navigation = useNavigation<TabNavigationProp>();

  const handleNavigate = () => {
    if (results.type === "album" && results.albumID) {
      navigation.navigate(Screens.AlbumInfo, { id: results.albumID });
    }
    if (results.type === "artist" && results.artistID) {
      navigation.navigate(Screens.ArtistInfo, { id: results.artistID });
    }
  };
  return (
    <Pressable onPress={handleNavigate} className="flex-row px-4 my-2">
      <Photo
        src={
          results.type === "album" ? results?.albumImage : results?.artistImage
        }
      />
      <View>
        <Text className="text-lg font-semibold text-white">
          {results.type === "album" ? results?.albumName : results?.artistName}
        </Text>
        <Text className="text-gray-400 capitalize">
          {results.type}
          {results.type === "album" && (
            <>
              {" • "}
              {results.artistName}
            </>
          )}
        </Text>
      </View>
    </Pressable>
  );
};

export default RenderSearchResult;
