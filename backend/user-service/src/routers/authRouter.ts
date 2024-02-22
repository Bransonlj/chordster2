import express, { Express } from "express";
import { login, register } from "../controllers/authController.js";

const authRouter = express.Router();

// login
authRouter.post("/login", login);
// register
authRouter.post("/register", register)

export default authRouter