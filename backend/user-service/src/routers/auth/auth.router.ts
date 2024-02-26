import { Router } from "express";
import AuthController from "../../controllers/auth/auth.controller.js";
import BaseRouter from "../router.abstract.js";

class AuthRouter extends BaseRouter<AuthController> {

  override registerRoutes(): Router {
    this.router.route("/healthCheck").get(this.controller.healthCheck);

    this.router.route("/login").post(this.controller.login);

    this.router.route("/register").post(this.controller.create);


    return this.router;
  }
}

export default AuthRouter;
