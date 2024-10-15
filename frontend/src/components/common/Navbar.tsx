import { Button } from "@/components";
import { authContext } from "@/context";
import { useAuth } from "@/hooks";
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
          <Button variant="destructive" onClick={logout}>
            Log out
          </Button>
        ) : (
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
