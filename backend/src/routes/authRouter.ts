import { Router } from "express";
import { register, login, auth } from "../controllers";

const authRouter: Router = Router();

authRouter.get("/", auth);

authRouter.post("/register", register);

authRouter.post("/login", login);

export default authRouter;
