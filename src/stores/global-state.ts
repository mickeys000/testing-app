import { createStore, type StoreApi } from "zustand/vanilla";
import {
  persist,
  type StateStorage,
  createJSONStorage,
} from "zustand/middleware";
import { useStore } from "zustand";

export type TabOptions = "env" | "settings";
export type EnvironmentName = "local" | "dev" | "test" | "stage" | "prod";

interface EnvironmentConfig {
  url: string;
  key: string;
}

type TileApiConfig = Record<EnvironmentName, EnvironmentConfig>;

const defaultTileApiConfig: TileApiConfig = {
  local: { url: "", key: "" },
  dev: { url: "", key: "" },
  test: { url: "", key: "" },
  stage: { url: "", key: "" },
  prod: { url: "", key: "" },
};

interface GlobalState {
  tab: TabOptions;
  ngdEnvironment: EnvironmentName;
  tileApiConfig: TileApiConfig;
  setTab: (newTab: TabOptions) => void;
  setNgdEnvironment: (environment: EnvironmentName) => void;
  setEnvUrl: (env: EnvironmentName, url: string) => void;
  setEnvKey: (env: EnvironmentName, key: string) => void;
}

const mergeTileApiConfig = (
  persistedTileApiConfig:
    | Partial<Record<string, EnvironmentConfig>>
    | undefined,
): TileApiConfig => {
  const stagingValue = persistedTileApiConfig?.staging;

  return {
    ...defaultTileApiConfig,
    ...(persistedTileApiConfig?.local
      ? { local: persistedTileApiConfig.local }
      : {}),
    ...(persistedTileApiConfig?.dev ? { dev: persistedTileApiConfig.dev } : {}),
    ...(persistedTileApiConfig?.test
      ? { test: persistedTileApiConfig.test }
      : {}),
    ...(persistedTileApiConfig?.stage
      ? { stage: persistedTileApiConfig.stage }
      : {}),
    ...(stagingValue ? { stage: stagingValue } : {}),
    ...(persistedTileApiConfig?.prod
      ? { prod: persistedTileApiConfig.prod }
      : {}),
  };
};

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
  merge: (persistedState: unknown, currentState: GlobalState): GlobalState => {
    const incoming = (persistedState as Partial<GlobalState> | undefined) ?? {};
    const incomingEnv = incoming.ngdEnvironment;

    return {
      ...currentState,
      ...incoming,
      ngdEnvironment:
        incomingEnv &&
        ["local", "dev", "test", "stage", "prod"].includes(incomingEnv)
          ? incomingEnv
          : currentState.ngdEnvironment,
      tileApiConfig: mergeTileApiConfig(
        incoming.tileApiConfig as
          | Partial<Record<string, EnvironmentConfig>>
          | undefined,
      ),
    };
  },
};

const globalStore = createStore<GlobalState>()(
  persist<GlobalState>(
    (set) => ({
      tab: "settings",
      ngdEnvironment: "local",
      tileApiConfig: defaultTileApiConfig,
      setTab: (newTab: TabOptions) => set({ tab: newTab }),
      setNgdEnvironment: (environment: EnvironmentName) => {
        set({ ngdEnvironment: environment });
      },
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
