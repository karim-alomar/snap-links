import { useAuthQuery } from "@/store/slices/api/authSlice";
import { User } from "@/types";
import Cookies from "js-cookie";
import { createContext, ReactNode, useEffect } from "react";

interface AuthContextProps {
  user?: User;
  isLoading?: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext<AuthContextProps>({});

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = Cookies.get("access_token");
  const { data, isLoading, isError } = useAuthQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (isError) {
      Cookies.remove("access_token");
      Cookies.remove("guest_id");
    }
  }, [isError]);

  const user = data?.data;
  const value = {
    user,
    isLoading,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
