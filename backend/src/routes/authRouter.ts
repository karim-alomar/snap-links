import { Router } from "express";
import { register, login } from "../controllers";

const authRouter: Router = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

export default authRouter;
