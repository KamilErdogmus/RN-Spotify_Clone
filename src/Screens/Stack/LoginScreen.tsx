import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const loginOptions = [
    {
      text: "Sign Up Free",
      bgColor: "bg-spotify",
      textColor: "text-black",
      icon: null,
      borderOpt: false,
    },
    {
      text: "Sign In with Google",
      bgColor: "bg-transparent",
      textColor: "text-white",
      icon: require("../../../assets/google.png"),
      borderOpt: true,
    },
    {
      text: "Sign In with Facebook",
      bgColor: "bg-transparent",
      textColor: "text-white",
      icon: require("../../../assets/facebook.png"),
      borderOpt: true,
    },
    {
      text: "Log in",
      bgColor: "bg-transparent",
      textColor: "text-white",
      icon: null,
      borderOpt: false,
    },
  ];

  return (
    <LinearGradient
      className="items-center flex-1 px-4 py-8 justify-evenly"
      colors={["#222", "#121212"]}
    >
      <View className="items-center justify-center">
        <Entypo name="spotify" color="white" size={100} />
        <Text className="mt-10 text-5xl font-bold text-center text-white">
          Millions of Songs. Free on Spotify.
        </Text>
      </View>
      <View />
      <View className="w-full space-y-4 gap-y-6 ">
        {loginOptions.map((option, index) => (
          <Pressable
            onPress={() => navigation.navigate("Main")}
            key={index}
            className={`py-3 rounded-full flex-row items-center justify-center ${
              option.bgColor
            } ${option.borderOpt ? "border border-white/40" : ""}`}
          >
            {option.icon && (
              <Image
                className="absolute w-8 h-8 mr-4 left-4"
                source={option.icon}
              />
            )}
            <Text
              className={`text-lg font-semibold text-center ${option.textColor}`}
            >
              {option.text}
            </Text>
          </Pressable>
        ))}
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
