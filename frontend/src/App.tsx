import {
  LinkShortenerForm,
  ShortenedLinkTable,
  BrowserUsageChartContainer,
  DeviceUsageChartContainer,
  CountryAnalyticsChartContainer,
} from "@/components";
import { authContext } from "@/context";
import { LinkType } from "@/types";
import { useContext, useState } from "react";

const App = () => {
  const [linkEditState, setLinkEditState] = useState<{
    link?: LinkType;
    mode: "update" | "create";
  }>({
    link: undefined,
    mode: "create",
  });
  const { user } = useContext(authContext);

  return (
    <div className="mt-5 space-y-3">
      {user && (
        <div className="flex flex-col items-start justify-start">
          <span className="text-2xl font-bold">Hi, {user.name}👋</span>
          <span className="text-black/50">{user.email}</span>
        </div>
      )}
      <div>
        {user && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  mb-6 gap-3">
            <BrowserUsageChartContainer />
            <DeviceUsageChartContainer />
            <CountryAnalyticsChartContainer />
          </div>
        )}
        <LinkShortenerForm
          linkEditState={linkEditState}
          setLinkEditState={setLinkEditState}
        />
        <ShortenedLinkTable setLinkEditState={setLinkEditState} />
      </div>
    </div>
  );
};

export default App;
