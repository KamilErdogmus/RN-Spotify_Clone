import { View } from "react-native";
import React from "react";

interface MusicProgressBarProps {
  position: number;
  duration: number;
}

const MusicProgressBar = ({ position, duration }: MusicProgressBarProps) => {
  const progressPercentage = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <View className="mt-2.5 px-4">
      <View className="relative w-full h-[3px] bg-gray-500 rounded-[5px]">
        <View
          className="absolute h-full bg-white rounded-[5px]"
          style={{ width: `${progressPercentage}%` }}
        />
        <View
          className="absolute w-3 h-3 bg-white rounded-full -top-1"
          style={{
            left: `${progressPercentage}%`,
            transform: [{ translateX: -6 }],
          }}
        />
      </View>
    </View>
  );
};

export default MusicProgressBar;
