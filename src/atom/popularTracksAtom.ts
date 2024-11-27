import { atom } from "jotai";
import { getPopularTracks } from "../services/api";
import { Track } from "../utils/types";

export const popularTracksLoadingAtom = atom<boolean>(false);
export const popularTracksErrorAtom = atom<string | null>(null);
export const popularTracksAtom = atom<Track[]>([]);

export const fetchPopularTracksAtom = atom(
  (get) => get(popularTracksAtom),
  async (get, set) => {
    set(popularTracksLoadingAtom, true);
    try {
      const tracks = await getPopularTracks();
      set(popularTracksAtom, tracks);
    } catch (error) {
      set(
        popularTracksErrorAtom,
        error instanceof Error ? error.message : "Tracks could not be loaded"
      );
      set(popularTracksAtom, []);
    } finally {
      set(popularTracksLoadingAtom, false);
    }
  }
);

export const combinedPopularTracksAtom = atom((get) => ({
  tracks: get(popularTracksAtom),
  TracksLoading: get(popularTracksLoadingAtom),
  TracksError: get(popularTracksErrorAtom),
}));
