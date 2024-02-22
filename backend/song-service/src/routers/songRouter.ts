import express, { Express } from "express";
import { getAllSongs, createSong, getSong } from "../controllers/songController.js";
import { useAuth } from "../middleware/authenticator.js";

const songRouter = express.Router();

// get all songs metadata
songRouter.get("/", getAllSongs)

// get individual song of id
songRouter.get("/:id", getSong);

songRouter.use(useAuth);

songRouter.post("/", createSong)

 export default songRouter