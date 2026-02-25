export type QueryParamsMap = Record<string, string | string[]>;
export type MapLibrary = "maplibre" | "leaflet" | "open-layers";

const supportedMapLibraries: MapLibrary[] = [
  "maplibre",
  "leaflet",
  "open-layers",
];

export function getQueryParamEntries(
  search: string = window.location.search,
): Array<[string, string]> {
  const searchParams = new URLSearchParams(search);
  return Array.from(searchParams.entries());
}

export function getQueryParamsMap(
  search: string = window.location.search,
): QueryParamsMap {
  const searchParams = new URLSearchParams(search);
  const params: QueryParamsMap = {};

  for (const [key, value] of searchParams.entries()) {
    const existing = params[key];

    if (existing === undefined) {
      params[key] = value;
      continue;
    }

    if (Array.isArray(existing)) {
      existing.push(value);
      continue;
    }

    params[key] = [existing, value];
  }

  return params;
}

export function logQueryParams(search: string = window.location.search): void {
  const queryParamEntries = getQueryParamEntries(search);
  const queryParams = getQueryParamsMap(search);

  console.log("[map-canvas] location.search", search);
  console.log("[map-canvas] query param entries", queryParamEntries);
  console.log("[map-canvas] query params map", queryParams);
}

export function getMapLibraryFromQuery(
  search: string = window.location.search,
): MapLibrary | null {
  const searchParams = new URLSearchParams(search);
  const library = searchParams.get("library");

  if (!library || !supportedMapLibraries.includes(library as MapLibrary)) {
    return null;
  }

  return library as MapLibrary;
}
