import { create } from "zustand";

export type TabOptions = "env" | "settings";

interface GlobalState {
  tab: TabOptions;
  setTab: (newTab: TabOptions) => void;
}

const useStore = create<GlobalState>((set) => ({
  tab: "env",
  setTab: (newTab: "env" | "settings") => set({ tab: newTab }),
}));

export { useStore };
