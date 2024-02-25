import { Router } from "express";
import Controller from "../controllers/controller.abstract.js";
import CRUDController from "../controllers/crudController.interface.js";

abstract class BaseRouter<ControllerType extends Controller & CRUDController> {
  constructor(
    protected readonly controller: ControllerType,
    protected readonly router: Router,
  ) {}

  abstract registerRoutes(): Router;
}

export default BaseRouter;
