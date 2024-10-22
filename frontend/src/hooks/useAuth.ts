import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const login = (token?: string) => {
    if (token) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      Cookies.set("authorization", token, {
        expires: expirationDate,
      });
      Cookies.remove("guest_id");
      navigate("/");
      window.location.reload();
    }
  };

  const logout = () => {
    Cookies.remove("authorization");
    Cookies.remove("guest_id");
    navigate("/", { replace: true });
    window.location.reload();
  };
  return { login, logout };
};
