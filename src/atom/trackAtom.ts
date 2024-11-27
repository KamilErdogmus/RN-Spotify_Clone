import { atom } from "jotai";
import { getTrackData } from "../services/api";

interface TrackState {
  tracks: Record<
    string,
    {
      previewUrl: string;
      duration: number;
      trackId: string;
      trackName: string;
      artistName: string;
      artistID: string;
      albumID: string;
      albumName: string;
      albumImage: string;
      date: string;
      type: string;
    }
  >;
  isLoading: boolean;
  error: string | null;
}

const initialState: TrackState = {
  tracks: {},
  isLoading: false,
  error: null,
};

export const trackAtom = atom<TrackState>(initialState);

export const fetchTrackAtom = atom(null, async (get, set, trackId: string) => {
  if (!trackId) return;

  const currentState = get(trackAtom);
  if (currentState.tracks[trackId]) {
    return;
  }

  set(trackAtom, {
    ...currentState,
    isLoading: true,
    error: null,
  });

  try {
    const data = await getTrackData(trackId);

    set(trackAtom, {
      tracks: {
        ...currentState.tracks,
        [trackId]: data,
      },
      isLoading: false,
      error: null,
    });
  } catch (error: any) {
    console.error("Error fetching track:", error);
    set(trackAtom, {
      ...currentState,
      isLoading: false,
      error: error.message || "Failed to fetch track data",
    });
  }
});
