import cors from "cors";
import express, { Express } from "express";
import useragent from "express-useragent";
import http from "http";
import { WebSocketServer } from "ws";
import rootRouter from "./routes";
import appRouter from "./routes/appRouter";
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
app.use("/", appRouter);

const server = http.createServer(app);

const wsServer = new WebSocketServer({ server });

wsServer.on("connection", (ws) => { });

server.listen(PORT, () => console.log("App is working!"));

export default app;
