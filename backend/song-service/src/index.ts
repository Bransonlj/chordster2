import express, { Express, Request, Response } from "express";
import songRouter from "./routers/songRouter.js";
import cors from 'cors';

const app: Express = express()
const serviceName = "Song Service"
const port = 5000

const corsOptions = {
  origin: "*",
};

// middleware to log to console
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/songs", songRouter);

app.listen(port, () => {
  console.log(
    `⚡️[server]: ${serviceName} is running at http://localhost:${port}`
  );
});
