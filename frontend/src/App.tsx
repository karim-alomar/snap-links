import { LinkShortenerForm, ShortenedLinkTable } from "@/components";
import { LinkType } from "@/types";
import { useState } from "react";

const App = () => {
  const [linkEditState, setLinkEditState] = useState<{
    link?: LinkType;
    mode: "update" | "create";
  }>({
    link: undefined,
    mode: "create",
  });

  return (
    <div className="mt-10">
      <LinkShortenerForm linkEditState={linkEditState} />
      <ShortenedLinkTable setLinkEditState={setLinkEditState} />
    </div>
  );
};

export default App;
