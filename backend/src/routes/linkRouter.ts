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
linkRouter.get("/:code", clickLink);

export default linkRouter;
