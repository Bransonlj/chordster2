import express, { Express, Request, Response } from "express";
import cors from 'cors';
import SongParser from "./parsers/song/song.parser.js";
import SongDBService from "./dbservice/song/song.dbservice.js";
import SongController from "./controllers/song/song.controller.js";
import prismaClient from "./utils/prismaClient.js";
import SongRouter from "./routers/song/song.router.js";
import 'dotenv/config';

const app: Express = express()
const serviceName = "Song Service"
const port = process.env.PORT || 5000

const corsOptions = {
  origin: "*",
};

const songParser = new SongParser();
const songDBService = new SongDBService(prismaClient);
const songController = new SongController(songParser, songDBService);
const songRouter = new SongRouter(songController, express.Router());

// middleware to log to console
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use("/songs", songRouter.registerRoutes());

app.listen(port, () => {
  console.log(
    `⚡️[server]: ${serviceName} is running at http://localhost:${port}`
  );
});
