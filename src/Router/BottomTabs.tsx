import { View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TabNavigationProp } from "../utils/types";
import { fetchArtistBioAtom } from "../atom/artistBioAtom";
import { useAtom } from "jotai";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Screens } from "../utils/Screens";
import HomeScreen from "../Screens/Tabs/HomeScreen";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import SearchScreen from "../Screens/Tabs/SearchScreen";
import LibraryScreen from "../Screens/Tabs/LibraryScreen";
import PremiumScreen from "../Screens/Tabs/PremiumScreen";
import SearchDetail from "../Screens/SearchDetail";
import LikedSong from "../Screens/LikedSong";
import ArtistInfoScreen from "../Screens/ArtistInfoScreen";
import AlbumInfoScreen from "../Screens/AlbumInfoScreen";
import SongInfoScreen from "../Screens/SongInfoScreen";
import ArtistBioScreen from "../Screens/ArtistBioScreen";
import MiniPlayer from "../components/MiniPlayer";
import { currentTrackAtom, modalAtom } from "../atom/currentAtom";
import Modal from "react-native-modal";
import { setupPlayer, stopPlayer } from "../utils/player";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const navigation = useNavigation<TabNavigationProp>();
  const [artistBio] = useAtom(fetchArtistBioAtom);
  const [modalState] = useAtom(modalAtom);
  const [currentTrack] = useAtom(currentTrackAtom);

  useEffect(() => {
    setupPlayer();
    return () => {
      stopPlayer();
    };
  }, []);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#b3b3b3",
          tabBarLabelStyle: { marginBottom: 5 },
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#090909aa",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            borderTopColor: "transparent",
          },
          tabBarBackground: () => (
            <View style={{ backgroundColor: "transparent" }} />
          ),
        }}
      >
        <Tab.Screen
          name={Screens.Home}
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons name="home-filled" size={30} color="white" />
              ) : (
                <Octicons name="home" size={30} color="#B3B3B3" />
              ),
          }}
        />
        <Tab.Screen
          name={Screens.Search}
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="relative">
                <Feather
                  name="search"
                  size={32}
                  color={focused ? "white" : "#B3B3B3"}
                />
                {focused && (
                  <View className="absolute bottom-[-3] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                )}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={Screens.Library}
          component={LibraryScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="library-sharp" size={30} color="#fff" />
              ) : (
                <Ionicons name="library-outline" size={30} color="#B3B3B3" />
              ),
          }}
        />
        <Tab.Screen
          name={Screens.Premium}
          component={PremiumScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="spotify"
                size={30}
                color={focused ? "#fff" : "#B3B3B3"}
              />
            ),
          }}
        />
        <Tab.Screen
          name={Screens.SearchDetail}
          component={SearchDetail}
          options={{
            tabBarButton: () => null,
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name={Screens.LikedSongs}
          component={LikedSong}
          options={{
            tabBarButton: () => null,
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name={Screens.ArtistInfo}
          component={ArtistInfoScreen}
          options={{
            tabBarButton: () => null,
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name={Screens.AlbumInfo}
          component={AlbumInfoScreen}
          options={{
            tabBarButton: () => null,
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name={Screens.SongInfo}
          component={SongInfoScreen}
          options={{
            tabBarButton: () => null,
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name={Screens.ArtistBio}
          component={ArtistBioScreen}
          options={({ route }) => ({
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#282828",
            },
            headerTitle: artistBio?.name || "Artist Bio",
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#fff",
            },
            headerShadowVisible: false,
            tabBarButton: () => null,
            tabBarItemStyle: { display: "none" },
            contentStyle: {
              backgroundColor: "#282828",
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(Screens.Main, {
                    screen: Screens.ArtistInfo,
                    params: { id: artistBio?.id },
                  });
                }}
                className="ml-4"
              >
                <AntDesign name="arrowleft" size={28} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
      </Tab.Navigator>

      {currentTrack && currentTrack.duration && currentTrack.duration > 0 && (
        <MiniPlayer />
      )}
      <View className="px-1">
        <Modal
          isVisible={modalState.isVisible}
          style={{
            margin: 0,
            justifyContent: "flex-end",
          }}
          swipeDirection="down"
          statusBarTranslucent
          backdropOpacity={0.5}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          useNativeDriver
        >
          <SongInfoScreen />
        </Modal>
      </View>
    </>
  );
};

export default BottomTabs;
