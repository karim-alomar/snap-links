import express, { Express } from "express";
import { PORT } from "./secret";
import { PrismaClient } from "@prisma/client";
import rootRouter from "./routes";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);

app.listen(PORT, () => console.log("App is working!"));
