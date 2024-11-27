import React from "react";
import {
  FontAwesome6,
  MaterialCommunityIcons,
  Entypo,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

export interface PremiumFeature {
  icon: React.ReactNode;
  text: string;
}

export const features: PremiumFeature[] = [
  {
    icon: <FontAwesome6 name="volume-xmark" size={24} color="white" />,
    text: "Ad-free music listening",
  },
  {
    icon: (
      <MaterialCommunityIcons name="download-circle" size={24} color="white" />
    ),
    text: "Download to listen offline",
  },
  {
    icon: <Entypo name="shuffle" size={24} color="white" />,
    text: "Play songs in any order",
  },
  {
    icon: <Ionicons name="headset" size={24} color="white" />,
    text: "High audio quality",
  },
  {
    icon: <MaterialIcons name="groups" size={24} color="white" />,
    text: "Listen with friends in real time",
  },
  {
    icon: <MaterialIcons name="queue-music" size={24} color="white" />,
    text: "Organize listen queue",
  },
];
