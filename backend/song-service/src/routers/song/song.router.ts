import { Router } from "express";
import SongController from "../../controllers/song/song.controller.js";
import BaseRouter from "../router.abstract.js";
import { useAuth } from "../../middleware/authenticator.js";

class SongRouter extends BaseRouter<SongController> {

  private publicRoutes() {
    this.router
      .route("/:id")
      .get(this.controller.findById);
    
    this.router
      .route("/")
      .get(this.controller.findAll);
  }

  private protectedRoutes() {
    this.router.use(useAuth);

    this.router
      .route("/:id")
      .put(this.controller.update)
      .delete(this.controller.delete);

    this.router
      .route("/")
      .post(this.controller.create);
  }

  override registerRoutes(): Router {
      this.router.route("/healthCheck").get(this.controller.healthCheck);
  
      this.publicRoutes();
      this.protectedRoutes();

      return this.router;
  }
}

export default SongRouter;
