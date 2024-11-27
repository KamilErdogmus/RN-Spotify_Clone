import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DrawerNavigationProp } from "@react-navigation/drawer";

export type RootDrawerParamList = {
  MainStacks: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Main: { screen?: string } | undefined;
  SearchDetail: undefined;
  ArtistBio: {
    id: string;
  };
};

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
  Premium: undefined;
  SearchDetail: undefined;
  SongInfo: {
    id: string;
    data?: {
      songID: string;
      songName: string;
      artistName?: string;
      albumName?: string;
      imageUrl?: string;
      duration?: number;
      uri?: string;
    };
  };
  LikedSongs: undefined;
  AlbumInfo: { id: string };
  ArtistInfo: { id: string };
  ArtistBio: { data: ArtistBio | undefined };
};

export type StackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "Home">,
  CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList>,
    DrawerNavigationProp<RootDrawerParamList>
  >
>;

export type TabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type DrawerNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<RootDrawerParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type DrawerScreenRouteProp<T extends keyof RootDrawerParamList> =
  RouteProp<RootDrawerParamList, T>;

export type StackScreenRouteProp<T extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, T>;

export type TabScreenRouteProp<T extends keyof RootTabParamList> = RouteProp<
  RootTabParamList,
  T
>;

export interface Track {
  id: string;
  name: string;
  image: string;
  artists: string[];
  duration: number;
  albumName: string;
  uri: string;
}

export interface Podcast {
  id: string;
  name: string;
  description: string;
  episodes: PodcastEpisode[];
}

export interface PodcastEpisode {
  id: string;
  name: string;
  description: string;
  shareUrl: string;
  image: string;
  duration: number;
  date: string;
}

export interface IPremiumPlansDetails {
  id: string;
  themeColor: string;
  name: string;
  price: string;
  priceDetails: string;
  extras: string[];
  trial: boolean;
  description: string;
}

export interface ExploreItem {
  id: string;
  title: string;
  image: string;
  color: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
}

export interface ArtistBio {
  id: string;
  name: string;
  biography: string;
  image: string;
  isVerified: boolean;
  avatarImage: string;
  monthlyListeners?: number;
}

export interface AlbumData {
  albumId: string;
  name: string;
  type: string;
  artistId: string;
  artistName: string;
  date: string;
  artistAvatarImage: string;
  linearColor: string;
  albumImage: string;
  copyright: string;
  releatedAlbums: RelatedAlbum[];
}

export interface RelatedAlbum {
  relatedAlbumId: string;
  name: string;
  year: number;
  imageUrl: string;
}

export interface CurrentTrackAtom {
  trackID?: string;
  trackName?: string;
  artistName?: string;
  artistID?: string;
  albumName?: string;
  albumID?: string;
  artistImageUrl?: string;
  albumImageUrl?: string;
  trackImageUrl?: string;
  duration?: number;
  hexColor?: string;
  isPlaying: boolean;
  currentTime: number;
}

export interface IAlbumTracks {
  songID: string;
  songName: string;
  artistID: string;
  artistName: string;
  albumID: string;
  albumImage: string;
  playcount: string;
}

export interface TrackData {
  trackId: string;
  trackName: string;
  type: string;
  previewUrl: string;
  duration: number;
  artistID: string;
  artistName: string;
  albumID: string;
  albumName: string;
  date: string;
  albumImage: string;
}

export interface LyricLine {
  text: string;
  time: string;
}

export interface ITrack {
  songID: string;
  songName: string;
  albumID: string;
  albumName: string;
  albumImage: string;
  artistID: string;
  artistName: string;
  imageUrl: string;
  duration: number;
}

export interface IAlbum {
  albumID: string;
  albumName: string;
  artistID: string;
  artistName: string;
  albumImage: string;
  year: number;
}

export interface IArtist {
  artistID: string;
  artistName: string;
  artistImage: string;
}

export interface ISearchResponse {
  tracks: ITrack[];
  albums: IAlbum[];
  artists: IArtist[];
}
