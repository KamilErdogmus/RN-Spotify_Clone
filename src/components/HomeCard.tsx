import { View, Text, FlatList, Image, Pressable } from "react-native";
import React, { memo, useCallback } from "react";
import { SimpleArtist } from "../atom/popularArtistAtom";
import Loader from "./Loader";
import Error from "./Error";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../utils/Screens";
import { TabNavigationProp } from "../utils/types";

interface IHomeCard {
  title: string;
  data: SimpleArtist[];
  rounded?: boolean;
  loading: boolean;
  error: string | null;
}

const RenderItem = memo(
  ({ item, rounded }: { item: SimpleArtist; rounded: boolean }) => {
    const navigation = useNavigation<TabNavigationProp>();
    const imageUrl = item.image;

    if (
      !imageUrl ||
      item.name === "Popular" ||
      item.name.toLowerCase().startsWith("popular")
    ) {
      return null;
    }
    const handleNavigation = useCallback(() => {
      try {
        const spotifyUri = item.uri || item.id;
        let finalId = item.id;
        let type = "";

        if (spotifyUri.includes("spotify:")) {
          const [prefix, contentType, id] = spotifyUri.split(":");
          finalId = id;
          type = contentType;
        } else if (item.type) {
          type = item.type;
        } else if (item.artist) {
          type = "album";
        }

        switch (type) {
          case "album":
            navigation.navigate(Screens.AlbumInfo, { id: finalId });
            break;
          case "artist":
            navigation.navigate(Screens.ArtistInfo, { id: finalId });
            break;
          default:
            if (!spotifyUri.includes("spotify:")) {
              const newUri = `spotify:${type || "artist"}:${finalId}`;
              const [, newType, newId] = newUri.split(":");
              if (newType === "album") {
                navigation.navigate(Screens.AlbumInfo, { id: newId });
              } else if (newType === "artist") {
                navigation.navigate(Screens.ArtistInfo, { id: newId });
              }
            }
        }
      } catch (error) {
        console.error("Navigation error:", error);
      }
    }, [item, navigation]);

    return (
      <Pressable
        onPress={handleNavigation}
        className="mr-8 h-92"
        style={{ opacity: item.type === "track" ? 0.7 : 1 }}
      >
        <Image
          className={`${rounded ? "rounded-full" : "rounded-lg"} w-40 h-40`}
          source={{ uri: imageUrl }}
          resizeMode="cover"
          onError={(e) => console.log("Image error:", e.nativeEvent.error)}
        />
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="mt-4 text-xl text-center text-white capitalize max-w-40"
        >
          {item.name}
        </Text>
        {item.artists && (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-sm text-center text-gray-400"
          >
            {Array.isArray(item.artists)
              ? item.artists.join(", ")
              : item.artists}
          </Text>
        )}
      </Pressable>
    );
  }
);

const HomeCard = memo(
  ({ title, data, rounded = false, loading, error }: IHomeCard) => {
    if (loading) return <Loader />;
    if (error) return <Error message={error} />;

    const validData = data.filter(
      (item) => item?.id && item?.name && item?.image
    );

    return (
      <View className="my-6">
        <Text className="px-4 mb-4 text-3xl font-semibold text-white">
          {title}
        </Text>

        <FlatList
          horizontal
          data={validData}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
          removeClippedSubviews={true}
          renderItem={({ item }) => (
            <RenderItem item={item} rounded={rounded} />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
);

export default HomeCard;
