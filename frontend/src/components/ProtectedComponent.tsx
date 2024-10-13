import Cookies from "js-cookie";
import { useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const ProtectedComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get("access_token");

  useLayoutEffect(() => {
    const redirectUser = () => {
      if (token) {
        if (location.pathname.includes("auth")) {
          return navigate("/", {
            replace: true,
          });
        }
      }
      return null;
    };

    redirectUser();
  }, [navigate, location.pathname, token]);
  return <Outlet />;
};
