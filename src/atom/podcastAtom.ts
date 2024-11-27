import { atom } from "jotai";
import { PodcastEpisode } from "../utils/types";
import { getPodcastEpisodes } from "../services/api";

export const podcastEpisodesLoadingAtom = atom<boolean>(false);
export const podcastEpisodesErrorAtom = atom<string | null>(null);
export const podcastEpisodesAtom = atom<PodcastEpisode[]>([]);

export const fetchPodcastEpisodesAtom = atom(
  (get) => get(podcastEpisodesAtom),
  async (get, set, podcastId: string) => {
    set(podcastEpisodesLoadingAtom, true);
    try {
      const episodes = await getPodcastEpisodes(podcastId);
      set(podcastEpisodesAtom, episodes);
    } catch (error) {
      set(
        podcastEpisodesErrorAtom,
        error instanceof Error
          ? error.message
          : "Podcast episodes could not be loaded"
      );
      set(podcastEpisodesAtom, []);
    } finally {
      set(podcastEpisodesLoadingAtom, false);
    }
  }
);

export const combinedPodcastEpisodesAtom = atom((get) => ({
  episodes: get(podcastEpisodesAtom),
  PodcastLoading: get(podcastEpisodesLoadingAtom),
  PodcastError: get(podcastEpisodesErrorAtom),
}));
