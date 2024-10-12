import express, { Express } from "express";
import { PORT } from "./secret";
import { PrismaClient } from "@prisma/client";
import rootRouter from "./routes";

const app: Express = express();

app.use(express.json());

// ⚠️ Add To Test On The Server ⚠️
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.use("/api", rootRouter);

app.listen(PORT, () => console.log("App is working!"));
