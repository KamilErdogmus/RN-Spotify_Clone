import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import FlowingText from "./FlowingText";
import { Pressable } from "react-native";
import { useAtom } from "jotai";
import { currentTrackAtom, openModalAtom } from "../atom/currentAtom";
import Photo from "./Photo";
import { togglePlayback } from "../utils/player";
import Loader from "./Loader";
import AddList from "./AddList";

const MiniPlayer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, openModal] = useAtom(openModalAtom);
  const [currentTrack, setCurrentTrack] = useAtom(currentTrackAtom);
  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (_, context: { startX: number }) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: (event) => {
      if (event.translationX > 100) {
        console.log("Önceki şarkı");
      } else if (event.translationX < -100) {
        console.log("Sonraki şarkı");
      }

      translateX.value = withSpring(0);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handlePlayPause = async () => {
    try {
      setIsLoading(true);
      await togglePlayback(currentTrack, setCurrentTrack);
    } catch (error) {
      console.error("Error in handlePlayPause:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PanGestureHandler onGestureEvent={panGesture}>
      <Animated.View className="absolute w-full p-2 bottom-16" style={rStyle}>
        <Pressable
          style={{ backgroundColor: currentTrack.hexColor || "#3a3a3a" }}
          onPress={openModal}
          className="flex-row items-center justify-between p-2 rounded-lg "
        >
          <View className="flex-row items-center flex-1">
            <Photo size={12} src={currentTrack?.trackImageUrl} />
            <View className="flex-1 ml-1">
              {currentTrack.trackName &&
                (currentTrack.isPlaying &&
                currentTrack.trackName.length > 30 ? (
                  <FlowingText
                    text={currentTrack.trackName}
                    isPlaying={currentTrack.isPlaying}
                  />
                ) : (
                  <Text numberOfLines={1} className="font-medium text-white">
                    {currentTrack.trackName}
                  </Text>
                ))}
              <Text className="text-gray-400">{currentTrack?.artistName}</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity className="mr-4" onPress={() => {}}>
              <MaterialCommunityIcons
                name="monitor-speaker"
                size={28}
                color="white"
              />
            </TouchableOpacity>
            <AddList track={currentTrack} />
            <TouchableOpacity
              disabled={isLoading}
              className="p-2"
              onPress={handlePlayPause}
            >
              {isLoading ? (
                <Loader />
              ) : currentTrack.isPlaying ? (
                <FontAwesome name="pause" size={32} color="white" />
              ) : (
                <Entypo name="controller-play" size={32} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </Pressable>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default MiniPlayer;
