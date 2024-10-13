import { LinkShortenerForm, ShortenedLinkTable } from "@/components";
import { LinkType } from "@/types";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./hooks";
import { fetchAuth } from "./store/slices/user-slice";

const App = () => {
  const [linkEditState, setLinkEditState] = useState<{
    link?: LinkType;
    mode: "update" | "create";
  }>({
    link: undefined,
    mode: "create",
  });
  const dispatch = useAppDispatch();
  const token = Cookies.get("access_token");

  useEffect(() => {
    if (token) {
      dispatch(fetchAuth());
    }
  }, [dispatch, token]);

  return (
    <div className="mt-10">
      <LinkShortenerForm linkEditState={linkEditState} />
      <ShortenedLinkTable setLinkEditState={setLinkEditState} />
    </div>
  );
};

export default App;
