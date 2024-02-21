import express, { Express } from "express";
import { getAllSongs, createSong } from "../controllers/songController.js";

const songRouter = express.Router();


// get all songs metadata
songRouter.get("/", getAllSongs)

// get individual song of id
songRouter.post("/", createSong)

 export default songRouter