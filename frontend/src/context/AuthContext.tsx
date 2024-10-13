import { useAppDispatch } from "@/hooks";
import { fetchAuth } from "@/store/slices/user-slice";
import Cookies from "js-cookie";
import { createContext, ReactNode, useEffect } from "react";

const authContext = createContext({});

interface Props {
  children: ReactNode;
}
export const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const token = Cookies.get("access_token");

  useEffect(() => {
    if (token) {
      dispatch(fetchAuth());
    }
  }, [dispatch, token]);

  const value = {};
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
