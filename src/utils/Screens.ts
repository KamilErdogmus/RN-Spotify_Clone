export const Screens = {
  Login: "Login",
  Main: "Main",
  Home: "Home",
  Search: "Search",
  Library: "Library",
  Premium: "Premium",
  SearchDetail: "SearchDetail",
  LikedSongs: "LikedSongs",
  ArtistInfo: "ArtistInfo",
  AlbumInfo: "AlbumInfo",
  SongInfo: "SongInfo",
  ArtistBio: "ArtistBio",
} as const;

export type ScreenName = (typeof Screens)[keyof typeof Screens];
