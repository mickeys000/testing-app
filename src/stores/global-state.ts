import { createStore, type StoreApi } from "zustand/vanilla";
import {
  persist,
  type StateStorage,
  createJSONStorage,
} from "zustand/middleware";
import { useStore } from "zustand";

export type TabOptions = "env" | "settings";
export type EnvironmentName = "dev" | "staging" | "prod";

interface EnvironmentConfig {
  url: string;
  key: string;
}

type TileApiConfig = Record<EnvironmentName, EnvironmentConfig>;

const defaultTileApiConfig: TileApiConfig = {
  dev: { url: "", key: "" },
  staging: { url: "", key: "" },
  prod: { url: "", key: "" },
};

interface GlobalState {
  tab: TabOptions;
  tileApiConfig: TileApiConfig;
  setTab: (newTab: TabOptions) => void;
  setEnvUrl: (env: EnvironmentName, url: string) => void;
  setEnvKey: (env: EnvironmentName, key: string) => void;
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends StoreApi<object>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as any)[k] = () =>
      useStore(_store, (s) => s[k as keyof typeof s]);
  }

  return store;
};

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

const storageOptions = {
  name: "global-state",
  storage: createJSONStorage<GlobalState>(() => {
    if (typeof window === "undefined") {
      return noopStorage;
    }

    return window.localStorage;
  }),
};

const globalStore = createStore<GlobalState>()(
  persist<GlobalState>(
    (set) => ({
      tab: "env",
      tileApiConfig: defaultTileApiConfig,
      setTab: (newTab: TabOptions) => set({ tab: newTab }),
      setEnvUrl: (env: EnvironmentName, url: string) => {
        set((state) => ({
          tileApiConfig: {
            ...state.tileApiConfig,
            [env]: {
              ...state.tileApiConfig[env],
              url,
            },
          },
        }));
      },
      setEnvKey: (env: EnvironmentName, key: string) => {
        set((state) => ({
          tileApiConfig: {
            ...state.tileApiConfig,
            [env]: {
              ...state.tileApiConfig[env],
              key,
            },
          },
        }));
      },
    }),
    storageOptions,
  ),
);

const useGlobalStore = createSelectors(globalStore);

export { useGlobalStore, globalStore };
