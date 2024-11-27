import { atom } from "jotai";
import { getArtistData } from "../services/api";

interface Album {
  albumID: string;
  albumName: string;
  coverImage: string;
  type: string;
}

interface Track {
  trackID: string;
  trackName: string;
  artistID: string;
  artistName: string;
  albumID: string;
  albumImage: string;
  playcount: number;
}

interface ArtistData {
  artistID: string;
  artistName: string;
  verified: boolean;
  type: string;
  avatarImage: string;
  linearColor: string;
  monthlyListeners: number;
  otherAlbums: Album[];
  topTracks: Track[];
}

interface ArtistDataState {
  artistData: ArtistData | null;
  artistDataLoading: boolean;
  artistDataError: Error | null;
}

const initialState: ArtistDataState = {
  artistData: null,
  artistDataLoading: false,
  artistDataError: null,
};

export const artistDataAtom = atom<ArtistDataState>(initialState);

export const fetchArtistDataAtom = atom(
  null,
  async (get, set, artistId: string) => {
    if (!artistId) {
      set(artistDataAtom, {
        ...initialState,
        artistDataError: new Error("Artist ID is required"),
      });
      return;
    }

    set(artistDataAtom, {
      ...get(artistDataAtom),
      artistDataLoading: true,
      artistDataError: null,
    });

    try {
      const data = await getArtistData(artistId);

      if (!data) {
        throw new Error("No artist data received");
      }

      set(artistDataAtom, {
        artistData: data,
        artistDataLoading: false,
        artistDataError: null,
      });
    } catch (error) {
      set(artistDataAtom, {
        artistData: null,
        artistDataLoading: false,
        artistDataError:
          error instanceof Error ? error : new Error("Unknown error occurred"),
      });
    }
  }
);

export const combinedArtistDataAtom = atom((get) => ({
  artistData: get(artistDataAtom).artistData,
  artistDataLoading: get(artistDataAtom).artistDataLoading,
  artistDataError: get(artistDataAtom).artistDataError,
}));
