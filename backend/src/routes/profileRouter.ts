import { Router } from "express";
import { updateProfile } from "../controllers";

const profileRouter: Router = Router();

profileRouter.put("/profile", updateProfile);

export default profileRouter;
