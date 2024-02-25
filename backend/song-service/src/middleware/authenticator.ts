import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../interfaces/request/index.js";
import { ErrorResponse } from "../interfaces/reponse/index.js";

const unauthorizedErrorResponse: ErrorResponse = {
  code: 401,
  message: "Invalid token, user nauthorized"
}

export async function useAuth(req: Request, res: Response, next: NextFunction) {
  // authorization = 'Bearer "TOKEN"'
  const bearer_token = req.header('Authorization');
  if (!bearer_token) {
    return res.status(401).json(unauthorizedErrorResponse);
  }

  const token = bearer_token.split(' ')[1];
  try {
    // get _id from body of token after verifying with secret key
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY);
    (req as AuthenticatedRequest).user = {id: decoded.user_id};
    console.log("Auth successful");
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json(unauthorizedErrorResponse)
  }

}