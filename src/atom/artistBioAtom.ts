import { atom } from "jotai";
import { ArtistBio } from "../utils/types";
import { getArtistBio } from "../services/api";

export const artistBioAtom = atom<ArtistBio | null>(null);
export const artistBioLoadingAtom = atom<boolean>(false);
export const artistBioErrorAtom = atom<string | null>(null);

export const fetchArtistBioAtom = atom(
  (get) => get(artistBioAtom),
  async (get, set, artistId: string) => {
    if (!artistId) {
      set(artistBioErrorAtom, "Artist ID is required");
      return;
    }

    set(artistBioLoadingAtom, true);
    set(artistBioErrorAtom, null);

    try {
      const artistData = await getArtistBio(artistId);

      set(artistBioAtom, artistData);
    } catch (error) {
      console.error("Fetch error in atom:", error);
      set(
        artistBioErrorAtom,
        error instanceof Error ? error.message : "Failed to fetch artist data"
      );
      set(artistBioAtom, null);
    } finally {
      set(artistBioLoadingAtom, false);
    }
  }
);

export const combinedArtistBioAtom = atom((get) => ({
  artistBio: get(artistBioAtom),
  ArtistBioIsLoading: get(artistBioLoadingAtom),
  ArtistBioError: get(artistBioErrorAtom),
}));
