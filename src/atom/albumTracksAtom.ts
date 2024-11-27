import { atom } from "jotai";
import { IAlbumTracks } from "../utils/types";
import { getAlbumTracks } from "../services/api";

export const albumTracksAtom = atom<IAlbumTracks[]>([]);

export const albumTracksLoadingAtom = atom(false);

export const albumTracksErrorAtom = atom<string | null>(null);

export const fetchAlbumTracksAtom = atom(
  null,
  async (get, set, albumId: string) => {
    try {
      set(albumTracksLoadingAtom, true);
      set(albumTracksErrorAtom, null);

      const tracks = await getAlbumTracks(albumId);
      set(albumTracksAtom, tracks);
    } catch (error) {
      set(albumTracksErrorAtom, error.message);
    } finally {
      set(albumTracksLoadingAtom, false);
    }
  }
);

export const combinedAlbumTracksAtom = atom((get) => ({
  albumTracks: get(albumTracksAtom),
  AlbumTracksLoading: get(albumTracksLoadingAtom),
  AlbumTracksError: get(albumTracksErrorAtom),
}));
