import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import SongRow from "../components/SongRow";
import { useDebounce } from "../utils/debounceFnc";
import { getSearchResults } from "../services/api";
import { ISearchResponse } from "../utils/types";
import Loader from "../components/Loader";
import RenderSearchResult from "../components/RenderSearchResult";

const SearchDetail = () => {
  const navigation = useNavigation();

  const [text, setText] = useState<string>("");
  const [results, setResults] = useState<ISearchResponse | null>(null);
  const [searchedTexts, setSearchedTexts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedText = useDebounce(text, 2000);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedText) {
        setIsLoading(true);
        try {
          const data = await getSearchResults(debouncedText);
          setResults(data);
          setSearchedTexts((prev) =>
            [...new Set([debouncedText, ...prev])].slice(0, 3)
          );
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults(null);
      }
    };

    fetchResults();
  }, [debouncedText]);

  const handleClearSearch = () => {
    setSearchedTexts([]);
  };

  const renderRecentSearches = () => (
    <View className="px-4 pt-6 pb-4">
      <Text className="text-2xl font-bold text-white">Recent searches</Text>
      {searchedTexts.map((searchText, index) => (
        <Pressable
          key={index}
          className="flex-row items-center justify-between py-2 my-2"
          onPress={() => setText(searchText)}
        >
          <Text className="text-white">{searchText}</Text>
        </Pressable>
      ))}
      {searchedTexts.length > 0 && (
        <View className="flex items-center justify-center w-full mt-4">
          <TouchableOpacity
            onPress={handleClearSearch}
            className="px-6 py-3 border border-gray-500 rounded-full"
          >
            <Text className="text-white">Clear recent searches</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderSearchResults = () => (
    <>
      <View className="flex-row items-center justify-between px-4 my-4">
        <View className="flex-row items-center">
          <View className="bg-[#282828] w-12 h-12 p-1 items-center justify-center rounded-full">
            <AntDesign name="search1" size={24} color="white" />
          </View>
          <Text className="ml-2 text-lg text-white">Results</Text>
        </View>
      </View>

      {isLoading ? (
        <View className="items-center justify-center flex-1">
          <Loader />
        </View>
      ) : results ? (
        <View className="px-2">
          {results.albums.map((item) => (
            <RenderSearchResult
              results={{
                type: "album",
                albumID: item.albumID,
                albumImage: item.albumImage,
                albumName: item.albumName,
                artistName: item.artistName,
              }}
              key={item.albumID}
            />
          ))}
          {results.artists.map((item) => (
            <RenderSearchResult
              results={{
                type: "artist",
                artistID: item.artistID,
                artistImage: item.artistImage,
                artistName: item.artistName,
              }}
              key={item.artistID}
            />
          ))}
          {results.tracks.map((item) => (
            <SongRow dots data={item} key={item.songID} />
          ))}
        </View>
      ) : (
        <View className="items-center justify-center flex-1">
          <Text className="text-2xl font-bold text-center text-white">
            Play what you love
          </Text>
          <Text className="mt-4 text-center text-gray-400">
            Search for artists, songs, podcasts and more.
          </Text>
        </View>
      )}
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <StatusBar style="light" backgroundColor="#282828" />

      <View className="flex-row items-center px-3 py-2 bg-[#282828]">
        <Pressable onPress={() => navigation.goBack()} className="p-2">
          <AntDesign name="arrowleft" size={28} color="white" />
        </Pressable>

        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="What do you want to listen to?"
          placeholderTextColor="#959595"
          className="flex-1 mx-4 text-lg text-white"
          autoFocus
          clearButtonMode="while-editing"
        />

        {text.trim().length > 0 && (
          <Pressable onPress={() => setText("")}>
            <AntDesign name="close" size={24} color="white" />
          </Pressable>
        )}
      </View>

      {text.trim().length === 0
        ? renderRecentSearches()
        : renderSearchResults()}
    </SafeAreaView>
  );
};

export default SearchDetail;
