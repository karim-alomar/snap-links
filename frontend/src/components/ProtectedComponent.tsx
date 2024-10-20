import { authRoutes, protectedRoutes } from "@/routes";
import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedComponent = () => {
  const location = useLocation();
  const token = Cookies.get("authorization");

  const isProtectedRoute = protectedRoutes.some((route) =>
    location.pathname.includes(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    location.pathname.includes(route)
  );

  if (!token && isProtectedRoute) {
    return <Navigate to="auth/login" replace />;
  }

  if (token && isAuthRoute) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
