import { Navbar } from "@/components";
import { authContext } from "@/context";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const { isLoading } = useContext(authContext);

  return (
    <div className="container">
      {isLoading ? (
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
