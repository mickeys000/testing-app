import { Button } from "@os-frontend/components/primitives/button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@os-frontend/components/primitives/dropdown-menu";
import { useGlobalStore, type EnvironmentName } from "../stores/global-state";

type FrameworkOption = {
  slug: string;
  label: string;
};

type EngineOption = {
  slug: string;
  label: string;
};

const frameworkOptions: FrameworkOption[] = [
  { slug: "vanilla", label: "Vanilla" },
];

const engineOptions: EngineOption[] = [
  { slug: "maplibre", label: "MapLibre" },
  { slug: "leaflet", label: "Leaflet" },
  { slug: "open-layers", label: "OpenLayers" },
];

const ngdEnvironmentOptions: Array<{ key: EnvironmentName; label: string }> = [
  { key: "local", label: "Local" },
  { key: "dev", label: "Dev" },
  { key: "test", label: "Test" },
  { key: "stage", label: "Stage" },
  { key: "prod", label: "Prod" },
];

const toTitleCase = (value: string) => {
  return value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
};

const getRouteSelection = () => {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const framework =
    parts[0] === "frameworks" && parts[1] ? parts[1] : "vanilla";
  const engine =
    parts[0] === "frameworks" && parts[2] === "engines" && parts[3]
      ? parts[3]
      : "maplibre";

  return { framework, engine };
};

export const Dropdown = () => {
  const [currentSelection, setCurrentSelection] = useState({
    framework: "vanilla",
    engine: "maplibre",
  });
  const ngdEnvironment = useGlobalStore.use.ngdEnvironment();
  const setNgdEnvironment = useGlobalStore.use.setNgdEnvironment();

  useEffect(() => {
    setCurrentSelection(getRouteSelection());
  }, []);

  const currentFramework =
    frameworkOptions.find(
      (option) => option.slug === currentSelection.framework,
    )?.label ?? toTitleCase(currentSelection.framework);

  const currentEngine =
    engineOptions.find((option) => option.slug === currentSelection.engine)
      ?.label ?? toTitleCase(currentSelection.engine);

  const currentNgdEnvironment =
    ngdEnvironmentOptions.find((option) => option.key === ngdEnvironment)
      ?.label ?? toTitleCase(ngdEnvironment);

  return (
    <section className="mt-4 space-y-3">
      <h2>Framework and engine</h2>

      <div className="flex flex-col gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" width="full">
              Framework: {currentFramework}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="start" sideOffset={6}>
              <DropdownMenuGroup>
                {frameworkOptions.map((framework) => (
                  <DropdownMenuItem key={framework.slug} asChild>
                    <a
                      className="w-full px-2 py-1.5"
                      href={`/frameworks/${framework.slug}`}
                    >
                      {framework.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" width="full">
              Engine: {currentEngine}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="start" sideOffset={6}>
              <DropdownMenuGroup>
                {engineOptions.map((engine) => (
                  <DropdownMenuItem key={engine.slug} asChild>
                    <a
                      className="w-full px-2 py-1.5 block"
                      href={`/frameworks/${currentSelection.framework}/engines/${engine.slug}`}
                    >
                      {engine.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>

      <h2>NGD Environment</h2>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" width="full">
            Environment: {currentNgdEnvironment}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent align="start" sideOffset={6}>
            <DropdownMenuGroup>
              {ngdEnvironmentOptions.map((environment) => (
                <DropdownMenuItem
                  key={environment.key}
                  className="p-2 cursor-pointer"
                  onSelect={() => setNgdEnvironment(environment.key)}
                >
                  {environment.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </section>
  );
};
