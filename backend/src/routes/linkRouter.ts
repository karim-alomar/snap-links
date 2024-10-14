import { Router } from "express";
import {
  createLink,
  updateLink,
  deleteLink,
  fetchLinks,
  trackingLink,
} from "../controllers";

const linkRouter: Router = Router();

linkRouter.get("/links", fetchLinks);
linkRouter.post("/links", createLink);
linkRouter.put("/links/:id", updateLink);
linkRouter.delete("/links/:id", deleteLink);
linkRouter.get("/:code", trackingLink);

export default linkRouter;
