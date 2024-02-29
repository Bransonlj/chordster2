import express, { Express, Request, Response } from "express";
import cors from 'cors';
import mongoose from "mongoose";
import 'dotenv/config';
import AuthParser from "./parsers/auth/auth.parser.js";
import AuthController from "./controllers/auth/auth.controller.js";
import AuthRouter from "./routers/auth/auth.router.js";

const app: Express = express()
const serviceName = "Song Service"
const port = process.env.PORT || 5001

const corsOptions = {
  origin: "*",
};

const authParser = new AuthParser();
const authController = new AuthController(authParser);
const authRouter = new AuthRouter(authController, express.Router());

// middleware to log to console
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", authRouter.registerRoutes());

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
      app.listen(port, () => {
        console.log(
          `⚡️[server]: ${serviceName} is running at http://localhost:${port}`
        );
      });
    }).catch(err => console.log(err.message))



