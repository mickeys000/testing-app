import { create } from "zustand";
import { persist, type StateStorage, createJSONStorage } from 'zustand/middleware'

const getUrlSearch = () => {
  return window.location.search.slice(1)
}

export type TabOptions = "env" | "settings";

interface GlobalState {
  tab: TabOptions;
  setTab: (newTab: TabOptions) => void;
}


const persistentStorage: StateStorage = {
  getItem: (key): string => {
    // Check URL first
      const searchParams = new URLSearchParams(getUrlSearch())
      const storedValue = searchParams.get(key)
      return JSON.parse(storedValue as string)
    },
  setItem: (key, newValue): void => {
    // Check if query params exist at all, can remove check if always want to set URL
      const searchParams = new URLSearchParams(getUrlSearch())
      searchParams.set(key, JSON.stringify(newValue))
      window.history.replaceState(null, '', `?${searchParams.toString()}`)
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(getUrlSearch())
    searchParams.delete(key)
    window.location.search = searchParams.toString()
  },
}

const storageOptions = {
  name: 'global-state',
  storage: createJSONStorage<GlobalState>(() => persistentStorage),
}

const useStore = create<GlobalState>()(
  persist<GlobalState>(
    (set) => ({
      tab: "env",
      setTab: (newTab: "env" | "settings") => set({ tab: newTab }),
    }),
    storageOptions,
  ),
)

export { useStore };
