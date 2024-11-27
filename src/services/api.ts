import { SCRAPPER_API_KEY, SPOTIFY_API_KEY } from "@env";
import axios from "axios";
import {
  Artist,
  ArtistBio,
  IAlbum,
  IArtist,
  ISearchResponse,
  ITrack,
  PodcastEpisode,
} from "../utils/types";

const api = axios.create({
  baseURL: "https://spotify23.p.rapidapi.com/",
  headers: {
    "x-rapidapi-key": SPOTIFY_API_KEY,
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
  },
});

export const getPopularArtist = async () => {
  try {
    const response = await api.request({
      method: "GET",
      url: "search",
      params: {
        q: "popular",
        type: "artist",
        offset: "0",
        limit: "10",
        numberOfTopResults: "5",
      },
    });
    return response.data.artists.items.map((artist: any) => ({
      id: artist.data.uri.split(":")[2],
      name: artist.data.profile.name,
      image: artist.data.visuals?.avatarImage?.sources[0]?.url || null,
    }));
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getPopularAlbums = async () => {
  try {
    const response = await api.request({
      method: "GET",
      url: "search",
      params: {
        q: "popular",
        type: "albums",
        offset: "0",
        limit: "10",
        numberOfTopResults: "5",
      },
    });
    return response.data.albums.items.map((album: any) => ({
      id: album.data.uri.split(":")[2],
      name: album.data.name,
      artist: album.data.artists.items[0]?.profile?.name || "Unknown Artist",
      image: album.data.coverArt?.sources?.[0]?.url || null,
      year: album.data.date?.year || null,
      uri: album.data.uri,
    }));
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getPopularTracks = async () => {
  try {
    const response = await api.get("playlist_tracks/", {
      params: {
        id: "37i9dQZEVXbMDoHDwVN2tF",
        offset: "0",
        limit: "100",
      },
    });

    return response.data.items.map((item: any) => ({
      id: item.track.id,
      name: item.track.name,
      artists: item.track.artists.map((artist: any) => artist.name),
      image: item.track.album.images[1]?.url || null,
      duration: item.track.duration_ms,
      albumName: item.track.album.name,
      uri: item.track.uri,
    }));
  } catch (error) {
    console.error("Tracks fetch error:", error);
    throw error;
  }
};

export const getPodcastEpisodes = async (podcastId: string) => {
  const options = {
    method: "GET",
    url: "https://spotify-scraper3.p.rapidapi.com/api/podcasts/episodes",
    params: {
      podcast_id: podcastId,
      offset: "0",
      limit: "6",
    },
    headers: {
      "x-rapidapi-key": SCRAPPER_API_KEY,
      "x-rapidapi-host": "spotify-scraper3.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    const episodes = response.data.data.podcast.episodes;

    return episodes.map(
      (episode: any): PodcastEpisode => ({
        id: episode.id,
        name: episode.name,
        description: episode.description,
        shareUrl: episode.share_url,
        image: episode.cover_images?.[1]?.url || episode.cover_images?.[0]?.url,
        duration: episode.duration?.total_milliseconds || 0,
        date: episode.date?.iso_string || new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error("Podcast episodes fetch error:", error);
    throw error;
  }
};
export const getExploreData = async () => {
  try {
    const response = await api.request({
      method: "GET",
      url: "browse_all/",
    });

    const res =
      response.data.data.browseStart.sections.items[0].sectionItems.items;

    return res.map((item: any) => {
      const content = item.content?.data?.data || item.content?.data;

      return {
        id: item.uri.split(":")[2],
        title:
          content?.cardRepresentation?.title?.transformedLabel ||
          content?.title?.transformedLabel ||
          "",
        image:
          content?.cardRepresentation?.artwork?.sources?.[0]?.url ||
          content?.artwork?.sources?.[0]?.url ||
          "",
        color:
          content?.cardRepresentation?.backgroundColor?.hex ||
          content?.backgroundColor?.hex ||
          "#000000",
      };
    });
  } catch (error) {
    console.error("Explore data fetch hatası:", error);
    return [];
  }
};

export const getReleatedArtists = async (id: string): Promise<Artist[]> => {
  try {
    const response = await api.request({
      method: "GET",
      url: "artist_related/",
      params: { id },
    });

    return response.data.artists.slice(0, 5).map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item?.images[0]?.url || "",
    }));
  } catch (error) {
    console.error("Error fetching related artists:", error);
    throw error;
  }
};

export const getArtistBio = async (id: string): Promise<ArtistBio> => {
  try {
    const response = await api.request({
      method: "GET",
      url: "artist_overview/",
      params: { id },
    });

    const data = response.data.data;
    return {
      id: data.artist.id,
      name: data.artist.profile?.name,
      biography: data.artist.profile?.biography?.text,
      avatarImage: data.artist.visuals?.avatarImage?.sources[0]?.url,
      image: data.artist.visuals?.gallery?.items?.[0]?.sources?.[0]?.url || "",
      isVerified: data.artist.profile?.verified,
      monthlyListeners: data.artist.stats?.monthlyListeners,
    };
  } catch (error) {
    console.error("Error fetching artist bio:", error);
    throw error;
  }
};

export const getAlbumData = async (id: string) => {
  try {
    const response = await api.request({
      method: "GET",
      url: "album_metadata/",
      params: { id },
    });

    const data = response.data.data.album;
    const releatedAlbums =
      response.data.data.album.moreAlbumsByArtist?.items[0]?.discography
        ?.popularReleases?.items;

    return {
      albumId: data.uri.split(":")[2],
      name: data?.name,
      type: data?.type,
      artistId: data?.artists?.items[0]?.uri.split(":")[2],
      artistName: data?.artists?.items[0]?.profile?.name,
      date: data?.date?.isoString,
      artistAvatarImage:
        data?.artists?.items[0].visuals?.avatarImage?.sources[0]?.url,
      linearColor: data?.coverArt?.extractedColors?.colorRaw?.hex,
      albumImage: data?.coverArt?.sources[0]?.url,
      copyright: data?.copyright?.items[0].text,
      releatedAlbums:
        releatedAlbums?.map((item: any) => ({
          relatedAlbumId: item?.releases?.items[0]?.id,
          name: item?.releases?.items[0]?.name,
          year: item?.releases?.items[0]?.date?.year,
          imageUrl: item?.releases?.items[0]?.coverArt?.sources[0]?.url,
        })) || [],
    };
  } catch (error) {
    console.error("Error fetching album data", error);
    throw error;
  }
};

export const getAlbumTracks = async (id: string) => {
  try {
    const response = await api.request({
      method: "GET",
      url: "album_tracks/",
      params: { id },
    });

    const data = response.data.data.album.tracks.items;
    return data.slice(0, 5).map((item: any) => {
      return {
        songID: item.track?.uri?.split(":")[2],
        songName: item.track?.name,
        artistID: item?.track?.artists?.items[0]?.uri?.split(":")[2],
        artistName: item?.track?.artists?.items[0]?.profile?.name,
      };
    });
  } catch (error) {
    console.error("Error fetching album data", error);
    throw error;
  }
};

export const getArtistData = async (id: string) => {
  try {
    const response = await api.request({
      method: "GET",
      url: "artist_overview/",
      params: { id },
    });

    const data = response.data.data.artist;

    return {
      artistID: data.id,
      artistName: data?.profile?.name,
      verified: data?.profile?.verified,
      type: data.uri?.split(":")[1],
      avatarImage: data.visuals?.avatarImage?.sources[0]?.url,
      linearColor: data.visuals?.avatarImage?.extractedColors?.colorRaw?.hex,
      monthlyListeners: data.stats?.monthlyListeners,

      otherAlbums:
        data?.discography?.albums?.items?.map((item: any) => ({
          albumID: item.releases?.items[0]?.id,
          albumName: item.releases?.items[0]?.name,
          coverImage: item.releases?.items[0]?.coverArt?.sources[2]?.url,
          type: item.releases?.items[0]?.type,
        })) || [],

      topTracks:
        data?.discography?.topTracks?.items?.map((item: any) => ({
          songID: item.track?.uri?.split(":")[2],
          songName: item.track?.name,
          artistID: item.track?.artists?.items[0]?.uri?.split(":")[2],
          artistName: item.track?.artists?.items[0]?.profile?.name,
          albumID: item.track?.album?.uri?.split(":")[2],
          albumImage: item.track?.album?.coverArt?.sources[0]?.url,
          playcount: item?.track?.playcount,
        })) || [],
    };
  } catch (error) {
    console.error("Error fetching artist data", error);
    throw error;
  }
};

export const getTrackData = async (id: string) => {
  try {
    const response = await api.request({
      method: "GET",
      url: "tracks/",
      params: {
        ids: id,
      },
    });

    const track = response.data.tracks[0];
    return {
      trackId: track.id,
      trackName: track.name,
      type: track.type,
      previewUrl: track.preview_url,
      duration: track.duration_ms,
      artistID: track.artists[0].id,
      artistName: track.artists[0].name,
      albumID: track.album?.id,
      albumName: track.album?.name,
      date: track.album?.release_date,
      albumImage: track.album?.images[0].url,
    };
  } catch (error) {
    console.error("Error fetching album data", error);
    throw error;
  }
};

export const getTrackLyrics = async (id: string) => {
  try {
    const response = await api.get(`track_lyrics/`, {
      params: {
        id: id,
      },
    });

    return response.data.lyrics.lines
      .filter((line: any) => line.words !== "♪" && line.words !== "")
      .map((line: any) => ({
        text: line.words,
        time: line.startTimeMs,
      }));
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    throw error;
  }
};

export const getSearchResults = async (
  query: string
): Promise<ISearchResponse> => {
  try {
    const response = await api.get("search/", {
      params: {
        q: query,
        type: "multi",
        offset: "0",
        limit: "10",
        numberOfTopResults: "5",
      },
    });

    const tracks: ITrack[] =
      response.data.tracks?.items.slice(0, 3).map((item: any) => ({
        type: "track",
        songID: item.data.id,
        songName: item.data.name,
        albumID: item.data.albumOfTrack.id,
        albumName: item.data.albumOfTrack.name,
        albumImage: item.data.albumOfTrack.coverArt.sources[2].url,
        artistID: item.data.artists.items[0].uri.split(":")[2],
        artistName: item.data.artists.items[0].profile.name,
        imageUrl: item.data.albumOfTrack.coverArt.sources[0].url,
        duration: item.data.duration.totalMilliseconds,
      })) || [];

    const albums: IAlbum[] = response.data.albums.items
      .slice(0, 3)
      .map((item: any) => ({
        type: "album",
        albumID: item.data.uri.split(":")[2],
        albumName: item.data.name,
        artistID: item.data.artists.items[0].uri.split(":")[2],
        artistName: item.data.artists.items[0].profile.name,
        albumImage: item.data.coverArt.sources[2].url,
        year: item.data.date.year,
      }));

    const artists: IArtist[] = response.data.artists.items
      .slice(0, 3)
      .map((item: any) => ({
        type: "artist",
        artistID: item.data.uri.split(":")[2],
        artistName: item.data.profile.name,
        artistImage: item.data.visuals.avatarImage?.sources[0].url || "",
      }));

    return { tracks, albums, artists };
  } catch (error) {
    console.error("Error in search:", error);
    throw error;
  }
};
