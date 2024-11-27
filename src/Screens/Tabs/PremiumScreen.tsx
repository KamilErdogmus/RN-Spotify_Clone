import React, { useCallback, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Animated as RNAnimated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  cancelAnimation,
} from "react-native-reanimated";
import { features } from "../../utils/premiumFeatures";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import PremiumPlans from "../../components/PremiumPlans";
import { premiumPlansDetails } from "../../utils/constants";

const AnimatedFeatureItem = ({
  icon,
  text,
  index,
  refreshKey,
}: {
  icon: React.ReactNode;
  text: string;
  index: number;
  refreshKey: number;
}) => {
  const translateX = useSharedValue(50);
  const opacity = useSharedValue(0);

  const resetAndStartAnimation = useCallback(() => {
    cancelAnimation(translateX);
    cancelAnimation(opacity);

    translateX.value = 50;
    opacity.value = 0;

    translateX.value = withDelay(index * 200, withTiming(0, { duration: 800 }));
    opacity.value = withDelay(index * 200, withTiming(1, { duration: 900 }));
  }, [index, refreshKey]);

  React.useEffect(() => {
    resetAndStartAnimation();
  }, [resetAndStartAnimation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: opacity.value,
      flexDirection: "row",
      alignItems: "center",
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      {icon}
      <Text className="ml-2 text-white">{text}</Text>
    </Animated.View>
  );
};

const PremiumScreen = () => {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const navigation = useNavigation();

  const scrollY = useRef(new RNAnimated.Value(0)).current;

  const imageAnimations = {
    height: scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [380, 190],
      extrapolate: "clamp",
    }),
    scale: scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [1, 0.4],
      extrapolate: "clamp",
    }),
    opacity: scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [1, 0.4],
      extrapolate: "clamp",
    }),
    translateY: scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, -50],
      extrapolate: "clamp",
    }),
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", () => {
      if (navigation.isFocused()) {
        setRefreshKey((prev) => prev + 1);
      }
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      setRefreshKey((prev) => prev + 1);
    }, [])
  );

  return (
    <ScrollView
      onScroll={RNAnimated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
      className="flex-1 bg-bg"
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <LinearGradient colors={["#3a3a3a", "#050505"]}>
        <RNAnimated.Image
          source={require("../../../assets/premium.png")}
          style={{
            width: "100%",
            height: imageAnimations.height,
            transform: [
              { scale: imageAnimations.scale },
              { translateY: imageAnimations.translateY },
            ],
            opacity: imageAnimations.opacity,
            resizeMode: "cover",
            alignSelf: "center",
          }}
        />

        <View className="flex-row items-center px-4">
          <Entypo name="spotify" size={28} color="white" />
          <Text className="mr-1 text-lg text-white">Premium</Text>
        </View>

        <Text className="px-4 mt-4 mb-12 text-4xl font-bold text-white">
          Listen without limits. Try 1 month of Premium Individual for free with
          Spotify.
        </Text>
      </LinearGradient>

      <Pressable className="items-center justify-center p-4 mx-4 bg-white rounded-full">
        <Text className="text-xl font-extrabold">Try free for 1 month</Text>
      </Pressable>

      <Text className="px-4 my-8 text-sm text-gray-200 ">
        Free for month, then $7.99 per month after. Offer only available if you
        haven't tried Premium before and you subscribe via Spotify. Offers via
        Google Play may differ. <Text className="underline">Terms Apply</Text>
      </Text>

      <View className="bg-[#1f1f1f] rounded-2xl mx-4 px-8 mb-6">
        <Text className="my-6 text-2xl font-bold text-white">
          Why Join Premium
        </Text>
        <View className="mb-4 border-b border-gray-700" />

        <View className="mb-4 gap-y-4">
          {features.map((feature, index) => (
            <AnimatedFeatureItem
              key={`${refreshKey}-${index}`}
              icon={feature.icon}
              text={feature.text}
              index={index}
              refreshKey={refreshKey}
            />
          ))}
        </View>
      </View>

      <Text className="mx-4 my-6 text-2xl font-bold text-white">
        Available plans
      </Text>

      {premiumPlansDetails.map((item) => (
        <PremiumPlans key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

export default PremiumScreen;
