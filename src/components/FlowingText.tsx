import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { View, Dimensions } from "react-native";

const FlowingText = ({
  text,
  isPlaying,
}: {
  text: string;
  isPlaying: boolean;
}) => {
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth - 220;

  const textWidth = text.length * 8;
  const needsAnimation = textWidth > containerWidth;

  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    if (isPlaying && needsAnimation) {
      const distance = textWidth - containerWidth;

      translateX.value = withRepeat(
        withTiming(-distance, {
          duration: distance * 30,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    } else {
      translateX.value = withTiming(0);
    }
  }, [isPlaying, needsAnimation, textWidth]);

  return (
    <View
      style={{
        width: containerWidth,
        overflow: "hidden",
      }}
    >
      <Animated.Text
        numberOfLines={1}
        style={[
          animatedStyle,
          {
            color: "white",
            fontSize: 16,
            fontWeight: "500",
            width: needsAnimation ? textWidth : containerWidth,
            paddingRight: needsAnimation ? 50 : 0,
          },
        ]}
      >
        {text}
        {needsAnimation && isPlaying ? `     ${text}` : ""} {/* Text tekrarı */}
      </Animated.Text>
    </View>
  );
};

export default FlowingText;
