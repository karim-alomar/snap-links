import { Toaster } from "@/components";
import { createContext, ReactNode } from "react";
import { AuthProvider } from "./AuthContext";

const appContext = createContext({});

interface Props {
  children: ReactNode;
}
export const AppProvider = ({ children }: Props) => {
  const value = {};
  return (
    <appContext.Provider value={value}>
      <AuthProvider>
        <Toaster />
        {children}
      </AuthProvider>
    </appContext.Provider>
  );
};
