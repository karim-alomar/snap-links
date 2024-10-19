import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import { authContext } from "@/context";
import { useAuth } from "@/hooks";
import { LogOut, User, User2 } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { logout } = useAuth();
  const { user } = useContext(authContext);

  return (
    <div className="flex items-center justify-between py-3 border-b">
      <Link to="/">
        <h3 className="font-bold text-2xl">Snap Links</h3>
      </Link>
      <div className="flex items-center justify-center gap-3">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-slate-200 p-2 rounded-full">
              <User2 />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 me-10">
              <Link to="/profile">
                <DropdownMenuItem>
                  <User />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // <Button variant="destructive" onClick={logout}>
          //   Log out
          // </Button>
          <>
            <Link to="auth/login">
              <Button>Sign In</Button>
            </Link>
            <Link to="auth/register">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
