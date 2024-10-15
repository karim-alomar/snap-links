import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchAuth } from "@/store/slices/user-slice";
import Cookies from "js-cookie";
import { createContext, ReactNode, useEffect } from "react";

const authContext = createContext({});

interface Props {
  children: ReactNode;
}
export const AuthProvider = ({ children }: Props) => {
  const { status } = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();
  const token = Cookies.get("access_token");

  useEffect(() => {
    if (token) {
      dispatch(fetchAuth());
      if (status === "failed") {
        Cookies.remove("access_token");
        Cookies.remove("guest_id");
      }
    }
  }, [dispatch, token, status]);

  const value = {};
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
