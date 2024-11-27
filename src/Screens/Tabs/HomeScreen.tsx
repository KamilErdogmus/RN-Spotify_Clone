import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { selectArea } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import Photo from "../../components/Photo";
import { useAtom } from "jotai";
import {
  combinedPopularArtistsAtom,
  fetchPopularArtistsAtom,
} from "../../atom/popularArtistAtom";
import HomeCard from "../../components/HomeCard";
import {
  combinedPopularTracksAtom,
  fetchPopularTracksAtom,
} from "../../atom/popularTracksAtom";
import {
  combinedPodcastEpisodesAtom,
  fetchPodcastEpisodesAtom,
} from "../../atom/podcastAtom";
import PodcastCard from "../../components/PodcastCard";
import {
  combinedPopularAlbumsAtom,
  fetchPopularAlbumsAtom,
} from "../../atom/popularAlbumAtom";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeScreenNavigationProp } from "../../utils/types";
import { openModalAtom } from "../../atom/currentAtom";
import { getAlbumTracks, getTrackData } from "../../services/api";

const HomeScreen = () => {
  const [selected, setSelected] = useState<number>(0);
  const [, fetchPopularArtists] = useAtom(fetchPopularArtistsAtom);
  const [, fetchTracks] = useAtom(fetchPopularTracksAtom);
  const [, fetchEpisodes] = useAtom(fetchPodcastEpisodesAtom);
  const [, fetchAlbums] = useAtom(fetchPopularAlbumsAtom);
  const [, openModal] = useAtom(openModalAtom);

  const [{ artists, artistLoading, artistError }] = useAtom(
    combinedPopularArtistsAtom
  );
  const [{ tracks, TracksLoading, TracksError }] = useAtom(
    combinedPopularTracksAtom
  );
  const [{ episodes, PodcastLoading, PodcastError }] = useAtom(
    combinedPodcastEpisodesAtom
  );
  const [{ albums, albumLoading, albumError }] = useAtom(
    combinedPopularAlbumsAtom
  );
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAlbums();
        await getTrackData("168ZvVQDJd8xigT35ODXcl");
        await fetchPopularArtists();
        await fetchEpisodes("4rOoJ6Egrf8K2IrywzwOMk");
        await fetchTracks();
        await getAlbumTracks("4yP0hdKOZPNshxUOjY0cZj");
      } catch (error) {
        console.error("Data fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const all = selected === 0;
  const music = selected === 1;
  const podcasts = selected === 2;

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 6, paddingBottom: 50 }}
        className="flex-1"
      >
        <View className="flex-row items-center p-4">
          <Pressable onPress={openDrawer}>
            <Photo rounded />
          </Pressable>
          {selectArea.map((item, index) => (
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
          ))}
        </View>

        {(all || music) && (
          <HomeCard
            title="Popular Artists"
            data={artists}
            rounded
            loading={artistLoading}
            error={artistError}
          />
        )}
        {(all || podcasts) && (
          <PodcastCard
            episodes={episodes.slice(0, 1)}
            loading={PodcastLoading}
            error={PodcastError}
          />
        )}
        {(all || music) && (
          <HomeCard
            title="Popular Tracks"
            data={tracks}
            rounded
            loading={TracksLoading}
            error={TracksError}
          />
        )}
        {(all || podcasts) && (
          <PodcastCard
            episodes={episodes.slice(1, 2)}
            loading={PodcastLoading}
            error={PodcastError}
          />
        )}
        {(all || music) && (
          <HomeCard
            title="Popular Albums"
            data={albums}
            loading={albumLoading}
            error={albumError}
          />
        )}
        {(all || podcasts) && (
          <PodcastCard
            episodes={episodes.slice(2, 3)}
            loading={PodcastLoading}
            error={PodcastError}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
