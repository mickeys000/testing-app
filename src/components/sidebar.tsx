import { useGlobalStore, type TabOptions } from "../stores/global-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Dropdown } from "./dropdown";

const Sidebar = () => {
    const tabs = useGlobalStore.use.tab();
    const setTab = useGlobalStore.use.setTab();

    return (
        <aside className="max-w-72">
            <Tabs
                value={tabs}
                defaultValue="env"
                className="w-100"
                onValueChange={(value) => setTab(value as TabOptions)}
            >
                <TabsList>
                    <TabsTrigger value={"env"}>Env</TabsTrigger>
                    <TabsTrigger value={"settings"}>Settings</TabsTrigger>
                </TabsList>
                <TabsContent value={"env"}>
                    <form className="prose" action="">
                        <fieldset>
                            <legend>Dev</legend>
                            <label htmlFor="dev-url">URL</label>
                            <input type="text" id="dev-url" name="dev-url" />
                            <label htmlFor="dev-key">Key</label>
                            <input type="text" id="dev-key" name="dev-key" />
                        </fieldset>

                        <fieldset>
                            <legend>Staging</legend>
                            <label htmlFor="staging-url">URL</label>
                            <input
                                type="text"
                                id="staging-url"
                                name="staging-url"
                            />
                            <label htmlFor="staging-key">Key</label>
                            <input
                                type="text"
                                id="staging-key"
                                name="staging-key"
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Production</legend>
                            <label htmlFor="prod-url">URL</label>
                            <input type="text" id="prod-url" name="prod-url" />
                            <label htmlFor="prod-key">Key</label>
                            <input type="text" id="prod-key" name="prod-key" />
                        </fieldset>
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
