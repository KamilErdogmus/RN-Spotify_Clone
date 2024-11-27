import { atom } from "jotai";
import { CurrentTrackAtom } from "../utils/types";

export const currentTrackAtom = atom<CurrentTrackAtom>({
  trackID: undefined,
  trackName: undefined,
  artistName: undefined,
  artistID: undefined,
  albumName: undefined,
  albumID: undefined,
  artistImageUrl: undefined,
  albumImageUrl: undefined,
  trackImageUrl: undefined,
  duration: undefined,
  hexColor: undefined,
  isPlaying: false,
  currentTime: 0,
});

interface ModalState {
  isVisible: boolean;
}
export const modalAtom = atom({
  isVisible: false,
});

export const openModalAtom = atom(null, (get, set) => {
  set(modalAtom, { isVisible: true });
});

export const closeModalAtom = atom(null, (get, set) => {
  set(modalAtom, { isVisible: false });
});
