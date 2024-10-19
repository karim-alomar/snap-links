import { Router } from "express";
import authRouter from "./authRouter";
import linkRouter from "./linkRouter";
import analyticsRouter from "./analyticsRouter";
import profileRouter from "./profileRouter";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/", linkRouter);
rootRouter.use("/", analyticsRouter);
rootRouter.use("/", profileRouter);

export default rootRouter;
