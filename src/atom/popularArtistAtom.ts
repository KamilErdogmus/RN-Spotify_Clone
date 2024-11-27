import { atom } from "jotai";
import { getPopularArtist } from "../services/api";

export interface SimpleArtist {
  id: string;
  name: string;
  image: string;
  type?: "album" | "artist" | "track";
  uri?: string;
}

const initialState: SimpleArtist[] = [];

export const popularArtistsLoadingAtom = atom(false);
export const popularArtistsErrorAtom = atom<string | null>(null);

export const popularArtistsAtom = atom<SimpleArtist[]>(initialState);

export const fetchPopularArtistsAtom = atom(
  (get) => get(popularArtistsAtom),
  async (get, set) => {
    set(popularArtistsLoadingAtom, true);
    set(popularArtistsErrorAtom, null);

    try {
      const artists = await getPopularArtist();

      set(popularArtistsAtom, artists);
      set(popularArtistsLoadingAtom, false);
    } catch (error) {
      set(
        popularArtistsErrorAtom,
        error instanceof Error
          ? error.message
          : "Sanatçılar yüklenirken hata oluştu"
      );
      set(popularArtistsAtom, initialState);

      set(popularArtistsLoadingAtom, false);
    }
  }
);

export const combinedPopularArtistsAtom = atom((get) => ({
  artists: get(popularArtistsAtom),
  artistLoading: get(popularArtistsLoadingAtom),
  artistError: get(popularArtistsErrorAtom),
}));
