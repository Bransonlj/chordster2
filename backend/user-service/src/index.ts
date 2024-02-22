import express, { Express, Request, Response } from "express";
import cors from 'cors';
import authRouter from "./routers/authRouter.js";
import mongoose from "mongoose";
import 'dotenv/config';

const app: Express = express()
const serviceName = "Song Service"
const port = process.env.PORT || 5001

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
app.use("/api/auth", authRouter);

mongoose.connect(process.env.MONG_URL)
    .then(() => {
      app.listen(port, () => {
        console.log(
          `⚡️[server]: ${serviceName} is running at http://localhost:${port}`
        );
      });
    }).catch(err => console.log(err.message))



