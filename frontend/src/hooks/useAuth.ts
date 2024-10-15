import { User } from "@/types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const login = (data: User) => {
    Cookies.set("access_token", data.accessToken);
    Cookies.remove("guest_id");
    navigate("/");
    window.location.reload();
  };

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("guest_id");
    navigate("/", { replace: true });
    window.location.reload();
  };
  return { login, logout };
};
