import { setUser } from "@/store/slices/user-slice";
import { User } from "@/types";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/hooks";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = (data: User) => {
    Cookies.set("access_token", data.accessToken);
    Cookies.remove("guest_id");
    dispatch(setUser(data));
    navigate("/");
    window.location.reload();
  };
  return { login };
};
