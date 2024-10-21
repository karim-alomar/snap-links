import { Router } from "express";
import { fetchAnalytics } from "../controllers";

const analyticsRouter: Router = Router();

analyticsRouter.get("/analytics", fetchAnalytics);

export default analyticsRouter;
