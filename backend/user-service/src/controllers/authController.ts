import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { createToken } from "../util/auth.js";
import AuthParser from "../parsers/auth/auth.parser.js";
import { Document, Types } from "mongoose";
import { IUser } from "../interfaces/schema/index.js";

const parser = new AuthParser();

export async function login(req: Request, res: Response) {
  try {
    const parsedLoginFields = parser.parseLoginInput(req.body);
    let user: Document<unknown, {}, IUser> & IUser & {
      _id: Types.ObjectId;
  }
    if (parsedLoginFields.email) {
      user = await User.findOne({ email: parsedLoginFields.email });
      if (!user) {
          throw Error("Invalid email");
      }
    } else {
      user = await User.findOne({ username: parsedLoginFields.username });
      if (!user) {
          throw Error("Invalid username");
      }
    }

    const match = await bcrypt.compare(parsedLoginFields.password, user.password);

    if (!match) {
        throw Error("Invalid Password");
    }

    const token = createToken(user._id);
    res.status(200).json({data: {user_id: user._id, token}});
  } catch (error) {
    res.status(400).json(error.message);
  }
}

export async function register(req: Request, res: Response) {
  try {
    const parsedInput = parser.parseCreateInput(req.body);
    const existsEmail = await User.findOne({ email: parsedInput.email });
    const existsUsername = await User.findOne({ username: parsedInput.username });
    if (existsEmail) {
        throw Error('Email already in use');
    } 

    if (existsUsername) {
        throw Error('Username already in use');
    } 

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(parsedInput.password, salt);

    const user = await User.create({ 
      username: parsedInput.username, 
      email: parsedInput.email, 
      password: hash 
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }

}