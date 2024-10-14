import { Router } from "express";
import { linkTracking } from "../controllers";

const appRouter: Router = Router();

appRouter.get("/:linkId", linkTracking);

export default appRouter;
