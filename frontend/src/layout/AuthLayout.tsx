import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
