import { Navbar } from "@/components";
import { useAppSelector } from "@/hooks";
import { Loader2 } from "lucide-react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const { status } = useAppSelector(({ user }) => user);
  return (
    <div className="container">
      {status === "loading" ? (
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <Loader2 className="animate-spin" size={35} />
        </div>
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default RootLayout;
