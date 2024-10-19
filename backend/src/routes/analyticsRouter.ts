import { Router } from "express";
import {
  fetchBrowserStats,
  fetchDeviceStats,
  fetchCountryStats,
} from "../controllers";

const analyticsRouter: Router = Router();

analyticsRouter.get("/browser-analytics", fetchBrowserStats);
analyticsRouter.get("/device-analytics", fetchDeviceStats);
analyticsRouter.get("/country-analytics", fetchCountryStats);

export default analyticsRouter;
