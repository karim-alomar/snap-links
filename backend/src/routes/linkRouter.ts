import { Router } from "express";
import { createLink, updateLink, deleteLink } from "../controllers";

const linkRouter: Router = Router();

linkRouter.post("/links", createLink);
linkRouter.put("/links/:id", updateLink);
linkRouter.delete("/links/:id", deleteLink);

export default linkRouter;
