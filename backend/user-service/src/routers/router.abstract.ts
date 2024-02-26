import { Router } from "express";
import Controller from "../controllers/controller.abstract.js";

abstract class BaseRouter<ControllerType> {
  constructor(
    protected readonly controller: ControllerType,
    protected readonly router: Router,
  ) {}

  abstract registerRoutes(): Router;
}

export default BaseRouter;
