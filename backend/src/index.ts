import express, { Express } from "express";
import cors from "cors";
import useragent from "express-useragent";
import rootRouter from "./routes";
import { PORT } from "./secret";

const app: Express = express();

app.use(cors());
app.use(useragent.express());
app.use(express.json());

// ⚠️ Add To Test On The Server ⚠️
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.use("/api", rootRouter);

app.listen(PORT, () => console.log("App is working!"));

export default app;
