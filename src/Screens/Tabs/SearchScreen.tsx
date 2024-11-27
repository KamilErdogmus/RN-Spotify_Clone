import { View, Text, Pressable, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Photo from "../../components/Photo";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { combinedExploreAtom, fetchExploreAtom } from "../../atom/exploreAtom";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import ExploreCard from "../../components/ExploreCard";
import { TabNavigationProp } from "../../utils/types";

const SearchScreen = () => {
  const [, fetchExplore] = useAtom(fetchExploreAtom);
  const [{ explore, exploreLoading, exploreError }] =
    useAtom(combinedExploreAtom);
  const navigation = useNavigation<TabNavigationProp>();
  const scrollY = useSharedValue(0);

  useEffect(() => {
    fetchExplore();
  }, [fetchExplore]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 50],
      [0, -50],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }],
      position: "absolute",
      top: 110,
      left: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: "#121212",
    };
  });

  const HeaderComponent = () => (
    <View className="flex-row items-center justify-between px-1 my-4">
      <Text className="text-lg text-gray-200">Browse All</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 px-4 bg-bg">
      <View className="flex-row items-center justify-between px-1 my-4">
        <View className="flex-row items-center justify-center">
          <Photo />
          <Text className="ml-2 text-4xl font-bold text-white">Search</Text>
        </View>
        <Feather name="camera" size={28} color="white" />
      </View>
      <Animated.View style={headerAnimatedStyle}>
        <Pressable
          onPress={() => navigation.navigate("SearchDetail")}
          className="flex-row items-center p-4 px-1 mx-4 my-4 bg-white rounded-md"
        >
          <AntDesign name="search1" size={24} color="black" />
          <Text className="ml-2 text-lg font-bold">
            What do you want to listen to?
          </Text>
        </Pressable>
      </Animated.View>

      <Animated.FlatList
        data={explore}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 100,
          marginBottom: 12,
          marginTop: 70,
        }}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={HeaderComponent}
        renderItem={({ item }) => <ExploreCard item={item} />}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
