import { atom } from "jotai";
import { getPopularAlbums } from "../services/api";
import { AlbumData } from "../utils/types";

export const popularAlbumsLoadingAtom = atom<boolean>(false);
export const popularAlbumsErrorAtom = atom<string | null>(null);
export const popularAlbumsAtom = atom<AlbumData[]>([]);

export const fetchPopularAlbumsAtom = atom(
  (get) => get(popularAlbumsAtom),
  async (get, set) => {
    set(popularAlbumsLoadingAtom, true);
    set(popularAlbumsErrorAtom, null);

    try {
      const albums = await getPopularAlbums();
      set(popularAlbumsAtom, albums);
    } catch (error) {
      set(
        popularAlbumsErrorAtom,
        error instanceof Error
          ? error.message
          : "Popular albums could not be loaded"
      );
      set(popularAlbumsAtom, []);
    } finally {
      set(popularAlbumsLoadingAtom, false);
    }
  }
);

export const combinedPopularAlbumsAtom = atom((get) => ({
  albums: get(popularAlbumsAtom),
  albumLoading: get(popularAlbumsLoadingAtom),
  albumError: get(popularAlbumsErrorAtom),
}));
