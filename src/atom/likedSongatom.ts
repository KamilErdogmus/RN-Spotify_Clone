import { atom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Track {
  trackID: string;
  trackName: string;
  artistName: string;
  artistID: string;
  albumName: string;
  albumID: string;
  artistImageUrl: string | undefined;
  albumImageUrl: string | undefined;
  trackImageUrl: string | undefined;
  duration: number | undefined;
  hexColor: string | undefined;
}

export const likedSongsAtom = atom<Track[]>([]);

export const loadLikedSongsAtom = atom(null, async (get, set) => {
  try {
    const storedLikedSongs = await AsyncStorage.getItem("likedSongs");
    if (storedLikedSongs) {
      const parsedLikedSongs = JSON.parse(storedLikedSongs);
      set(likedSongsAtom, parsedLikedSongs);
    }
  } catch (error) {
    console.error("Liked songs yüklenirken hata:", error);
  }
});

export const toggleLikeAtom = atom(null, async (get, set, track: Track) => {
  const currentLikedSongs = get(likedSongsAtom);
  const isLiked = currentLikedSongs.some((t) => t.trackID === track.trackID);

  let updatedLikedSongs;
  if (isLiked) {
    updatedLikedSongs = currentLikedSongs.filter(
      (t) => t.trackID !== track.trackID
    );
  } else {
    updatedLikedSongs = [...currentLikedSongs, track];
  }

  set(likedSongsAtom, updatedLikedSongs);

  try {
    await AsyncStorage.setItem("likedSongs", JSON.stringify(updatedLikedSongs));
  } catch (error) {
    console.error("Liked songs kaydedilirken hata:", error);
  }
});

export const isTrackLikedAtom = atom((get) => {
  return (trackID: string) => {
    const likedSongs = get(likedSongsAtom);
    return likedSongs.some((track) => track.trackID === trackID);
  };
});
