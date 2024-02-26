import { Document, Types } from "mongoose";
import AuthParser from "../../parsers/auth/auth.parser.js";
import Controller from "../controller.abstract.js";
import { Request, Response } from "express";
import { IUser } from "../../interfaces/schema/index.js";
import User from "../../models/User.js";
import bcrypt from 'bcrypt';
import { createToken } from "../../util/auth.js";
import { ValidatedLoginFields } from "../../interfaces/login/index.js";
import { UserAuthentication } from "../../interfaces/userAuthentication/index.js";
import { UserCreateDTO } from "../../interfaces/user/createDTO.js";
import { PublicUser } from "../../interfaces/publicUser/index.js";

class AuthController extends Controller {
  constructor(
    private readonly parser: AuthParser,
  ) {
    super();
  }

  static ErrorMessages = {
    usernameUsed: "Username is already in use!",
    emailUsed: "Email is already in use!",
    emailUsernameInvalid: "Invalid email or username!",
    passwordInvalid: "Invalid password"
  }

  public login = async (req: Request, res: Response) => {
    let user: Document<unknown, {}, IUser> & IUser & {
      _id: Types.ObjectId;
    }
    let parsedLoginFields: ValidatedLoginFields;

    try {
      parsedLoginFields = this.parser.parseLoginInput(req.body);
    } catch (error) {
      return AuthController.handleBadRequest(res, error.message);
    }

    try {
      if (parsedLoginFields.email) {
        user = await User.findOne({ email: parsedLoginFields.email });
      } else {
        user = await User.findOne({ username: parsedLoginFields.username });
      }
    } catch (error) {
      return AuthController.handleServerError(res, error.message);
    } 

    try {
      if (!user) {
        throw Error(AuthController.ErrorMessages.emailUsernameInvalid);
      }
      const match = await bcrypt.compare(parsedLoginFields.password, user.password);
  
      if (!match) {
          throw Error(AuthController.ErrorMessages.passwordInvalid);
      }
  
      const token = createToken(user._id);
      const userAuth: UserAuthentication = {
        user_id: user._id.toString(),
        token,
      }
      return AuthController.handleSuccess(res, userAuth)
    } catch (error) {
      return AuthController.handleBadRequest(res, error.message);
    }
  }

  public create = async (req: Request, res: Response) => {
    let parsedInput: UserCreateDTO;
    try {
      parsedInput = this.parser.parseCreateInput(req.body);
    } catch (error) {
      return AuthController.handleBadRequest(res, error.message);
    }
    try {
      const existsEmail = await User.findOne({ email: parsedInput.email });
      const existsUsername = await User.findOne({ username: parsedInput.username });
      if (existsEmail) {
        return AuthController.handleBadRequest(res, AuthController.ErrorMessages.emailUsed);
      } 
  
      if (existsUsername) {
        return AuthController.handleBadRequest(res, AuthController.ErrorMessages.usernameUsed);
      } 
  
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(parsedInput.password, salt);
  
      const user = await User.create({ 
        username: parsedInput.username, 
        email: parsedInput.email, 
        password: hash 
      });

      const responseUser: PublicUser = {
        username: user.username,
        id: user._id.toString(),
      }
      return AuthController.handleSuccess(res, responseUser);
    } catch (error) {
      return AuthController.handleServerError(res, error.message);
    }
  }

}

export default AuthController;
