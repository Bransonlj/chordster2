import { Request, Response } from "express";
import { ErrorResponse } from "../interfaces/reponse/index.js";

abstract class Controller {
  protected static handleSuccess<T>(res: Response, data: T) {
    return res.status(200).json(data);
  }

  protected static handleBadRequest(res: Response, message: string) {
    const response: ErrorResponse = {
      code: 400,
      message,
    };
    return res.status(400).json(response);
  }

  protected static handleUnauthorized(res: Response, message: string) {
    const response: ErrorResponse = {
      code: 401,
      message,
    }
    return res.status(404).json(response);
  }

  protected static handleNotFound(res: Response, message: string) {
    const response: ErrorResponse = {
      code: 404,
      message,
    }
    return res.status(404).json(response);
  }

  protected static handleServerError(res: Response, message: string) {
    const response: ErrorResponse = {
      code: 500,
      message,
    }
    return res.status(500).json(response);
  }

  public healthCheck(_req: Request, res: Response) {
    return Controller.handleSuccess<string>(res, "OK");
  }
}

export default Controller;
