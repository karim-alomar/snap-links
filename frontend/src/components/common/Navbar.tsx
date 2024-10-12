import { Button } from "@/components";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-3">
      <Link to="/">
        <h3 className="font-bold text-2xl">Snap Links</h3>
      </Link>
      <div className="flex items-center justify-center gap-3">
        <Link to="auth/sign-in">
          <Button>Sign In</Button>
        </Link>
        <Link to="auth/sign-up">
          <Button variant="outline">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};
