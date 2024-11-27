import { TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { isTrackLikedAtom, toggleLikeAtom } from "../atom/dist/likedSongatom";
import { AddListProps } from "../utils/types";

const AddList = ({ track }: AddListProps) => {
  const [, toggleLike] = useAtom(toggleLikeAtom);
  const [isTrackLiked] = useAtom(isTrackLikedAtom);

  const handleToggleLike = () => {
    if (track.trackID) {
      const trackData = {
        trackID: track.trackID,
        trackName: track.trackName,
        artistName: track.artistName,
        artistID: track.artistID,
        albumName: track.albumName,
        albumID: track.albumID,
        artistImageUrl: track.artistImageUrl,
        albumImageUrl: track.albumImageUrl,
        trackImageUrl: track.trackImageUrl,
        duration: track.duration,
        hexColor: track.hexColor,
      };
      toggleLike(trackData);
    }
  };

  const isLiked = track.trackID ? isTrackLiked(track.trackID) : false;

  return (
    <TouchableOpacity
      className="mr-4"
      onPress={handleToggleLike}
      disabled={!track.trackID}
    >
      <AntDesign
        name={isLiked ? "heart" : "pluscircleo"}
        size={28}
        color={isLiked ? "#1ED760" : "white"}
      />
    </TouchableOpacity>
  );
};

export default AddList;
