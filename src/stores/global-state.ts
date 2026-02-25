import { createStore, type StoreApi } from "zustand/vanilla";
import {
    persist,
    type StateStorage,
    createJSONStorage,
} from "zustand/middleware";
import { useStore } from "zustand";

const getUrlSearch = () => {
    return window.location.search.slice(1);
};

export type TabOptions = "env" | "settings";

interface GlobalState {
    tab: TabOptions;
    setTab: (newTab: TabOptions) => void;
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

const persistentStorage: StateStorage = {
    getItem: (key): string => {
        // Check URL first
        const searchParams = new URLSearchParams(getUrlSearch());
        const storedValue = searchParams.get(key);
        return JSON.parse(storedValue as string);
    },
    setItem: (key, newValue): void => {
        // Check if query params exist at all, can remove check if always want to set URL
        const searchParams = new URLSearchParams(getUrlSearch());
        searchParams.set(key, JSON.stringify(newValue));
        window.history.replaceState(null, "", `?${searchParams.toString()}`);
    },
    removeItem: (key): void => {
        const searchParams = new URLSearchParams(getUrlSearch());
        searchParams.delete(key);
        window.location.search = searchParams.toString();
    },
};

const storageOptions = {
    name: "global-state",
    storage: createJSONStorage<GlobalState>(() => persistentStorage),
};

const globalStore = createStore<GlobalState>()(
    persist<GlobalState>(
        (set) => ({
            tab: "env",
            setTab: (newTab: "env" | "settings") => set({ tab: newTab }),
        }),
        storageOptions,
    ),
);

const useGlobalStore = createSelectors(globalStore);

export { useGlobalStore, globalStore };
