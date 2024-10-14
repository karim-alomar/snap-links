import { Router } from "express";
import {
  createLink,
  updateLink,
  deleteLink,
  fetchLinks,
  clickLink,
} from "../controllers";

const linkRouter: Router = Router();

linkRouter.get("/links", fetchLinks);
linkRouter.post("/links", createLink);
linkRouter.put("/links/:id", updateLink);
linkRouter.delete("/links/:id", deleteLink);
// linkRouter.post("/links/:id/click-link", clickLink);
linkRouter.get("/:id", clickLink);

export default linkRouter;
