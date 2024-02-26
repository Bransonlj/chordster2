import express, { Express } from "express";
import { login, register } from "../controllers/authController.js";
import AuthController from "../controllers/auth/auth.controller.js";
import AuthParser from "../parsers/auth/auth.parser.js";

const authRouter = express.Router();
const authParser = new AuthParser();
const authController = new AuthController(authParser);

// login
authRouter.post("/login", authController.login);
// register
authRouter.post("/register", authController.create);

export default authRouter