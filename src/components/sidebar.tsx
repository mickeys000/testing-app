import {
  useGlobalStore,
  type EnvironmentName,
  type TabOptions,
} from "../stores/global-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Dropdown } from "./dropdown";

const environments: Array<{ key: EnvironmentName; label: string }> = [
  { key: "dev", label: "Dev" },
  { key: "staging", label: "Staging" },
  { key: "prod", label: "Production" },
];

const Sidebar = () => {
  const tabs = useGlobalStore.use.tab();
  const setTab = useGlobalStore.use.setTab();
  const tileApiConfig = useGlobalStore.use.tileApiConfig();
  const setEnvUrl = useGlobalStore.use.setEnvUrl();
  const setEnvKey = useGlobalStore.use.setEnvKey();

  return (
    <aside className="w-80 bg-white max-h-screen overflow-y-auto p-4 border-r border-border">
      <Tabs
        value={tabs}
        defaultValue="env"
        onValueChange={(value) => setTab(value as TabOptions)}
      >
        <TabsList>
          <TabsTrigger value={"env"}>Env</TabsTrigger>
          <TabsTrigger value={"settings"}>Settings</TabsTrigger>
        </TabsList>
        <TabsContent value={"env"}>
          <h2>Environment setup</h2>
          <p>
            Add the urls and API keys for the tiles api for each environment.
          </p>
          <form
            className="mt-4 space-y-2"
            action=""
            onSubmit={(event) => event.preventDefault()}
          >
            {environments.map((environment) => {
              const values = tileApiConfig[environment.key];

              return (
                <fieldset
                  key={environment.key}
                  className="rounded-md border border-border p-3 space-y-1"
                >
                  <legend className="px-1 text-sm font-semibold">
                    {environment.label}
                  </legend>

                  <div className="flex flex-col gap-1">
                    <label
                      className="text-xs uppercase tracking-wide"
                      htmlFor={`${environment.key}-url`}
                    >
                      URL
                    </label>
                    <input
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      type="text"
                      id={`${environment.key}-url`}
                      name={`${environment.key}-url`}
                      value={values.url}
                      onChange={(event) =>
                        setEnvUrl(environment.key, event.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      className="text-xs uppercase tracking-wide"
                      htmlFor={`${environment.key}-key`}
                    >
                      Key
                    </label>
                    <input
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      type="text"
                      id={`${environment.key}-key`}
                      name={`${environment.key}-key`}
                      value={values.key}
                      onChange={(event) =>
                        setEnvKey(environment.key, event.target.value)
                      }
                    />
                  </div>
                </fieldset>
              );
            })}
          </form>
        </TabsContent>
        <TabsContent value={"settings"}>
          <Dropdown />
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export { Sidebar };
