import { Navbar } from "@/components";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
