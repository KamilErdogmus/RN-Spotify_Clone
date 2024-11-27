import { atom } from "jotai";
import { getReleatedArtists } from "../services/api";

interface RelatedArtist {
  id: string;
  name: string;
}

export const relatedArtistsAtom = atom<RelatedArtist[]>([]);
export const relatedArtistsLoadingAtom = atom<boolean>(false);
export const relatedArtistsErrorAtom = atom<string | null>(null);

export const fetchRelatedArtistsAtom = atom(
  (get) => get(relatedArtistsAtom),
  async (get, set, artistId: string) => {
    set(relatedArtistsLoadingAtom, true);
    set(relatedArtistsErrorAtom, null);

    try {
      const artists = await getReleatedArtists(artistId);
      set(relatedArtistsAtom, artists);
    } catch (error) {
      set(
        relatedArtistsErrorAtom,
        error instanceof Error
          ? error.message
          : "Failed to load related artists"
      );
      set(relatedArtistsAtom, []);
    } finally {
      set(relatedArtistsLoadingAtom, false);
    }
  }
);
export const combinedRelatedArtistsAtom = atom((get) => ({
  relatedArtists: get(relatedArtistsAtom),
  relatedIsLoading: get(relatedArtistsLoadingAtom),
  relatedError: get(relatedArtistsErrorAtom),
}));
