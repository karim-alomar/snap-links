import { Router } from "express";
import authRouter from "./authRouter";
import linkRouter from "./linkRouter";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/", linkRouter);

export default rootRouter;
