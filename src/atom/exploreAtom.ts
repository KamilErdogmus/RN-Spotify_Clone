import { atom } from "jotai";
import { ExploreItem } from "../utils/types";
import { getExploreData } from "../services/api";

export const exploreLoadingAtom = atom<boolean>(false);
export const exploreErrorAtom = atom<string | null>(null);
export const exploreAtom = atom<ExploreItem[]>([]);

export const fetchExploreAtom = atom(
  (get) => get(exploreAtom),
  async (get, set) => {
    set(exploreLoadingAtom, true);
    set(exploreErrorAtom, null);

    try {
      const data = await getExploreData();
      set(exploreAtom, data);
    } catch (error) {
      set(
        exploreErrorAtom,
        error instanceof Error
          ? error.message
          : "Explore atoms could not be loaded"
      );
      set(exploreAtom, []);
    } finally {
      set(exploreLoadingAtom, false);
    }
  }
);

export const combinedExploreAtom = atom((get) => ({
  explore: get(exploreAtom),
  exploreLoading: get(exploreLoadingAtom),
  exploreError: get(exploreErrorAtom),
}));
