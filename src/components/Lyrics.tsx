import { View, Text, Pressable, Animated } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { LyricLine } from "../utils/types";

interface LyricsProps {
  lyrics: LyricLine[];
}

const Lyrics = ({ lyrics }: LyricsProps) => {
  const [showFullLyrics, setShowFullLyrics] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showFullLyrics]);

  const handleToggleLyrics = () => {
    fadeAnim.setValue(0);
    setShowFullLyrics((prev) => !prev);
  };

  if (!lyrics.length) return null;

  return (
    <View className="px-4 my-4 bg-gray-600 rounded-xl">
      <Text className="my-4 text-2xl font-bold text-white">Lyrics Preview</Text>

      <Animated.View style={{ opacity: fadeAnim }}>
        <View>
          {(showFullLyrics ? lyrics : lyrics.slice(0, 3)).map((line, index) => (
            <Text key={index} className="text-lg font-bold text-white">
              {line.text}
            </Text>
          ))}
        </View>
      </Animated.View>

      {lyrics.length > 3 && (
        <View className="flex items-start my-4">
          <Pressable
            className="px-6 py-3 bg-white border border-gray-500 rounded-full active:opacity-80"
            onPress={handleToggleLyrics}
          >
            <Text className="font-bold text-black">
              {showFullLyrics ? "Close" : "Show Full Lyrics"}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Lyrics;
