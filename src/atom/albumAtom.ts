import { atom } from "jotai";
import { AlbumData } from "../utils/types";
import { getAlbumData } from "../services/api";

const initialAlbumData: AlbumData = {
  albumId: "",
  name: "",
  type: "",
  artistId: "",
  artistName: "",
  date: "",
  artistAvatarImage: "",
  linearColor: "#3a3a3a",
  albumImage: "",
  copyright: "",
  releatedAlbums: [],
};

export const albumAtom = atom<AlbumData>(initialAlbumData);
export const albumLoadingAtom = atom<boolean>(false);
export const albumErrorAtom = atom<string | null>(null);

export const fetchAlbumAtom = atom(
  (get) => get(albumAtom),
  async (get, set, id: string) => {
    if (!id) {
      set(albumErrorAtom, "Artist ID is required");
      return;
    }

    set(albumLoadingAtom, true);
    set(albumErrorAtom, null);
    try {
      const albumData = await getAlbumData(id);
      set(albumAtom, albumData);
    } catch (error) {
      console.error("Failed to fetch album data", error);
      set(albumAtom, initialAlbumData);
    } finally {
      set(albumLoadingAtom, false);
    }
  }
);

export const combinedAlbumDataAtom = atom((get) => ({
  albumDataAtom: get(albumAtom),
  albumLoadingAtom: get(albumLoadingAtom),
  albumErrorAtom: get(albumErrorAtom),
}));

export const relatedAlbumsAtom = atom((get) =>
  get(albumAtom).releatedAlbums.filter(
    (album) => album.relatedAlbumId !== get(albumAtom).albumId
  )
);
