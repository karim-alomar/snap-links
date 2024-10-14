import { Router } from "express";
import { createLink, deleteLink, fetchLinks, updateLink } from "../controllers";

const linkRouter: Router = Router();

linkRouter.get("/links", fetchLinks);
linkRouter.post("/links", createLink);
linkRouter.put("/links/:id", updateLink);
linkRouter.delete("/links/:id", deleteLink);

export default linkRouter;
