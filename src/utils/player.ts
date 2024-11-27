import { Audio } from "expo-av";
import { CurrentTrackAtom } from "./types";

let sound: Audio.Sound | null = null;

export const setupPlayer = async (): Promise<boolean> => {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });
    return true;
  } catch (error) {
    console.error("Error setting up player:", error);
    return false;
  }
};

export const playTrack = async (
  track: {
    id: string;
    url: string;
    title: string;
    artist: string;
    artwork: string;
    duration?: number;
    artistId?: string;
    albumId?: string;
    albumName?: string;
    hexColor?: string;
  },
  setCurrentTrack: (value: CurrentTrackAtom) => void
): Promise<void> => {
  try {
    if (sound) {
      await sound.unloadAsync();
      sound = null;
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: track.url },
      { shouldPlay: true },
      (status) => {
        if (status.isLoaded) {
          setCurrentTrack((prev) => ({
            ...prev,
            currentTime: status.positionMillis / 1000,
            isPlaying: status.isPlaying,
          }));

          if (status.didJustFinish) {
            setCurrentTrack((prev) => ({
              ...prev,
              isPlaying: false,
              currentTime: 0,
            }));
          }
        }
      }
    );

    sound = newSound;

    setCurrentTrack({
      trackID: track.id,
      trackName: track.title,
      artistName: track.artist,
      artistID: track.artistId,
      albumName: track.albumName,
      albumID: track.albumId,
      trackImageUrl: track.artwork,
      duration: track.duration,
      hexColor: track.hexColor,
      isPlaying: true,
      currentTime: 0,
    });
  } catch (error) {
    console.error("Error playing track:", error);
    throw error;
  }
};

export const togglePlayback = async (
  currentTrack: CurrentTrackAtom,
  setCurrentTrack: (value: CurrentTrackAtom) => void
): Promise<void> => {
  try {
    if (!sound) {
      if (currentTrack.trackID) {
        await playTrack(
          {
            id: currentTrack.trackID,
            url: currentTrack.previewUrl!,
            title: currentTrack.trackName!,
            artist: currentTrack.artistName!,
            artwork: currentTrack.trackImageUrl!,
            duration: currentTrack.duration,
            artistId: currentTrack.artistID,
            albumId: currentTrack.albumID,
            albumName: currentTrack.albumName,
            hexColor: currentTrack.hexColor,
          },
          setCurrentTrack
        );
      }
      return;
    }

    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      if (status.isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }

      setCurrentTrack({
        ...currentTrack,
        isPlaying: !status.isPlaying,
      });
    } else {
      if (currentTrack.trackID) {
        await playTrack(
          {
            id: currentTrack.trackID,
            url: currentTrack.previewUrl!,
            title: currentTrack.trackName!,
            artist: currentTrack.artistName!,
            artwork: currentTrack.trackImageUrl!,
            duration: currentTrack.duration,
            artistId: currentTrack.artistID,
            albumId: currentTrack.albumID,
            albumName: currentTrack.albumName,
            hexColor: currentTrack.hexColor,
          },
          setCurrentTrack
        );
      }
    }
  } catch (error) {
    console.error("Error toggling playback:", error);
    throw error;
  }
};

export const seekTo = async (position: number): Promise<void> => {
  try {
    if (!sound) return;
    await sound.setPositionAsync(position * 1000);
  } catch (error) {
    console.error("Error seeking:", error);
  }
};

export const stopPlayer = async (): Promise<void> => {
  try {
    if (sound) {
      await sound.unloadAsync();
      sound = null;
    }
  } catch (error) {
    console.error("Error stopping player:", error);
  }
};
